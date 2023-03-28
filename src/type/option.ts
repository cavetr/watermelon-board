import { ST } from "@type/const";
import { IPrinting } from "@type/printing";



export interface IInitOption {
  printingList: IPrinting[];
}
export interface IAddOption {
  printing: IPrinting;
}
export interface IDeleteOption {
  id: Id;
}
export type OptionDataType = IInitOption | IAddOption | IDeleteOption;
export interface IOption {
  type: ST;
  data: OptionDataType;
}

export interface IApi {
  version: Version;
  data: IOption;
}