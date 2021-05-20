import { Router } from 'express';
import { model } from 'mongoose';
import ScoreCard from '../../models/ScoreCard';

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
    let name = req.name
    let subject = req.subject
    let score = req.score
    let newScoreCard =  new ScoreCard({name, subject, score})
    let exist = ScoreCard.findOne({name, subject, score})
    if (exist){
      res.send({card: newScoreCard.save(), message: 'Success modify'})
    }
    else{
      res.send({card: newScoreCard.save(), message: 'Success create'})
    }
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/delete-card', async function(req, res){
  try {
    await newScoreCard.deleteMany({})
    res.send({message: 'DB deleted'})
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: implement the DB query
// route.xx(xxxx)
router.get('/query-card', async function(req, res){
  try{
    if('name' in req){
      res.send({messages: ScoreCard.find({name: req.name}), message:'No data find'})
    }
    else{
      res.send({messages: ScoreCard.find({subject: req.subject}), message:'No data find'})
    }
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

export default router;
