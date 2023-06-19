import React from "react";
import socketIo from "socket.io-client";

export const socketServer = socketIo.connect(process.env.REACT_APP_SOCKET_ENDPOINT,
    {
        transportOptions: {
          polling: {
            extraHeaders: {
                'ngrok-skip-browser-warning': 69420,
            }
          }
        }
      });
export const SocketContext = React.createContext();