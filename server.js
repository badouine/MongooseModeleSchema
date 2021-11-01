var mongoose = require('mongoose');
const mongodb = require('mongodb');
var express = require('express');

// Environnement variables
const dotenv = require('dotenv');
dotenv.config();
var app = express();
// Database connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected Database Succesfully");
});

app.listen(3000, function(req,res){
    console.log("Server is started on port 3000");
});

// Create model Person
var Schema = mongoose.Schema;
var personSchema = new Schema({
    name: { type: String, required: true},
    age: Number,
    favoriteFoods: [String]
});

var Person = mongoose.model('Person', personSchema);
let Naruto = function(done) {
    return new Person({
        name: "Naruto Uzumaki",
        age: 22,
        favoriteFoods: ["MachenCheeze", "Ramen"]    });
        if(error) return done(error);
        done(null, result);
};
