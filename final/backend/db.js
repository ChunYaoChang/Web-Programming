  
import mongoose from 'mongoose'
// const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  nickname: { type: String },
  isCaptain: { type: Boolean },
  isVerified: { type: Boolean},
  verifiedUrl: { type: String}
});

const activitySchema = new Schema({
  createdUser: { type: mongoose.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  startDatetime: { type: String, required: true },
  endDatetime: { type: String, required: true },
  participants: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
})

const videoSchema = new Schema({
  gameName: { type: String, required: true },
  gameType: { type: String, required: true },
  datetime: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
})

const UserModel = mongoose.model('User', userSchema);
const ActivityModel = mongoose.model('Activity', activitySchema);
const VideoModel = mongoose.model('Video', videoSchema);

const db = {
  UserModel,
  ActivityModel,
  VideoModel
};

export { db as default };
