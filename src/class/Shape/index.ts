// interface Shape {
//   draw(shape: Shape): void;
// };
abstract class Shape {
  abstract draw(board: CanvasRenderingContext2D): void;
}
export default Shape;