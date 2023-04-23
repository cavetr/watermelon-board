// interface Shape {
//   draw(shape: Shape): void;
// };
abstract class Shape {
  constructor (
    public lineWidth: number,
    public lineColor: string,
  ) {}
  lineValue(): PrintingLineType {
    return {
      lineWidth: this.lineWidth,
      lineColor: this.lineColor,
    }
  };
  abstract value():IPrintingData ;
  abstract draw(board: CanvasRenderingContext2D): void;
  abstract reset(): this;
  abstract addPath(board: CanvasRenderingContext2D, nextPoint: Point): void;
}
export default Shape;