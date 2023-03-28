import DrawingBoard from ".";
import { PrintingType } from "@type/const";
import pipe from "@utils/pipe";
class Circle extends DrawingBoard {
  private beginPositionX: number | undefined;
  private beginPositionY: number | undefined;
  private lastPositionX: number | undefined;
  private lastPositionY: number | undefined;
  private ctx: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    const destroy = this.drawOver.bind(this, canvas);
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.onmousemove = this.draw.bind(this);
    canvas.onmouseleave = destroy;
    canvas.onmouseup = destroy;
  }
  private draw(e: MouseEvent) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (this.beginPositionX === void 0 || this.beginPositionY === void 0) {
      [this.beginPositionX, this.beginPositionY] = [e.clientX - this.offsetX, e.clientY - this.offsetY];
    } else {
      this.ctx.beginPath();
      const [newPositionX, newPositionY] = [e.clientX - this.offsetX, e.clientY - this.offsetY];
      this.ctx.rect(
        Math.min(newPositionX, this.beginPositionX),
        Math.min(newPositionY, this.beginPositionY),
        Math.abs(newPositionX - this.beginPositionX),
        Math.abs(newPositionY - this.beginPositionY),
      );
      this.ctx.closePath();
      this.ctx.stroke();
      [this.lastPositionX, this.lastPositionY] = [newPositionX, newPositionY];
    }
  }
  private drawOver(canvas: HTMLCanvasElement) {
    canvas.onmousemove = null;
    canvas.onmouseup = null;
    canvas.onmouseleave = null;
    pipe.emit('draw', {
      boardId: canvas.id,
      id: '1',
      data: {
        lineWidth: 1,
        lineColor: 1,
        type: PrintingType.RECTANGLE,
        data: {
          beginPositionX: this.beginPositionX as number,
          beginPositionY: this.beginPositionY as number,
          endPositionX: this.lastPositionX as number,
          endPositionY: this.lastPositionY as number,
        }
      }
    })
  }
}
export default Circle;