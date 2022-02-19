import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import "./connect.css"
import Gun from "gun";


function Connect() {

    const location = useLocation();

    const wallet = location.state.wallet;

    const [partnerWallet, setPartnerWallet] = useState("");

    const handleWalletChange = (event) => {
        // console.log(partnerWallet);
        setPartnerWallet(event.target.value);
    }

    const createUser = () => {

        const gun = Gun({
            peers: [
              'http://localhost:3000/gun'
            ]
          });

        const user = gun.user().recall({sessionStorage: true});
        
        user.create("user1", wallet, (ack) => {
            user.auth("user1", wallet, () => {
                console.log("logged");
            })
        })

    }

    return (
        <div
            className="App-header">
            <div>
                Start chatting right now
            </div>
            <div>
                {/* Your wallet: {wallet} <br/> */}
                Connect to another user:
                <input placeholder="0x..." 
                className="input"
                value={partnerWallet} 
                onChange={handleWalletChange} />
                <button 
                    id="App-link"
                    onClick={createUser}
                >
                    Connect!
                </button>
            </div>
        </div>
    )
}

export default Connect;