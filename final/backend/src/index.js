const express = require('express');
const sendMail = require('./mail');
const app = express();

app.use(express.json());

app.get('/', (req, res)=> res.send('Hello world!!!'));

app.get('/sendMail', async (req, res) => {
  try {
    const sent = await sendMail();
    if (sent) {
      res.send({ message: 'email sent successfully' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

app.listen(3300, () => {
  console.log('server listening at http://localhost:3300');
});