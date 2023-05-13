interface ServerToClientEvents {
  [ST.INIT]: (data: IInitApi) => void;
  [ST.ADD]: (data: IAddApi) => void;
  [ST.DELETE]: (data: IDeleteApi) => void;
  [ST.MOVE]: (data: IMoveApi) => void;
}
interface ClientToServerEvents {
  [ST.ADD]: (data: IAddApi) => void;
  [ST.DELETE]: (data: IDeleteApi) => void;
  [ST.MOVE]: (data: IMoveApi) => void;
  clear: () => void;
}
enum ST {
  INIT = 'init',
  ADD = 'add',
  DELETE = 'delete',
  MOVE = 'move',
}
interface IInitDataOption {
  width: number;
  height: number;
  printingList: IPrinting[];
}
interface IInitOption {
  type: ST.INIT;
  data: IInitDataOption;
}
interface IInitApi {
  version: Version;
  data: IInitOption;
}

interface IAddDataOption {
  printing: IPrinting;
}
interface IAddOption {
  type: ST.ADD;
  data: IAddDataOption;
}
interface IAddApi {
  version: Version;
  data: IAddOption;
}

interface IMoveDataOption {
  id: Id;
  moveX: number;
  moveY: number;
}
interface IMoveOption {
  type: ST.MOVE;
  data: IMoveDataOption;
}
interface IMoveApi {
  version: Version;
  data: IMoveOption;
}

interface IDeleteDataOption {
  id: Id;
}
interface IDeleteOption {
  type: ST.DELETE;
  data: IDeleteDataOption;
}
interface IDeleteApi {
  version: Version;
  data: IDeleteOption;
}
