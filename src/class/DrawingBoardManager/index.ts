import DrawingBoard from "@class/DrawingBoardManager/DrawingBoard/index";
import Pen from "@class/DrawingBoardManager/DrawingBoard/Pen";
import Text from '@class/DrawingBoardManager/DrawingBoard/Text';
import Circle from "@class/DrawingBoardManager/DrawingBoard/Circle";
import Rectangle from "@class/DrawingBoardManager/DrawingBoard/Rectangle";
import { PrintingType } from "@type/const";

class DrawingBoardManager {
  private boards = new Map<Id, DrawingBoard>();
  private printingType = PrintingType.PEN;
  // private 
  constructor() { }
  changePrinting(newPrintingType: PrintingType) {
    this.printingType = newPrintingType;
  }
  delate(id: Id) {
    if (this.boards.has(id)) {
      this.boards.get(id)?.destroy();
      this.boards.delete(id);
    }
  }
  create(): HTMLCanvasElement {
    const newId = crypto.randomUUID();
    const newCanvas = document.createElement('canvas');
    newCanvas.className = 'drawing-board';
    newCanvas.id = newId;
    this.boards.set(newId, new (this.createNewPrinting())(newCanvas));
    return newCanvas;
  }
  private createNewPrinting(): typeof DrawingBoard {
    switch (this.printingType) {
      case PrintingType.PEN:
        return Pen;
      case PrintingType.CIRCLE:
        return Circle;
      case PrintingType.TEXT:
        return Text;
      case PrintingType.RECTANGLE:
        return Rectangle;
      default:
        return DrawingBoard;
    }
  }
}
export default DrawingBoardManager;