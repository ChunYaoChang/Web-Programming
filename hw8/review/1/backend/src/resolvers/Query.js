const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.UserModel;
    }

    return db.UserModel.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
};

export { Query as default };
