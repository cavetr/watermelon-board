import LinkList from '@class/LinkList/index';
import Shape from '@class/Shape';
import ShapeFactory from '@class/Shape/ShapeFactory';
import { getContextFromCanvas } from '@utils/dom';
import pipe from '@utils/pipe';
const reDrawTime = 1000;
const selectRange = 8;
function getColorFromFirstIndex(data: Uint8ClampedArray, index: number) {
  let color = '';
  if (index >= 0 && index < data.length) {
    // color += '#';
    for (let i = 0; i < 3; i++) {
      color += (data[index + i] < 16 ? '0' : '') + data[index + i].toString(16);
    }
    color = (Math.round(parseInt(color, 16) / 16) * 16).toString(16);
    color = '#' + '0'.repeat(6 - color.length) + color;
  }
  return color;
}
class PrintingBoard{
  private randColor = 0;
  private selectionCtx: CanvasRenderingContext2D;
  private selectionShapeIdMap = new Map<string, Id>();
  private shapeList: LinkList<Id, Shape> = new LinkList();
  private printingCtx: CanvasRenderingContext2D;
  private reDrawTimeOutId: number | undefined;
  private shapeIdToBoardIdMap: Map<Id, Id> = new Map();
  private isChange: boolean = true;
  readonly width: number;
  readonly height: number;
  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    const _canvas = document.createElement('canvas');
    _canvas.style.width = canvas.style.width;
    _canvas.style.height = canvas.style.height;
    this.selectionCtx = getContextFromCanvas(_canvas, width, height);
    this.selectionCtx.imageSmoothingEnabled = false;
    this.printingCtx = getContextFromCanvas(canvas, width, height);
    this.width = canvas.width;
    this.height = canvas.height;
  }
  addShape(printing: IPrinting) {
    this.isChange = true;
    this.shapeIdToBoardIdMap.set(printing.shapeId, printing.boardId);
    this.shapeList.addNode(printing.shapeId, ShapeFactory.getShape(printing.data));
  }
  deleteShape(id: Id) {
    this.isChange = true;
    this.shapeList.deleteNode(id);
  }
  moveShape(id: Id, moveX: number, moveY: number) {
    this.isChange = true;
    const shape = this.shapeList.getNodeValFromId(id);
    shape?.setMove(moveX, moveY);
  }
  getShape(id: Id) {
    return this.shapeList.getNodeValFromId(id);
  }
  reDraw(must = false) {
    if (this.reDrawTimeOutId !== void 0) {
      clearTimeout(this.reDrawTimeOutId);
      this.reDrawTimeOutId = void 0;
    }
    if (must || this.isChange) {
      this.selectionShapeIdMap.clear();
      this.selectionCtx.clearRect(0, 0, this.width, this.height);
      this.printingCtx.clearRect(0, 0, this.width, this.height);
      console.log('redraw');
      this.shapeList.forEach((id, printing) => {
        // 图形绘制逻辑
        const boardId = this.shapeIdToBoardIdMap.get(id);
        this.shapeIdToBoardIdMap.delete(id);
        if (boardId) {
          // 删除逻辑
          pipe.emit('printing', boardId);
        }
        const randColor = this.getRandColor();
        // console.log(randColor);
        // console.log(randColor);
        this.selectionShapeIdMap.set(randColor, id);
        printing.draw(this.selectionCtx, {
          strokeStyle: randColor,
          fillStyle: randColor,
        });
        printing.draw(this.printingCtx);
      });
      this.isChange = false;
    }
    this.reDrawTimeOutId = setTimeout(() => {
      this.reDraw();
    }, reDrawTime);
  }
  selectShapeWithPosition(point: Point, onlyFirst = false): Id[] {
    const dpr = window.devicePixelRatio;
    const range = (selectRange / 2);
    const selectShapeIdList: Set<Id> = new Set();
    const left = Math.max(point[0] * dpr - range, 0);
    const top = Math.max(point[1] * dpr - range, 0);
    const right = Math.min(point[0] * dpr + range, this.width);
    const bottom = Math.min(point[1] * dpr + range, this.height);
    const imageData = this.selectionCtx.getImageData(left, top, right - left + 1, bottom - top + 1).data;
    for (let i = 0; i <= range; i++) {
      let beginRow = range - i;
      let beginCol = range - i;
      let endRow = range + i;
      let endCol = range + i;
      for (let j = 0; j < i * 2 + 1; j++) {
        const colorList = [
          getColorFromFirstIndex(imageData, ((beginRow + j) * (right - left + 1) + beginCol) * 4),
          getColorFromFirstIndex(imageData, (beginRow * (right - left + 1) + beginCol + j) * 4),
          getColorFromFirstIndex(imageData, ((beginRow + j) * (right - left + 1) + endCol) * 4),
          getColorFromFirstIndex(imageData, (endRow * (right - left + 1) + beginCol + j) * 4),
        ];
        for (const color of colorList) {
          if (this.selectionShapeIdMap.has(color)) {
            const id = this.selectionShapeIdMap.get(color) as string;
            if(onlyFirst) {
              return [id];
            }
            selectShapeIdList.add(id);
          }
        }
      }
    }
    // const newCTX = getContextFromCanvas(document.getElementById('test') as HTMLCanvasElement);
    // newCTX.imageSmoothingEnabled = false;
    // newCTX.drawImage(this.selectionCtx.canvas,
    //   Math.abs(point[0] * window.devicePixelRatio - 5),
    //   Math.abs(point[1] * window.devicePixelRatio - 5),
    //   10, 10,
    //   0, 0,
    //   50, 50);
    return [...selectShapeIdList];
  }
  private getRandColor(): string {
    this.randColor = Math.max(16, (this.randColor + 16) % 0xffffff);
    let colorString = this.randColor.toString(16);
    colorString = '0'.repeat(6 - colorString.length) + colorString;
    return `#${colorString}`;
  }
}
export default PrintingBoard;