import LinkList from './LinkList';
import Shape from './shape';
type IdType = number;
class Board {
  shapeList: LinkList<Shape, IdType>;
  constructor() {
    this.shapeList = new LinkList<Shape, IdType>();
  }
  addShape(shape: Shape, id: IdType) {
    this.shapeList.addNode(shape, id);
  }
  deleteShape(id: IdType) {
    this.shapeList.deleteNode(id);
  }
  draw() {
    this.shapeList.forEach((_, shape) => {
      shape.val.draw();
    })
  }
}
export default Board;