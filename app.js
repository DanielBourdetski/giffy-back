const express = require('express');
const app = express();

const gifs = require('./routes/gifs');
const randomId = require('./routes/randomId');

const PORT = 3000;

app.use('/gifs', gifs);

app.listen(PORT, () => {
  console.log(`http://localhost/${PORT}`);
});
