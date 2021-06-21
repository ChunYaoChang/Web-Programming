import './App.css' 
import { useState, useEffect } from 'react'
import { message } from "antd";
import useChat from './hooks/useChat'
import SignIn from './containers/SignIn'
import ChatRoom from './containers/ChatRoom'

const LOCALSTORAGE_KEY = "save-me";

const App = () => {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState(savedMe || "");
  const { status, messages, sendChatBox, sendMessage } = useChat();

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg, duration: 1
      }
      switch (type) {
      	case 'success':
      		message.success(content)
      		break
      	case 'error':
      	default:
      		message.error(content)
      		break
      }
  }}

  useEffect(() => { 
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn, me]);

  useEffect(() => {
    displayStatus(status)
  }, [status])

  return (
    <div className="App">
      {signedIn? (
      <ChatRoom 
        me={me} 
        messages={messages} 
        displayStatus={displayStatus} 
        sendMessage={sendMessage}
        sendChatBox={sendChatBox}
      />) : (
      <SignIn
        me={me}
        setMe={setMe}
        setSignedIn={setSignedIn}
        displayStatus={displayStatus}
      />)}
    </div> 
  );
};

export default App
