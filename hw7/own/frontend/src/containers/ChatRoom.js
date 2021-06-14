import "../App.css";
import { Component, useState } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "../components/ChatModal";
import useChat from "../hooks/useChat"

const { TabPane } = Tabs;
const ChatRoom = ({ me }) => {
  const [chatBoxes, setChatBoxes] = useState([
    { friend: "Mary", key: me <= "Mary" ? `${me}_Mary` : `Mary_${me}`, 
      chatLog: [] },
    { friend: "Peter", key: me <= "Peter" ? `${me}_Peter` : `Peter_${me}`, 
      chatLog: [] }
  ]);
  // const [chatBoxes, setChatBoxes] = useState([])
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const addChatBox = () => { setModalVisible(true); };
  const [activeKey, setActiveKey] = useState("")
  const {sendMessage} = useChat()
  

  const createChatBox = (friend) => {
    const newKey = me <= friend ?
          `${me}_${friend}` : `${friend}_${me}`;
    sendMessage({type: "CHAT", activeKey: newKey})
    // if (chatBoxes.some(({ key }) => key === newKey)) {
    //   throw new Error(friend + "'s chat box has already opened.");
    // }
    // const newChatBoxes = [...chatBoxes];
    // const chatLog = [];
    // newChatBoxes.push({ friend, key: newKey, chatLog });
    // setChatBoxes(newChatBoxes);
    // setActiveKey(newKey);

  };

  const removeChatBox = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) { lastIndex = i - 1; }});
    const newChatBoxes = chatBoxes.filter(
      (chatBox) => chatBox.key !== targetKey);
    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newChatBoxes[lastIndex].key;
        } else { newActiveKey = newChatBoxes[0].key; }
      }
    } else newActiveKey = ""; // No chatBox left
    setChatBoxes(newChatBoxes);
    setActiveKey(newActiveKey);
  };


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
            else if (action === "remove") removeChatBox(targetKey)
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
            createChatBox(name);
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
          onSearch={(msg) => 
            { sendMessage({type: "MESSAGE", activeKey, msg}) }}
        ></Input.Search> 
    </>);
  };
export default ChatRoom;
  
