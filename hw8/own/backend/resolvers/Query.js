const Query = {
  async user(parent, args, { db }, info) {
    return await db.UserModel.findOne({name: args.query});
  },

  async chatBox(parent, args, { db }, info) {
    return await db.ChatBoxModel.findOne({name: args.query});
  }
};

export { Query as default };
