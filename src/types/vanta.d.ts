declare module "vanta/dist/vanta.halo.min" {
  interface VantaHaloOptions {
    el: HTMLElement | null;
    THREE: typeof import("three");
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    baseColor?: number;
    size?: number;
    amplitudeFactor?: number;
    xOffset?: number;
    yOffset?: number;
  }

  interface VantaEffect {
    destroy: () => void;
  }

  function HALO(options: VantaHaloOptions): VantaEffect;
  export default HALO;
}
