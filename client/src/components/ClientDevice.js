import React, {useEffect, useState} from "react"

import Iphone8 from "./Iphone8"
import FriendList from "./FriendList";
import Game from "./Game";
import services from "../services";


const ClientDevice = ({email, socket}) => {
    const [user, setUser] = useState([])
    const [friends, setFriends] = useState([])
    const [invite, setInvite] = useState(null)
    const [game, setGame] = useState(null)

    useEffect(() => {
        if (socket) {
            services.auth.login(email, socket).then(user => {
                setUser(user)
                services.friends.query().then(setFriends)
            })

            socket.on('invite-to-game', (invite) => setInvite(invite))
            socket.on('start-game', (game) => {
                setGame(game)
                setInvite(null)
            })
            socket.on('client-log', console.log)
        }
    }, [socket])

    const acceptInviteToGame = () => {
        socket.emit("accept-invite-to-game", invite)
    }

    const inviteToGame = (friend) => {
        socket.emit("invite-to-game", {
            inviter: user,
            invitee: friend
        })
    }

    return (
        <Iphone8>
            <div className="d-flex flex-column h-100">
                {game && <Game user={user} game={game} socket={socket}/>}
                {!game && (
                    <div className="d-flex flex-column h-100">
                        <p className="text-center">{user.name}</p>
                        {invite && (
                            <div className="alert alert-info text-center">
                                <p>{invite.inviter.name} wants to play a game with you! Let's get connected!</p>
                                <button onClick={() => acceptInviteToGame(invite)}
                                        className="btn btn-success btn-sm">
                                    Join Game
                                </button>
                            </div>
                        )}
                        <FriendList friends={friends} onPress={inviteToGame}/>
                    </div>
                )}
            </div>
        </Iphone8>
    )
}

export default ClientDevice
