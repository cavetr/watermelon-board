type Point = [number, number];
class Shape {
  private pointList: Point[];
  constructor(pointList: Point[] = [], e?: MouseEvent) {
    this.pointList = pointList;
  }
  static printing(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
  }
  addPoint (point: Point) {
    this.pointList.push(point);
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    let [x1, y1] = this.pointList[0];
    for (let i = 1, len = this.pointList.length; i < len; i++) {
      let [x2, y2] = this.pointList[0];
      ctx.beginPath();
      ctx.moveTo(x1 - 5, y1 - 40);
      ctx.lineTo(x2 - 5, y2 - 40);
      ctx.closePath();
      [x1, y1] = [x2, y2];
    }
  }
}
export default Shape;