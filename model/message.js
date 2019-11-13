const mongoose = require('mongoose');

var msgSchema = new mongoose.Schema({
   
    source: {
       type: String,
       required: 'source can\'t be empty'
    },
    msg: {
        type: String,
        required: 'msg can\'t be empty'
    },
    date_msg: {
        type: Date,
       default:Date.now
    },
    distination: {
        type:String,
        required: 'Distination can\'t be empty'
    }

});

const Message =module.exports=mongoose.model('Message', msgSchema);