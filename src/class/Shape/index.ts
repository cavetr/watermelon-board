// interface Shape {
//   draw(shape: Shape): void;
// };
abstract class Shape {
  constructor(
    public lineWidth: number,
    public lineColor: string,
    public moveX = 0,
    public moveY = 0,
  ) { }
  value(): IPrintingData | null {
    const value = this._value();
    return value ? ({
      lineWidth: this.lineWidth,
      lineColor: this.lineColor,
      moveX: this.moveX,
      moveY: this.moveY,
      ...value,
    }) : null;
  }
  draw(board: CanvasRenderingContext2D, config?: Partial<CanvasRenderingContext2D>): void {
    board.save();
    board.translate(this.moveX, this.moveY);
    board.strokeStyle = config?.strokeStyle ?? this.lineColor;
    board.lineWidth = (config?.lineWidth ?? this.lineWidth) * 3;
    board.fillStyle = config?.fillStyle ?? this.lineColor;
    board.font = `${this.lineWidth * 15}px Arial`;
    this._draw(board);
    board.restore();
  }
  addMove(moveX: number, moveY: number) {
    this.moveX += moveX;
    this.moveY += moveY;
  }
  setMove(moveX: number, moveY: number) {
    this.moveX = moveX;
    this.moveY = moveY;
  }
  abstract _value(): PrintingDateType | null;
  abstract _draw(board: CanvasRenderingContext2D): void;
  abstract reset(arg: unknown): this;
  abstract addPath(board: CanvasRenderingContext2D, nextPoint: Point): void;
}
export default Shape;