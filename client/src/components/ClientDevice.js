import React, {useEffect, useState} from "react"
import io from 'socket.io-client'

import Iphone8 from "./Iphone8"
import FriendList from "./FriendList";
import services from "../services";
import config from "../config";

const {API_URL} = config

const ClientDevice = ({email}) => {
    const [user, setUser] = useState([])
    const [friends, setFriends] = useState([])
    const [invite, setInvite] = useState(null)
    const [otherPlayer, setOtherPlayer] = useState()
    const [socket, setSocket] = useState()

    useEffect(() => {
        setSocket(io(API_URL))
    }, [])

    useEffect(() => {
        if (socket) {
            socket.connect()
            socket.on('invite-to-game', (invite) => setInvite(invite))
            socket.on('connect', () => {
                services.auth.login(email, socket).then((loggedInUser) => {
                    setUser(loggedInUser)
                    services.friends.query().then(setFriends)
                })
            })

        }
    }, [socket])

    const acceptInviteToGame = (newOtherPlayer) => {
        setOtherPlayer(newOtherPlayer)
        socket.emit("accept-invite-to-game", user, newOtherPlayer)
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
        </Iphone8>
    )
}

export default ClientDevice
