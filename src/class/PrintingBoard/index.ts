import LinkList from '@class/LinkList/index';
import Shape from '@class/Shape';
import Circle from '@class/Shape/Circle';
import Pen from '@class/Shape/Pen';
import Rectangle from '@class/Shape/Rectangle';
import Text from '@class/Shape/Text';
import { PrintingType } from '@type/const';
import { IPrinting, IPrintingData } from '@type/printing';
import pipe from '@utils/pipe';
const reDrawTime = 1000;
type ShapeClass = Pen | Text | Circle | Rectangle
class PrintingBoard {
  private shapeList: LinkList<Shape, Id> = new LinkList();
  private ctx: CanvasRenderingContext2D;
  private reDrawTimeOutId: number | undefined;
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }
  addShape(printing: IPrinting) {
    this.shapeList.addNode(printing.shapeId, this.createNewPrinting(printing.data));
  }
  deleteShape(id: Id) {
    this.shapeList.deleteNode(id);
    this.reDraw();
  }
  reDraw() {
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
  private createNewPrinting(printingData: IPrintingData): ShapeClass {
    switch (printingData.type) {
      case PrintingType.PEN:
        return new Pen(printingData.data.pointList);
      case PrintingType.CIRCLE:
        return new Circle(
          printingData.data.beginPositionX,
          printingData.data.beginPositionY,
          printingData.data.endPositionX,
          printingData.data.endPositionY,
        );
      case PrintingType.TEXT:
        return new Text(printingData.data.text, printingData.data.positionX, printingData.data.positionY);
      case PrintingType.RECTANGLE:
        return new Rectangle(
          printingData.data.beginPositionX,
          printingData.data.beginPositionY,
          printingData.data.endPositionX,
          printingData.data.endPositionY,
        );
      default:
        throw '什么东西？？';
    }
  }
}
export default PrintingBoard;