import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import POSPage from "./pages/POSPage"


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/pos" element={<POSPage/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;


