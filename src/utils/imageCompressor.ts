/**
 * Client-side image compression utility to prevent LocalStorage QuotaExceededError.
 * Resizes large camera photos (often 5~15MB) to max 1280px dimension with 0.8 JPEG quality (~100-250KB).
 */
export async function compressImage(
  file: File,
  maxWidth = 1280,
  maxHeight = 1280,
  quality = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If not an image, fail gracefully
    if (!file.type.startsWith("image/")) {
      reject(new Error("선택한 파일이 이미지가 아닙니다."));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Scale down maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          // Fallback to original data URL if 2D context is unavailable
          resolve(e.target?.result as string);
          return;
        }

        // Use high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to lightweight JPEG data URL
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      };

      img.onerror = () => {
        reject(new Error("이미지 로드에 실패했습니다."));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error("파일 읽기에 실패했습니다."));
    };

    reader.readAsDataURL(file);
  });
}
