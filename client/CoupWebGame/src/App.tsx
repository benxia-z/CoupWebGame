import { useState, useEffect, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { io, Socket } from "socket.io-client";
import { socket } from "./sockets/socket";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [socketMessage, setSocketMessage] = useState("");
  const handleSendMessage = () => {
    if (socket) socket.emit("client message", message);
  };

  useEffect(() => {
    socket.on("server message", (msg: string) => {
      setSocketMessage(msg);
    });
  }, []);

  return (
    <div>
      <div>Last Message: {socketMessage}</div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default App;
