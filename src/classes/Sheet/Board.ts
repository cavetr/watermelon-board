import LinkList from '../LinkList';
import Shape from '../Shape';
import Pen from '../Shape/Pen';


type IdType = number;

const isDrawApi = (opt: optType): opt is IDrawApi => 'pictureData' in opt;
const createNewShape = (draw: IDrawType): Shape => {
  return new Pen();
}
class Board {
  private shapeList: LinkList<Shape, IdType> = new LinkList();
  private ctx: CanvasRenderingContext2D;
  private height: number;
  private width: number;
  constructor(
    canvas: HTMLCanvasElement,
    private isReadOnly: boolean
  ) {
    this.height = canvas.height;
    this.width = canvas.width;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }
  addOption(opt: IApi) {
    if(opt.st === ST.draw) {
      const data = opt.data as IDrawApi;
      this.addShape(data.serverVersion, createNewShape(data.pictureData));
    } else {
      const data = opt.data as IDeleteApi;
      this.deleteShape(data.deleteVersion);
    }
  }
  private addShape(id: IdType, shape: Shape) {
    this.shapeList.addNode(id, shape);
  }
  private deleteShape(id: IdType) {
    this.shapeList.deleteNode(id);
  }
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.shapeList.forEach((_, shape) => {
      shape.val.draw(this.ctx);
    });
    this.ctx.stroke();
  }
  changeReadOnly(readOnly: boolean = this.isReadOnly) {
    this.isReadOnly = readOnly;
  }
  getReadOnly() {
    return this.isReadOnly;
  }
}
export default Board;