import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";
import User from "./models/user.model";
import Captain from "./models/captain.model";

let io: Server;

interface JoinData {
  userId: string;
  userType: "user" | "captain";
}

interface LocationData {
  userId: string;
  location: {
    ltd: number;
    lng: number;
  };
}

interface MessageObject {
  socketId: string;
  event: string;
  data: any;
}

function initializeSocket(server: HTTPServer): void {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data: JoinData) => {
      const { userId, userType } = data;

      try {
        if (userType === "user") {
          await User.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "captain") {
          await Captain.findByIdAndUpdate(userId, { socketId: socket.id });
        }
      } catch (err) {
        console.error("Join error:", err);
        socket.emit("error", { message: "Internal server error during join." });
      }
    });

    socket.on("update-location-captain", async (data: LocationData) => {
      const { userId, location } = data;
      
      if (
        !location ||
        typeof location.ltd !== "number" ||
        typeof location.lng !== "number"
      ) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      try {
        await Captain.findByIdAndUpdate(userId, {
          location: {
            ltd: location.ltd,
            lng: location.lng,
          },
        });
      } catch (err) {
        console.error("Location update error:", err);
        socket.emit("error", {
          message: "Internal server error during location update.",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId({ socketId, event, data }: MessageObject): void {
  console.log({ event, data });

  if (io) {
    io.to(socketId).emit(event, data);
  } else {
    console.log("Socket.io not initialized.");
  }
}

export { initializeSocket, sendMessageToSocketId };
