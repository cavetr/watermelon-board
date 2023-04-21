import pipe from "@utils/pipe";
import DrawingBoard from ".";
import { PrintingType } from "@type/const";

class Pen extends DrawingBoard {
  private ctx: CanvasRenderingContext2D;
  private lastPositionX: number | undefined;
  private lastPositionY: number | undefined;
  private data: [number, number][] = [] ;
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    const destroy = this.drawOver.bind(this, canvas);
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.onmousemove = this.draw.bind(this);
    canvas.onmouseleave = destroy;
    canvas.onmouseup = destroy;
  }
  private draw(e: MouseEvent) {
    if (this.lastPositionX === void 0 || this.lastPositionY === void 0) {
      [this.lastPositionX, this.lastPositionY] = [e.clientX - this.offsetX, e.clientY - this.offsetY];
    } else {
      this.ctx.beginPath();
      const [newPositionX, newPositionY] = [e.clientX - this.offsetX, e.clientY - this.offsetY];
      this.ctx.moveTo(this.lastPositionX ?? newPositionX, this.lastPositionY ?? newPositionY);
      this.ctx.lineTo(newPositionX, newPositionY);
      this.ctx.closePath();
      this.ctx.stroke();
      [this.lastPositionX, this.lastPositionY] = [newPositionX, newPositionY];
    }
    this.data.push([this.lastPositionX, this.lastPositionY]);
  }
  private drawOver(canvas: HTMLCanvasElement) {
    canvas.onmousemove = null;
    canvas.onmouseup = null;
    canvas.onmouseleave = null;
    pipe.emit('draw', {
      boardId: canvas.id,
      shapeId: '1',
      data: {
        lineWidth: 1,
        lineColor: 1,
        type: PrintingType.PEN,
        data: {
          pointList: this.data,
        },
      }
    })
  }
}
export default Pen;