import LinkList from './LinkList';
import Shape from './Shape';
import { getDrawFn } from '../utils/printing';
type IdType = number;
class Board {
  private shapeList: LinkList<Shape, IdType>;
  private ctx: CanvasRenderingContext2D;
  private tlKey: number | void = void 0;
  constructor(canvas: HTMLCanvasElement) {
    this.shapeList = new LinkList<Shape, IdType>();
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.draw();
  }
  addShape(shape: Shape, id: IdType) {
    this.shapeList.addNode(shape, id);
  }
  deleteShape(id: IdType) {
    this.shapeList.deleteNode(id);
    if(this.tlKey) {
      clearTimeout(this.tlKey);
      this.tlKey = void 0;
      this.draw();
    }
  }
  private draw() {
    // console.log(this.shapeList);
    this.shapeList.forEach((_, shape) => {
      shape.val.draw(this.ctx);
    });
    this.ctx.stroke();
    this.tlKey = setTimeout(() => this.draw(), 100);
  }
}
export default Board;