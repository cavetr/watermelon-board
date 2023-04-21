import Shape from ".";
import { PrintingType } from "@type/const";
class Pen extends Shape {
  constructor(
    private pointList: Point[] = [],
  ) {
    super();
  }
  draw(board: CanvasRenderingContext2D): void {
    Pen.draw(board, this.pointList);
  }
  addPath(board: CanvasRenderingContext2D, nextPoint: Point): void {
    this.pointList.push(nextPoint);
    console.log(nextPoint);
    const prePoint = this.pointList.length === 1 ? nextPoint : this.pointList[this.pointList.length - 2];
    Pen.draw(board, [prePoint, nextPoint]);
  }
  reset(): this {
    return this;
  }
  value(): IPenPrintingData {
    return {
      type: PrintingType.PEN,
      data: {
        pointList: this.pointList,
      },
    }
  }
  static from(data: IPenData): Pen {
    return new Pen(data.pointList);
  }
  static draw(board: CanvasRenderingContext2D, data: Point[]): void {
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