const Contact = require("../models/contactModel")

exports.postContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body
    //create a new contact with the model Contact
    const newContact = new Contact(req.body)
    //test if contact has a name
    if (!name) {
      res.status(400).send({ message: "Name is required" })
    }
    //test if contact has an email
    if (!email) {
      res.status(400).send({ message: "Email is required" })
    }

    //test if the email already exists
    const existingContact = await Contact.findOne({ email })
    if (existingContact) {
      res.status(400).send({ message: "Contact already exists" })
    }

    //save contact
    const response = await newContact.save()

    res.status(201).send({ message: "Contact saved", response })
  } catch (error) {
    res.status(500).send({ message: "Can not save contact", error })
    console.log(error);
  }
}

//getAllContacts
exports.getAllContacts = async (req, res) => {
  try {
    const result = await Contact.find()
    res.status(200).send({ message: "Getting all contacts", response: result })
  } catch (error) {
    res.status(500).send({ message: "Can not get all contacts", error })
    console.log(error);
  }
}

//getOneContact by id
exports.getOneContact = async (req, res) => {
  try {
    const result = await Contact.findById(req.params.id)
    if (result) {
      res.status(200).send({ message: "Getting contact by id", response: result })
    } else {
      res.status(404).send({ message: "There is not contact with this id" })
    }
  } catch (error) {
    res.status(500).send({ message: "Can not get contact by id", error })
    console.log(error);
  }
}

//updateOneContact by id
exports.updateOneContact = async (req, res) => {
  try {
    const result = await Contact.findByIdAndUpdate({ _id: req.params.id }, { $set: { ...req.body } }, { new: true })
    if (result) {
      res.status(200).send({ message: "Updating contact by id", response: result })
    } else {
      res.status(404).send({ message: "There is not contact with this id to update" })
    }
  } catch (error) {
    res.status(500).send({ message: "Can not update contact by id", error })
    console.log(error);
  }
}

//deleteOneContact by id
exports.deleteOneContact = async (req, res) => {
  try {
    const result = await Contact.findByIdAndDelete({ _id: req.params.id })
    if (result) {
      res.status(200).send({ message: "Deleting contact by id", response: result })
    } else {
      res.status(404).send({ message: "There is not contact with this id to delete" })
    }
  } catch (error) {
    res.status(500).send({ message: "Can not delete contact by id", error })
    console.log(error);
  }
}