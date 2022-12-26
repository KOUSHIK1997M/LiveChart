const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const messengerRouter = require('./routes/messengerRoute');
const cors = require("cors");
const app = express();
const connection = require("./config/database");
const cookieParser = require('cookie-parser');
require('dotenv').config()

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());




// database connection
connection();


app.use('/api/messenger', router);
app.use('/api/messenger', messengerRouter);
app.use(cookieParser());


//vercel 

if (process.env.NODE_ENV == 'production') {
    const path = require('path')
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", function (_, res) {
        res.sendFile(
            path.join(__dirname, "../client/build/index.html"),
            function (err) {
                if (err) {
                    res.status(500).send(err)
                }
            }
        )
    })
}



app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 8080))
});