import Pen from '../Shape/Pen';
import { getDrawFn } from '../../utils/printing';
import Server from '../Server';
import Shape from '../Shape';
class PrintingBoard {
  constructor(canvas: HTMLCanvasElement, ws: Server) {
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let shape: Shape;
    canvas.onmousedown = (e) => {
      let last = [e.x, e.y];
      shape = new Pen([[e.x, e.y]]);
      const drawFn = getDrawFn();
      canvas.onmousemove = (e) => {
        shape.addPoint([e.x, e.y]);
        drawFn(ctx, last[0], last[1], e.x, e.y);
        last = [e.x, e.y];
      }
    }
    canvas.onmouseout = () => {
      //清空，然后发送
      ws.send(JSON.stringify(shape));
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.onmousemove = null;
    }
    canvas.onmouseup = canvas.onmouseout;
  }
}
export default PrintingBoard;