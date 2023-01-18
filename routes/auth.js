const express = require("express");
const authrouter = express.Router();
const { Auth } = require("../middlewares/auth");
const auth = new Auth();

const aauth = require('../controllers/auth');
const {
        validateUser, 
        validateLogIn
    } = require('../middlewares/userValidation')

authrouter.post("/logout", aauth.logoutUser);
authrouter.post("/register", validateUser, aauth.signup);
authrouter.post("/login", validateLogIn, aauth.login);
authrouter.put("/update-profile", auth.tokenRequired, aauth.updateUserProfile);


module.exports = { authrouter };