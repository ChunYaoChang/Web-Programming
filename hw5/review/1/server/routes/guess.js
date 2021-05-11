import express from "express";
import getNumber from "../core/getNumber";
import fs from "fs";
import util from "util";


const router = express.Router();

const now = new Date();
const log_file_name = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.log`
const log_file = fs.createWriteStream('./server/log/' + log_file_name, { flags: 'w' });


function roughScale(x, base) {
  const parsed = parseInt(x, base);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed;
}

// Just call getNumber(true) to generate a random number for guessing game
router.post("/start", (_, res) => {
  const number = getNumber(true);

  const now = new Date();
  log_file.write(`start number=${number} ${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}\n`)  
  
  res.json({ msg: "The game has started." });
});

router.get("/guess", (req, res) => {
  const number = getNumber();
  const guessed = roughScale(req.query.number, 10);

  const now = new Date();
  log_file.write(`guess ${req.query.number} ${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}\n`);
  
  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: "Not a legal number." });
  } else {
    // TODO: check if number and guessed are the same,
    // and response with some hint "Equal", "Bigger", "Smaller"
    if (guessed === number) {
      res.status(200).send({ msg: "Equal" });
      log_file.write('end-game\n');
    } else if (guessed < number) {
      res.status(200).send({ msg: "Bigger" });
    } else {
      res.status(200).send({ msg: "Smaller" });
    }
  }
});

// TODO: add router.post('/restart',...)
router.post("/restart", (req, res) => {
  const number = getNumber(true);
  
  const now = new Date();
  log_file.write(`restart number=${number} ${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}\n`);
  
  res.json({ msg: "The game has re-started." });
});

export default router;