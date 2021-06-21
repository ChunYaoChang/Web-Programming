import { useState, useEffect } from "react";
import useChat from "./useChat";

const useChatBox = () => {
    const [chatBoxes, setChatBoxes] = useState([]);
    const { client, createChat } = useChat();

    const createChatBox = (friend, me) => {
        const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
            throw new Error(friend + "'s chat box has already opened.");
        }
        createChat(friend, me);
        return newKey;
    };

    const removeChatBox = (targetKey, activeKey) => {
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

    const updateMessage = () => {
        client.onmessage = (m) => {
            const data = JSON.parse(m.data);
            const { type } = data;

            switch (type) {
                case "CHAT": {
                    let {
                        data: { key: targetKey, to: friend, messages: mes },
                    } = data;
                    const newChatBoxes = [...chatBoxes];
                    if (mes.length === 0) mes = [];
                    newChatBoxes.push({ friend, key: targetKey, chatLog: mes });
                    setChatBoxes(() => newChatBoxes);
                    break;
                }
                case "MESSAGE": {
                    const {
                        data: { key: targetKey, message: mes },
                    } = data;

                    setChatBoxes((prev) => {
                        return prev.map((chatbox) => {
                            if (chatbox.key === targetKey) {
                                chatbox.chatLog.push(mes);
                            }
                            return chatbox;
                        });
                    });
                    break;
                }
            }
        };
    };

    return { updateMessage, chatBoxes, createChatBox, removeChatBox };
};
export default useChatBox;
