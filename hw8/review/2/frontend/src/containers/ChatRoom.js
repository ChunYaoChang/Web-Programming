import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import { useQuery, useMutation } from '@apollo/react-hooks';

import ChatModal from "../components/ChatModal";
import Message from "../components/Message";
import ChatBox from "../components/ChatBox"
import Messages from "../components/ChatBox"
import useChatBox from "../hooks/useChatBox"
import { CHAT_QUERY, PUSH_NEW_MESSAGE } from "../graphql"

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {

  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [activeFriend, setActiveFriend] = useState("")
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  const [messages, setMessages] = useState([]);

  const [pushNewMessage] = useMutation(PUSH_NEW_MESSAGE);

  const should_skip_chatQuery = activeFriend === ""
  const { loading, error, data } = useQuery(CHAT_QUERY, {
    variables: {
      name: me,
      to: activeFriend
    },
    skip: should_skip_chatQuery,
    onCompleted: (data) => {
      setMessages(data.chat)
    }
  });


  // console.log(chat)

  const YunSetActKey = (key) => {
    console.log("key change")
    setActiveKey(key)
  }
  const addChatBox = () => { setModalVisible(true); };

  // useEffect(() => {
  //   if (chat === null)
  //     return

  //   const { type, data } = chat

  //   switch (type) {
  //     case "CHAT": {
  //       setMessages(data.messages);
  //       break;
  //     }
  //     case "MESSAGE": {
  //       setMessages([...messages, data.message])
  //       break;
  //     }
  //     default: break;
  //   }
  // }, [chat])

  return (
    <> <div className="App-title">
      <h1>{me}'s Chat Room</h1> </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          onEdit={(targetKey, action) => {
            if (action === "add")
              addChatBox();
            else if (action === "remove") {
              setActiveKey(removeChatBox(targetKey, activeKey));
            }
          }}
          activeKey={activeKey}
          onChange={(key) => {
            YunSetActKey(key);
            const friend = chatBoxes.find(chatBox => chatBox.key === key).friend
            setActiveFriend(friend)
          }}
        >
          {chatBoxes.map(({ friend, key, chatLog }) =>
            <TabPane tab={friend} key={key} closable={true}>
              <ChatBox name={me} to={friend}></ChatBox>
            </TabPane>)}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            YunSetActKey(createChatBox(name, me));
            setActiveFriend(name);
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
          // get friend name

          // const conversation = activeKey.split('_')
          // const me_idx = conversation.indexOf(me)
          // const friend_idx = me_idx === 0 ? 1 : 0
          // const friend = conversation[friend_idx]

          pushNewMessage({
            variables: {
              data: {
                name: me,
                to: activeFriend,
                body: msg
              }
            }
          })
          // sendMessage(me, friend, msg);
          setMessageInput("");
        }}
      ></Input.Search>
    </>);
};

export default ChatRoom;