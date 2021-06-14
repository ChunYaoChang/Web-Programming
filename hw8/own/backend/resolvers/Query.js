const Query = {
  user(parent, args, { db }, info) {
    return db.UserModel.findOne({name: args.query});
  },

  chatBox(parent, args, { db }, info) {
    return db.ChatBoxModel.findOne({name: args.query});
  }
};

export { Query as default };
