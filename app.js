require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8800;
const dbURI = process.env.MONGO_URI;

//setting up middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(express.static("./public"));
app.use(express.static("./uploads"));
// app.use(require("cors")());

require("./router")(app);

// 404 Error Handler
app.all("*", (req, res) => {
    res.status(404).json({
        status: false,
        error: "And Just Like That, You Completely Lost Your Way 😥",
    });
});

// connecting to mongodb database
const mongoose = require('mongoose');
mongoose
  .connect(dbURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  .then(()=>{
    console.log('This app is connected to the server database');
    app.listen(PORT, () => {
      console.log(
        `Database connected successfully.

        Server is running on port ${PORT}

        http://localhost:${PORT}`

        );
    });
  })
  .catch(err => {
  console.log('could not connect to mongoDB', err)
});




module.exports = { app };

require('./router')(app);
