import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Chat from "../Chat/Chat";
import Connect from "../Connect/Connect";
import PageNotFound from "../NotFound/NotFound";
import Wallet from "../Wallet/Wallet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wallet />} />
        <Route path="/enter" element={<Connect />} />
        <Route path="/chat" element={<Chat />}/>
        <Route path="/chat/:roomid" element={<Chat />}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
