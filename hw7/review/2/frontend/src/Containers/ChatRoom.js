import "../App.css";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";
import { useState } from "react";
import { Tabs, Input } from "antd";
import ChatBox from "./ChatBox";

const { TabPane } = Tabs;
const client = new WebSocket("ws://localhost:4000");
client.onopen = () => console.log("client connected on 4000.");
client.sendEvent = (e) => client.send(JSON.stringify(e));
const ChatRoom = ({ me, displayStatus}) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, createChatBox, removeChatBox, onEvent } = useChatBox();
  const { sendMessage } = useChat();
  const [modalVisible, setModalVisible] = useState(false);
  const addChatBox = () => {
    setModalVisible(true);
  };
  client.onmessage = (m) => {
    onEvent(JSON.parse(m.data), me, activeKey);
  };

  return (
    <>
      <div className="App-title">
        <h1>{me}'s Chat Room</h1>{" "}
      </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
          }}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") setActiveKey(removeChatBox(activeKey, targetKey));
          }}
        >
          {chatBoxes.map(({ friend, key, chatLog }) => {
            return (
              <TabPane tab={friend} key={key} closable={true}>
                <ChatBox me={me} chatKey={key} chatLog={chatLog} />
              </TabPane>
            );
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(client, me, name));
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
        onChange={(e) => setMessageInput(e.target.value)}
        enterButton="Send"
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
            sendMessage(client, { me: me, key: activeKey, body: msg });
            setMessageInput("");
        }}
      ></Input.Search>
    </>
  );
};
export default ChatRoom;
