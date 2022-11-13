import Board from "./Board";
import PrintingBoard from "./PrintingBoard";
import Server from "../Server";

const settingCanvas = (canvas: HTMLCanvasElement) => {
  canvas.height = 1000;
  canvas.width = 1000;
}
class Sheet {
  sheetMap: any;
  private nowBoard: Board;
  private readonly: boolean;
  private waitOptMap: Map<number, IApi> = new Map();
  private sheetBoardMap: Map<number, Board> = new Map();
  private serverVersion: number = 0;
  constructor(
    private ws: Server,
    private boardCanvas: HTMLCanvasElement,
    printingCanvas: HTMLCanvasElement,
    { serverVersion, boardList }: IConnectApi,
  ) {
    settingCanvas(boardCanvas);
    settingCanvas(printingCanvas);
    new PrintingBoard(printingCanvas, ws);
    for (const { sheetId, isReadOnly } of boardList) {
      const newBoard = new Board(boardCanvas, Boolean(isReadOnly));
      this.sheetBoardMap.set(sheetId, newBoard);
    }
    this.serverVersion = serverVersion;
    this.nowBoard = this.sheetBoardMap.get(boardList[0].sheetId) as Board;
    this.readonly = Boolean(boardList[0].isReadOnly);
  }
  setNowBoard(sheetId: number) {
    if (this.sheetBoardMap.has(sheetId)) {
      this.nowBoard = this.sheetBoardMap.get(sheetId) as Board;
      this.readonly = this.nowBoard.getReadOnly();
    }
  }
  reDraw() {
    this.nowBoard.draw();
    setTimeout(() => {
      this.reDraw();
    }, 100);
  }
  addWaitOpt(opt: IApi) {
    this.waitOptMap.set(opt.data.serverVersion, opt);
    this.tryDoWaitOpt();
  }
  private tryDoWaitOpt() {
    const nextVersion = this.serverVersion + 1;
    if (this.waitOptMap.has(nextVersion)) {
      const opt = this.waitOptMap.get(nextVersion);
      if (opt) {
        const board = this.sheetBoardMap.get(opt.sheetId);
        switch(opt.st) {
          case ST.readOnly:
            board?.changeReadOnly(Boolean((opt.data as IReadOnlyApi).isReadOnly));
            break;
          case ST.sheet:
            this.changeSheet(opt.sheetId, Boolean((opt.data as ISheetApi).isCreate));
            break;
          default:
            board?.addOption(opt);
            break;
        }
      }
      this.serverVersion = nextVersion;
      this.tryDoWaitOpt();
    }
  }
  changeSheet(sheetId: number, isCreate: boolean) {
    if(isCreate) {
      this.sheetBoardMap.set(sheetId, new Board(this.boardCanvas, false), )
    } else {
      this.sheetBoardMap.delete(sheetId);
    }
  }
}
export default Sheet;