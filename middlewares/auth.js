const jwt = require("jsonwebtoken");
// const { Mail } = require("../middlewares/mail");
const { User } = require("../models/users");
const { Utils } = require("./utils"); 
// const mail = new Mail();
const utils = new Utils();

class Auth {
    constructor() {
        this.alg = "HS256";
    }

    async tokenRequired(req, res, next) {
        if (!req.headers.authorization) {
            const error = "TOKEN_ERROR";
            return res.status(401).json({
                status: false,
                message: "You've got some errors.",
                error: utils.getMessage(error),
            });
        }
        const token = req.headers.authorization.split(" ")[1];

        try {
            const data = jwt.verify(token, process.env.SECRET_KEY, {
                algorithms: process.env.ALGO,
            });
            console.log(data)
            
            if (!data) {
                const error = "TOKEN_ERROR";
                return res.status(401).json({
                    status: false,
                    message: "You've got some errors.",
                    error: utils.getMessage(error),
                });
            }

            const user = await User.findById(data._id);

            if (!user) {
                const error = "INVALID_TOKEN_ERROR";
                return res.status(401).json({
                    status: false,
                    message: "You've got some errors.",
                    errors: utils.getMessage(error),
                });
            }

            if (!user.isActive) {
                const error = "ACCOUNT_DISABLED";
                console.log(error)
                return res.status(403).json({
                    status: false,
                    message: "You've got some errors.",
                    errors: utils.getMessage(error),
                });
            }

            req.user = user
           

            next();
        } catch (error) {
            error = "INVALID_TOKEN_ERROR";
            return res.status(401).json({
                status: false,
                message: "You've got some errors.",
                errors: utils.getMessage(error),
            });
        }

        /**
     *
     * @param {*} user a mongoose or JSON user object
     * @returns the generated JWT
     */

    }

    generateAuthToken(user) {
        var tokenData = {
            _id: user._id,
            email: user.email,
        };
        return jwt.sign(tokenData, process.env.SECRET_KEY, {
            algorithm: this.alg,
        });
    }
}

module.exports = {
    Auth,
};