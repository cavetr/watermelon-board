import DrawingBoardManager from '@class/DrawingBoardManager/index';
import ws from '@utils/serve';
import pipe from '@utils/pipe';
import { PrintingType, ST } from '@type/const';
import BoardManager from '@class/BoardManager';

function init() {
  ws.once(ST.INIT, initData => {
    const boardDiv = document.getElementById('board');
    if (boardDiv) {
      console.log(initData);
      const boardManager = new BoardManager(initData);
      ws.on(ST.ADD, data => {
        console.log(data, boardManager.getVersion());
        boardManager.addOption(data);
      });
      ws.on(ST.DELETE, data => {
        boardManager.addOption(data);
      });
      pipe.on('draw', data => {
        ws.emit(ST.ADD, {
          version: boardManager.getVersion(),
          data: {
            data: {
              printing: data,
            },
            type: ST.ADD,
          }
        })
      });
    }
  });
}
function initWs() {
  ws.on('connect', init);
  ws.on('connect_error', (err) => {
    console.log(err);
  })
}
initWs();
