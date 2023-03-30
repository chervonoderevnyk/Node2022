import express, { Application, NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import * as http from "http";
import mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, carRouter, userRouter } from "./routers";
import * as swaggerJson from "./utils/swagger.json";

const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:80/",
  },
});

io.on("connection", async (socket: Socket) => {
  // const sockets = await io.fetchSockets();
  //
  // sockets.forEach((socket2) => {
  //   console.log(socket2.id);
  // });

  /** SEND TO PARTICULAR CLIENT */
  // socket.emit("message", { message: "hello" });
  /** SEND MESSAGE TO ALL CLIENTS */
  // io.emit("user:connected", { message: "USER CONNECTED" });
  /** SEND MESSAGE TO ALL CLIENTS EXCEPT SENDER */
  // socket.broadcast.emit("user:connected", { message: "USER CONNECTED" });

  socket.on("message:send", (text) => {
    io.emit("message:get", `${text}`);
  });

  socket.on("join:room", ({ roomId }) => {
    socket.join(roomId);

    socket
      .to(roomId)
      .emit("user:joined", { socketId: socket.id, action: "Joined!" });
    socket.on("left:room", ({ roomId }) => {
      socket.leave(roomId);
      socket
        .to(roomId)
        .emit("user:left", { socketId: socket.id, action: "Left!" });
    });
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

app.use("/cars", carRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

// --- ERROR HANDLER ---
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status,
  });
});

server.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  cronRunner();
  // eslint-disable-next-line no-console
  console.log(`Server has started on PORT ${configs.PORT} 🚀🚀🚀`);
});
