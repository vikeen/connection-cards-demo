import React from "react"

const FriendList = ({friends, onPress}) => {

    return (
        <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
            <h3>Friends</h3>
            <p className="text-large">Tap a friend to start a new game</p>
            {friends
                .map(friend => (
                    <button onClick={(e) => onPress(friend)}
                            className="btn btn-secondary m-2"
                            key={friend.id}
                    >
                        {friend.name}
                    </button>
                ))}
        </div>
    )
}

export default FriendList
