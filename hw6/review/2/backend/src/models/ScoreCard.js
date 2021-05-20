// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);

import mongoose from 'mongoose';

const Schema = mongoose.Schema

const ScoreCardSchema =  new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    subject: {
        type: String,
        required: [true, 'subject field is required']
    },
    score: {
        type: Number,
        required: [true, 'score is required']
    }
})

export default mongoose.model('ScoreCard', ScoreCardSchema)