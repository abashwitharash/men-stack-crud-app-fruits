// Here is where we import modules
// We begin by loading Express
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose'); //
const app = express();

mongoose.connect(process.env.MONGODB_URI); // here we are able to use the functionality of mongoose 

mongoose.connection.on('connected', () => {
    console.log(`connected on mondoDB ${mongoose.connection.name}`)
});
//THIS GRABS THE CONNECTION BETWEEN FRUITS AND SERVER
const Fruit = require('./models/fruit.js');

//Get  // why do we async?
app.get('/', async (req, res)=> {
    res.render('index.ejs');
});


//GET method /fruits/new 
app.get('/fruits/new', (req, res) =>{
    //this checks to see the route works with the res.send
    // res.send('this route sends rhe user to a form page')
    res.render('fruits/new.ejs') //we made a new folder called new.ejs and then grab it to make another page
});



app.listen(3000, () => {
  console.log('Listening on port 3000');
});
