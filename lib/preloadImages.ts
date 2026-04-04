/**
 * Preloads an ordered list of image URLs. Resolves when all images are decoded
 * (or loaded, if decode is unavailable) to reduce flicker during canvas scrubbing.
 */
export async function preloadImages(urls: string[]): Promise<HTMLImageElement[]> {
  const images = urls.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve, reject) => {
          if (img.complete && img.naturalWidth > 0) {
            void img.decode?.().then(() => resolve()).catch(() => resolve());
            return;
          }
          img.onload = () => {
            void img.decode?.().then(() => resolve()).catch(() => resolve());
          };
          img.onerror = () => reject(new Error(`Failed to load: ${img.src}`));
        })
    )
  );

  return images;
}

export function buildSequenceUrls(
  basePath: string,
  count: number,
  delaySuffix: string = "delay-0.066s"
): string[] {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i).padStart(3, "0");
    return `${basePath}/frame_${n}_${delaySuffix}.webp`;
  });
}
