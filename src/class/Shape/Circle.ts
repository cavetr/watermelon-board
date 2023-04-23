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
  draw(board: CanvasRenderingContext2D): void {
    Circle.draw(board, this);
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
  value(): IPrintingData<ICirclePrintingData> {
    return {
      ...super.lineValue(),
      type: PrintingType.CIRCLE,
      data: {
        beginPositionX: this.beginPositionX,
        beginPositionY: this.beginPositionY,
        endPositionX: this.endPositionX,
        endPositionY: this.endPositionY,
      },
    };
  }
  static draw(board: CanvasRenderingContext2D, shape: Circle): void {
    board.strokeStyle = shape.lineColor;
    board.lineWidth = shape.lineWidth;
    board.beginPath();
    board.ellipse(
      (shape.endPositionX + shape.beginPositionX) / 2,
      (shape.endPositionY + shape.beginPositionY) / 2,
      Math.abs(shape.endPositionX - shape.beginPositionX) / 2,
      Math.abs(shape.endPositionY - shape.beginPositionY) / 2,
      0,
      0,
      Math.PI * 2,
    );
    board.closePath();
    board.stroke();

  }
}
export default Circle;