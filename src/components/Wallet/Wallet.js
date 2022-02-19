import './wallet.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Eth from 'web3-eth';


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
                    if (res[0] != null){
                        navigate("/chat", { state: { wallet: res[0] } });
                    }
                }
            })
        }
        getAcc();
    }, []);

    useEffect(() => {
        if (wallet != null && wallet!=""){
            navigate("/enter", { state: { wallet: wallet} });
        }
    }, [wallet])

    return (
        <div
            className="App-header">
            <button
                id='btn'
                onClick={isMetaMaskInstalled ? connectMetamask : installMask}>
                {isMetaMaskInstalled ? "Connect to metamask" : "Install metamask"}
            </button>
            <div>
                {isMetaMaskInstalled ? "MetaMask is installed" : "MetaMask is not installed"}
                <br></br>
                {wallet != null ? wallet : "No account connected"}
            </div>
        </div>
    );
}

export default Wallet;
