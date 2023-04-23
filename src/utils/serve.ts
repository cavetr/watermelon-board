import { ST } from "@type/const";
import { io, Socket } from "socket.io-client";
import Qs from 'qs';
const searchParam = Qs.parse(location.search.slice(1));
console.log(searchParam);
const IP = `ws://localhost:4000/${searchParam.a}?isd=1&&key=abs`;

interface ServerToClientEvents{
  [ST.INIT]: (data: IInitApi) => void;
  [ST.ADD]: (data: IAddApi) => void;
  [ST.DELETE]: (data: IDeleteApi) => void;
}
interface ClientToServerEvents {
  [ST.ADD]: (data: IAddApi) => void;
  [ST.DELETE]: (data: IDeleteApi) => void;
}
const ws: Socket<ServerToClientEvents, ClientToServerEvents> = io(IP);

export default ws;