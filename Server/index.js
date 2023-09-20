const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");
const app = express();
const port = 3001;
const cors = require("cors");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with the actual origin of your client
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.listen(port, () => {
  console.log(`Server listening on Port:::${port}`);
});
const allSessionsObject = {};
const CreateWhatsappSessions = (id, socket) => {
  console.log("session id", id);
  const client = new Client({
    puppeteer: {
      headless: false,
    },
    authStrategy: new LocalAuth({
      clientId: id,
    }),
  });

  // Emit the 'qr' event when a QR code is generated
  client.on("qr", (qr) => {
    console.log("QR GENERATED");
    console.log(qr);
    // Emit the 'qr' event to the client to pass the QR code data
    io.emit("qr", qr);
  });
  client.on("authenticated", () => {
    console.log("AUTHENTICATED");
  });
  client.on("ready", () => {
    console.log("Client is Ready!");
    allSessionsObject[id] = client;
    io.emit("ready", { id, message: "client is ready" }); // Ensure this line emits "ready"
  });
  client.initialize();
};

io.on("connection", (socket) => {
  console.log("Client connected to socket");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("connected", (data) => {
    console.log("connected to the server");
    socket.emit("hello", "hello from the server");
  });

  socket.on("createSession", (data) => {
    console.log(data);
    const { id } = data;
    CreateWhatsappSessions(id, socket);
  });

  socket.on("getAllChats", async (data) => {
    console.log("getAllChats", data);
    const { id } = data;
    const client = allSessionsObject[id];
    const allChats = await client.getChats();
    socket.emit("getAllChats", {
      allChats,
    });
  });
});
httpServer.listen(3002);
