import React from 'react';
import axios from 'axios';
import './devices.min.css';

function App() {
    const hitBackend = () => {
        axios.get('/test')
            .then((response) => {
                console.log(response.data)
            })
    }

    return (
        <div className="App">
            <div className="d-flex flex-row justify-content-center align-items-center fullscreen">
                <div className="marvel-device iphone8 silver">
                    <div className="top-bar"/>
                    <div className="sleep"/>
                    <div className="volume"/>
                    <div className="camera"/>
                    <div className="sensor"/>
                    <div className="speaker"/>
                    <div className="screen">
                        <button onClick={hitBackend}>Send request</button>
                    </div>
                    <div className="home"/>
                    <div className="bottom-bar"/>
                </div>
                <div className="marvel-device iphone8 silver">
                    <div className="top-bar"/>
                    <div className="sleep"/>
                    <div className="volume"/>
                    <div className="camera"/>
                    <div className="sensor"/>
                    <div className="speaker"/>
                    <div className="screen">
                        <button onClick={hitBackend}>Send request</button>
                    </div>
                    <div className="home"/>
                    <div className="bottom-bar"/>
                </div>
            </div>
        </div>
    );
}

export default App;
