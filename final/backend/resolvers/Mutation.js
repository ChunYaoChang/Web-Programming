import { v4 as uuidv4 } from 'uuid';
import sendMail from '../mail.js'

const Mutation = {
  async login(parent, { username, password }, { db }, info) {
    const existing = await db.UserModel.findOne({username: username, password: password, isVerified: true})
    return (existing) ? true : false
  },

  async verify(parent, { verifiedUrl }, { db }, info) {
    const existing = await db.UserModel.findOne({verifiedUrl: verifiedUrl})
    if (!existing) {
      // throw new Error(`Url: ${verifiedUrl} doesn't exist!`);
      return false
    }
    await db.UserModel.updateOne({verifiedUrl: verifiedUrl}, {
      isVerified: true,
      verifiedUrl: null
    })
    return true
  },

  async getUserIdByUsername(parent, { username }, { db }, info) {
    const existing = await db.UserModel.findOne({ username });
    if (!existing) {
      throw new Error(`user: ${username} doesn't exist!`);
    }
    return existing._id;
  },

  async getUserById(parent, { id }, { db }, info) {
    try {
      const existing = await db.UserModel.findById(id);
      return existing;
    } catch (e) {
      throw new Error(`Wrong userId!`);
    }
  },

  async createUser(parent, { user }, { db, pubsub }, info) {
    const existing = await db.UserModel.findOne({username: user.username})
    if (existing) {
      throw new Error("User already exists")
    }
    const newID = uuidv4()
    const verifiedUrl = `https://ntucsiebadminton.netlify.app/verified/${newID}`
    const newUser = new db.UserModel({
      username: user.username,
      email: user.email,
      password: user.password,
      nickname: user.nickname ? user.nickname : null,
      isCaptain: user.isCaptain ? user.isCaptain : null,
      isVerified: false,
      verifiedUrl: newID
    })
    await newUser.save()
    pubsub.publish(
      'user',
      { user: { allUser: await db.UserModel.find({}) } }
    )
    await sendMail(user.username, user.email, verifiedUrl, 'verify')
    return newUser
  },

  async updateUser(parent, { id, user, adminCode }, { db, pubsub }, info) {
    const existing = await db.UserModel.findById(id)
    if (!existing) {
      throw new Error("User not exists")
    }
    if (user.isCaptain && adminCode !== 'NTUCSIEBADMINTON') {
      throw new Error('You are not allowed to be a captain')
    }
    await db.UserModel.updateOne({"_id": id}, {
      username: user.username ? user.username : existing.username,
      email: user.email ? user.email : existing.email,
      password: user.password ? user.password : existing.password,
      nickname: user.nickname ? user.nickname : existing.nickname,
      isCaptain: user.isCaptain ? user.isCaptain : false,
    })
    pubsub.publish(
      'user',
      { user: { allUser: await db.UserModel.find({}) } }
    )
    return await db.UserModel.findById(id)
  },

  async deleteUser(parent, { id }, { db, pubsub }, info) {
    const existing = await db.UserModel.findById(id)
    if (!existing) {
      throw new Error("User not exists")
    }
    await db.UserModel.deleteOne({"_id": id})
    pubsub.publish(
      'user',
      { user: { allUser: await db.UserModel.find({}) } }
    )
    return true
  },

  async createActivity(parent, { activity }, { db, pubsub }, info) {
    const existing = await db.ActivityModel.findOne({
      title: activity.title,
      startDatetime: activity.startDatetime,
      endDatetime: activity.endDatetime
    })
    if (existing) {
      throw new Error("Activity already exists")
    }
    // activity.participants.map((name) => db.UserModel.findOne({username: name}))
    const newActivity = new db.ActivityModel({
      createdUser: await db.UserModel.findById(activity.createdUser),
      title: activity.title,
      startDatetime: activity.startDatetime,
      endDatetime: activity.endDatetime,
      description: activity.description,
      participants: await Promise.all(activity.participants.map((id) => db.UserModel.findById(id)))
    })
    await newActivity.save()
    pubsub.publish(
      `activity`,
      {activity: { allActivity: await db.ActivityModel.find({}) }}
    )
    return newActivity
  },

  async updateActivity(parent, { activity, type }, { db, pubsub }, info) {
    let existing = await db.ActivityModel.findOne({
      title: activity.title,
      startDatetime: activity.startDatetime,
      endDatetime: activity.endDatetime
    })
    if (!existing) {
      throw new Error("Activity not exists")
    }
    // activity.participants: ID of update user
    const user = await db.UserModel.findById(activity.participants)
    if (type === 'add') {
      existing.participants.push(user)
      await sendMail(user.username, user.email, existing, 'add')
    } else if (type === 'delete') {
      existing.participants.splice(existing.participants.indexOf(user), 1)
      await sendMail(user.username, user.email, existing, 'delete')
    }
    await existing.save()
    // console.log(existing.participants)
    // await db.ActivityModel.updateOne({
    //   title: activity.title,
    //   startDatetime: activity.startDatetime,
    //   endDatetime: activity.endDatetime
    // }, {
    //   createdUser: await db.UserModel.findById(activity.createdUser),
    //   title: activity.title,
    //   startDatetime: activity.startDatetime,
    //   endDatetime: activity.endDatetime,
    //   description: activity.description,
    //   participants: await Promise.all(activity.participants.map((id) => db.UserModel.findById(id)))
    // })
    // existing = await db.ActivityModel.findOne({
    //   title: activity.title,
    //   startDatetime: activity.startDatetime,
    //   endDatetime: activity.endDatetime
    // })
    // console.log(existing.participants)
    pubsub.publish(
      `activity`,
      {activity: { allActivity: await db.ActivityModel.find({}) }}
    )
    return existing
  },

  async deleteActivity(parent, { activity }, { db, pubsub }, info) {
    let existing = await db.ActivityModel.findOne({
      title: activity.title,
      startDatetime: activity.startDatetime,
      endDatetime: activity.endDatetime
    })
    if (!existing) {
      throw new Error("Activity not exists")
    }
    await db.ActivityModel.deleteOne({
      title: activity.title,
      startDatetime: activity.startDatetime,
      endDatetime: activity.endDatetime
    })
    pubsub.publish(
      `activity`,
      {activity: { allActivity: await db.ActivityModel.find({}) }}
    )
    return true
  },

  async createVideo(parent, { video }, { db, pubsub }, info) {
    const existing = await db.VideoModel.findOne({url: video.url})
    if (existing) {
      throw new Error("Video already exists")
    }
    const newVideo = new db.VideoModel(video)
    await newVideo.save()
    pubsub.publish(
      'video',
      { video: { allVideo: await db.VideoModel.find({}) } }
    )
    return newVideo
  },

  async updateVideo(parent, { video }, { db, pubsub }, info) {
    let existing = await db.VideoModel.findOne({url: video.url})
    if (!existing) {
      throw new Error("Video not exists")
    }
    await db.VideoModel.updateOne({url: video.url}, video)
    existing = await db.VideoModel.findOne({url: video.url})
    pubsub.publish(
      'video',
      { video: { allVideo: await db.VideoModel.find({}) } }
    )
    return existing
  },

  async deleteVideo(parent, { video }, { db, pubsub }, info) {
    const existing = await db.VideoModel.findOne({url: video.url})
    if (!existing) {
      throw new Error("Video not exists")
    }
    await db.VideoModel.deleteOne({url: video.url})
    pubsub.publish(
      'video',
      { video: { allVideo: await db.VideoModel.find({}) } }
    )
    return true
  }
}

export { Mutation as default };
