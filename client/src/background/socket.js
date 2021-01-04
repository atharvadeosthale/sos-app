import { toast } from "react-toastify";
import SocketIO from "socket.io-client";

const io = SocketIO.connect("ws://localhost:5000");

io.on("connect", () => {
  console.log("connected");
});

export default io;
