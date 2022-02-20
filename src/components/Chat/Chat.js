import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState, useReducer } from 'react';
import { useNavigate } from "react-router-dom";

import Gun from "gun";
import "gun/sea";
import sha256 from "js-sha256";



function Chat() {

    let navigate = useNavigate();

    const { roomid } = useParams();

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


    const initialState = {
        messages: []
    }

    // Create a reducer that will update the messages array
    function reducer(state, message) {
        return {
            messages: [message, ...state.messages]
        }
    }


    const [state, dispatch] = useReducer(reducer, initialState);

    const [it, setIt] = useState(1);

    const [formState, setForm] = useState({
        message: ''
    })

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
                dispatch({ message: m.message, createdAt: m.createdAt, from: m.from });
                console.log(state);
                setIt(it + 1);
            }
        });

        gun.on("set", () => {
            setIt(it+1);
        })

    }, []);

    const sendMessage = () => {

        const chatRoom = gun.get(roomId);

        chatRoom.set(
            {   
                from: wallet,
                message: formState.message,
                createdAt: new Date().toISOString()
            }
        );

        setForm({
            message: ''
          });

    }

    function onChange(e) {
        setForm({ ...formState, [e.target.name]: e.target.value  })
      }

    return (
        <div>
            <div style={{ padding: 30 }}>
                <input
                    onChange={onChange}
                    placeholder="Message"
                    name="message"
                    value={formState.message}
                />
                <button onClick={sendMessage}>Send Message</button>
                {
                    state.messages.map((message, i) => (
                        <div key={i}>
                            <h2>{message.message}</h2>
                            <h3>From: {message.from}</h3>
                            <p>Date: {message.createdAt}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default Chat;