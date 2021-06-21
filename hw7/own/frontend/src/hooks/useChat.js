import { useState } from "react";  
const useChat = () => {
  const [status, setStatus] = useState({})
  const sendMessage = (server, payload) => {
    const {me, key, body} = payload
    const tmp = key.split('_')
    const friend = (me === tmp[0]) ? tmp[1] : tmp[0]
    server.sendEvent({type:'MESSAGE', data: {to: friend, name: me, body: body}})
  }
  return {status, sendMessage}
};
export default useChat;
