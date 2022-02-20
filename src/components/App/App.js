import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Chat from "../Chat/Chat";
import Connect from "../Connect/Connect";
import Wallet from "../Wallet/Wallet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wallet/>}/>
        <Route path="enter" element={<Connect/>} />
        <Route path="chat" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
