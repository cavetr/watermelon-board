import LinkList from './LinkList';
import Shape from './Shape';
type IdType = number;
class Board {
  private shapeList: LinkList<Shape, IdType>;
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  constructor(canvas: HTMLCanvasElement) {
    this.shapeList = new LinkList<Shape, IdType>();
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }
  addShape(shape: Shape, id: IdType) {
    this.shapeList.addNode(shape, id);
  }
  deleteShape(id: IdType) {
    this.shapeList.deleteNode(id);
  }
  draw() {
    this.shapeList.forEach((_, shape) => {
      shape.val.draw(this.ctx);
    });
    this.ctx.stroke();
  }
}
export default Board;