import Shape from ".";

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
  static draw(board: CanvasRenderingContext2D, shape: Text): void {
    board.fillText(shape.text, shape.positionX, shape.positionY)
  }
}
export default Text;