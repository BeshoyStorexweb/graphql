const express = require("express");
const bodyPraser = require("body-parser");

const app = express();

app.listen(3000, () => {
    console.log('Hello')
});
app.use(bodyPraser);
