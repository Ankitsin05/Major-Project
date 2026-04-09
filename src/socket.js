import { io } from "socket.io-client";

export const initsocket = async () => {
  return io(import.meta.env.VITE_BACKEND_URL, {
    transports: ["websocket"],
  });
};