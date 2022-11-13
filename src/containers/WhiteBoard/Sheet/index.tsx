import React, { memo, useEffect, useRef } from "react";
import styles from './index.less';
import Server from "@class/Server";
import Sheet from "@class/Sheet";

const SheetLi = () => {
  const boardRef = useRef<HTMLCanvasElement>(null);
  const PrintingRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const boardCanvas = boardRef.current;
    const printingCanvas = PrintingRef.current;
    if (boardCanvas && printingCanvas) {
      let sheet: Sheet;
      const waitOptList: IApi[] = [];
      const ws = new Server('', (data: IOterApi | IApi) => {
        const { st } = data;
        if (st === ST.changeAdmin) {

        } else if (st === ST.connect) {
          sheet = new Sheet(
            ws,
            boardCanvas,
            printingCanvas,
            (data.data as IConnectApi)
          );
          for(const opt of waitOptList) {
            sheet.addWaitOpt(opt);
          }
        } else {
          if(sheet) {
            sheet.addWaitOpt(data as IApi);
          } else {
            waitOptList.push(data as IApi);
          }
        }
      });
    }
  }, []);
  return (
    <div>
      <canvas id="board" className={styles.board} ref={boardRef}></canvas>
      <canvas id="printing" className={styles.board} ref={PrintingRef}></canvas>
    </div>
  )
};
export default memo(SheetLi);