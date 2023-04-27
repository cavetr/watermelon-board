import Shape from ".";
import { PrintingType } from "@type/const";

class Circle extends Shape {
  constructor(
    lineType: PrintingLineType,
    private beginPositionX: number,
    private beginPositionY: number,
    private endPositionX: number,
    private endPositionY: number,
  ) {
    super(lineType.lineWidth, lineType.lineColor);
  }
  static from(
    lineType: PrintingLineType,
    data: ICircleData
  ): Circle {
    return new Circle(
      lineType,
      data.beginPositionX,
      data.beginPositionY,
      data.endPositionX,
      data.endPositionY,
    );
  }
  addPath(board: CanvasRenderingContext2D, nextPoint: Point): void {
    board.clearRect(0, 0, board.canvas.width, board.canvas.height);
    this.endPositionX = nextPoint[0];
    this.endPositionY = nextPoint[1];
    this.draw(board);
  }
  reset({
    beginPositionX,
    beginPositionY,
    endPositionX,
    endPositionY,
  } = this): this {
    this.beginPositionX = beginPositionX;
    this.beginPositionY = beginPositionY;
    this.endPositionX = endPositionX;
    this.endPositionY = endPositionY;
    return this;
  }
  _draw(board: CanvasRenderingContext2D): void {
    board.beginPath();
    board.ellipse(
      (this.endPositionX + this.beginPositionX) / 2,
      (this.endPositionY + this.beginPositionY) / 2,
      Math.abs(this.endPositionX - this.beginPositionX) / 2,
      Math.abs(this.endPositionY - this.beginPositionY) / 2,
      0,
      0,
      Math.PI * 2,
    );
    board.closePath();
    board.stroke();
  }
  _value(): ICirclePrintingData {
    return {
      type: PrintingType.CIRCLE,
      data: {
        beginPositionX: this.beginPositionX,
        beginPositionY: this.beginPositionY,
        endPositionX: this.endPositionX,
        endPositionY: this.endPositionY,
      },
    };
  }
}
export default Circle;