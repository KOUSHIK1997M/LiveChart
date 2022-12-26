const io = require('socket.io')(8000,{
    cors : {
        origin : '*',
        method : ['GET','POST']
    }
})

let users = []


const addUser = (userId, socketId, userInfo)=>{

    const checkUser = users.some(u=>u.userId === userId)
    if(!checkUser){
        users.push({userId, socketId, userInfo})
    }
}

io.on('connection', (socket=>{
    console.log('socket is running......')
    socket.on('adduser', (userId, userInfo)=>{
        addUser(userId, socket.id, userInfo)
        io.emit('getUser', users)
    })
}))





// PORT = 8080

// DB = "mongodb+srv://project_4:718kVYYXNr8yeYqY@cluster0.u6u38bx.mongodb.net/project_4?retryWrites=true&w=majority"

// SECRET = 'sdzlrkjnvgksdnsdfbvgsrdlgvsnm'
// TOKEN_EXP = 7d

// COOKIE_EXP = 7