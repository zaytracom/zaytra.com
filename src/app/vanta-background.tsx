"use client";

export const VantaBackground = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a]">
      <img
        alt=""
        width="16"
        height="9"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.6) contrast(1.2) saturate(1.3)" }}
        src="/bg-large.jpeg"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
