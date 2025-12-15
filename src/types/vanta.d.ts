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
    backgroundAlpha?: number;
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

declare module "vanta/dist/vanta.net.min" {
  interface VantaNetOptions {
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
    backgroundAlpha?: number;
    color?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    showDots?: boolean;
  }

  interface VantaEffect {
    destroy: () => void;
  }

  function NET(options: VantaNetOptions): VantaEffect;
  export default NET;
}
