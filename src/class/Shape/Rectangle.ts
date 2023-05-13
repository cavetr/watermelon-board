import Shape from ".";
import { PrintingType } from "@type/const";

class Rectangle extends Shape {
  constructor(
    lineType: PrintingLineType,
    private beginPositionX: number,
    private beginPositionY: number,
    private endPositionX: number,
    private endPositionY: number,
    moveX = 0,
    moveY = 0,
  ) {
    super(lineType.lineWidth, lineType.lineColor, moveX, moveY);
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
  static from(
    lineType: PrintingLineType,
    data: IRectangleData,
    moveX: number,
    moveY: number,
  ): Rectangle {
    return new Rectangle(
      lineType,
      data.beginPositionX,
      data.beginPositionY,
      data.endPositionX,
      data.endPositionY,
      moveX,
      moveY,
    );
  }
  _draw(board: CanvasRenderingContext2D): void {
    board.beginPath();
    board.rect(
      Math.min(this.endPositionX, this.beginPositionX),
      Math.min(this.endPositionY, this.beginPositionY),
      Math.abs(this.endPositionX - this.beginPositionX),
      Math.abs(this.endPositionY - this.beginPositionY),
    );
    board.closePath();
    board.stroke();
  }
  _value(): IRectanglePrintingData | null {
    if (this.beginPositionX !== this.endPositionX && this.beginPositionY !== this.endPositionY) {
      return {
        type: PrintingType.RECTANGLE,
        data: {
          beginPositionX: this.beginPositionX,
          beginPositionY: this.beginPositionY,
          endPositionX: this.endPositionX,
          endPositionY: this.endPositionY,
        },
      };
    }
    return null;
  }
}
export default Rectangle;