
function isColor(color: string): boolean {
  return color[0] === '#' && color.length === 7 && !isNaN(parseInt(color.slice(1), 16));
}


export function getClientPosition(dom: HTMLElement) {
  const { left: offsetX, top: offsetY } = dom.getBoundingClientRect() ?? { left: 0, top: 0 };
  return {
    offsetX,
    offsetY,
  }
}
export function getContextFromCanvas(canvas: HTMLCanvasElement, width:number, height: number): CanvasRenderingContext2D {
  return adaptDPR(canvas.getContext('2d') as CanvasRenderingContext2D, width, height);
}
export function getLineType(): PrintingLineType {
  const widthValue = Number((document.querySelector('#width') as HTMLInputElement).value);
  const lineWidth = isNaN(widthValue) ? 1 : widthValue;
  const colorValue = (document.querySelector('#color') as HTMLInputElement).value;
  const lineColor = isColor(colorValue) ? colorValue : '#000000';
  return {
    lineColor,
    lineWidth,
  }
}
function adaptDPR(ctx: CanvasRenderingContext2D, width:number, height: number) {
  const dpr = window.devicePixelRatio;
  ctx.canvas.width = Math.round(width * dpr);
  ctx.canvas.height = Math.round(height * dpr);
  ctx.canvas.style.width = width + 'px';
  ctx.canvas.style.height = height + 'px';
  ctx.scale(dpr, dpr);
  return ctx
}