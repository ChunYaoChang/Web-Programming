import "../App.css";
import { Component, useState } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "../components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat"

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const addChatBox = () => { setModalVisible(true); };
  const [activeKey, setActiveKey] = useState("")
  const {sendMessage} = useChat()
  const {chatBoxes, createChatBox, removeChatBox} = useChatBox()

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
            else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey))
          }}
        >
          {chatBoxes.map((
            { friend, key, chatLog }) => {
              return (
                <TabPane tab={friend} 
                  key={key} closable={true}>
                  <p>{friend}'s chatbox.</p>
                </TabPane>
            );})}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name, me));
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
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
              displayStatus({
                type: "error",
                msg: "Please enter message.",
              });
              return;
            } else if (activeKey === "") {
              displayStatus({
                type: "error",
                msg: "Please add a chatbox first.",
              });
              setMessageInput("");
              return;
            }
            sendMessage({ key: activeKey, body: msg });
            setMessageInput("");
          }}
    
        ></Input.Search> 
    </>);
  };
export default ChatRoom;
  
