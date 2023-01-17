// importing the required modules
const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const { Auth } = require("../middlewares/auth");
const { Utils } = require("../middlewares/utils");
const securePassword = require("../middlewares/securePassword");

// instantiating the middlewares
const utils = new Utils();
const auth = new Auth();

const signup = async (req, res) => {
    try {
        const existingUser = await User.findOne({
            email: req.body.email.toLowerCase(),
        });
        
        if (existingUser) {
            res.status(403);
            return res.json({
                status: false,
                message: "registration failed",
                error: utils.getMessage("ACCOUNT_EXISTS_ERROR"),
            });
        }
        const hashedPassword = await securePassword(req.body.password);
        
        const newUser = await User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email.toLowerCase(),
            password: hashedPassword,
            confirmPassword: hashedPassword,
            
        }).save();
        
        newUser.set("password", undefined);
        if (newUser) {
            res.status(201);
            return res.json({
                status: true,
                message: utils.getMessage("REGISTER_SUCCESS"),
                data: newUser,
            });
        }
        console.log(error)
        return res.json({
            status: false,
            message: "unable to register user",
            error: utils.getMessage("REGISTER_FAILURE"),
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: "Unable to register user.",
            error: utils.getMessage("UNKNOWN_ERROR"),
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "user does not exist",
                error: utils.getMessage("ACCOUNT_EXISTENCE_ERROR"),
            });
        }
        const isMatchedPassword = await bcrypt.compare(password, user.password);
        if (!isMatchedPassword) {
            return res.status(400).json({
                status: false,
                message: "invalid password",
                error: utils.getMessage("VALIDATION_ERROR"),
            });
        }
        const accessToken = auth.generateAuthToken(user._id);
        res.json({
            status: true,
            message: utils.getMessage("LOGIN_SUCCESS"),
            data: {
                user: user,
                token: accessToken,
            },
        });
    } catch (error) {
        // console.log(error)
        return res.status(500).json({
            status: false,
            message: "unable to login user",
            error: utils.getMessage("VALIDATION_ERROR"),
        });
    }
};

const updateUserProfile = async (req, res) =>{
    try{
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "unable to find user",
                error: utils.getMessage("EXISTENCE_ERROR"),
            });
        }

        const updateProfile = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        };

        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user._id },
            updateProfile,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(500).json({
                status: false,
                message: "unable to update user",
                error: utils.getMessage("UNKNOWN_ERROR"),
            });
        }

        return res.status(200).json({
            status: true,
            message: "user updated successfully",
            data: updatedUser,
        });
        
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "oops!!",
            error: utils.getMessage("UNKNOWN_ERROR"),
        });
    }
};

const logoutUser = async (req, res) => {
    req.user = null;
    res.status(200).json({
        status: true,
        message: utils.getMessage("LOGOUT_SUCCESS"),
        data: {},
    });
    return;
};




// exporting the controllers
module.exports = {
    updateUserProfile,
    logoutUser,
    signup,
    login,
};
  