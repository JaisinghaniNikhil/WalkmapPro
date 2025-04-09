const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required:true
        },
        gender: {
            type: String,
            enum: ['Male','Female','Other'],
            required:true
        },
        height:{
            type: Number,
            required:true
        },
        weight:{
            type: Number,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        }

    }
);


const User = mongoose.model('User',userSchema);

module.exports = User;