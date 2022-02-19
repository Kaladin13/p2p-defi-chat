import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import "./connect.css"

function Connect() {

    const location = useLocation();

    const [partnerWallet, setPartnerWallet] = useState("");

    const handleWalletChange = (event) => {
        // console.log(partnerWallet);
        setPartnerWallet(event.target.value);
    }

    return (
        <div
            className="App-header">
            <div>
                Start chatting right now
            </div>
            <div>
                Connect to another user:
                <input placeholder="0x..." 
                value={partnerWallet} 
                onChange={handleWalletChange} />
            </div>
        </div>
    )
}

export default Connect;