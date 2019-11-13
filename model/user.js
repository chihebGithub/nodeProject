const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [4,'Password must be atleast 4 character long']
    },
    confirmpassword: {
        type: String,
        required: 'Confirm password can\'t be empty',
        minlength : [4,'Password must be atleast 4 character long']
    },
    genre: {
        type: String,
        enum : ['male', 'female'],
        required:true
    },
    birthday:{
        type: Date
    },
    image:{
        type: String,
        default:'../public/images/no-face.jpg'
    },
    created_at:{
        type: Date,
        default:Date.now
    }


});

const User =module.exports=mongoose.model('User', userSchema);