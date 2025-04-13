import React, { useEffect, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "../contexts/SocketDataContext";

const socket: Socket = io(import.meta.env.VITE_SERVER_BASE_URL as string);

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
