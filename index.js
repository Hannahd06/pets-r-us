"use strict";
const express = require("express");
const path = require("path");
const mongoose =require("mongoose");
const fs = require('fs');

const Customer = require("./models/customer");
const Appointment = require("./models/appointment")

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

const conn = "mongodb+srv://domino006:Bellevue2023@bellevueuniversity.ozktyyu.mongodb.net/web340DB?retryWrites=true&w=majority";

mongoose.connect(conn).then(() => { 
    console.log('Connection to the database was successful');
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
});


app.get('/', (req, res) => {
    res.render("index", {
        title: "Pets-R-Us: Landing",
        message: "Pets-R-Us: Landing Page"
    })
});

app.get('/grooming', (req, res) => {
    res.render("grooming", {
        title: "Pets-R-Us: Grooming",
        message: "Pets-R-Us: Grooming Page"
    })
});

app.get('/boarding', (req, res) => {
    res.render("boarding", {
        title: "Pets-R-Us: Boarding",
        message: "Pets-R-Us: Boarding Page"
    })
});

app.get('/training', (req, res) => {
    res.render("training", {
        title: "Pets-R-Us: Training",
        message: "Pets-R-Us: Training Page"
    })
});

app.get('/register', (req,res) => {
    res.render("register", {
        title: "Pets-R-Us: Register",
        message: "Pets-R-Us: Register Page"
    })
});

app.post('/customers', (req, res, next) => {
    console.log(req.body);
    const newCustomer = new Customer({
        customerId: req.body.customerId,
        email: req.body.email
    });

    console.log(newCustomer);

    Customer.create(newCustomer, function(err, customer) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.render('index', {
                title: 'Pets-R-Us: Home'
            })
        }
    })
})

app.get('/customers', (req, res) => {
    Customer.find({}, function(err, customers) {
        if (err) {
            console.log(err);
            next(err); 
        } else {
            res.render('customer-list', {
                title: 'Pets-R-US: Customer List',
                customers: customers
            })
        }
    })
}) 

app.get('/booking', (req, res) => {
    let jsonFile = fs.readFileSync('./public/data/services.json');
    let services = JSON.parse(jsonFile);
    
    console.log(services);

    res.render('booking', {
        title: "Pets-R-Us: Book Appointment",
        message: "Pets-R-Us: Book Appointment Page",
        services: services
    })
});

app.post('/appointments', (req, res, next) => {
    const newAppointment = new Appointment({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        service: req.body.service
    });

    console.log(newAppointment);

    Appointment.create(newAppointment, function(err, appointment) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.render('index', {
                title: 'Pets-R-Us: Home'
            })
        }
    })
});

//listen on port 3000.
app.listen(PORT, () => {
    console.log("Application started listening on PORT " + PORT);
});

