import { useState } from "react";  

const server = new WebSocket('ws://localhost:8080');
const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const useChat = (addNewMessage, addOldMessages) => {
  const [status, setStatus] = useState({}); // { type, msg }
  server.onmessage = (m) => {
    onEvent(JSON.parse(m.data));
  };

  const sendData = async (data) => { 
    await server.send(JSON.stringify(data));
  };
  const sendMessage = (payload) => {
    // console.log(payload);
    // addNewMessage(makeName(payload.data.to, payload.data.name), payload)
    sendData(payload);
  }; // { key, msg }

  const onEvent = (e) => {
    const { type } = e;
    console.log('event');
    switch (type) {
      case 'CHAT': {
      	console.log('chat');
      	addOldMessages(e.data.key, e.data.messages);
        break;
      }
      case 'MESSAGE': {
      	console.log('MESSAGE');
      	addNewMessage(e.data.key, e.data.message)
        break;
      }
    }
  };

  return { status, sendMessage };
};
export default useChat;
