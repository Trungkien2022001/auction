import React from "react";
import socketIo from "socket.io-client";
import config from "../config";

export const socketServer = socketIo.connect(config.socketHost,
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