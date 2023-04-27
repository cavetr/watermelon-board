import ws from '@utils/serve';
import pipe from '@utils/pipe';
import { ST } from '@type/const';
import BoardManager from '@class/BoardManager';

function init(dom: HTMLElement) {
  ws.once(ST.INIT, initData => {
    console.log(initData);
    const boardManager = new BoardManager(initData, dom);
    
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
  });
}
function initWs(dom: HTMLElement) {
  ws.on('connect', () => {
    init(dom);
  });
  ws.on('connect_error', (err) => {
    console.log(err);
  })
}
initWs(document.getElementById('board') as HTMLElement);
