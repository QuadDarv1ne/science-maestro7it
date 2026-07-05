#!/usr/bin/env python3
"""Re-fetch missing repos with rate-limit-aware delays."""
import json
import subprocess
import re
import time

ALL_REPOS = [
    "QuadDarv1ne/via-antiqua-history",
    "QuadDarv1ne/FastFingers",
    "QuadDarv1ne/ai-aggregator",
    "QuadDarv1ne/ba-workspace-pro",
    "QuadDarv1ne/grafinya-panel",
    "QuadDarv1ne/speedtest-tracker",
    "QuadDarv1ne/cri_infographic",
    "QuadDarv1ne/fastpay_connect",
    "QuadDarv1ne/favorit-pro",
    "QuadDarv1ne/nanoprobe-sim-lab",
    "QuadDarv1ne/quantum-horizon",
]

def clean(s):
    if not s:
        return ""
    return re.sub(r'\s+', ' ', s).strip()

def is_rate_limited(text):
    return "rate limit exceeded" in text.lower() or "API rate limit" in text

def fetch_repo(full_name, retries=3):
    url = f"https://api.github.com/repos/{full_name}"
    for attempt in range(retries):
        try:
            result = subprocess.run(
                f'curl -s --max-time 30 "{url}"',
                shell=True, capture_output=True, text=True, timeout=40
            )
            if is_rate_limited(result.stdout):
                print(f"  rate-limited, waiting 20s (attempt {attempt+1})...", flush=True)
                time.sleep(20)
                continue
            data = json.loads(result.stdout)
            if 'message' in data and 'rate' in data.get('message','').lower():
                time.sleep(20)
                continue
            # Get README
            readme_url = f"https://api.github.com/repos/{full_name}/readme"
            readme_result = subprocess.run(
                f'curl -s --max-time 30 -H "Accept: application/vnd.github.raw" "{readme_url}"',
                shell=True, capture_output=True, text=True, timeout=40
            )
            readme = readme_result.stdout if readme_result.returncode == 0 else ""
            if is_rate_limited(readme):
                readme = ""
            return {
                'name': data.get('name', ''),
                'full_name': data.get('full_name', full_name),
                'description': clean(data.get('description') or ''),
                'html_url': data.get('html_url', f"https://github.com/{full_name}"),
                'homepage': data.get('homepage') or '',
                'language': data.get('language') or '',
                'topics': data.get('topics', []) or [],
                'stargazers_count': data.get('stargazers_count', 0),
                'forks_count': data.get('forks_count', 0),
                'created_at': data.get('created_at', ''),
                'updated_at': data.get('updated_at', ''),
                'readme_excerpt': clean(readme[:3500] if readme else ''),
            }
        except Exception as e:
            return {'full_name': full_name, 'error': str(e)}
    return {'full_name': full_name, 'error': 'rate limited after retries'}

# Load existing
existing = {}
try:
    with open('/home/z/my-project/scripts/github_repos.json', 'r', encoding='utf-8') as f:
        for r in json.load(f):
            fn = r.get('full_name', '')
            if fn and not r.get('error') and r.get('name'):
                existing[fn] = r
except Exception:
    pass

results = []
for full_name in ALL_REPOS:
    if full_name in existing:
        print(f"OK cached: {full_name}", flush=True)
        results.append(existing[full_name])
        continue
    print(f"Fetching {full_name}...", flush=True)
    r = fetch_repo(full_name)
    results.append(r)
    time.sleep(3)  # be polite

out_path = '/home/z/my-project/scripts/github_repos.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"\nSaved {len(results)} repos to {out_path}")
errors = [r for r in results if 'error' in r or not r.get('name')]
print(f"Errors/missing: {len(errors)}")
for r in errors:
    print(f"  {r.get('full_name')}: {r.get('error', 'no name field')}")
