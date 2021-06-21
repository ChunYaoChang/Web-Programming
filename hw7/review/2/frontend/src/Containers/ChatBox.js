import { useEffect, useRef } from "react";
const ChatBox = ({ me, chatKey, chatLog }) => {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <>
      {chatLog.map(({ body, name }, i) => {
        let chat_className = "chat-message-group" + (me === name ? " writer-user" : "");
        return (
          <div key={i} className="card-content chat-content">
            <div className="content">
              <div className={chat_className}>
                <div className="chat-messages">
                  <div className="message">{body}</div>
                  <div className="from">{name}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </>
  );
};
export default ChatBox;