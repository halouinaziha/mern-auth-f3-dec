const express = require("express")
const router = express.Router()
const contactControllers = require("../controllers/contactControllers")
const isAuth = require("../middleware/isAuth")

//test routing
router.get("/hello", (req, res) => {
  res.send("Hello routing contact")
})

//post contact
//method: post
//path: http://localhost:5000/api/contact/newContact
router.post("/newContact", contactControllers.postContact)

//get all contacts
//method: get
//path: http://localhost:5000/api/contact/getAllContacts
router.get("/getAllContacts", contactControllers.getAllContacts)

//get one contact by id
//method: get
//path: http://localhost:5000/api/contact/getOneContact/:id
router.get("/getOneContact/:id", contactControllers.getOneContact)

//update one contact by id
//method: put
//path: http://localhost:5000/api/contact/updateOneContact/:id
router.put("/updateOneContact/:id", contactControllers.updateOneContact)

//delete one contact by id
//method: delete
//path: http://localhost:5000/api/contact/deleteOneContact/:id
router.delete("/deleteOneContact/:id", contactControllers.deleteOneContact)

module.exports = router