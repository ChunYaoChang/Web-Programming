import { useState } from "react";  
const useChat = () => {
  const client = new WebSocket('ws://localhost:4000')
  const [status, setStatus] = useState({}); // { type, msg }

  const sendData = async (data) => {
    await client.send(JSON.stringify(data))
  }
  const sendMessage = (payload) => {
    console.log(payload.msg)
    let tmp = payload.activeKey.split('_')
    if (payload.type === 'MESSAGE') {
      sendData({type: payload.type, data: {name: tmp[0], to: tmp[1], body: payload.msg}})
    } else if (payload.type === 'CHAT') {
      sendData({type: payload.type, data: {name: tmp[0], to: tmp[1]}})
    }
  }; // { key, msg }
  client.onmessage = (byteString) => {
    const data = JSON.parse(byteString.data)
    if (data.type === 'CHAT') {
      
    } else if (data.type === 'MESSAGE') {
      console.log(data.data)
    }
  }
  return { status, sendMessage };
};
export default useChat;
