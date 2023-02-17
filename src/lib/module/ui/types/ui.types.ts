export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type RGB = `rgb(${number}, ${number}, ${number})`;
export type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

type DefaultLineWidth = 3;
type DefaultStrokeColor = '#fff';

export type ChartOpt = {
	delay: number;
	minValue?: number;
	maxValue?: number;
	timestampFormatter?: any;
	responsive?: boolean | true;
	tooltip?: boolean;
	lineWidth?: number | DefaultLineWidth;
	strokeStyle?: HEX | DefaultStrokeColor;
	fillStyle?: RGB | RGBA;
	grid?: {
		millisPerLine: number;
	};
	tooltipLine?: {
		lineWidth: number | DefaultLineWidth;
		strokeStyle: HEX | DefaultStrokeColor;
	};
};
