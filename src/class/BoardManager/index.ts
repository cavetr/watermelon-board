import PrintingBoard from "@class/PrintingBoard";
import { ST, PenType, PrintingType } from "@type/const";
import DrawingBoardManager from "@class/DrawingBoardManager";
import { getClientPosition } from "@utils/dom";
import { toolConfig } from "@utils/const";
import { Socket } from "socket.io-client";

type IApi = IDeleteApi | IAddApi | IMoveApi;
type IOption = IAddOption | IDeleteOption | IMoveOption;
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
  private printingButton: HTMLButtonElement | null = null;
  constructor({ version, data }: IInitApi, dom: HTMLElement, ws: Socket<ServerToClientEvents, ClientToServerEvents>, lock: boolean) {
    const boardBox = document.createElement('div');
    boardBox.className = 'board';
    dom.appendChild(boardBox);
    const printingBoard = document.createElement('canvas');
    boardBox.appendChild(printingBoard);
    this.printingBoard = new PrintingBoard(printingBoard, data.data.width, data.data.height);
    this.version = version;
    const initData = data.data.printingList;
    for (const printing of initData) {
      this.printingBoard.addShape(printing);
    }
    this.printingBoard.reDraw();
    const drawingBoardManager = new DrawingBoardManager();
    if (!lock) {
      const buttonBox = document.createElement('div');
      buttonBox.className = 'button-box';
      for (const tool of toolConfig) {
        const el = document.createElement('button');
        el.innerHTML += tool.title;
        el.className = 'shape-type-button';
        if (tool.type === PenType.PEN) {
          el.className += ' active';
          this.printingButton = el;
        }
        el.addEventListener('click', e => {
          if (this.printingButton) {
            this.printingButton.className = 'shape-type-button';
          }
          this.changePrinting(tool.type);
          this.printingButton = el;
          el.className = 'shape-type-button active';
        });
        buttonBox.appendChild(el);
      }
      const colorInput = document.createElement('input');
      colorInput.type = 'color';
      const lineWidthInput = document.createElement('input');
      colorInput.className = 'shape-style-input';
      lineWidthInput.className = 'shape-style-input';
      lineWidthInput.type = 'number';
      lineWidthInput.value = '1';
      lineWidthInput.addEventListener('change', (e) => {
        const target = (e.target as typeof lineWidthInput);
        target.value = String(Math.max(Number(target.value), 1));
        target.value = String(Math.min(Number(target.value), 5));
      });
      buttonBox.appendChild(colorInput);
      buttonBox.appendChild(lineWidthInput);
      dom.appendChild(buttonBox);
      boardBox.addEventListener('mousedown', e => {
        if (this.printingType === PenType.ERASER) {
          boardBox.onmousemove = ev => {
            const { offsetX, offsetY } = getClientPosition(boardBox);
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
            this.printingBoard.reDraw();
          };
          const drawOver = () => {
            boardBox.onmouseleave = null;
            boardBox.onmousemove = null;
            boardBox.onmouseup = null;
          };
          boardBox.onmouseup = drawOver;
          boardBox.onmouseleave = drawOver;
        } else if (this.printingType === PenType.DRAG) {
          const { offsetX, offsetY } = getClientPosition(boardBox);
          const [id] = this.printingBoard.selectShapeWithPosition([Math.round(e.clientX - offsetX), Math.round(e.clientY - offsetY)]);
          const shape = this.printingBoard.getShape(id);
          if (shape) {
            let lastPoint = [e.clientX, e.clientY];
            boardBox.onmousemove = ev => {
              shape.addMove(ev.clientX - lastPoint[0], ev.clientY - lastPoint[1]);
              lastPoint = [ev.clientX, ev.clientY];
              this.printingBoard.reDraw(true);
            }
            const drawOver = () => {
              const value = shape.value();
              if (value) {
                const { moveX, moveY } = value;
                ws.emit(ST.MOVE, {
                  version: this.version,
                  data: {
                    type: ST.MOVE,
                    data: {
                      id,
                      moveX,
                      moveY,
                    }
                  }
                });
              }
              boardBox.onmouseleave = null;
              boardBox.onmousemove = null;
              boardBox.onmouseup = null;
            };
            boardBox.onmouseup = drawOver;
            boardBox.onmouseleave = drawOver;
          }
        } else {
          boardBox.appendChild(
            drawingBoardManager.create(
              boardBox,
              e,
              penTypeToPrintingType(this.printingType),
              Number(lineWidthInput.value),
              colorInput.value,
              data.data.width,
              data.data.height));
        }
      });
    }
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
          case ST.MOVE:
            this.printingBoard.moveShape(opt.data.id, opt.data.moveX, opt.data.moveY);
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