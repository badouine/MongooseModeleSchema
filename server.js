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
})