const Contact = require("../models/contact");

exports.getAllContacts = (req, res) => {
    Contact.find({})
        .exec()
        .then(contacts => {
            res.render("contacts", {
                contacts: contacts
            });
        })
        .catch(error => {
            console.log(error.message);
            return [];
        })
        .then(() => {
            console.log("Query Complete");
        });
};

exports.getContactPage = (req, res) => {
    res.render("contact");
};

exports.saveContact = (req, res) => {
    let newContact = newContact ({
        name: req.body.name,
        email: req.body.email,
    });
    newContact
        .save()
        .then(() => {
            res.render("thanks");
        })
        .catch(error => {
            res.send(error);
        });
};