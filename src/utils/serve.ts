import { ST } from "@type/const";
import { IApi } from "@type/option";
import { io, Socket } from "socket.io-client";
const IP = `ws://localhost:4000/${location.search.slice(3)}?isd=1`;

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