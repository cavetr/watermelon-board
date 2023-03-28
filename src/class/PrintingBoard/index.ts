import LinkList from '@class/LinkList/index';
import { PrintingType, ST } from '@type/const';
import { IAddOption, IApi, IDeleteOption, IInitOption, IOption } from '@type/option';
import { IPrinting } from '@type/printing';
import pipe from '@utils/pipe';
import ws from '@utils/serve';
const reDrawTime = 1000;
class PrintingBoard {
  private shapeList: LinkList<IPrinting, Id> = new LinkList();
  private ctx: CanvasRenderingContext2D;
  private waitOptMap = new Map<Version, IOption>();
  private version: Version = -1;
  private reDrawTimeOutId: number | undefined;
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    pipe.on('draw', data => {
      ws.emit(ST.ADD, {
        version: this.version,
        data: {
          data,
          type: ST.ADD,
        }
      })
    });
  }
  private addShape(shape: IPrinting) {
    this.shapeList.addNode(shape.id, shape);
  }
  private deleteShape(id: Id) {
    this.shapeList.deleteNode(id);
    this.reDraw();
  }
  private reDraw() {
    if (this.reDrawTimeOutId !== void 0) {
      clearTimeout(this.reDrawTimeOutId);
      this.reDrawTimeOutId = void 0;
    }
    this.shapeList.forEach((id, printing) => {
      // 图形绘制逻辑
      switch (printing.data.type) {
        case PrintingType.PEN:
          break;
        case PrintingType.RECTANGLE:
          break;
        case PrintingType.CIRCLE:
          break;
        case PrintingType.TEXT:
          break;
      }
      // 删除逻辑
      pipe.emit('printing', id);
    });
    this.reDrawTimeOutId = setTimeout(() => {
      this.reDraw();
    }, reDrawTime);
  }
  init({ version, data }: IApi) {
    this.version = version;
    const initData = (data.data as IInitOption).printingList;
    for (const printing of initData) {
      this.addShape(printing);
    }
    this.reDraw();
  }
  addOption({ version, data: opt }: IApi) {
    this.waitOptMap.set(version, opt);
    this.tryDoWaitOpt();
  }
  private tryDoWaitOpt() {
    const nextVersion = this.version + 1;
    if (this.waitOptMap.has(nextVersion)) {
      const opt = this.waitOptMap.get(nextVersion);
      if (opt) {
        switch (opt.type) {
          case ST.ADD:
            this.addShape((opt.data as IAddOption).printing);
            break;
          case ST.DELETE:
            this.deleteShape((opt.data as IDeleteOption).id);
            break;
          default:
            throw '什么东西？？';
        }
      }
      this.version = nextVersion;
      this.waitOptMap.delete(nextVersion);
      this.tryDoWaitOpt();
    }
  }
}
export default PrintingBoard;