const express = require("express");
const app = express();
const cors = require("cors");

const gifs = require("./routes/gifs");
const randomId = require("./routes/randomId");

const PORT = 3000;

app.use(cors());
app.use("/gifs", gifs);

app.listen(PORT, () => {
  console.log(`http://localhost/${PORT}`);
});
