import { useState } from "react";

const useChatBox = () => {

  const [chatBoxes, setChatBoxes] = useState([]);
  
  const createChatBox = (newFriend, me) => {
    const newKey = me <= newFriend ?
        `${me}_${newFriend}` : `${newFriend}_${me}`;
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(newFriend +
                      "'s chat box has already opened.");
    }
    const newChatBoxes = [...chatBoxes];
    const chatLog = [];
    newChatBoxes.push({ friend: newFriend, key: newKey, chatLog: chatLog });
    setChatBoxes(newChatBoxes);
    return { newKey, newFriend };
  };

  const removeChatBox = (targetKey, activeKey) => {
    let newActiveKey = activeKey;
    let newFriend;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) { lastIndex = i - 1; }});
    const newChatBoxes = chatBoxes.filter(
      (chatBox) => chatBox.key !== targetKey);
    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) { 
        if (lastIndex >= 0) {
          newActiveKey = newChatBoxes[lastIndex].key; 
          newFriend = newChatBoxes[lastIndex].friend; 
        }
        else { 
          newActiveKey = newChatBoxes[0].key; 
          newFriend = newChatBoxes[0].friend; 
        }
      }
    } else {
      newActiveKey = ""; // No chatBox left 
      newFriend = "";
    }
    setChatBoxes(newChatBoxes);
    return { newActiveKey, newFriend };
  }

  return { chatBoxes, createChatBox, removeChatBox };
};
export default useChatBox;
   