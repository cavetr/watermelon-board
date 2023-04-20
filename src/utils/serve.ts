import { ST } from "@type/const";
import { IApi } from "@type/option";
import { io, Socket } from "socket.io-client";
import Qs from 'qs';
const searchParam = Qs.parse(location.search.slice(1));
console.log(searchParam)
const IP = `ws://localhost:4000/${searchParam.a}?isd=1&&key=123`;

interface ServerToClientEvents{
  [ST.INIT]: (data: IApi) => void;
  [ST.ADD]: (data: IApi) => void;
  [ST.DELETE]: (data: IApi) => void;
}
interface ClientToServerEvents {
  [ST.ADD]: (data: IApi) => void;
  [ST.DELETE]: (data: IApi) => void;
}
const ws: Socket<ServerToClientEvents, ClientToServerEvents> = io(IP);

export default ws;