import express from 'express'
import getNumber from '../core/getNumber'

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

function parseTime(time, NoSeconds=false){
  let Year = time.getFullYear();
  let Month = time.getMonth();
  let Date = time.getDate();
  let Hours = time.getHours();
  let Minutes = time.getMinutes();
  let Seconds = time.getSeconds();
  Month = (Month<10) ? "0" + Month : String(Month);
  Date = (Date<10) ? "0" + Date : String(Date);
  Hours = (Hours<10) ? "0" + Hours : String(Hours);
  Minutes = (Minutes<10) ? "0" + Minutes : String(Minutes);
  Seconds = (Seconds<10) ? "0" + Seconds : String(Seconds);
  if(NoSeconds)return Year + "-" + Month + "-" + Date + "-" + Hours + "-" + Minutes;
  else return Year + "-" + Month + "-" + Date + "-" + Hours + "-" + Minutes + "-" + Seconds;
}

let time, logger;

// for log file
let winston = require('winston');

// define the custom settings for logger
let options = {
  file: {
    level: 'info',
    filename: "",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  }
};

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {

  let number = getNumber(true)

  time = new Date();
  let serverstartime = parseTime(time, true);
  options.file.filename = `${__dirname}/../log/${serverstartime}.log`;
  // instantiate a new Winston Logger 
  logger = winston.createLogger({
    transports: [
      new winston.transports.File(options.file)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });
  time = new Date();
  let starttime = parseTime(time);
  logger.log('info', `start number=${number} ${starttime}`);

  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  time = new Date();
  let guesstime = parseTime(time);
  logger.log('info', `guess ${req.query.number} ${guesstime}`);

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
  if(number == guessed){
    logger.log('info', "end-game"); 
    res.send({ msg: "Equal"});
  }
  else if(number > guessed)res.send({msg: "Bigger"});
  else res.send({msg: "Smaller"});
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {

  let number = getNumber(true);

  time = new Date();
  let restarttime = parseTime(time);
  logger.log('info', `restart number=${number} ${restarttime}`);

  res.json({ msg: 'The game restarts.' })
})

export default router
