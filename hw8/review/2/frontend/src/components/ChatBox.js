import { useState, useEffect } from "react";
// import { message as AntMessage } from "antd";
import { useQuery } from '@apollo/react-hooks';

import { MESSAGES_SUBSCRIPTION } from "../graphql";
import { CHAT_QUERY } from "../graphql"
import Message from "./Message";

export const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const ChatBox = ({ name, to }) => {
  const [messages, setMessages] = useState([])

  const { loading, error, data, subscribeToMore } = useQuery(CHAT_QUERY, {
    variables: {
      name: name,
      to: to
    },
    onCompleted: (data) => {
      setMessages(data.chat)
    }
  });

  useEffect(() => {
    try {
      subscribeToMore({
        document: MESSAGES_SUBSCRIPTION,
        vairables: { userList: [name, to] },
        updateQuery: (prev, { subscriptionData }) => {
          console.log("testingSubscribeToMore")
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.message.data;

          console.log("test", prev)
          //setMessages
          return {
            ...prev,
            chat: [newMessage, ...prev.chat],
          };
        },
      });
    } catch (e) { }
  }, [subscribeToMore]);


  if (messages.length === 0)
    return false
  else
    return (<div>
      {
        messages.map(({ name, body }, i) => {
          console.log("strange")
          return <Message me={name} name={to} message={body} key={i}></Message>
        })
      }</div>)
};

export default ChatBox;