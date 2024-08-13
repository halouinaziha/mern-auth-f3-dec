const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"]
    //check for token
    if(!token) {
      return res.status(403).send({msg: "No token. Unauthorized!"})
    }
    //get payload from token
    const payload = await jwt.verify(token, process.env.secretOrPrivateKey)
    console.log(payload);
    //get user by id from payload
    const user = await User.findById(payload.id)
    //check user
    if (!user) {
      return res.status(403).send({msg: "Unauthorized!"})
    }

    //get user
    req.user = user

    next()
  } catch (error) {
    res.status(500).send({msg: "Token is not valid"})
  }
}

module.exports = isAuth