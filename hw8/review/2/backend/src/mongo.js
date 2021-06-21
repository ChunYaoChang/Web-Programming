import dotenv from "dotenv-defaults";
import mongoose from "mongoose";
dotenv.config();


function connectMongo() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Mongo database connected!');
  });

  // console.log("PPPP", data)

  return db
}

const mongo = {
  connect: connectMongo,
};

export default mongo;
