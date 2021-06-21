import "../App.css";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";
import { useState, useEffect } from "react";
import { Tabs, Input, Tag } from "antd";

const ChatRoom = ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const { updateMessage, chatBoxes, createChatBox, removeChatBox } = useChatBox();
    const { client, sendMessage } = useChat();
    const { TabPane } = Tabs;

    const addChatBox = () => {
        setModalVisible(true);
    };
    const style = { "margin-right": 9 };
    useEffect(() => {
        updateMessage();
    }, [client, chatBoxes]);

    return (
        <>
            <div className="App-title">
                <h1>{me}'s Chat Room</h1>{" "}
            </div>
            <div className="App-messages">
                <Tabs
                    type="editable-card"
                    onEdit={(targetKey, action) => {
                        if (action === "add") addChatBox();
                        else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
                    }}
                    activeKey={activeKey}
                    onChange={(key) => {
                        setActiveKey(key);
                    }}>
                    {chatBoxes.map(({ friend, key, chatLog }) => {
                        return (
                            <TabPane tab={friend} key={key} closable={true}>
                                {chatLog.map(({ name, body }, i) => {
                                    return name === me ? (
                                        <div className="App-message my-message" key={i}>
                                            <span style={style}>{body}</span>
                                            <Tag color="blue">{name}</Tag>
                                        </div>
                                    ) : (
                                        <div className="App-message others-message" key={i}>
                                            <Tag color="magenta">{name}</Tag>
                                            <span>{body}</span>
                                        </div>
                                    );
                                })}
                            </TabPane>
                        );
                    })}
                </Tabs>
                <ChatModal
                    visible={modalVisible}
                    onCreate={({ name }) => {
                        setActiveKey(createChatBox(name, me));
                        setModalVisible(false);
                    }}
                    onCancel={() => {
                        setModalVisible(false);
                    }}
                />
            </div>
            <Input.Search
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
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
                    sendMessage({ me: me, key: activeKey, body: msg });
                    setMessageInput("");
                }}></Input.Search>
        </>
    );
};
export default ChatRoom;
