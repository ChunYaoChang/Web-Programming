const Activity = {
  createdUser(parent, args, { db }, info) {
    return Promise.resolve(db.UserModel.findById(parent.createdUser));
  },
  participants(parent, args, { db }, info) {
    return Promise.all(
      parent.participants.map((uId) => 
          db.UserModel.findById(uId)),
    );
  },
};
  
export default Activity;
    