const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bankname: {
        type: String,
        required: true,
        
    },

    branch: {
        type:String,
        required:true,
},

acctype:{
         type:String,
          required:true,
},

    username: {
          type: String,
          required: true,
    },

    password: {
            type: String,
            required: true,

    },

    passwdupddate: {
           type: String,
           required: true,

    },

    transpasswd:
    {
           type:String,
           required: true,
    },

    cardno: {
           type:String,
           required: true,


    },

    bankpin: {

        type:String,
        required: true,
    },


});

const Userdb = mongoose.model("userdb", schema);

module.exports = Userdb;
