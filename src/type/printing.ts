
enum PrintingType {
  PEN = 'pen',
  CIRCLE = 'circle',
  RECTANGLE = 'rectangle',
  TEXT = 'text',
}
interface IPenData {
  pointList: [number, number][];
}
interface IPenPrintingData {
  type: PrintingType.PEN;
  data: IPenData;
}

interface ICircleData {
  beginPositionX: number;
  beginPositionY: number;
  endPositionX: number;
  endPositionY: number;
}
interface ICirclePrintingData {
  type: PrintingType.CIRCLE;
  data: ICircleData;
}

interface IRectangleData {
  beginPositionX: number;
  beginPositionY: number;
  endPositionX: number;
  endPositionY: number;
}
interface IRectanglePrintingData {
  type: PrintingType.RECTANGLE;
  data: IRectangleData;
}

interface ITextData {
  text: string;
  positionX: number,
  positionY: number,
}
interface ITextPrintingData {
  type: PrintingType.TEXT;
  data: ITextData;
}
type PrintingDateType = IPenPrintingData | ICirclePrintingData | IRectanglePrintingData | ITextPrintingData;
type PrintingLineType = {
  lineWidth: number;
  lineColor: string;
}

type IPrintingData<T extends PrintingDateType = PrintingDateType> =
  PrintingLineType &
  T & {
    moveX: number;
    moveY: number;
  };
interface IPrinting {
  boardId: Id; // 画板id，客户端生成，用于重绘时删除
  shapeId: Id;
  data: IPrintingData; // 图形数据
}
