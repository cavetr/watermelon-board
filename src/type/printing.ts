import { PrintingType } from "./const";

interface IPenData {
  pointList: [number, number][];
}
interface ICircleData {
  beginPositionX: number;
  beginPositionY: number;
  endPositionX: number;
  endPositionY: number;
}
interface IRectangleData {
  beginPositionX: number;
  beginPositionY: number;
  endPositionX: number;
  endPositionY: number;
}
interface ITextData {
  text: string;
}
type PrintingDateType = IPenData | ICircleData | IRectangleData |ITextData;
interface IPrintingData {
  lineWidth: number; // 线条粗细 | 字体大小
  lineColor: number; // 线条字体颜色
  type: PrintingType; // 画图类型
  data: PrintingDateType; // 图像数据
}
export interface IPrinting {
  boardId?: Id; // 画板id，客户端生成，用于重绘时删除
  shapeId: Id;
  data: IPrintingData; // 图形数据
}
