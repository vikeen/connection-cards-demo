import React from "react";

const Iphone8 = ({children}) => {
    return (
        <div className="marvel-device iphone8 silver">
            <div className="top-bar"/>
            <div className="sleep"/>
            <div className="volume"/>
            <div className="camera"/>
            <div className="sensor"/>
            <div className="speaker"/>
            <div className="screen">{children}</div>
            <div className="home"/>
            <div className="bottom-bar"/>
        </div>
    )
}

export default Iphone8
