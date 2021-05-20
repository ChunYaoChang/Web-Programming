import express from 'express';
const app = express();
const port = process.env.Port || 400;
app.get('/', (req, res) => {
    res.send('Hello');
});
app.listen(port, () => 
    console.log(`listening on port: ${port}`)
)