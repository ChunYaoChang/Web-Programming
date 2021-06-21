import { useState } from "react";
const useChatBox = () => {
  const [chatBoxes, setChatBoxes] = useState([]);
  const onEvent = (e, me, activeKey) => {
    const { type } = e;
    const key_split = activeKey.split("_");
    const friend = me === key_split[0] ? key_split[1] : key_split[0];

    switch (type) {
      case "CHAT": {
        const newChatBoxes = [...chatBoxes];
        newChatBoxes.push({ friend: friend, key: activeKey, chatLog: e.data.messages });
        setChatBoxes(newChatBoxes);
        break;
      }
      case "MESSAGE": {
        const newChatBoxes = [...chatBoxes];
        let index = 0;
        for (let i = 0; i < chatBoxes.length; i++) {
          if (chatBoxes[i].key === e.key) {
            index = i;
            break;
          }
        }
        newChatBoxes[index].chatLog.push(e.data.message);
        setChatBoxes(newChatBoxes);
        break;
      }
      default: {
        break;
      }
    }
  };
  const removeChatBox = (activeKey, targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newChatBoxes = chatBoxes.filter((chatBox) => chatBox.key !== targetKey);
    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newChatBoxes[lastIndex].key;
        } else {
          newActiveKey = newChatBoxes[0].key;
        }
      }
    } else newActiveKey = ""; // No chatBox left
    setChatBoxes(newChatBoxes);
    return newActiveKey;
  };

  const createChatBox = (client, me, friend) => {
    const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    client.sendEvent({
      type: "CHAT",
      data: { to: friend, name: me },
    });
    return newKey;
  };
  return { chatBoxes, createChatBox, removeChatBox, onEvent };
};
export default useChatBox;