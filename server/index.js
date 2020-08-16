const app = require('express')()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const uuidv4 = require('uuid').v4;
const bodyParser = require('body-parser')
const _ = require('lodash')
const port = 8080

let usersDb = [{
    id: "5ad9003a-2fff-4308-bb33-e1d97b81a834",
    name: 'John Rake',
    email: "john.rake12@gmail.com"
}, {
    id: "f1844ef4-d6a0-4080-9808-ff78306e69fb",
    name: 'Brandi Wade',
    email: "bwade135@gmail.com"
}]

let userFriendsDb = [
    {userId: "5ad9003a-2fff-4308-bb33-e1d97b81a834", friendId: "f1844ef4-d6a0-4080-9808-ff78306e69fb"},
    {userId: "f1844ef4-d6a0-4080-9808-ff78306e69fb", friendId: "5ad9003a-2fff-4308-bb33-e1d97b81a834"}
]

let gamesDb = []

io.on('connection', (socket) => {
    socket.on('invite-to-game', (invite) => {
        invite.id = uuidv4()
        const user = findUserByEmail(invite.invitee.email)
        const newGame = {
            id: uuidv4(),
            inviteId: invite.id,
            playerOne: invite.inviter,
            playerTwo: invite.invitee
        }
        socket.to(user.socketId).emit('invite-to-game', invite)
        gamesDb.push(newGame)
        socket.join(`games:${newGame.id}`)
    })
    socket.on('accept-invite-to-game', (invite) => {
        const game = findGameByInvite(invite)
        socket.join(`games:${game.id}`)
        io.to(`games:${game.id}`).emit('start-game', game)
    })
    socket.on('game:change-connection-score', (gameId, newConnectionScore) => {
        socket.to(`games:${gameId}`).emit("game:change-connection-score", newConnectionScore)
    })
})

app.use(cors())
app.use(bodyParser.json())

app.use((req, res, next) => {
    const token = req.header('Authorization')

    if (token) {
        req.user = findUserById(token)
    }

    next()
})

app.post('/login', (req, res) => {
    const {email, socketId} = req.body
    const user = findUserByEmail(email)
    if (user) {
        user.socketId = socketId
        return res.json(user)
    } else {
        return res.send(400)
    }
})

app.get('/friends', (req, res) => {
    const friends = findFriendsByUserId(req.user.id)
    return res.json(friends)
})

http.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})

const findUserById = (id) => {
    return usersDb.find(user => user.id === id)
}

const findUserByEmail = (email) => {
    return usersDb.find(user => user.email === email)
}

const findUsersByIds = (ids = []) => {
    return usersDb.filter(user => ids.includes(user.id))
}

const findFriendsByUserId = (userId) => {
    const friendIds = userFriendsDb.filter(uf => uf.userId === userId).map(uf => uf.friendId)
    return findUsersByIds(friendIds)
}

const findGameByInvite = (invite) => {
    return gamesDb.find(g => g.inviteId === invite.id)
}
