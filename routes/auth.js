const express = require("express");
const authrouter = express.Router();
const { Auth } = require("../middlewares/auth");
const auth = new Auth();

const aauth = require('../controllers/auth');
const {
        validateUser, 
        validateLogIn
    } = require('../middlewares/user.validation')

authrouter.post("/signout", aauth.logoutUser);
authrouter.post("/signup", validateUser, aauth.signup);
authrouter.post("/signin", validateLogIn, aauth.login);
authrouter.put("/update-profile", auth.tokenRequired, aauth.updateUserProfile);


module.exports = { authrouter };