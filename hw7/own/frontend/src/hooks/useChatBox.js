import { useState } from "react"; 

const useChatBox = () => {
  const [chatBoxes, setChatBoxes] = useState([]);
  const createChatBox = (server, friend, me) => {
    const newKey = me <= friend ?
          `${me}_${friend}` : `${friend}_${me}`;
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    server.sendEvent({
      type: 'CHAT',
      data: {to:friend, name: me}
    })
    return newKey
  };

  const removeChatBox = (targetKey, activeKey) => {
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
    return newActiveKey
  };

  const onEvent = (e, me, activeKey) => {
    console.log(e, me, activeKey)
    const {type} = e
    const tmp = activeKey.split('_')
    const friend = (me === tmp[0]) ? tmp[1] : tmp[0]

    if (type === 'CHAT') {
      const newChatBoxes = [...chatBoxes]
      newChatBoxes.push({friend: friend, key: activeKey, chatLog: e.data.messages})
      console.log(newChatBoxes)
      setChatBoxes(newChatBoxes)
    } else if (type === 'MESSAGE') {
      const newChatBoxes = [...chatBoxes]
      for (let i = 0; i < chatBoxes.length; i++) {
        console.log(i, e.key, chatBoxes[i].key)
        if (e.key === chatBoxes[i].key) {
          newChatBoxes[i].chatLog.push(e.data.message)
          console.log(newChatBoxes[i])
          setChatBoxes(newChatBoxes)
          break;
        }
      }
    }
  }
  return { chatBoxes, createChatBox, removeChatBox, onEvent };
};
export default useChatBox;
