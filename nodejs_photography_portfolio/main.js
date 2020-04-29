const express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    contactController = require("./controllers/contactController"),
    layouts = require("express-ejs-layouts");
    const mongoose = require("mongoose");
    mongoose.connect("mongodb+srv://ldefoe:IT231db@it231-d0ism.azure.mongodb.net/portfolio_db?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true });
    mongoose.set("useCreateIndex", true);

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", homeController.showAbout);
app.get("/digital", homeController.showDigital);
app.get("/film", homeController.showFilm);
app.get("/print", homeController.showPrint);
app.get("/contact", homeController.showContact);
app.post("/contact", homeController.showThanks);

app.get("/contacts", contactController.getAllContacts);
app.get("/contact", contactController.getContactPage);
app.post("/contacts", contactController.saveContact);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});