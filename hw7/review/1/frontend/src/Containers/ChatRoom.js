import "../App.css";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";
import { useState } from "react";
import { Tabs, Input, Tag} from "antd";

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
  // const [chatBoxes, setChatBoxes] = useState([
  //   { friend: "Mary", key: "MaryChatbox", 
  //     chatLog: [] },
  //   { friend: "Peter", key: "PeterChatBox", 
  //     chatLog: [] }
  // ]);
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, createChatBox, removeChatBox, addNewMessage, addOldMessages} = useChatBox();
  const { sendMessage } = useChat(addNewMessage, addOldMessages);
  const [modalVisible, setModalVisible] = useState(false);


  const addChatBox = () => { setModalVisible(true); };

  



  return (
    <> <div className="App-title">
         <h1>{me}'s Chat Room</h1> </div>
      <div className="App-messages">
        <Tabs 
          type="editable-card"
          onEdit={(targetKey, action) => {
              if (action === "add") addChatBox();
              else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
          }}
          activeKey={activeKey}
          onChange={(key) => { setActiveKey(key); }}
        >
          {chatBoxes.map((
            { friend, key, chatLog }) => {
            // if (chatLog[0]) {

            return (
              <TabPane tab={friend} 
                key={key} closable={true}>
                {chatLog.map((msg) => {
                  if (msg.name === me) {
                    return (<p className="App-message-self">{msg.body} <Tag color="blue">{msg.name}</Tag></p>);
                  } else {
                    return (<p className="App-message"><Tag color="blue">{msg.name}</Tag> {msg.body}</p>);
                  }
                })}
              </TabPane>);
            // } else {
            //   return (
            //   <TabPane tab={friend} 
            //     key={key} closable={true}>
            //     <p>
            //       nothing
            //     </p>
            //   </TabPane>);
            // }
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={async ({ name }) => {
            await setActiveKey(createChatBox(name, me));
            await sendMessage({
              type: 'CHAT',
              data: { name: me, to: name}
            });
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
        onSearch={async (msg) => {
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
          const activeChatBox = await chatBoxes.find((e) => e.key === activeKey);
          await sendMessage({
            type: 'MESSAGE',
            data: { to: activeChatBox.friend, name: me, body: msg }
          });
          setMessageInput("");
        }}

      ></Input.Search> 
  </>);
};
export default ChatRoom;
