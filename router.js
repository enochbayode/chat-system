const { mainrouter } = require('./routes/main');
const { authrouter } = require('./routes/auth');
const { chatrouter } = require("./routes/chat");


module.exports = (app) => {
  app.use(mainrouter);
  app.use("/user", authrouter);
  app.use("/chat", chatrouter);

};
