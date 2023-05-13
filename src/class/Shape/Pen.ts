import Shape from ".";
import { PrintingType } from "@type/const";
class Pen extends Shape {
  constructor(
    lineType: PrintingLineType,
    private pointList: Point[] = [],
    moveX = 0,
    moveY = 0,
  ) {
    super(lineType.lineWidth, lineType.lineColor, moveX, moveY);
  }
  addPath(board: CanvasRenderingContext2D, nextPoint: Point): void {
    board.clearRect(0, 0, board.canvas.width, board.canvas.height);
    this.pointList.push(nextPoint);
    if (this.pointList.length === 1) {
      this.pointList.push(nextPoint);
    }
    this.draw(board);
  }
  reset(): this {
    return this;
  }
  _value(): IPenPrintingData | null {
    return this.pointList.length > 3 ? ({
      type: PrintingType.PEN,
      data: {
        pointList: this.pointList,
      },
    }) : null;
  }
  static from(
    lineType: PrintingLineType,
    data: IPenData,
    moveX: number,
    moveY: number,
  ): Pen {
    return new Pen(lineType, data.pointList, moveX, moveY);
  }
  _draw(board: CanvasRenderingContext2D): void {
    const data = this.pointList;
    board.beginPath();
    let beginPoint = data[0];
    for (let i = 1; i < data.length - 1; i++) {
      const controlPoint: Point = data[i];
      const endPoint: Point = [
        (data[i + 1][0] + data[i][0]) / 2,
        (data[i + 1][1] + data[i][1]) / 2,
      ];
      board.moveTo(...beginPoint);
      board.quadraticCurveTo(...controlPoint, ...endPoint);
      beginPoint = endPoint; 
    }
    board.moveTo(...beginPoint);
    board.quadraticCurveTo(...data[data.length - 1], ...data[data.length - 2]);
    board.stroke();
    board.closePath();
  }
}
export default Pen;