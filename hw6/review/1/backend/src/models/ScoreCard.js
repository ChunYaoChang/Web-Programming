// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);
import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ScorCardSchema = new Schema({
    name: String,
    subject: String,
    score: Number
});

const ScorCard = mongoose.model('ScorCard', ScorCardSchema);

export default ScorCard;