import React, {useEffect, useState} from "react"

const Game = ({user, game, socket}) => {
    const myUser = game.playerOne.id === user.id ? game.playerOne : game.playerTwo
    const theirUser = game.playerOne.id === user.id ? game.playerTwo : game.playerOne
    const [myConnectionScore, setMyConnectionScore] = useState(0)
    const [theirConnectionScore, setTheirConnectionScore] = useState(0)

    useEffect(() => {
        socket.on('game:change-connection-score', (newScore) => {
            console.log("received: game:change-connection-score", newScore)
            setTheirConnectionScore(newScore)
        })
    }, [])

    const handleConnectionScoreChange = (e) => {
        const newConnectionScore = e.currentTarget.value;
        setMyConnectionScore(newConnectionScore)
        socket.emit('game:change-connection-score', game.id, newConnectionScore)
    }

    return (
        <div className="d-flex flex-column h-100">
            <div className="form-group pl-2 pr-2">
                <p className="text-center">{myUser.name}</p>
                <input type="range" id="player_one_score" name="player_one_score"
                       value={myConnectionScore} min="-5" max="5" className="form-control-range"
                       onChange={handleConnectionScoreChange}
                />
            </div>
            <div className="form-group pl-2 pr-2">
                <p className="text-center">{theirUser.name}</p>
                <input type="range" id="player_two_score" name="player_two_score"
                       value={theirConnectionScore} min="-5" max="5" className="form-control-range"
                       disabled="disabled"
                />
            </div>
        </div>
    )
}

export default Game
