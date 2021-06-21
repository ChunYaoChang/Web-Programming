import { useState } from "react"; 

const useChatBox = () => {
  const [chatBoxes, setChatBoxes] = useState([]);

  const createChatBox = (friend, me) => {
    const newKey = me <= friend ?
          `${me}_${friend}` : `${friend}_${me}`;
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend +
                      "'s chat box has already opened.");
    }
    const newChatBoxes = [...chatBoxes];
    const chatLog = [];
    newChatBoxes.push({ friend, key: newKey, chatLog });
    setChatBoxes(newChatBoxes);
    // setActiveKey(newKey);
    return newKey;
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
    // setActiveKey(newActiveKey);
    return newActiveKey;
  };

  const addNewMessage = (targetKey, message) => {
    let chatBox = chatBoxes.find((e) => e.key === targetKey);
    chatBox.chatLog.push(message);
    const otherBoxes = chatBoxes.filter((e) => e.key !== targetKey);
    setChatBoxes([...otherBoxes, chatBox]);
  };
  const addOldMessages = (targetKey, messages) => {
    let chatBox = chatBoxes.find((e) => e.key === targetKey);
    chatBox.chatLog = messages;
    const otherBoxes = chatBoxes.filter((e) => e.key !== targetKey);
    setChatBoxes([...otherBoxes, chatBox]);
  };
  return { chatBoxes, createChatBox, removeChatBox, addNewMessage, addOldMessages};
};
export default useChatBox;
