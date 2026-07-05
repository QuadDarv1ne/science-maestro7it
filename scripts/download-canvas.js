// Browser-side script to download the canvas as a PNG file
(() => {
  const cv = document.querySelector('canvas');
  const link = document.createElement('a');
  link.download = 'particles-canvas.png';
  link.href = cv.toDataURL('image/png');
  link.click();
  return 'download triggered';
})();
