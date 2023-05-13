
import pipe from '@utils/pipe';
import { ST } from '@type/const';
import BoardManager from '@class/BoardManager';
import { io, Socket } from "socket.io-client";


export function initWs(dom: HTMLElement, boardId: Id, key: string, lock: boolean) {
  const IP = `ws://localhost:4000/${boardId}?isd=1&&key=${key}`;
  const ws: Socket<ServerToClientEvents, ClientToServerEvents> = io(IP);
  ws.on('connect', () => {
    ws.once(ST.INIT, initData => {
      console.log(initData);
      const boardManager = new BoardManager(initData, dom, ws, lock);
      ws.on(ST.ADD, data => {
        boardManager.addOption(data);
      });
      ws.on(ST.DELETE, data => {
        boardManager.addOption(data);
      });
      ws.on(ST.MOVE, data => {
        boardManager.addOption(data);
      })
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
  });
  ws.on('connect_error', (err) => {
    console.log(err);
  })
}
