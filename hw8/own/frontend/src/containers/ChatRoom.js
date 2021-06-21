import "../App.css";
import { Component, useEffect, useState } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "../components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import MessageLayout from "../components/MessageLayout";
import ChatBox from "../components/ChatBox"
import {useMutation, useQuery} from "@apollo/react-hooks";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, CHATBOX_SUBSCRIPTION } from "../graphql"

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
  // const [chatBoxes, setChatBoxes] = useState([])
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const addChatBox = () => { setModalVisible(true); };
  const [activeKey, setActiveKey] = useState("")
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox()
  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION)
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION)
  // const { loading, error, data, subscribeToMore } = useQuery(CHATBOX_QUERY, {
  //   variables: {
  //     name: activeKey
  //   },
  // })

  // useEffect(() => {
  //   try {
  //     subscribeToMore({
  //       document: CHATBOX_SUBSCRIPTION,
  //       variables: {name: activeKey},
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data) return prev
  //         const newMessage = subscriptionData.data.chatBox.data
  //         return Object.assign({}, prev, {
  //           queryChatBox: {
  //             messages: [...prev.queryChatBox, newMessage]
  //           },
  //         })
  //       },
  //     })
  //   } catch (e) {
  //     displayStatus({type: 'error', msg: 'fail in subscription: ' + e})
  //   }
  // }, [subscribeToMore, activeKey])

  // const renderChatLog = (chatLog) => {
  //   return chatLog.map(({name, body}, i) => {
  //     return (
  //       <MessageLayout
  //         name={name}
  //         body={body}
  //         sentByMe={name === me}
  //         key={`M_${name}_${i}`}
  //         i={i}
  //         ></MessageLayout>
  //     )
  //   })
  // }

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
              // console.log(friend, key, chatLog)
              return (
                <TabPane tab={friend} 
                  key={key} closable={true}>
                  <ChatBox me={me} chatKey={key}></ChatBox>
                </TabPane>
            );})}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={async ({ name }) => {
            await startChat({
              variables: {
                name1: me,
                name2: name
              },
            })
            try {
              setActiveKey(createChatBox(name, me));
              setModalVisible(false);
            } catch (e) {
              window.alert(e)
            }
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
            sendMessage({
              variables: {
                chatBoxName: activeKey,
                sender: me,
                message: msg
              },
            })
            setMessageInput("")
          }}
        ></Input.Search> 
    </>);
  };
export default ChatRoom;
  
