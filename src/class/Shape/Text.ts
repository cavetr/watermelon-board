import Shape from ".";
import { PrintingType } from "@type/const";


class Text extends Shape {
  constructor(
    private text: string,
    private positionX: number,
    private positionY: number,
  ) {
    super();
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
  static from(data: ITextData): Text {
    return new Text(data.text, data.positionX, data.positionY);
  }
  value(): ITextPrintingData {
    return {
      type: PrintingType.TEXT,
      data: {
        text: this.text,
        positionX: this.positionX,
        positionY: this.positionY,
      }
    };
  }
  static draw(board: CanvasRenderingContext2D, shape: Text): void {
    board.fillText(shape.text, shape.positionX, shape.positionY);
  }
}
export default Text;