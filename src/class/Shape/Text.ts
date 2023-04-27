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
  addPath(): void { }
  reset(text: string): this {
    this.text = text;
    return this;
  }
  _draw(board: CanvasRenderingContext2D): void {
    board.fillText(this.text, this.positionX, this.positionY);
  }
  _value(): ITextPrintingData {
    return {
      type: PrintingType.TEXT,
      data: {
        text: this.text,
        positionX: this.positionX,
        positionY: this.positionY,
      }
    };
  }
}
export default Text;