import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();


router.post('/create-card', async function (req, res) {
  let name = req.body.name, subject = req.body.subject, score = req.body.score
  try {
    // TODO:
    const exist = await ScoreCard.findOne({name: name, subject: subject})
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    if(exist){
      const updateScoreCard = await ScoreCard.updateOne({"name": name, "subject": subject}, {"name": name, "subject": subject,"score": score})
      res.send({message:`Updating(${name},${subject},${score})`, card: updateScoreCard})
    }
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    else{
      const newScoreCard = new ScoreCard({name, subject, score})
      res.send({message:`Adding(${name},${subject},${score})`, card: newScoreCard})
      return newScoreCard.save()
    }    
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/deleteDB', async function(req, res) {
  try{
    await ScoreCard.deleteMany();
    res.send({message:"Database cleared"})
  }
  catch (err) {
    console.log(err);
  }
})
// TODO: implement the DB query
// route.xx(xxxx)
router.post('/query', async function(req, res) {
  try{
    if(req.body.queryType === 'name') {
      const query = await ScoreCard.find({'name': req.body.queryString})
      var message = ""
      query.map(item => {
        let msg = `Name:${item.name}, Subject:${item.subject}, Score:${item.score}`
        message += msg+'\n'
      })
      console.log(message)
    }
    else{
      const query = await ScoreCard.find({'subject': req.body.queryString})
      var message = ""
      query.map(item => {
        let msg = `Name:${item.name}, Subject:${item.subject}, Score:${item.score}`
        message += msg+'\n'
      })
    }
    if(message === ""){
      const type = req.body.queryType === 'name'? 'Name':'Subject'
      message = `${type}(${req.body.queryString}) not found!`
    }
    res.send({message: message})
  }
  catch(err) {
    console.log(err);
  }
})
export default router;
