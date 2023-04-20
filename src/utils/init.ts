import DrawingBoardManager from '@class/DrawingBoardManager/index';
import PrintingBoard from '@class/PrintingBoard/index';
import ws from '@utils/serve';
import pipe from '@utils/pipe';
import { PrintingType, ST } from '@type/const';

let board: PrintingBoard;



function init() {
  const boardDiv = document.getElementById('board');
  const printingBoard = document.getElementById('printing-board');
  if (boardDiv && printingBoard) {
    // const { left: offsetX, top: offsetY } = boardDiv.getBoundingClientRect();
    const drawingBoard = new DrawingBoardManager();
    document.querySelectorAll('button').forEach(button => {
      button.onclick = () => {
        drawingBoard.changePrinting(button.id as PrintingType);
      }
    })
    board = new PrintingBoard(printingBoard as HTMLCanvasElement);
    boardDiv.addEventListener('mousedown', () => {
      boardDiv.appendChild(drawingBoard.create());
    });
    pipe.on('printing', id => {
      drawingBoard.delate(id);
    });
    ws.on(ST.INIT, data => {
      console.log(data);
      board.init(data);
    });
    ws.on(ST.ADD, data => {
      board.addOption(data);
    });
    ws.on(ST.DELETE, data => {
      board.addOption(data);
    });
  }
}
function initWs() {
  ws.on('connect', init);
  ws.on('connect_error', (err) => {
    console.log(err);
  })
}
initWs();
