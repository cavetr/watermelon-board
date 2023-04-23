import Shape from ".";
import { PrintingType } from "@type/const";


class Text extends Shape {
  constructor(
    lineType: PrintingLineType,
    private text: string,
    private positionX: number,
    private positionY: number,
  ) {
    super(lineType.lineWidth, lineType.lineColor);
  }
  draw(board: CanvasRenderingContext2D): void {
    Text.draw(board, this);
  }
  addPath(): void { }
  reset({
    text,
    positionX,
    positionY,
  } = this): this {
    this.text = text;
    this.positionX = positionX;
    this.positionY = positionY;
    return this;
  }
  static from(
    lineType: PrintingLineType,
    data: ITextData
  ): Text {
    return new Text(
      lineType,
      data.text,
      data.positionX,
      data.positionY
    );
  }
  value(): IPrintingData<ITextPrintingData> {
    return {
      ...super.lineValue(),
      type: PrintingType.TEXT,
      data: {
        text: this.text,
        positionX: this.positionX,
        positionY: this.positionY,
      }
    };
  }
  static draw(board: CanvasRenderingContext2D, shape: Text): void {
    board.fillStyle = shape.lineColor;
    board.font = `${shape.lineWidth * 5}px Arial`;
    board.fillText(shape.text, shape.positionX, shape.positionY);
  }
}
export default Text;