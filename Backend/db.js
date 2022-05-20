const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongoose=()=>{
    mongoose.connect(uri, ()=>{
        console.log('Connected to mongoose');
    })
}

module.exports = connectToMongoose;