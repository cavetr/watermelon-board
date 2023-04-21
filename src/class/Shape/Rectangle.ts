import Shape from ".";

class Rectangle extends Shape {
  constructor(
    private beginPositionX: number,
    private beginPositionY: number,
    private endPositionX: number,
    private endPositionY: number,
  ) {
    super();
  }
  draw(board: CanvasRenderingContext2D): void {
    Rectangle.draw(board, this);
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
  static draw(board: CanvasRenderingContext2D, shape: Rectangle): void {
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