const {body, validationResult} = require("express-validator")

const registerRules = () => [
  body("username", "Username is required").notEmpty(),
  body("email", "Email should be an email").isEmail(),
  body("password", "Password should be between 5 and 12 characters").isLength({
    min: 5,
    max: 12
  })
]

const loginRules = () => [
  body("email", "Email should be an email").isEmail(),
  body("password", "Password should be between 5 and 12 characters").isLength({
    min: 5,
    max: 12
  })
]

const validator = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({errors: errors.array()})
  }
  next()
}

module.exports = {registerRules, loginRules, validator}