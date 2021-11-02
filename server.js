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

// Create model Person and save
var Schema = mongoose.Schema;
var personSchema = new Schema({
    name: { type: String, required: true},
    age: Number,
    favoriteFoods: [String]
});

var Person = mongoose.model('Person', personSchema);
var Human = function(done) {
    var person = new Person({name: 'Naruto', age:24, favoriteFoods:['ramen','thieboudieune']})
    person.save((err, data) => {
        if(err) return done(err)
            return done(null, data)
    })
};

// Create many people with model.create
var createMany = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, people) => {
        if(err) return console.log(err);
        done(null, people);
    });
};

// Find people

var findPeopleByName = function(personName, done) {
    Person.find({name: personName}, (error, peopleFound) => {
        if(error) return console.log(error);
        done(null, peopleFound);
    });
};

// FindOne Single Matching Document from  Database
var findOneByFood = (food, done) => {
    Person.findOne({favoriteFoods: food}, (err, foodPerson) => {
        if(err) return console.log(err);
        done(null, foodPerson);
    })
};

// Find By id
var findPersonById = function(personId, done) {
    Person.findById(personId, function(err, individual) {
        if(err) return console.log(err);
        done(null, individual);
    });
};