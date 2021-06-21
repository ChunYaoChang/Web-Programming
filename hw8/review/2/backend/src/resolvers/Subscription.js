import { makeName } from "../utils.js";

const Subscription = {
  message: {
    subscribe(parent, { userList }, { db, pubsub }, info) {
      const [user1, user2] = userList;
      const chatBoxName = makeName(user1, user2)

      console.log("enter subscription", chatBoxName)

      return pubsub.asyncIterator(`comment ${chatBoxName}`);
    },
  },
};

export { Subscription as default };
