import Koa from "koa";
import logger from "koa-logger";
import { Server } from "socket.io";
import type { TargetDTO } from "types";

const app = new Koa();
app.use(logger());

const server = app.listen(3000, () => {
  console.log("Server started on port 3000");
});

const io = new Server<
  {
    hit: () => void;
    miss: () => void;
  },
  {
    target: (target: TargetDTO) => void;
  }
>(server);

io.on("connection", (socket) => {
  console.log("socket connection established");

  const sendRandomTarget = () => {
    const target: TargetDTO = {
      id: Date.now(),
      direction: "left",
      duration: 5000,
      offset: Math.random() * 250,
    };

    setTimeout(() => {
      socket.emit("target", target);
    }, 1000);
  };

  sendRandomTarget();

  socket.on("hit", () => sendRandomTarget());
  socket.on("miss", () => sendRandomTarget());
});
