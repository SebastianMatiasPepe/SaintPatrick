import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Saldo from "./Saldo";
import CierreSesion from "./CierreSesion";

function App() {
    return (
        
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/saldo" element={<Saldo />} />
                <Route path="/cierreSesion" element ={<CierreSesion />} />
            </Routes>
        
    );
}

export default App;
