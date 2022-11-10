import Shape from './Shape';
import { getDrawFn } from '../utils/printing';
class PrintingBoard {
  constructor(canvas: HTMLCanvasElement) {
    const shape = new Shape([]);
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.onmousedown = (e) => {
      let last = [e.x, e.y];
      shape.addPoint([e.x, e.y]);
      const drawFn = getDrawFn();
      canvas.onmousemove = (e) => {
        shape.addPoint([e.x, e.y]);
        drawFn(ctx, last[0], last[1], e.x, e.y);
        console.log(shape);
        last = [e.x, e.y];
      }
    }
    canvas.onmouseout = () => {
      //清空，然后发送
      console.log(shape);
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      canvas.onmousemove = null;
    }
    canvas.onmouseup = canvas.onmouseout;
  }
}
export default PrintingBoard;