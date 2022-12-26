const {mongoose} = require('mongoose')

const registerSchema = new mongoose.Schema({
    userName : {
        type:String,
        require:true,
    },
    email : {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }
},{timestamps:true});

module.exports = mongoose.model('UsersData', registerSchema)