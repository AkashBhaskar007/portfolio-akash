"use client";

import { useEffect, useRef, useState, useCallback, type RefObject } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { preloadImages, buildSequenceUrls } from "@/lib/preloadImages";
import {
  SEQUENCE_BASE_PATH,
  SEQUENCE_DELAY_SUFFIX,
  SEQUENCE_FRAME_COUNT,
} from "@/lib/sequenceConfig";

type ScrollyCanvasProps = {
  scrollTargetRef: RefObject<HTMLElement | null>;
  onReady?: () => void;
};

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  const scale = Math.max(cw / img.width, ch / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  const ox = (cw - dw) / 2;
  const oy = (ch - dh) / 2;
  ctx.drawImage(img, ox, oy, dw, dh);
}

export function ScrollyCanvas({ scrollTargetRef, onReady }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const readyNotifiedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start start", "end end"],
  });

  const maxFrame = Math.max(0, SEQUENCE_FRAME_COUNT - 1);
  const frameMotion = useTransform(scrollYProgress, [0, 1], [0, maxFrame]);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const imgs = imagesRef.current;
    if (!canvas || !container || imgs.length === 0) return;

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, w, h);

    const idx = Math.min(
      Math.max(0, Math.round(frameIndexRef.current)),
      imgs.length - 1
    );
    const img = imgs[idx];
    if (img?.naturalWidth) {
      drawImageCover(ctx, img, w, h);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const urls = buildSequenceUrls(
      SEQUENCE_BASE_PATH,
      SEQUENCE_FRAME_COUNT,
      SEQUENCE_DELAY_SUFFIX
    );

    preloadImages(urls)
      .then((imgs) => {
        if (cancelled) return;
        imagesRef.current = imgs;
        setReady(true);
        if (!readyNotifiedRef.current) {
          readyNotifiedRef.current = true;
          onReady?.();
        }
        setLoadError(null);
        requestAnimationFrame(() => paint());
      })
      .catch((e: Error) => {
        if (cancelled) return;
        // Keep the app usable even when sequence assets are missing.
        setLoadError(e.message);
        setReady(true);
        if (!readyNotifiedRef.current) {
          readyNotifiedRef.current = true;
          onReady?.();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [paint, onReady]);

  useMotionValueEvent(frameMotion, "change", (latest) => {
    frameIndexRef.current = latest;
    paint();
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => paint());
    ro.observe(container);
    return () => ro.disconnect();
  }, [ready, paint]);

  useEffect(() => {
    if (!ready) return;
    frameIndexRef.current = frameMotion.get();
    paint();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync once when frames are ready
  }, [ready, paint]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full bg-[#121212]"
      aria-hidden
    >
      {!ready && !loadError && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center">
          <div className="h-1 w-32 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/3 animate-portfolio-shimmer rounded-full bg-white/40" />
          </div>
        </div>
      )}
      {loadError && (
        <div className="absolute inset-0 z-[1] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(99,102,241,0.18),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_38%_at_75%_70%,rgba(236,72,153,0.14),transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_40%)]" />
          <div className="absolute bottom-4 left-4 rounded-md border border-white/15 bg-black/30 px-2.5 py-1 text-[11px] text-white/60">
            Sequence fallback active
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s ease" }}
      />
    </div>
  );
}
