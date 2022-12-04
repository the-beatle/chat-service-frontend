import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="message here"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}> Send message </button>
      <p>{receivedMessage}</p>
    </div>
  );
}

export default App;
