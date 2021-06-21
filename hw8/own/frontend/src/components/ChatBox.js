import "../App.css";
import { Component, useEffect, useState } from "react";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, CHATBOX_SUBSCRIPTION } from "../graphql"
import {useMutation, useQuery} from "@apollo/react-hooks";
import MessageLayout from "./MessageLayout";
import { Spin } from "antd"

const ChatBox = ({me, chatKey}) => {
  // console.log(chatKey)
  const { loading, error, data, subscribeToMore } = useQuery(CHATBOX_QUERY, {
    variables: {
      query: chatKey
    },
  })
  // console.log(loading)
  // console.log(error)
  // console.log(data)
  useEffect(() => {
    try {
      subscribeToMore({
        document: CHATBOX_SUBSCRIPTION,
        variables: {name: chatKey},
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const newMessage = subscriptionData.data.chatBox.data
          // console.log(newMessage)
          // console.log(prev.chatBox.messages)
          // console.log(Object.assign({}, prev, {
          //   chatBox: {
          //     messages: [...prev.chatBox.messages, newMessage]
          //   },
          // }))
          return {
            chatBox: {
              messages: [...prev.chatBox.messages, newMessage]
            }
          }
          // return Object.assign({}, prev, {
          //   chatBox: {
          //     messages: [...prev.chatBox.messages, newMessage]
          //   },
          // })
        },
      })
    } catch (e) {
      console.log('error: ', e)
    }
  }, [subscribeToMore, chatKey])

  const renderChatLog = (chatLog) => {
    return chatLog.map(({body, sender}, i) => {
      return (
        <MessageLayout
          name={sender.name}
          body={body}
          sentByMe={sender.name === me}
          key={`M_${sender.name}_${i}`}
          i={i}
          ></MessageLayout>
      )
    })
  }
  if (loading) {
    return (
      <Spin style={{display: "flex", justifyContent: "center", alignItems: "center"}}></Spin>
    )
  }
  // console.log(data.chatBox.messages)
  return (
    <div className='overflow'>
      {renderChatLog(data.chatBox.messages)}
    </div>
  )
}
export default ChatBox