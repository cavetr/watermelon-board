import Shape from ".";
import { PrintingType } from "@type/const";
class Pen extends Shape {
  constructor(
    lineType: PrintingLineType,
    private pointList: Point[] = [],
  ) {
    super(lineType.lineWidth, lineType.lineColor);
  }
  draw(board: CanvasRenderingContext2D): void {
    Pen.draw(board, this.pointList, this);
  }
  addPath(board: CanvasRenderingContext2D, nextPoint: Point): void {
    this.pointList.push(nextPoint);
    const prePoint = this.pointList.length === 1 ? nextPoint : this.pointList[this.pointList.length - 2];
    Pen.draw(board, [prePoint, nextPoint], this);
  }
  reset(): this {
    return this;
  }
  value(): IPrintingData<IPenPrintingData> {
    return {
      ...super.lineValue(),
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
  static draw(board: CanvasRenderingContext2D, data: Point[], shape: Pen): void {
    board.beginPath();
    board.strokeStyle = shape.lineColor;
    board.lineWidth = shape.lineWidth;
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