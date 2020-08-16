import React, {useEffect, useState} from 'react';
import io from "socket.io-client";

import './devices.min.css';
import ClientDevice from "./components/ClientDevice";
import config from "./config";

const {API_URL} = config
const socket = io(API_URL)

const App = () => {
    const [email, setEmail] = useState(null)

    useEffect(() => {
        setEmail(localStorage.getItem('email'))
    }, [])

    const onClickUser = (newUserEmail) => {
        localStorage.setItem('email', newUserEmail)
        setEmail(newUserEmail)
    }

    const buttonClasses = (buttonEmail) => {
        if (email === buttonEmail) {
            return "btn btn-secondary"
        } else {
            return "btn btn-light"
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center fullscreen">
            <div className="btn-group">
                <button type="button" className={buttonClasses("john.rake12@gmail.com")}
                        onClick={() => onClickUser("john.rake12@gmail.com")}>
                    John Rake
                </button>
                <button type="button" className={buttonClasses("bwade135@gmail.com")}
                        onClick={() => onClickUser("bwade135@gmail.com")}>
                    Brandi Wade
                </button>
            </div>
            {email && (
                <ClientDevice email={email} key={email} socket={socket}/>
            )}
        </div>
    );
}

export default App;
