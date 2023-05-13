import Shape from ".";
import { PrintingType } from "@type/const";


class Text extends Shape {
  constructor(
    lineType: PrintingLineType,
    private text: string,
    private positionX: number,
    private positionY: number,
    moveX = 0,
    moveY = 0,
  ) {
    super(lineType.lineWidth, lineType.lineColor, moveX, moveY);
  }
  static from(
    lineType: PrintingLineType,
    data: ITextData,
    moveX: number,
    moveY: number,
  ): Text {
    return new Text(
      lineType,
      data.text,
      data.positionX,
      data.positionY,
      moveX,
      moveY,
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
  _value(): ITextPrintingData | null {
    if (this.text) {
      return {
        type: PrintingType.TEXT,
        data: {
          text: this.text,
          positionX: this.positionX,
          positionY: this.positionY,
        }
      };
    }
    return null;
  }
}
export default Text;