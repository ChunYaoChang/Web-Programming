import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';


const saveUser = async (name, subject, score) => {
  const existing = await ScoreCard.findOne({ name, subject })
  if (existing) {
    try {
      const query = {name: name, subject: subject}
      const newScore = {score: score}
      ScoreCard.updateOne(query, newScore)
      return `Updating (${name}, ${subject}, ${score})`
    } catch (e) {
      throw new Error('User update failed: ' + e)
    }

  } else {
    try {
      const newScoreCard = new ScoreCard({name, subject, score})
      await newScoreCard.save()
      return `Adding (${name}, ${subject}, ${score})`
    } catch (e) {
      throw new Error('User create failed: ' + e)
    }
  }
}

const deleteUser = async () => {
  try {
    ScoreCard.deleteMany()
    return 'Database cleared'
  } catch (e) {
    throw new Error('Delete DB failed: ' + e)
  }
}



const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print

    console.log(req.body.name)
    console.log(req.body.subject)
    console.log(req.body.score)

    const msg = await saveUser(req.body.name, req.body.subject, req.body.score)
    res.json({message: msg, card: req.body})

  } catch (e) {
    res.json({ message: '/create-card went wrong... ' + e })
  }
});

// TODO: delete the collection of the DB
router.delete('/delete-card', async function (req, res) {
  try {
    const msg = await deleteUser()
    res.json({message: msg})
  } catch (e) {
    res.json({ message: '/delete-card went wrong... ' + e })
  }
})

// TODO: implement the DB query
// route.xx(xxxx)
router.get('/query-card', async (req, res) => {
  try {
    // console.log(req)
    // console.log(req.query.queryString)
    var query
    if (req.query.queryType === 'name') {
      query = {name: req.query.queryString}
    } else {
      query = {subject: req.query.queryString}
    }
    const existing = await ScoreCard.find(query)
    console.log(existing)
    if (!existing) {
      res.send({messages: '', message: `${req.query.queryType}(${req.query.queryString}) not found!`})
    }
    else {
      res.send({messages: existing, message: ''})
    }
  } catch (e) {
    res.send({ messages: '', message: '/query-card went wrong... ' + e })
  }
})

export default router;
