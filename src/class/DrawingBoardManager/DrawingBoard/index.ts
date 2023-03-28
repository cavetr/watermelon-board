// import { getDrawEvent } from "./draw";
class DrawingBoard {
  readonly offsetX: number;
  readonly offsetY: number;
  readonly width: number;
  readonly height: number;
  constructor(private canvas: HTMLCanvasElement) {
    const { left: offsetX, top: offsetY } = document.getElementById('board')?.getBoundingClientRect() ?? {};
    this.offsetX = offsetX ?? 0;
    this.offsetY = offsetY ?? 0;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }
  destroy() {
    this.canvas.remove();
  }
}
export default DrawingBoard;