import Shape from ".";

class Circle extends Shape {
  constructor(
    private beginPositionX: number,
    private beginPositionY: number,
    private endPositionX: number,
    private endPositionY: number,
  ) {
    super();
  }
  draw(board: CanvasRenderingContext2D): void {
    Circle.draw(board, this);
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
  static draw(board: CanvasRenderingContext2D, shape: Circle): void {
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