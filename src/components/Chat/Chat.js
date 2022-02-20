import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState, useReducer } from 'react';
import { useNavigate } from "react-router-dom";

import Gun from "gun";
import "gun/sea";
import sha256 from "js-sha256";



function Chat() {

    let navigate = useNavigate();

    const {roomid} = useParams();

    const location = useLocation();

    if (location.state == null) {
        location.state = {
            partnerWallet: null,
            wallet: null,
            roomId: null
        }
    }

    const partnerWallet = location.state.partnerWallet;

    const wallet = location.state.wallet;

    let messages = [];

    const roomId = location.state.roomId;

    const gun = Gun({
        peers: [
            'http://localhost:3030/gun'
        ]
    });

    let i = 0;

    useEffect(() => {
        
        if (partnerWallet == null || wallet == null) {
            navigate("../");
        }

        if (sha256(partnerWallet[4] > wallet[4] ?
            partnerWallet + wallet : wallet + partnerWallet).slice(0, 8) != roomid) {
            navigate("../");
        }

        const chatRoom = gun.get(roomId);

        chatRoom.map().on(m => {
            i++;
            if (i % 3 == 0) {
                console.log(messages);
                messages = [...messages, m];
            }
        });


    }, []);

    const sendMessage = () => {

        const chatRoom = gun.get(roomId);

        chatRoom.set(
            {
                name: "Max",
                createdAt: Date.now()
            }
        );

    }


    return (
        <div>
            <button
                onClick={sendMessage}>
                Send msg
            </button>
            <div>
                {messages.map(el =>
                (<div>
                    {el.name}
                </div>
                ))}
            </div>
        </div>
    )

}

export default Chat;