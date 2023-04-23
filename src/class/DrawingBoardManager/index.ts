import { PrintingType } from "@type/const";
import ShapeFactory from "@class/Shape/ShapeFactory";
class DrawingBoardManager {
  private boardMap = new Map<Id, HTMLCanvasElement>();
  private printingType = PrintingType.PEN;
  constructor() {
    document.querySelectorAll('button').forEach(button => {
      button.onclick = () => {
        this.changePrinting(button.id as PrintingType);
      }
    });
  }
  changePrinting(newPrintingType: PrintingType) {
    this.printingType = newPrintingType;
  }
  delate(id: Id) {
    if (this.boardMap.has(id)) {
      this.boardMap.get(id)?.remove();
      this.boardMap.delete(id);
    }
  }
  create(e: MouseEvent): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const id = crypto.randomUUID();
    canvas.className = 'drawing-board';
    canvas.id = id;
    const lineType = {
      lineColor: (document.querySelector('#color') as HTMLInputElement).value,
      lineWidth: Number((document.querySelector('#width') as HTMLInputElement).value),
    };
    ShapeFactory.getInitCanvasFn(this.printingType)(canvas, lineType, e);
    this.boardMap.set(id, canvas);
    return canvas;
  }
}
export default DrawingBoardManager;