const joi = require("joi");
const { Utils } = require("./utils");
const utils = new Utils();

const validation = joi.object({
  firstName: joi.string().min(3).required(),
  lastName: joi.string().min(3).required(),
  userName: joi.string().min(3).required(),
  email: joi.string().email().trim(true).required(),
  password: joi.string().min(5).required(),
});

const validateUser = async (req, res, next) => {
    try {
      const validated = validation.validate(req.body);
      
      if (validated.error) {
        res.status(400);
        return res.json({
          error: utils.getMessage("DATA_VALIDATION_ERROR"),
        });
      }
      next();
      
    } 
    catch (error) {
      console.log(error);
    }
  };
  
  const loginValidation = joi.object({
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(5).required(),
  });
  
  const validateLogIn = async (req, res, next) => {
    try {
      const validUser = loginValidation.validate(req.body);
      
      if (validUser.error) {
        res.status(400);
        return res.json({
          error: utils.getMessage("DATA_VALIDATION_ERROR"),
        });
      }
      next();
    } catch (error) {
      console.log(error);
    }
  };
  
module.exports = {
    validateUser,
    validateLogIn
};