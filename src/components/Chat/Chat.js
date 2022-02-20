import { useLocation } from "react-router-dom";
import { useEffect, useState, useReducer } from 'react';
import Gun from "gun";
import "gun/sea";


function Chat() {

    const location = useLocation();

    const partnerWallet = location.state.partnerWallet;

    const wallet = location.state.wallet;

    let messages = [{ as: "aaa" }];

    let i = 0;

    const roomId = location.state.roomId;

    const initialState = {
        messages: []
    }

    function reducer(state, message) {
        return {
            messages: [message, ...state.messages]
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const gun = Gun({
        peers: [
            'http://localhost:3030/gun'
        ]
    });

    useEffect(() => {

        const chatRoom = gun.get(roomId);

        chatRoom.map().on(m => {
            console.log(m)
            dispatch(m);
            console.log(state);
        });

        i++;

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
        </div>
    )

}

export default Chat;