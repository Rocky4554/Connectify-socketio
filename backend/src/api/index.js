// import express from "express";
// import "dotenv/config";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";

// import authRoutes from "../routes/auth.route.js";
// import userRoutes from "../routes/user.route.js";
// import chatRoutes from "../routes/chat.route.js";

// import { connectDB } from "../lib/db.js";

// const app = express();
// const PORT = process.env.PORT;

// const __dirname = path.resolve();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true, // allow frontend to send cookies
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/chat", chatRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   connectDB();
// });

/////////////////
// for deployement on vercel

// import express from "express";
// import "dotenv/config";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// import authRoutes from "../routes/auth.route.js";
// import userRoutes from "../routes/user.route.js";
// import chatRoutes from "../routes/chat.route.js";
// import messageRoutes from "../routes/messageRoutes.js";
// import { connectDB } from "../lib/db.js";
// import { Server } from "socket.io"; 
// import http from "http";

//  const PORT = process.env.PORT;

// const app = express();

// // middleware
// app.use(cors({
//   origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
//   credentials: true,
// }));
// app.use(express.json());
// app.use(cookieParser());

// // routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message",messageRoutes)
// app.get("/api/debug", (req, res) => {
//   res.json({ message: "API is alive" });
// });

// // Test route at root level
// app.get("/", (req, res) => {
//   res.json({ message: "Connectify API is running!", timestamp: new Date().toISOString() });
// });

// // Serve static files in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("dist"));
  
//   app.get("*", (req, res) => {
//     res.sendFile("dist/index.html", { root: process.cwd() });
//   });
// }

// // ensure DB connection
// connectDB();

// const server = http.createServer(app);

// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// //   // connectDB();
// // });


// // ✅ Start the correct server (not app.listen)
// server.listen(PORT, () => {
//   console.log(`✅ Server (with Socket.IO) running on port ${PORT}`);
// });

// const io = new Server(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin:["http://localhost:5173", process.env.FRONTEND_URL],
//     // credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Connected to socket.io");
//   // socket.on("setup", (userData) => {
//   //     if (!userData || !userData._id) {
//   //     console.log("⚠️ No valid user data provided to socket setup");
//   //     socket.emit("error", "Invalid user data");
//   //     return;
//   //   }
//   //   socket.join(userData._id);
//   //   socket.emit("connected");
//   // });

//   socket.on("setup", (userData) => {
//     if (!userData || !userData._id) {
//       console.log("⚠️ No valid user data provided to socket setup");
//       socket.emit("error", "Invalid user data");
//       return;
//     }
//     socket.join(userData._id);
//     socket.emit("connected");
//     console.log("User joined room:", userData._id);
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   });
//   socket.on("typing", (room) => socket.in(room).emit("typing"));
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//   socket.on("new message", (newMessageRecieved) => {
//     var chat = newMessageRecieved.chat;

//     if (!chat.users) return console.log("chat.users not defined");

//     chat.users.forEach((user) => {
//       if (user._id == newMessageRecieved.sender._id) return;

//       socket.in(user._id).emit("message recieved", newMessageRecieved);
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("USER DISCONNECTED");
//   });
// });

// export default app; // Vercel requires default export


////////User offline onlne mode 

import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";
import chatRoutes from "../routes/chat.route.js";
import messageRoutes from "../routes/messageRoutes.js";
import { connectDB } from "../lib/db.js";
import { Server } from "socket.io"; 
import http from "http";

const PORT = process.env.PORT;

const app = express();

// middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.get("/api/debug", (req, res) => {
  res.json({ message: "API is alive" });
});

// Test route at root level
app.get("/", (req, res) => {
  res.json({ message: "Connectify API is running!", timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist"));
  
  app.get("*", (req, res) => {
    res.sendFile("dist/index.html", { root: process.cwd() });
  });
}

// ensure DB connection
connectDB();

const server = http.createServer(app);

// ✅ Start the correct server (not app.listen)
server.listen(PORT, () => {
  console.log(`✅ Server (with Socket.IO) running on port ${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin:["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
  },
});

// 🔥 Store active online users
let onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  // socket.on("setup", (userData) => {
  //     if (!userData || !userData._id) {
  //     console.log("⚠️ No valid user data provided to socket setup");
  //     socket.emit("error", "Invalid user data");
  //     return;
  //   }
  //   socket.join(userData._id);
  //   socket.emit("connected");
  // });

  socket.on("setup", (userData) => {
    if (!userData || !userData._id) {
      console.log("⚠️ No valid user data provided to socket setup");
      socket.emit("error", "Invalid user data");
      return;
    }
    socket.join(userData._id);
    socket.emit("connected");
    console.log("User joined room:", userData._id);
  });

  // 🟢 New event: User is ONLINE
  socket.on("user-connected", (userId) => {
    if (!userId) return;

    onlineUsers.set(socket.id, userId);
    console.log("User connected:", userId);

    io.emit("get-online-users", Array.from(onlineUsers.values()));
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  // 🔴 User disconnect
  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");

    onlineUsers.delete(socket.id);

    io.emit("get-online-users", Array.from(onlineUsers.values()));
  });
});

export default app; // Vercel requires default export

