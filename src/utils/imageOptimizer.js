/**
 * In-Browser Automated Client-Side Image Optimizer
 * 
 * Automatically downsizes and converts any user-uploaded image 
 * (regardless of original size: 5MB, 10MB, DSLR/iPhone photos) 
 * into an ultra-compact, high-clarity WebP format (typically 20KB - 80KB).
 */

export async function optimizeImage(fileOrDataUrl, options = {}) {
  const {
    maxWidth = 1200,
    maxHeight = 1200,
    quality = 0.82,
    outputFormat = 'image/webp'
  } = options;

  return new Promise((resolve, reject) => {
    // If passed a File / Blob
    if (fileOrDataUrl instanceof Blob) {
      const originalSize = fileOrDataUrl.size;
      const reader = new FileReader();
      reader.onload = (e) => {
        processImageSrc(e.target.result, originalSize);
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(fileOrDataUrl);
    } else if (typeof fileOrDataUrl === 'string') {
      // If passed a data URL or image path
      const approxOriginalSize = Math.round((fileOrDataUrl.length * 3) / 4);
      processImageSrc(fileOrDataUrl, approxOriginalSize);
    } else {
      reject(new Error('Invalid image input: expected File, Blob, or base64 DataURL'));
    }

    function processImageSrc(src, originalSizeBytes) {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          let { width, height } = img;

          // Calculate aspect ratio preserving dimensions
          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve({
              dataUrl: src,
              originalSizeKB: Math.round(originalSizeBytes / 1024),
              optimizedSizeKB: Math.round(originalSizeBytes / 1024),
              savingsPct: '0%'
            });
            return;
          }

          // Use high quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Draw image scaled
          ctx.drawImage(img, 0, 0, width, height);

          // Test if browser supports WebP canvas export
          let format = outputFormat;
          let optimizedDataUrl = canvas.toDataURL(format, quality);

          // If browser doesn't support WebP export (returns png fallback with image/png mime)
          if (!optimizedDataUrl.startsWith('data:image/webp')) {
            format = 'image/jpeg';
            optimizedDataUrl = canvas.toDataURL(format, quality);
          }

          const optimizedSizeBytes = Math.round((optimizedDataUrl.length * 3) / 4);
          const originalSizeKB = Math.round(originalSizeBytes / 1024);
          const optimizedSizeKB = Math.round(optimizedSizeBytes / 1024);
          const savingsPct = originalSizeBytes > optimizedSizeBytes
            ? Math.round(((originalSizeBytes - optimizedSizeBytes) / originalSizeBytes) * 100) + '%'
            : '0%';

          resolve({
            dataUrl: optimizedDataUrl,
            width,
            height,
            format: format.split('/')[1] || 'webp',
            originalSizeKB,
            optimizedSizeKB,
            savingsPct
          });
        } catch (err) {
          // If canvas tainted or other error, fallback to original
          resolve({
            dataUrl: src,
            originalSizeKB: Math.round(originalSizeBytes / 1024),
            optimizedSizeKB: Math.round(originalSizeBytes / 1024),
            savingsPct: '0%'
          });
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for optimization'));
      };

      img.src = src;
    }
  });
}
