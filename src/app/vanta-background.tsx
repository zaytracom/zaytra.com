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
  const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null);
  const [hue, setHue] = useState(240);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      import("vanta/dist/vanta.halo.min").then((HALO) => {
        import("three").then((THREE) => {
          setVantaEffect(
            HALO.default({
              el: vantaRef.current,
              THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              backgroundColor: 0x0,
              baseColor: 0x0,
              size: 0.6,
              amplitudeFactor: 1.0,
              xOffset: 0.05,
              yOffset: 0.1,
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
    const interval = setInterval(() => {
      setHue((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a]">
      <div ref={vantaRef} className="absolute inset-0 opacity-60" />
      <div
        className="absolute inset-0 bg-black/50"
        style={{ backdropFilter: "contrast(1)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, hsla(${hue}, 40%, 25%, 0.5) 0%, hsla(${hue}, 40%, 20%, 0.15) 15%, transparent 30%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
