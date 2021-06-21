import uuidv4 from 'uuid/v4';

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const checkUser = async (db, name1, type) => {
  if (type === "createChatBox") {
    const e = await db.UserModel.findOne({name: name1})
    // console.log(e)
    if (e) {
      // console.log(name1)
      return true
    } else return false
  }
}

const newUser = async (db, name1) => {
  const nUser = new db.UserModel({name: name1})
  await nUser.save()
}


const Mutation = {
  async createChatBox(parent, { name1, name2 }, { db, pubsub }, info) {
    if (!name1 || !name2)
      throw new Error("Missing chatBox name for CreateChatBox");
    if (!(await checkUser(db, name1, "createChatBox"))) {
      console.log("User does not exist for CreateChatBox: " + name1);
      await newUser(db, name1);
    }
    if (!(await checkUser(db, name2, "createChatBox"))) {
      console.log("User does not exist for CreateChatBox: " + name2);
      await newUser(db, name2);
    }
    const newName = makeName(name1, name2)
    let existing = await db.ChatBoxModel.findOne({name: newName})
    // console.log('_________________________________________')
    if (!existing) {
      const nChatBox = new db.ChatBoxModel({id: uuidv4(), name: newName, messages: []})
      await nChatBox.save()
      return nChatBox
    }
    return existing
  },

  async createMessage(parent, { data }, { db, pubsub }, info) {
    const sender = data.sender
    const message = data.message
    const name = data.chatBoxName
    if (!message.length) {
      throw new Error("Empty String")
    }
    const senderID = await db.UserModel.findOne({name: sender})
    // console.log(senderID)
    // console.log('___________________________________________________')
    const nMessage = new db.MessageModel({sender: senderID, body: message})
    await nMessage.save()
    const nowChatBox = await db.ChatBoxModel.findOne({name: name})
    nowChatBox.messages.push(nMessage)
    await nowChatBox.save()
    // console.log(nowChatBox.messages.length)
    pubsub.publish(`chatBox ${name}`, {chatBox: {mutation: 'CREATED', data: nMessage}})
    return nMessage
  }
}

export { Mutation as default };
