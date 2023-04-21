import { PrintingType } from "@type/const";
import Text from "@class/Shape/Text";
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
    ShapeFactory.getInitCanvasFn(this.printingType)(canvas, e);
    this.boardMap.set(id, canvas);
    return canvas;
  }
}
export default DrawingBoardManager;