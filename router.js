const { mainrouter } = require('./routes/main');
const { authrouter } = require('./routes/auth');


module.exports = (app) => {
  app.use(mainrouter);
  app.use("/user", authrouter);
  

};
