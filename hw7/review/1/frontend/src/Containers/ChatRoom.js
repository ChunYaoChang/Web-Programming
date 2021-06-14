import "../App.css";
import { useState } from "react";
import { Tabs, Input, Tag } from "antd";
import ChatModal from "../Components/ChatModal"
const { TabPane } = Tabs;
const client = new WebSocket('ws://localhost:8080')
export default ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const addChatBox = () => { setModalVisible(true); };
    const [activeKey, setActiveKey] = useState("");
    const [chatBoxes, setChatBoxes] = useState([]);

    const sendData = async (e) => {
        const msg = JSON.stringify(e)
        console.log('sendMessage:', msg);
        await client.send(msg);
    };
    const sendMessage = (activeKey, body) => {
        let to = activeKey.split("_");
        to = (me === to[0]) ? to[1] : to[0];
        const name = me;
        sendData({ type: "MESSAGE", data: { name, to, body } })
    }
    const createChatBox = async (friend, me) => {
        const newKey = me <= friend ?
            `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
            displayStatus({
                type: "error",
                msg: "duplicate chatbox with same person.",
            });
                return
        }
        const newChatBoxes = [...chatBoxes];
        const chatLog = [];
        newChatBoxes.push({ friend, key: newKey, chatLog });
        setChatBoxes(newChatBoxes);
        setActiveKey(newKey);
        sendData({ type: "CHAT", data: { name: me, to: friend } });
    };
    const removeChatBox = (targetKey, activeKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
        chatBoxes.forEach(({ key }, i) => {
            if (key === targetKey) { lastIndex = i - 1; }
        });
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
        setActiveKey(newActiveKey);
    };
    client.onmessage = (byteString) => {
        const { data } = byteString
        const parsed = JSON.parse(data)
        console.log('recv data', parsed)
        const newChatBoxes = [...chatBoxes]
        /*
        { friend: "Mary", key: "MaryChatbox", chatLog: [] },
        { friend: "Peter", key: "PeterChatBox", chatLog: [] }
      */
        switch (parsed.type) {
            case "CHAT": {
                if (parsed.data.messages.length > 0) {
                    const index = newChatBoxes.findIndex(x => x.key === activeKey)
                    if (index !== -1) {
                        console.log('index', index, newChatBoxes)
                        newChatBoxes[index].chatLog = parsed.data.messages
                    }
                }
                displayStatus({
                    type: "success",
                    msg: "Message loaded",
                });
                break
            }
            case "MESSAGE": {
                const index = newChatBoxes.findIndex(x => x.key === activeKey)
                if (index !== -1) {
                    console.log("recv msg:", parsed.data.message)
                    newChatBoxes[index].chatLog.push(parsed.data.message)
                }

                displayStatus({
                    type: "success",
                    msg: "Message Sent",
                });
                break
            }
        }
        setChatBoxes(newChatBoxes)
    }

    return (
        <>
            <div className="App-title">
                <h1>{me}'s Chat Room</h1>
            </div>
            <div className="App-messages">
                <Tabs type="editable-card"
                    onEdit={(targetKey, action) => {
                        if (action === "add") addChatBox();
                        else if (action === "remove") removeChatBox(targetKey, activeKey);
                    }}
                    activeKey={activeKey}
                    onChange={(key) => { setActiveKey(key); }}>
                    {chatBoxes.map(({ friend, key, chatLog }) => {
                        return (
                            <TabPane tab={friend} key={key} closable={true}>
                                <p>{friend}'s chatbox.</p>
                                { chatBoxes.filter(x => x.key === activeKey).map(chatBox => (
                                    chatBox.chatLog.map((item, i) => {
                                        if (item.name === me) {
                                            return (
                                                <p className="App-message" key={i} style={{wordWrap:"break-word", position : "relative",right:"0px", textAlign : 'right'}}>
                                                    {item.body}<Tag>{item.name}</Tag>
                                                </p>
                                            )
                                        }
                                        else {
                                            return (
                                                <p className="App-message" key={i} style={{wordWrap:"break-word", position : "relative",left:"0px", textAlign : 'left'}}>
                                                    <Tag>{item.name}</Tag>{item.body}
                                                </p>
                                            )
                                        }
                                    })
                                ))}
                            </TabPane>
                        )
                    })
                    }
                </Tabs>
                <ChatModal
                    visible={modalVisible}
                    onCreate={({ name }) => {
                        createChatBox(name, me)
                        setModalVisible(false);
                    }}
                    onCancel={() => {
                        setModalVisible(false);
                    }}
                >
                </ChatModal>

            </div>

            <Input.Search
                value={messageInput}
                onChange={(e) => { setMessageInput(e.target.value) }}
                enterButton="Send"
                placeholder="Enter message here..."
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
                    sendMessage(activeKey, msg);
                    setMessageInput("");
                }}>
            </Input.Search>
        </>);
};
