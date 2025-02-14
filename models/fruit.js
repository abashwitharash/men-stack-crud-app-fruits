// STEP 1 CREATE A SCHEMA 
const mongoose = require('mongoose');

//creating a schema 1) give it a const 2) make sure its new and grab the mongoose function 
//3) then name it schema so it knows its a Schema 4) object it 
const fruitSchema = new mongoose.Schema({
    name: String, 
    isReadyToEat: Boolean,
});

//make the model and make sure the const is caps 
const Fruit = mongoose.model('Fruit', fruitSchema);

module.exports = Fruit;