import Shape from ".";
import { PrintingType } from "@type/const";

class Rectangle extends Shape {
  constructor(
    lineType: PrintingLineType,
    private beginPositionX: number,
    private beginPositionY: number,
    private endPositionX: number,
    private endPositionY: number,
  ) {
    super(lineType.lineWidth, lineType.lineColor);
  }
  draw(board: CanvasRenderingContext2D): void {
    Rectangle.draw(board, this);
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
  value(): IPrintingData<IRectanglePrintingData> {
    return {
      ...super.lineValue(),
      type: PrintingType.RECTANGLE,
      data: {
        beginPositionX: this.beginPositionX,
        beginPositionY: this.beginPositionY,
        endPositionX: this.endPositionX,
        endPositionY: this.endPositionY,
      },
    };
  }
  static from(
    lineType: PrintingLineType,
    data: IRectangleData
  ): Rectangle {
    return new Rectangle(
      lineType,
      data.beginPositionX,
      data.beginPositionY,
      data.endPositionX,
      data.endPositionY,
    );
  }
  static draw(board: CanvasRenderingContext2D, shape: Rectangle): void {
    board.strokeStyle = shape.lineColor;
    board.lineWidth = shape.lineWidth;
    board.beginPath();
    board.rect(
      Math.min(shape.endPositionX, shape.beginPositionX),
      Math.min(shape.endPositionY, shape.beginPositionY),
      Math.abs(shape.endPositionX - shape.beginPositionX),
      Math.abs(shape.endPositionY - shape.beginPositionY),
    );
    board.closePath();
    board.stroke();
  }
}
export default Rectangle;