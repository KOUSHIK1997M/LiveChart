const {mongoose} = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const messageSchema = new mongoose.Schema({
    senderId: {
        type:String,
        require:true,
    },
    senderName : {
        type: String,
        required: true,
    },
    reseverId:{
        type: String,
        required: true,
    },
    message:{
        text : {
            type: String,
            default:''
        },
        image:{
            type:String,
            default:''
        }
    }
},{timestamps:true});

module.exports = mongoose.model('Message', messageSchema)