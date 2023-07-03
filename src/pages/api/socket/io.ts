import { NextApiResponseServerIO } from "@/types/next";
import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

export default async function io(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    console.log(`New Socket.io server... to ${path}`);
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;

    
    io.on("connection", (socket) => {
      console.log("here is server" + socket);
    });
  }


  console.log(`Setting up socket.io`)
  res.end();
  return;
}
