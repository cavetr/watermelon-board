import Shape from ".";
import { PrintingType } from "@type/const";
class Pen extends Shape {
  constructor(
    lineType: PrintingLineType,
    private pointList: Point[] = [],
  ) {
    super(lineType.lineWidth, lineType.lineColor);
  }

  addPath(board: CanvasRenderingContext2D, nextPoint: Point): void {
    this.pointList.push(nextPoint);
    if (this.pointList.length === 1) {
      this.pointList.push([nextPoint[0], nextPoint[1]]);
    }
    this.draw(board);
  }
  reset(): this {
    return this;
  }
  _value(): IPenPrintingData {
    return {
      type: PrintingType.PEN,
      data: {
        pointList: this.pointList,
      },
    }
  }
  static from(
    lineType: PrintingLineType,
    data: IPenData
  ): Pen {
    return new Pen(lineType, data.pointList);
  }
  _draw(board: CanvasRenderingContext2D): void {
    const data = this.pointList;
    board.beginPath();
    let prePoint = data[0];
    for (let i = 0; i < data.length; i++) {
      const nextPoint = data[i];
      board.moveTo(...prePoint);
      board.lineTo(...nextPoint);
      prePoint = nextPoint;
    }
    board.closePath();
    board.stroke();
  }
}
export default Pen;