import "../App.css";
import { Component, useState } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "../components/ChatModal";
import useChat from "../hooks/useChat"
import useChatBox from "../hooks/useChatBox";
import MessageLayout from "../components/MessageLayout";

const server = new WebSocket('ws://localhost:4000')
server.open = () => {
  console.log('server connected on port 4000!')
}
server.sendEvent = (e) => {
  server.send(JSON.stringify(e))
}

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
  // const [chatBoxes, setChatBoxes] = useState([])
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const addChatBox = () => { setModalVisible(true); };
  const [activeKey, setActiveKey] = useState("")
  const { chatBoxes, createChatBox, removeChatBox, onEvent } = useChatBox()
  const {sendMessage} = useChat()
  
  server.onmessage = (e) => {
    onEvent(JSON.parse(e.data), me, activeKey)
  }

  const renderChatLog = (chatLog) => {
    return chatLog.map(({name, body}, i) => {
      return (
        <MessageLayout
          name={name}
          body={body}
          sentByMe={name === me}
          key={`M_${name}_${i}`}
          i={i}
          ></MessageLayout>
      )
    })
  }

  return (
    <> <div className="App-title">
        <h1>{me}'s Chat Room</h1> </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") setActiveKey(removeChatBox(activeKey, targetKey))
          }}
        >
          {chatBoxes.map((
            { friend, key, chatLog }) => {
              console.log(friend, key, chatLog)
              return (
                <TabPane tab={friend} 
                  key={key} closable={true}>
                  <div className='overflow'>
                    {renderChatLog(chatLog)}
                  </div>
                </TabPane>
            );})}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(server, name, me));
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
          displayStatus={displayStatus}
        />
        </div>
        <Input.Search
          value={messageInput}
          onChange={(e) => 
            setMessageInput(e.target.value)}
          enterButton="Send"
          placeholder=
            "Enter message here..."
          onSearch={(msg) => {
            if (!msg) {
              displayStatus({type: 'error', msg: 'Please enter message'})
              return
            } else if (!activeKey) {
              displayStatus({type: 'error', msg: 'Please add a chatbox first'})
              return
            }
            sendMessage(server, {me: me, key: activeKey, body: msg})
            setMessageInput("")
          }}
        ></Input.Search> 
    </>);
  };
export default ChatRoom;
  
