import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Connect from "../Connect/Connect";
import Wallet from "../Wallet/Wallet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wallet/>}/>
        <Route path="enter" element={<Connect/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
