// Here is where we import modules
// We begin by loading Express
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose'); //

//method override
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new

const app = express();

mongoose.connect(process.env.MONGODB_URI); // here we are able to use the functionality of mongoose 

mongoose.connection.on('connected', () => {
    console.log(`connected on mondoDB ${mongoose.connection.name}`)
});
//THIS GRABS THE CONNECTION BETWEEN FRUITS AND SERVER
const Fruit = require('./models/fruit.js');

//middleware express is the library available - 
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

//Get  // why do we async?
app.get('/', (req, res)=> {
    res.render('index.ejs');
});


//GET method /fruits/new 
app.get('/fruits/new', (req, res) =>{
    //this checks to see the route works with the res.send
    // res.send('this route sends rhe user to a form page')
    res.render('fruits/new.ejs') //we made a new folder called new.ejs and then grab it to make another page
});

// Get/fruits to get all the fruits 
app.get('/fruits', async (req, res) => {
    const allFruits = await Fruit.find();
    console.log(allFruits);
    res.render('fruits/index.ejs', { fruits: allFruits});
});

//get fruits id...need to link to the id and makes to a new link with fruit and ID
app.get('/fruits/:fruitid', async (req, res) =>{
    // add asycn with database transactions
    const foundFruit = await Fruit.findById(req.params.fruitid);
    res.render('fruits/show.ejs', {fruit: foundFruit});
});


//POST /fruits
//async because its a database transaction  - whateve that means 
app.post('/fruits', async (req, res) => {
    if (req.body.isReadyToEat === 'on') {
        req.body.isReadyToEat = true; 
    } else {
        req.body.isReadyToEat = false;
    }

    await Fruit.create(req.body);
    res.redirect('/fruits') //this redirect the fruits-new to the fruits 
});


app.delete('/fruits/:fruitId', async (req, res)=> {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect('/fruits');
});

// GET localhost:3000/fruits/:fruitId/edit
app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", {fruit: foundFruit});
  });
  


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
