const express = require('express');
const router = express.Router();

const {userRegister, userLogin} = require('../controllers/authController')

//------------------------------------------> (This is test api ) <--------------------------------------------//

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})





router.post('/user-register', userRegister)
router.post('/user-login', userLogin)




module.exports = router;