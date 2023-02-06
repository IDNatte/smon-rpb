export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type ChartOpt = {
  delay: number,
  minValue?: number,
  maxValue?: number,
  timestampFormatter?: any;
  responsive?: boolean;
  tooltip?: boolean;
  lineWidth?: number;
  strokeStyle?: HEX;
  fillStyle?: RGB | RGBA;
  grid?: {
    millisPerLine: number;
  };
  tooltipLine?: {
    lineWidth: number,
    strokeStyle: HEX
  }
};