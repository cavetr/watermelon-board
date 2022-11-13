interface IDrawType {
  // type: DrawType; // 画图类型
  // data: dataType;
  lineWidth: number; // 线条粗细 | 字体大小
  lineColor: number; // 线条字体颜色
}
interface IDrawApi {
  serverVersion: number; // 服务端版本
  pictureData: IDrawType; // 笔触数据
}
interface IDeleteApi {
  serverVersion: number; // 服务端版本
  deleteVersion: number; // 需要删除的笔触的版本
}
interface IReadOnlyApi {
  serverVersion: number; // 服务端版本
  isReadOnly: 0 | 1; // 0 只读, 1 可写
}
interface ISheetApi {
  serverVersion: number; // 服务端版本
  isCreate: 0 | 1; // 0删除， 1增加
}
type optType = IDrawApi | IDeleteApi | ISheetApi | IReadOnlyApi;
interface IConnectApi {
  serverVersion: number; // 服务端版本
  boardList: {
    sheetId: number;
    isReadOnly: 0 | 1; // 0 true, 1 false
    drawData: IDrawType[];
  }[];
}
declare enum ST {
  connect = 0, // 连接
  sheet = 1, // sheet操作
  draw = 2, // 画
  delete = 3, // 删除某个画
  readOnly = 4, //是否只读
  changeAdmin = 5, // 更改管理员
}

interface IOterApi {
  st: ST.changeAdmin | ST.connect;
  data?: IConnectApi;
}

interface IApi {
  st: Exclude<ST, ST.connect | ST.changeAdmin>; // 连接、增减sheet、画、删、是否只读、管理员转移
  sheetId: number; // 建立链接时没有
  data: optType; // 转移管理员的时候不传，不需要其他字段因为
}