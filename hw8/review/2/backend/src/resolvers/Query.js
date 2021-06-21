import { makeName, validateUser, validateChatBox } from "../utils.js"


const Query = {
  async chat(parent, { name, to }, { db }, info) {
    const chatBoxName = makeName(name, to);

    const sender = await validateUser(name);
    const receiver = await validateUser(to);
    const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

    console.log("messages", "from", sender, "to", receiver, "!")
    return chatBox.messages.map(({ sender: { name }, body }) => ({
      name,
      body,
    }))
  }
};

export { Query as default };
