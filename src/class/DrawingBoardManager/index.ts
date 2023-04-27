import { PenType, PrintingType } from "@type/const";
import ShapeFactory from "@class/Shape/ShapeFactory";
import { getClientPosition, getLineType } from "@utils/dom";

import pipe from "@utils/pipe";
class DrawingBoardManager {
  private boardMap = new Map<Id, HTMLCanvasElement>();
  constructor() {
    pipe.on('printing', id => {
      this.delate(id);
    });
  }
  
  delate(id: Id) {
    if (this.boardMap.has(id)) {
      this.boardMap.get(id)?.remove();
      this.boardMap.delete(id);
    }
  }
  create(dom: HTMLElement, e: MouseEvent, type: PrintingType): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const id = crypto.randomUUID();
    canvas.className = 'drawing-board';
    canvas.id = id;
    const { offsetX, offsetY } = getClientPosition(dom);
    const shape = ShapeFactory.getShapeFromPoint(type, getLineType(), [Math.round(e.clientX - offsetX), Math.round(e.clientY - offsetY)]);
    ShapeFactory.getInitCanvasFn(type)(canvas, dom, shape);
    this.boardMap.set(id, canvas);
    return canvas;
  }
}
export default DrawingBoardManager;