import React from "react";
import socketIo from "socket.io-client";

export const socket = socketIo.connect(process.env.REACT_APP_SOCKET_ENDPOINT);
export const SocketContext = React.createContext();