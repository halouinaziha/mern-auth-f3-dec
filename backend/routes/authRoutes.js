const express = require("express")
const router = express.Router()
const authControllers = require("../controllers/authControllers")
const {registerRules, loginRules, validator} = require("../middleware/validator")
const isAuth = require("../middleware/isAuth")

router.get("/hello", (req, res) => {
  res.send("Hello Auth Routes")
})

//register user
//method: post
//path: http://localhost:5000/api/auth/register
router.post("/register", registerRules(), validator, authControllers.registerUser)

//login user
//method: post
//path: http://localhost:5000/api/auth/login
router.post("/login", loginRules(), validator, authControllers.loginUser)

//private route
router.get("/user", isAuth, authControllers.getAuthUser)

module.exports = router