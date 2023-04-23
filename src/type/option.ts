enum ST {
  INIT = 'init',
  ADD = 'add',
  DELETE = 'delete',
}
interface IInitDataOption {
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

interface IAddOption {
  type: ST.ADD;
  data: IAddDataOption;
}
interface IAddDataOption {
  printing: IPrinting;
}
interface IAddApi {
  version: Version;
  data: IAddOption;
}

interface IDeleteOption {
  type: ST.DELETE;
  data: IDeleteDataOption;
}
interface IDeleteDataOption {
  id: Id;
}
interface IDeleteApi {
  version: Version;
  data: IDeleteOption;
}
