import { makeName, validateUser, validateChatBox } from "../utils.js";

const Mutation = {
  async pushNewMessage(parent, { data }, { db, pubsub }, info) {
    console.log("????!!!!")
    const { name, to, body } = data
    const chatBoxName = makeName(name, to);

    const sender = await validateUser(name);
    const receiver = await validateUser(to);
    const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

    console.log("@!#@!@")
    const newMessage = db.model("Message")({ sender, body });
    await newMessage.save();

    chatBox.messages.push(newMessage);
    await chatBox.save()

    console.log("mutation result", newMessage)
    console.log("mutation publish", chatBoxName)

    pubsub.publish(`message ${chatBoxName}`, {
      message: {
        mutation: "UPDATE",
        data: {
          send: newMessage.send,
          body: newMessage.body
        }
      }
    })

    return // I'm not sure if I should return ID or return null
  }
};

export { Mutation as default };
