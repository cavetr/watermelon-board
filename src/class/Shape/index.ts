// interface Shape {
//   draw(shape: Shape): void;
// };
abstract class Shape {
  constructor(
    public lineWidth: number,
    public lineColor: string,
  ) { }
  value(): IPrintingData {
    return {
      lineWidth: this.lineWidth,
      lineColor: this.lineColor,
      ...this._value(),
    }
  }
  draw(board: CanvasRenderingContext2D, config?: Partial<CanvasRenderingContext2D>): void{
    board.strokeStyle = config?.strokeStyle ?? this.lineColor;
    board.lineWidth = config?.lineWidth ?? this.lineWidth;
    board.fillStyle = config?.fillStyle ?? this.lineColor;
    board.font = `${this.lineWidth * 50}px Arial`;
    this._draw(board);
  }
  abstract _value(): PrintingDateType;
  abstract _draw(board: CanvasRenderingContext2D): void;
  abstract reset(arg: unknown): this;
  abstract addPath(board: CanvasRenderingContext2D, nextPoint: Point): void;
}
export default Shape;