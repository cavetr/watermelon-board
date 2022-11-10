import React, { memo, useEffect, useRef } from "react";
import styles from './index.less';
import Board from "../../classes/Board";
import PrintingBoard from "../../classes/PrintingBoard";
function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
  ctx.beginPath();
  ctx.moveTo(x1 - 5, y1 - 40);
  ctx.lineTo(x2 - 5, y2 - 40);
  // ctx.arc(x2 - 5, y2 - 40, 0.1, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.stroke();
}
const settingCanvas = (canvas: HTMLCanvasElement) => {
  canvas.height = 1000;
  canvas.width = 1000;
}
const WhiteBoard = memo(() => {
  const boardRef = useRef<HTMLCanvasElement>(null);
  const PrintingRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const boardCanvas = boardRef.current;
    const printingCanvas = PrintingRef.current;
    if (boardCanvas && printingCanvas) {
      settingCanvas(boardCanvas);
      settingCanvas(printingCanvas);
      const board = new Board(boardCanvas);
      const printing = new PrintingBoard(printingCanvas);
    }
  }, []);
  return (
    <div>
      <canvas id="board" className={styles.board} ref={boardRef}></canvas>
      <canvas id="printing" className={styles.board} ref={PrintingRef}></canvas>
    </div>
  )
});
export default WhiteBoard;