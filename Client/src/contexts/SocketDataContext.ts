import { createContext } from "react";
import { Socket } from "socket.io-client";

export interface ISocketContext {
  socket: Socket;
}

export const SocketContext = createContext<ISocketContext | undefined>(
  undefined
);
