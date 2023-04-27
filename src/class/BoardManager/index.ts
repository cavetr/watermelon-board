import PrintingBoard from "@class/PrintingBoard";
import { ST, PenType, PrintingType } from "@type/const";
import DrawingBoardManager from "@class/DrawingBoardManager";
import { getClientPosition } from "@utils/dom";
import { toolConfig } from "@utils/const";
import ws from "@utils/serve";
type IApi = IDeleteApi | IAddApi;
type IOption = IAddOption | IDeleteOption;
const penTypeToPrintingType = (penType: PenType): PrintingType => {
  switch (penType) {
    case PenType.PEN:
      return PrintingType.PEN;
    case PenType.CIRCLE:
      return PrintingType.CIRCLE;
    case PenType.RECTANGLE:
      return PrintingType.RECTANGLE;
    case PenType.TEXT:
      return PrintingType.TEXT;
    default:
      throw 'err';
  }
};
class BoardManager {
  private printingBoard: PrintingBoard;
  private version: Version;
  private waitOptMap = new Map<Version, IOption>();
  private printingType = PenType.PEN;
  constructor({ version, data }: IInitApi, dom: HTMLElement) {
    const drawingBoardManager = new DrawingBoardManager();
    dom.addEventListener('mousedown', e => {
      if (this.printingType === PenType.ERASER) {
        dom.onmousemove = ev => {
          const { offsetX, offsetY } = getClientPosition(dom);
          for (const id of this.printingBoard.selectShapeWithPosition([Math.round(ev.clientX - offsetX), Math.round(ev.clientY - offsetY)])) {
            this.printingBoard.deleteShape(id);
            ws.emit(ST.DELETE, {
              version: this.version,
              data: {
                type: ST.DELETE,
                data: {
                  id,
                }
              }
            });
          }
        };
        dom.onmouseup = () => {
          dom.onmouseleave = null;
          dom.onmousemove = null;
          dom.onmouseup = null;
        }
        dom.onmouseleave = () => {
          dom.onmouseleave = null;
          dom.onmousemove = null;
          dom.onmouseup = null;
        }
      } else {
        dom.appendChild(drawingBoardManager.create(dom, e, penTypeToPrintingType(this.printingType)));
      }
    });
    for (const tool of toolConfig) {
      const el = document.createElement('button');
      el.textContent = tool.title;
      el.addEventListener('click', () => {
        this.changePrinting(tool.type);
      })
      document.getElementById('root')?.appendChild(el);
    }
    const printingBoard = document.createElement('canvas');
    dom.appendChild(printingBoard);
    this.printingBoard = new PrintingBoard(printingBoard);
    this.version = version;
    const initData = data.data.printingList;
    for (const printing of initData) {
      this.printingBoard.addShape(printing);
    }
    this.printingBoard.reDraw();
  }
  addOption({ version, data: opt }: IApi) {
    console.log(opt);
    this.waitOptMap.set(version, opt);
    this.tryDoWaitOpt();
  }
  getVersion(): Version {
    return this.version;
  }
  private changePrinting(newPrintingType: PenType) {
    this.printingType = newPrintingType;
  }
  private tryDoWaitOpt() {
    const nextVersion = this.version + 1;
    if (this.waitOptMap.has(nextVersion)) {
      const opt = this.waitOptMap.get(nextVersion);
      if (opt) {
        switch (opt.type) {
          case ST.ADD:
            this.printingBoard.addShape(opt.data.printing);
            break;
          case ST.DELETE:
            this.printingBoard.deleteShape(opt.data.id);
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
export default BoardManager;