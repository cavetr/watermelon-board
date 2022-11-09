type Point = [number, number];
class Shape {
  private pointList: Point[];
  constructor(pointList = []) {
    this.pointList = pointList;
  }
  draw(ctx: CanvasRenderingContext2D) {
    let [x1, y1] = this.pointList[0];
    for(let i = 1, len = this.pointList.length; i < len; i++) {
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