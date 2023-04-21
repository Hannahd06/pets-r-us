const express = require("express");
const path = require("path");
const mongoose =require("mongoose");

const Customer = require("./models/customer");

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

app.post('/customer', (req, res, next) => {
    console.log(req.body);
    const newCustomer = new Customer({
        customerId: req.body.customerId,
        email: req.body.email
    });

    console.log(newCustomer);

    Customer.create(newCustomer, function(err, newCustomer) {
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


//listen on port 3000.
app.listen(PORT, () => {
    console.log("Application started listening on PORT " + PORT);
});

