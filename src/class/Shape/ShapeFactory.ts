import { PrintingType } from "@type/const";
import Circle from "./Circle";
import Pen from "./Pen";
import Rectangle from "./Rectangle";
import Text from "./Text";
import Shape from ".";
import pipe from "@utils/pipe";
type initFn = (canvas: HTMLCanvasElement, e: MouseEvent) => void;
function initTextBoard(canvas: HTMLCanvasElement) {
  canvas.onmouseup = e => {
    const { left: offsetX, top: offsetY } = document.getElementById('board')?.getBoundingClientRect() ?? { left: 0, top: 0 };
    const positionX = e.clientX - (offsetX);
    const positionY = e.clientY - (offsetY);
    const inputEl = document.createElement('input');
    inputEl.className = 'text-input';
    inputEl.style.top = positionY + 'px';
    inputEl.style.left = positionX + 'px';
    document.getElementById('board')?.appendChild(inputEl);
    inputEl.focus();
    inputEl.onblur = () => {
      canvas.getContext('2d')?.fillText(inputEl.value, positionX, positionY);
      pipe.emit('draw', {
        boardId: canvas.id,
        shapeId: '1',
        data: {
          lineWidth: 1,
          lineColor: 1,
          type: PrintingType.TEXT,
          data: {
            text: inputEl.value,
            positionX,
            positionY,
          }
        }
      });
      inputEl.remove();
    }
  }
}

function getInitOtherBoardFn(type: PrintingType): initFn {
  return function (canvas, e) {
    const { left: offsetX, top: offsetY } = document.getElementById('board')?.getBoundingClientRect() ?? { left: 0, top: 0 };
    const shape = ShapeFactory.getShapeFromPoint([e.clientX - offsetX, e.clientY - offsetY], type);
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.onmousemove = function (ev) { shape.addPath(ctx, [ev.clientX- offsetX, ev.clientY - offsetY]) };
    canvas.onmouseleave = drawOver;
    canvas.onmouseup = drawOver;
    function drawOver() {
      canvas.onmousemove = null;
      canvas.onmouseup = null;
      canvas.onmouseleave = null;
      pipe.emit('draw', {
        boardId: canvas.id,
        shapeId: '1',
        data: {
          lineWidth: 1,
          lineColor: 1,
          ...shape.value(),
        }
      })
    }
  }
}
class ShapeFactory {
  static getInitCanvasFn(type: PrintingType): initFn {
    if (type === PrintingType.TEXT) {
      return initTextBoard;
    } else {
      return getInitOtherBoardFn(type);
    }
  }
  static getShapeFromPoint(point: Point, type: PrintingType): Shape {
    switch (type) {
      case PrintingType.PEN:
        return new Pen([point]);
      case PrintingType.CIRCLE:
        return new Circle(point[0], point[1], point[0], point[1]);
      case PrintingType.TEXT:
        return new Text('', point[0], point[1]);
      case PrintingType.RECTANGLE:
        return new Rectangle(point[0], point[1], point[0], point[1]);
      default:
        throw '什么东西？？';
    }
  }
  static getShape({ data, type }: IPrintingData): Shape {
    switch (type) {
      case PrintingType.PEN:
        return Pen.from(data);
      case PrintingType.CIRCLE:
        return Circle.from(data);
      case PrintingType.TEXT:
        return Text.from(data);
      case PrintingType.RECTANGLE:
        return Rectangle.from(data);
      default:
        throw '什么东西？？';
    }
  }
}

export default ShapeFactory;
