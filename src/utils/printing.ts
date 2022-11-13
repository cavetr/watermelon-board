import Pen from "@class/Shape/Pen";

enum PrintingType {
  PEN = 'pen',
}
const printingTypeDrawFnMap: Record<PrintingType, typeof Pen.printing> = {
  [PrintingType.PEN]: Pen.printing,
}
// 笔刷数据，用于绘图
const printing = {
  type: PrintingType.PEN,
  color: 'black',
  width: 1,
}
const getPrinting = () => {
  return { ...printing };
}
const changePrintingType = (newPrintingType: PrintingType) => {
  printing.type = newPrintingType;
}

const getDrawFn = () => {
  return printingTypeDrawFnMap[printing.type];
}
export {
  getDrawFn,
  getPrinting,
  changePrintingType,
}