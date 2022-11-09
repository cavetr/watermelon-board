import React, { useEffect, useRef } from "react";
import styles from './index.less';
function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
  ctx.beginPath();
  ctx.moveTo(x1 - 5, y1 - 40);
  ctx.lineTo(x2 - 5, y2 - 40);
  // ctx.arc(x2 - 5, y2 - 40, 0.1, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.stroke();
}
function WhiteBoard() {
  const boardRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = boardRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = document.documentElement.clientWidth //网页可见区域宽
      canvas.height = document.documentElement.clientHeight//网页可见区域高
      console.log(ctx);
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 1;
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(20, 20, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(30, 30, 550, 50)

        ctx.clearRect(20, 20, 30, 30);

        ctx.fillStyle = ("black");
        ctx.strokeStyle = 'black';

        let painting = false
        let last: [number, number];

        // let isTouchDevice = 'ontouchstart' in
        //   document.documentElement;
        // if (isTouchDevice) {
        //   canvas.ontouchstart = (f) => {
        //     let x = f.touches[0].clientX
        //     let y = f.touches[0].clientY
        //     last = [x, y]

        //   }
        //   canvas.ontouchmove = (f) => {
        //     let x = f.touches[0].clientX
        //     let y = f.touches[0].clientY
        //     drawLine(ctx, last[0], last[1], x, y)
        //     last = [x, y]

        //   }
        // } else {

        canvas.onmousedown = (e) => {
          // ctx.arc(e.x, e.y,1, 0, Math.PI*2, true);
          // ctx.stroke();
          painting = true
          last = [e.x, e.y]
        }

        canvas.onmousemove = (e) => {
          if (painting === true) {
            drawLine(ctx, last[0], last[1], e.x, e.y)
            last = [e.x, e.y]
          }
        }
        canvas.onmouseout = (e) => {
          painting = false
        }
        canvas.onmouseup = () => {
          painting = false
        }
      }
      // }
    }
  }, []);
  return (
    <div>
      <section>
        test
      </section>
      <canvas className={styles.board} ref={boardRef}></canvas>
    </div>
  )
}
export default WhiteBoard;