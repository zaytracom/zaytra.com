"use client";

import { useEffect, useRef, useState } from "react";

interface VantaEffect {
  destroy: () => void;
}

export const VantaBackground = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      import("vanta/dist/vanta.net.min").then((NET) => {
        import("three").then((THREE) => {
          setVantaEffect(
            NET.default({
              el: vantaRef.current,
              THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: true,
              minHeight: 200.0,
              minWidth: 200.0,
              backgroundColor: 0x0,
              backgroundAlpha: 0,
              color: 0x3f8fff,
              points: 10,
              maxDistance: 25,
              spacing: 25,
              // showDots: false,
            })
          );
        });
      });
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.pause();
    };

    const handleLoadedMetadata = () => {
      video.playbackRate = 1;

      const animate = () => {
        const currentTime = video.currentTime;

        // Ступенчатое замедление каждую секунду
        let rate: number;
        if (currentTime < 1) {
          rate = 1.0;
        } else if (currentTime < 2) {
          rate = 0.9;
        } else if (currentTime < 3) {
          rate = 0.8;
        } else if (currentTime < 4) {
          rate = 0.7;
        } else if (currentTime < 5) {
          rate = 0.6;
        } else if (currentTime < 6) {
          rate = 0.5;
        } else if (currentTime < 7) {
          rate = 0.4;
        } else if (currentTime < 8) {
          rate = 0.3;
        } else if (currentTime < 9) {
          rate = 0.2;
        } else if (currentTime < 10) {
          rate = 0.1;
        } else {
          rate = 0.07;
        }

        video.playbackRate = rate;

        if (!video.paused && !video.ended) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const duration = 3000; // 3 секунды
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // От 0.5 до 0 плавно за 10 секунд
      const opacity = 0.5 - progress * 0.5;

      overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a]">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/video-1.mp4"
      />
      <div ref={vantaRef} className="absolute inset-0 opacity-50" />
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{ backdropFilter: "contrast(1)", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
