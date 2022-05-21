import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("https://ricky-chat.herokuapp.com/");

function App() {
  const [room,setRoom] = useState('')
  const [message, setMessage] = useState(" ");
  const [messageRecieved, setMessageRecieved] = useState("");
  const sendMessage = () => {
    socket.emit("sendMessage", { msg: message, room });
  };

  const joinRoom = () => {
    if(room !==''){
      socket.emit('joinRoom',room)
    }
  }

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessageRecieved(data.msg);
    });
  },[socket]);

  return (
    <div className="App">
      <input
        placeholder="message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
       <input
        placeholder="enter room"
        value={room}
        onChange={(event)=>setRoom(event.target.value)}
      />
    
        <button onClick={joinRoom}> Join Room</button>
      <button onClick={sendMessage}>Send Message</button>
      <h1>message:</h1>
      <p>{messageRecieved}</p>
    </div>
  );
}

export default App;
