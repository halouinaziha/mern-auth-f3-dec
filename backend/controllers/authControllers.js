const User = require("../models/userModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body
    //simple validation
    // if (!username || !email || !password) {
    //   res.status(400).send({ msg: "Please enter all fields!" })
    // }

    //check for existing user
    let user = await User.findOne({ email })
    if (user) {
      res.status(400).send({ msg: "User already exists" })
    }

    //create new user
    user = new User({ username, email, password })
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    user.password = hashedPassword

    //save user
    await user.save()

    res.status(201).send({ msg: "User registered", user })
  } catch (error) {
    res.status(500).send({ msg: "Register server error" })
    console.log(error);
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    //simple validation
    // if (!email || !password) {
    //   res.status(400).send({ msg: "Please enter all fields!" })
    // }

    //check email
    let user = await User.findOne({ email })
    if (!user) {
      res.status(404).send({ msg: "Bad credentials" })
    }

    //check password
    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(404).send({ msg: "Bad credentials" })
    }

    //sign user
    const payload = {
      id: user._id,
      username: user.username
    }
    //token
    const token = await jwt.sign(payload, process.env.secretOrPrivateKey, {expiresIn: "1h"})

    res.status(200).send({ msg: "User logged in", user, token })
  } catch (error) {
    res.status(500).send({ msg: "Login server error" })
    console.log(error);
  }
}

exports.getAuthUser = (req, res) => {
  res.status(200).send({user: req.user})
}