const mongoose = require('mongoose')
const formidable = require('formidable')
const validator = require('validator')
// const {uploadFile} = require('../config/aws')
const registerModel = require('../models/authModel')
var fs = require('fs-extra')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRegister = async (req, res) => {
    res.header("Access-Control-Allow-Headers","*");
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
        const { userName, email, password, confirmPassword } = fields;
        const { image } = files
        // console.log(image)
        const error = [];

        if (!userName) {
            error.push('please provide your user name');
        }

        if (!email) {
            error.push('please provide your email');
        }
        if (!validator.isEmail(email)) {
            error.push('please provide your valide email')
        }
        if (!password) {
            error.push('please provide your password');
        }

        if (!confirmPassword) {
            error.push('please provide your confirm password');
        }
        if (password && confirmPassword && password !== confirmPassword) {
            error.push('your password and confirm password not same');
        }
        if (password && password.length < 6) {
            error.push('please provide password must be 6 charecter');
        }
        if (Object.keys(fields).length === 0) {
            error.push('please provide user image')
        }

        if (error.length > 0) {
            return res.status(400).json({ error: { errorMessage: error } })
        } else {
            const getImageName = files.image.originalFilename;
            const randNumber = Math.floor(Math.random() * 99999);
            const newImageName = randNumber + getImageName;
            files.image.originalFilename = newImageName;
            // console.log(files.image.originalFilename)
            const newPath = __dirname + `../../../client/public/image/${files.image.originalFilename}`;

            try {
                // console.log('ok')
                const checkUser = await registerModel.findOne({ email: email })
                // console.log(checkUser)
                if (checkUser) {
                    return res.status(404).json({ error: { errorMessage: ['your Email already exited'] } })
                } else {
                    // console.log('ok')
                    fs.copy(files.image.filepath, newPath, async (error) => {
                        if (!error) {
                            const userCreate = await registerModel.create({
                                userName,
                                email,
                                password: await bcrypt.hash(password, 10),
                                image: files.image.originalFilename
                            })
                            // console.log(userCreate)
                            const token = jwt.sign({
                                id: userCreate._id,
                                email: userCreate.email,
                                userName: userCreate.userName,
                                image: userCreate.image,
                                registerTime: userCreate.createAt,
                            }, process.env.SECRET, { expiresIn: process.env.TOKEN_EXP });

                            const options = {
                                expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000),
                                httpOnly : true
                            }

                            res.status(201).cookie('authToken', token, options).json({
                                successMessage: 'Your Register successfull', token
                            })
                            // console.log(token)
                            // console.log("ok")
                        } else {
                            return res.status(500).json({ error: { errorMessage: ['Internal server errror'] } })
                            // console.log(error)
                        }
                    })
                }
            } catch (error) {
                return res.status(500).json({ error: { errorMessage: ['Internal server errror'] } })
            }
        }

    })

}


const userLogin = async (req, res) => {
    res.header("Access-Control-Allow-Headers","*");
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
        const { email, password } = fields;
        const error = [];
        if (!email) {
            error.push('Please provide your email')
        }
        if (!password) {
            error.push('Please privide your password')
        }
        if (email && !validator.isEmail(email)) {
            error.push('Please provide your valid email')
        }
        if (error.length > 0) {
            res.status(400).json({ error: { errorMessage: error } })
        } else {
            try {
                const checkUser = await registerModel.findOne({ email: email })

                if (!checkUser) {
                    return res.status(404).json({ error: { errorMessage: ['your Email not exited'] } })
                }

                const matchPassword = await bcrypt.compare(password, checkUser.password);

                if (!matchPassword) {
                    return res.status(404).json({ error: { errorMessage: ['your password is not valid'] } })
                }

                const token = jwt.sign({
                    id: checkUser._id,
                    email: checkUser.email,
                    userName: checkUser.userName,
                    image: checkUser.image,
                    registerTime: checkUser.createAt,
                }, process.env.SECRET, { expiresIn: process.env.TOKEN_EXP });

                const options = {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    httpOnly : true
                }

                // res.cookie('authToken', token, options);
                res.status(200).cookie('authToken', token, options).json({
                    successMessage: 'Your Login successfull', token
                })

            } catch (error) {
                return res.status(500).json({ error: { errorMessage: ['Internal server errror'] } })
            }
        }
    })
}



module.exports = { userRegister, userLogin }