#!/usr/bin/env python3
"""Fetch metadata for all 30 Zenodo publications using curl, save as JSON."""
import json
import subprocess
import re
import time

RECORD_IDS = [
    20751636, 20751627, 20751600, 20751577, 20751554, 20751520,
    20598408, 20598410, 20496190, 20496164, 20496110, 20496031,
    20473085, 20457816, 20457822, 20450307, 20450305, 20450309,
    20408014, 20408003, 20407982, 20407811, 20407361, 20381020,
    19696832, 19696835, 19696828, 19694163, 19469307, 18413306,
]

def clean_html(s: str) -> str:
    if not s:
        return ""
    s = re.sub(r'<[^>]+>', ' ', s)
    s = s.replace('&laquo;', '«').replace('&raquo;', '»').replace('&nbsp;', ' ')
    s = s.replace('&mdash;', '—').replace('&ndash;', '–').replace('&hellip;', '…')
    s = s.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
    s = s.replace('&quot;', '"').replace('&apos;', "'").replace('&copy;', '©')
    s = re.sub(r'\s+', ' ', s).strip()
    return s

def fetch_record(rid: int) -> dict:
    url = f"https://zenodo.org/api/records/{rid}"
    try:
        result = subprocess.run(
            f'curl -s --max-time 30 "{url}"',
            shell=True,
            capture_output=True, text=True, timeout=40
        )
        data = json.loads(result.stdout)
        meta = data.get('metadata', {})
        title = clean_html(meta.get('title', ''))
        desc = clean_html(meta.get('description', ''))
        pub_date = meta.get('publication_date', '')
        doi = meta.get('doi', f'10.5281/zenodo.{rid}')
        creators = meta.get('creators', [])
        authors = ', '.join(c.get('name', '') for c in creators)
        keywords = meta.get('keywords', []) or []
        rec_type = meta.get('type', '')
        return {
            'id': rid,
            'title': title,
            'abstract': desc,
            'publication_date': pub_date,
            'doi': doi,
            'url': f'https://zenodo.org/records/{rid}',
            'doi_url': f'https://doi.org/{doi}',
            'authors': authors,
            'keywords': keywords,
            'type': rec_type,
        }
    except Exception as e:
        return {'id': rid, 'error': str(e)}

results = []
for rid in RECORD_IDS:
    print(f"Fetching {rid}...", flush=True)
    rec = fetch_record(rid)
    results.append(rec)

out_path = '/home/z/my-project/scripts/zenodo_data.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"\nSaved {len(results)} records to {out_path}")
print(f"Errors: {sum(1 for r in results if 'error' in r)}")
