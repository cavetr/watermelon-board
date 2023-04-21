import LinkList from '@class/LinkList/index';
import Shape from '@class/Shape';
import ShapeFactory from '@class/Shape/ShapeFactory';
import pipe from '@utils/pipe';
const reDrawTime = 1000;
class PrintingBoard {
  private shapeList: LinkList<Shape, Id> = new LinkList();
  private ctx: CanvasRenderingContext2D;
  private reDrawTimeOutId: number | undefined;
  readonly width: number;
  readonly height: number;
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.width = canvas.width;
    this.height = canvas.height;
  }
  addShape(printing: IPrinting) {
    this.shapeList.addNode(printing.shapeId, ShapeFactory.getShape(printing.data));
  }
  deleteShape(id: Id) {
    this.shapeList.deleteNode(id);
    this.reDraw();
  }
  reDraw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (this.reDrawTimeOutId !== void 0) {
      clearTimeout(this.reDrawTimeOutId);
      this.reDrawTimeOutId = void 0;
    }
    console.log('redraw');
    this.shapeList.forEach((id, printing) => {
      // 图形绘制逻辑
      printing.draw(this.ctx);
      // 删除逻辑
      pipe.emit('printing', id);
    });
    this.reDrawTimeOutId = setTimeout(() => {
      this.reDraw();
    }, reDrawTime);
  }
}
export default PrintingBoard;