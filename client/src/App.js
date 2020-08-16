import React, {useEffect, useState} from 'react';

import './devices.min.css';
import ClientDevice from "./components/ClientDevice";


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
                <ClientDevice email={email} key={email}/>
            )}
        </div>
    );
}

export default App;
