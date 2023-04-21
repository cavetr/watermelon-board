import { PrintingType } from "@type/const";
import pipe from "@utils/pipe";
import DrawingBoard from ".";
class Text extends DrawingBoard {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    canvas.onmouseup = e => {
      const positionX = e.clientX - this.offsetX;
      const positionY = e.clientY - this.offsetY;
      const inputEl = document.createElement('input');
      inputEl.className = 'text-input';
      inputEl.style.top = positionY + 'px';
      inputEl.style.left = positionX + 'px';
      document.getElementById('board')?.appendChild(inputEl);
      inputEl.focus();
      inputEl.onblur = () => {
        canvas.getContext('2d')?.fillText(inputEl.value, positionX, positionY);
        pipe.emit('draw', {
          boardId: canvas.id,
          shapeId: '1',
          data: {
            lineWidth: 1,
            lineColor: 1,
            type: PrintingType.TEXT,
            data: {
              text: inputEl.value,
              positionX,
              positionY,
            }
          }
        })
        inputEl.remove();
      }
    }
  }
}
export default Text;