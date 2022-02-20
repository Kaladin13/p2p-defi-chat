import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import sha256 from "js-sha256";
import "./connect.css"
import Gun from "gun";
import logo from './zerionlogo.jpg';
import "gun/sea";


function Connect() {

    const location = useLocation();

    let navigate = useNavigate();

    if (location.state == null) {
        location.state = {
            partnerWallet: null,
            wallet: null,
            roomId: null
        }
    }

    const wallet = location.state.wallet;

    useEffect(() => {
        if (wallet == null) {
            navigate("/notfound");
        }
    }, [])

    const [partnerWallet, setPartnerWallet] = useState("");

    const handleWalletChange = (event) => {
        console.log(partnerWallet);
        setPartnerWallet(event.target.value);
    }

    const createUser = () => {

        const gun = Gun({
            peers: [
                'http://localhost:3030/gun'
            ]
        });

        const id =
            sha256(partnerWallet[4] > wallet[4] ?
                partnerWallet + wallet : wallet + partnerWallet).slice(0, 8);

        navigate("/chat/" + id, {
            state: {
                wallet: wallet,
                partnerWallet: partnerWallet,
                roomId: id
            }
        })

    }

    return (
        <div
            className="App-header">
                <header
                    className='header'><img id='pic' alt='xyec)' src={logo} width="5%" height="100%" align="left" />
                </header>
            <div className="App-Center"><center>
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
                    <button className="btn"

                        id="App-link"
                        onClick={createUser}
                    >
                        Connect!
                    </button>
                </div>
            </center></div>
        </div>
    )
}

export default Connect;