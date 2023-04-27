import { PrintingType } from "@type/const";
import Circle from "./Circle";
import Pen from "./Pen";
import Rectangle from "./Rectangle";
import Text from "./Text";
import Shape from ".";
import pipe from "@utils/pipe";
import { getClientPosition, getContextFromCanvas } from "@utils/dom";
type initFn = (canvas: HTMLCanvasElement, dom: HTMLElement, shape: Shape) => void;
function initTextBoard(canvas: HTMLCanvasElement, dom: HTMLElement, shape: Shape) {
  canvas.onmouseup = e => {
    const { offsetX, offsetY } = getClientPosition(dom);
    const positionX = Math.round(e.clientX - (offsetX));
    const positionY = Math.round(e.clientY - (offsetY));
    const inputEl = document.createElement('input');
    inputEl.className = 'text-input';
    inputEl.style.top = positionY + 'px';
    inputEl.style.left = positionX + 'px';
    dom.appendChild(inputEl);
    inputEl.focus();
    inputEl.onblur = () => {
      shape.reset(inputEl.value).draw(getContextFromCanvas(canvas));
      pipe.emit('draw', {
        boardId: canvas.id,
        shapeId: '1',
        data: shape.value(),
      });
      inputEl.remove();
    }
  }
}

function getInitOtherBoardFn(canvas: HTMLCanvasElement, dom: HTMLElement, shape: Shape) {
  const { offsetX, offsetY } = getClientPosition(dom);
  const ctx = getContextFromCanvas(canvas);
  canvas.onmousemove = function (ev) {
    shape.addPath(ctx, [
      Math.round(ev.clientX - offsetX),
      Math.round(ev.clientY - offsetY)
    ]);
  };
  canvas.onmouseleave = drawOver;
  canvas.onmouseup = drawOver;
  function drawOver() {
    canvas.onmousemove = null;
    canvas.onmouseup = null;
    canvas.onmouseleave = null;
    pipe.emit('draw', {
      boardId: canvas.id,
      shapeId: '1',
      data: shape.value(),
    })
  }
}
class ShapeFactory {
  static getInitCanvasFn(type: PrintingType): initFn {
    if (type === PrintingType.TEXT) {
      return initTextBoard;
    } else {
      return getInitOtherBoardFn;
    }
  }
  static getShapeFromPoint(type: PrintingType, lineType: PrintingLineType, point: Point): Shape {
    switch (type) {
      case PrintingType.PEN:
        return new Pen(lineType, [point]);
      case PrintingType.CIRCLE:
        return new Circle(lineType, point[0], point[1], point[0], point[1]);
      case PrintingType.TEXT:
        return new Text(lineType, '', point[0], point[1]);
      case PrintingType.RECTANGLE:
        return new Rectangle(lineType, point[0], point[1], point[0], point[1]);
      default:
        throw '什么东西？？';
    }
  }
  static getShape({
    lineWidth,
    lineColor,
    data,
    type
  }: IPrintingData): Shape {
    const lineType: PrintingLineType = {
      lineColor,
      lineWidth,
    }
    switch (type) {
      case PrintingType.PEN:
        return Pen.from(lineType, data);
      case PrintingType.CIRCLE:
        return Circle.from(lineType, data);
      case PrintingType.TEXT:
        return Text.from(lineType, data);
      case PrintingType.RECTANGLE:
        return Rectangle.from(lineType, data);
      default:
        throw '什么东西？？';
    }
  }
}

export default ShapeFactory;
