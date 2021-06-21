const Message = {
    sender(parent, argc, {db}, info) {
        return Promise.resolve(db.UserModel.findById(parent.sender))
    }
}
module.exports = Message