import "../App.css";
import { useState } from "react";
import { Tabs, Input } from "antd";
import ChatModal from '../components/ChatModal'
import useChatBox from '../hooks/useChatBox'

const { TabPane } = Tabs;
const ChatRoom = ({ me, status, messages, sendChatBox, sendMessage, displayStatus }) => {
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [activeFriend, setActiveFriend] = useState("");
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  const addChatBox = () => {
    setModalVisible(true);
  };

  return (
    <>
    <div className="App-title">
      <h1>{me}'s Chat Room</h1>
    </div> 

    <div  className="App-messages"> 
      <Tabs
        type="editable-card"
        activeKey={activeKey}
        onChange={(key) => { 
          setActiveKey(key);
          const newFriend = key.replace(me, "").replace("_", "")
          setActiveFriend(newFriend);
          sendChatBox({ key: key, name: me, to: newFriend,});
        }}
        onEdit={(targetKey, action) => {
          if (action === "add") addChatBox();
          else if (action === "remove") {
            const { newActiveKey, newFriend } = removeChatBox(targetKey, activeKey);
            setActiveKey(newActiveKey);
            setActiveFriend(newFriend);
            sendChatBox({ key: newActiveKey, name: me, to: newFriend,});
          }
        }}
      >
        {chatBoxes.map((
          { friend, key, chatLog }) => {
            return (
            <TabPane tab={friend} key={key} closable={true}>
              {messages.length === 0 ? (
                <p style={{ color: '#ccc' }}> No messages... </p>
                ):(
                messages.map(({ name, body }, i) => {
                  return (
                    name == me ?
                    (
                      <p className="App-message message-isme" key={i}>
                        <code className="message-content">{body}</code> {name}
                      </p>
                    ) : 
                    ( 
                      <p className="App-message message-notme" key={i}>
                        {name} <code className="message-content">{body}</code> 
                      </p>
                    )
                  )
                })
              )}
            </TabPane>
            );
          })
        }
      </Tabs>
      <ChatModal visible={modalVisible}
          onCreate={({ name }) => {
            const { newKey, newFriend } = createChatBox(name, me, messages);
            sendChatBox({ key: newKey, name: me, to: name,});
            setActiveKey(newKey);
            setActiveFriend(newFriend);
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
    </div>
    <Input.Search
      value={messageInput} onChange={(e) => 
        setMessageInput(e.target.value)} enterButton="Send"
        placeholder="Enter message here..." 
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
          sendMessage({ key: activeKey, name: me, to: activeFriend, body: msg });
          setMessageInput("");
        }}
        ></Input.Search>
    </>
  );
};
export default ChatRoom;