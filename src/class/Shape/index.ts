// interface Shape {
//   draw(shape: Shape): void;
// };
abstract class Shape {
  abstract draw(board: CanvasRenderingContext2D): void;
  abstract reset(): this;
  abstract value(): PrintingDateType;
  abstract addPath(board: CanvasRenderingContext2D, nextPoint: Point): void;
}
export default Shape;