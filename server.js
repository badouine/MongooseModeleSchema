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

//  Perform Classic Updates by Running Find, Edit, then Save
var findEditThenSave = (personId, done) => {
    Person.findById(personId, (error, person) => {
        if(error) return console.log('error');
        person.favoriteFoods.push('yassaPoulet');

        person.save((err, individual) => {
            if(err) return console.error(err);
            done(null, individual);
        });
    });
};

//   Perform New Updates on a Document Using model.findOneAndUpdate()
var findAndUpdate = (personName, done) => {
    let query = {name: personName};
    let update = {age: 20};
    let option = {new: true};

    Person.findOneAndUpdate(query, update, option, (error, individual) => {
        if(error) return console.log(error);
        done(null, individual);
    });
};
//  Delete One Document Using model.findByIdAndRemove
var removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (error, removedPerson) => {
        if(error) return console.log(error);
        done(null, removedPerson);
    });
};

//    MongoDB and Mongoose - Delete Many Documents with model.remove()
var removeManyPeople = (done) => {
    var nameToRemove = "Mary";
    
    Person.remove({ name: nameToRemove }, function(error, data) {
      error ? done(error) : done(error, data);
    });
  };

  //  Chain Search Query Helpers to Narrow Search Results
var queryChain = (done) => {
    Person.find({favoriteFoods: "cBon"})
    .sort({name: 'khaby'})
    .limit(2)
    .select({age: 0})
    .exec((error, searchResults) => {
        done(error, searchResults);
    });
};