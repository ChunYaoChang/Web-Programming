import { useState } from "react";
const client = new WebSocket('ws://localhost:4000')
const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});

    client.onmessage = (byteString) => {
        // const { data } = byteString
        const { type, data } = JSON.parse(byteString.data)
        switch (type) {
            case 'CHAT': {
                setMessages(() => data.messages); break;
            }
            case 'MESSAGE': {
                setMessages(() => [...messages, data.message]); break;
            }
            case "status": { setStatus(data); break;}
            default: break;
        }
    }
    const sendData = async (data) => { 
        await client.send(
            JSON.stringify(data));
    };
    const sendChatBox = (payload) => {
        sendData({type: 'CHAT', data: payload});
    };
    const sendMessage = (payload) => { 
        sendData({type: 'MESSAGE', data: payload});
    };  
 
    return {
        status,
        messages,
        sendChatBox,
        sendMessage,
    };
};
export default useChat;
      