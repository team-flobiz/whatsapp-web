import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import io from "socket.io-client";

const socket = io("http://localhost:3002");

function App() {
  const [qrCode, setQRCode] = useState("");
  const [session, setSession] = useState("");
  const createWhatsappSession = () => {
    socket.emit("createSession", {
      id: session,
    });
  };
  const [id, setId] = useState("");

  useEffect(() => {
    console.log("WebSocket connection status:", socket.connected);
    socket.on("qr", (qrData) => {
      console.log("Received QR data:", qrData);
      setQRCode(qrData);
    });

    socket.on("ready", (data) => {
      console.log("Received 'ready' event:", data);
      const { id } = data;
      setId(id);
    });

    socket.on("allChats", (data) => {
      console.log("allChats", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getAllChats = () => {
    socket.emit("getAllChats", { id });
  };

  return (
    <div className="App" style={{ margin: "40px" }}>
      <h1>WhatsApp Web Js Client</h1>
      <h2>Open WhatsApp and Scan QR mentioned Below</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={session}
          onChange={(val) => setSession(val.target.value)}
        />
        <button onClick={createWhatsappSession}>Create Session</button>
      </div>
      <div style={{ marginBottom: "20" }}>
        {id !== "" && <button onClick={getAllChats}>Get All chats </button>}
      </div>
      <QRCode value={qrCode} />
    </div>
  );
}

export default App;
