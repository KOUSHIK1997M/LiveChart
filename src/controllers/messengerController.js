const mongoose = require('mongoose')
const formidable = require('formidable')
const validator = require('validator')
const users = require('../models/authModel')
const messageModel = require('../models/messageModel')
var fs = require('fs-extra')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const getFriends = async (req, res) => {
    res.header("Access-Control-Allow-Headers", "*");
    try {
        const myId = req.myId
        const allfriends = await users.find({})
        const filter = allfriends.filter(e => e.id !== myId.id)
        // console.log(myId.id)

        return res.status(200).json({ success: true, friends: filter })

    } catch (error) {
        return res.status(500).json({ error: { errorMessage: ['Internal server errror'] } })
    }
}


const messageUploadDB = async (req, res) => {
    res.header("Access-Control-Allow-Headers", "*");
    try {
        const senderId = req.myId.id;
        const { senderName, reseverId, message } = req.body;
        // console.log(senderName)
        const insertMessage = await messageModel.create({
            senderId: senderId,
            senderName: senderName,
            reseverId: reseverId,
            message: {
                text: message,
                image: ''
            }
        })
        return res.status(201).json({ success: true, message: 'message is sort', data: insertMessage })

    } catch (error) {
        return res.status(500).json({ error: { errorMessage: error.message } })
    }
}

const messageGet = async (req, res) => {
    res.header("Access-Control-Allow-Headers", "*");
    try {
        const myId = req.myId;
        const fdId = req.params.id;

        let getAllMessage = await messageModel.find({})
        getAllMessage = getAllMessage.filter(m => m.senderId === myId.id && m.reseverId === fdId) || (m.senderId === fdId && m.reseverId === myId.id)

        // console.log(getAllMessage)
        return res.status(200).json({ success: true, message: getAllMessage })
    } catch (error) {
        return res.status(500).json({ error: { errorMessage: error.message } })
    }
}




const ImageMessagrSend = async (req, res) => {
    res.header("Access-Control-Allow-Headers", "*");
    const formidable = require('formidable');
    const form = formidable()

    const senderId = req.myId.id;
    form.parse(req, async (err, fields, files) => {
        const { senderName, reseverId, imageName } = fields;
        files.image.name = imageName
        const newPath = __dirname + `../../../client/public/image/${files.image.name}`;
        // console.log(newPath)
        try {
            fs.copy(files.image.filepath, newPath, async (error) => {
                if (!error) {
                    const insertMessage = await messageModel.create({
                        senderId: senderId,
                        senderName: senderName,
                        reseverId: reseverId,
                        message: {
                            text: '',
                            image: files.image.name
                        }
                    })
                    return res.status(201).json({ success: true, message: 'message is sort', data: insertMessage })
                } else {

                    return res.status(500).json({ error: { errorMessage: error.message } })
                }
            })
        } catch (error) {
            return res.status(500).json({ error: { errorMessage: error.message } })
        }
    })
}





module.exports = { getFriends, messageUploadDB, messageGet, ImageMessagrSend }