const useChat = () => {
    const client = new WebSocket("ws://localhost:8080");

    const sendMessage = async (payload) => {
        const { me: me, key: activeKey, body: msg } = payload;
        const friend = activeKey.replace("_", "").replace(me, "");
        console.log({ type: "MESSAGE", data: { name: me, to: friend, body: msg } });
        await client.send(JSON.stringify({ type: "MESSAGE", data: { name: me, to: friend, body: msg } }));
    };

    const createChat = async (to, name) => {
        await client.send(JSON.stringify({ type: "CHAT", data: { to: to, name: name } }));
    };

    return { client, createChat, sendMessage };
};
export default useChat;
