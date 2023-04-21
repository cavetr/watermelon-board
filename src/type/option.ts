import { ST } from "@type/const";



export interface IInitDataOption {
  printingList: IPrinting[];
}
export interface IInitOption {
  type: ST.INIT;
  data: IInitDataOption;
}
export interface IInitApi {
  version: Version;
  data: IInitOption;
}

export interface IAddOption {
  type: ST.ADD;
  data: IAddDataOption;
}
export interface IAddDataOption {
  printing: IPrinting;
}
export interface IAddApi {
  version: Version;
  data: IAddOption;
}

export interface IDeleteOption {
  type: ST.DELETE;
  data: IDeleteDataOption;
}
export interface IDeleteDataOption {
  id: Id;
}
export interface IDeleteApi {
  version: Version;
  data: IDeleteOption;
}
