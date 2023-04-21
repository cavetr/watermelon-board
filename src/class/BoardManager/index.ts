import DrawingBoardManager from "@class/DrawingBoardManager";
import PrintingBoard from "@class/PrintingBoard";
import { ST } from "@type/const";
import { IAddApi, IAddOption, IDeleteApi, IDeleteOption, IInitApi } from "@type/option";
import pipe from "@utils/pipe";
type IApi = IDeleteApi | IAddApi;
type IOption = IAddOption | IDeleteOption;
class BoardManager {
  private drawingBoard;
  private printingBoard;
  private version: Version;
  private waitOptMap = new Map<Version, IOption>();
  constructor({ version, data }: IInitApi) {
    this.drawingBoard = new DrawingBoardManager();
    this.printingBoard = new PrintingBoard(document.getElementById('printing-board') as HTMLCanvasElement);
    const boardDiv = document.getElementById('board') as HTMLDivElement;
    boardDiv.addEventListener('mousedown', e => {
      boardDiv.appendChild(this.drawingBoard.create(e));
    });
    pipe.on('printing', id => {
      this.drawingBoard.delate(id);
    });
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