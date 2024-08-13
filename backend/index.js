const express = require("express")
const connectDB = require("./connection/connectDB")
require("dotenv").config()
const contactRoutes = require("./routes/contactRoutes")
const authRoutes = require("./routes/authRoutes")
const bodyParser = require('body-parser')

const app = express()

//body-parser urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//body-parser json
app.use(bodyParser.json())

//Database connection
connectDB()

//Routes
app.use("/api/contact", contactRoutes)
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT

app.listen(PORT, err => {
  err ? console.log(err) : console.log(`Server running on port ${PORT}`);
})