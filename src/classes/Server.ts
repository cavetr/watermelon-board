const isSt = (st: any): st is ST => 0 <= st && st <= 5;
// 新用户加入需要的response => IApi.data
class Server extends WebSocket {
  private ws: WebSocket;
  constructor(url: string, fnMap: (data: IApi) => void) {
    super(url);
    this.ws = new WebSocket(url);
    this.ws.onopen = () => {
      console.log('connect');
    }
    this.ws.onmessage = e => {
      if (isSt(e.data.st)) {
        fnMap(e.data);
      } else {
        console.log('后端传的什么鬼东西？');
      }
    }
  }
}
export default Server;