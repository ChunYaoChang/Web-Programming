import { v4 as uuidv4 } from 'uuid';

const Mutation = {
  async createUser(parent, args, { db }, info) {
    const name = db.UserModel.some((user) => user.name === args.data.name);

    if (name) {
      throw new Error('Name taken');
    }

    const user = {
      id: uuidv4(),
      ...args.data,
    };

    db.UserModel.push(user);

    return user;
  },

  async createChatBox(parent, { name1, name2 },
                              { db, pubsub }, info)
  {
    if (!name1 || !name2)
      throw new Error
      ("Missing chatBox name for CreateChatBox");
    // if (!(await checkUser(db, name1, "createChatBox"))) {
    //   console.log
    //   ("User does not exist for CreateChatBox: " + name1);
    //   await createUser(db, name1);
    // }
    // if (!(await checkUser(db, name2, "createChatBox"))) {
    //   console.log
    //   ("User does not exist for CreateChatBox: " + name2);
    //   // await createUser(db, name1);
    // }
    // ...
  }
}