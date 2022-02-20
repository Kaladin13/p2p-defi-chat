import './wallet.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Eth from 'web3-eth';
import logo from './zerionlogo.jpg';


function Wallet() {

    const [wallet, setWallet] = useState("");

    const { ethereum } = window;

    let navigate = useNavigate();

    const connectMetamask = async () => {
        try {
            const newAccount = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            setWallet(newAccount[0]);
        } catch (error) {
            console.error(error)
        }
    }



    const installMask = () => {
        window.location.replace("https://metamask.io/download/");
    }

    const isMetaMaskInstalled = Boolean(ethereum && ethereum.isMetaMask);

    const eth = new Eth(Eth.givenProvider);

    useEffect(() => {

        const getAcc = async () => {

            await eth.getAccounts((e, res) => {
                if (e) {
                    setWallet("");
                }
                else {
                    setWallet(res[0]);
                    if (res[0] != null) {
                        navigate("/enter", { state: { wallet: res[0] } });
                    }
                }
            })
        }
        if (isMetaMaskInstalled) {
            getAcc();
        }
    }, []);

    useEffect(() => {
        if (wallet != null && wallet != "") {
            navigate("/enter", { state: { wallet: wallet } });
        }
    }, [wallet])

    return (
        <div
            className="App-header"><center>
                    <header
                        className='header'><img id='pic' alt='xyec)' src={logo} width="5%" height="100%" align="left" />
                    </header>
                <div
                    className='App-center'><center>

                        <div><center>
                            {isMetaMaskInstalled ? "MetaMask is installed" : "MetaMask is not installed"}
                            <br></br>
                            {wallet != null ? wallet : <small><font color='#6e6e6e'>No account connected</font></small>}
                        </center></div>
                        <small id='instbtn'><font color='#6e6e6e'>{isMetaMaskInstalled ? <font color='#708EA4'></font> : "Click install metamask to proceed"}</font></small>
                        <button
                            id='btn'
                            onClick={isMetaMaskInstalled ? connectMetamask : installMask}><center>
                                {isMetaMaskInstalled ? "Connect to MetaMask" : "Install MetaMask"}
                            </center></button>
                    </center> </div>
            </center></div>
    );
}

export default Wallet;
