const { mainrouter } = require('./routes/main');
const { authrouter } = require('./routes/auth');
const { messagerouter } = require("./routes/message");


module.exports = (app) => {
  app.use(mainrouter);
  app.use("/user", authrouter);
  app.use("/msg", messagerouter);

};
