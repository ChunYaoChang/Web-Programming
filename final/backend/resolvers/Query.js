const Query = {
  async userById(parent, { id }, { db }, info) {
    return await db.UserModel.findById(id);
  },
  async user(parent, { username }, { db }, info) {
    return await db.UserModel.findOne({username: username});
  },

  async allUser(parent, {}, { db }, info) {
    return await db.UserModel.find({});
  },

  // async login(parent, { username, password }, { db }, info) {
  //   const existing = await db.UserModel.findOne({username: username, password: password})
  //   return (existing) ? true : false
  // },

  async activity(parent, { title }, { db }, info) {
    return await db.ActivityModel.find({title: title});
  },

  async allActivity(parent, {}, { db }, info) {
    return await db.ActivityModel.find({}).sort({ startDatetime: 'ascending' });
  },

  async video(parent, { gameName }, { db }, info) {
    return await db.VideoModel.find({gameName: gameName});
  },

  async allVideo(parent, {}, { db }, info) {
    return await db.VideoModel.find({}).sort({ datetime: 'ascending' });
  }
};

export { Query as default };
