import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Community from "./pages/Community";
import ForgotPassword1 from "./pages/ForgotPassword1";
import ForgotPassword2 from "./pages/ForgotPassword2";
import Profile from "./pages/Profile";
import H2 from "./pages/H2";
import Heatmap from "./pages/Heatmap";
import FormatosR from "./pages/FormatosR";
import InformeCrimenes from "./pages/InformeCrimenes";
import 'leaflet/dist/leaflet.css';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/community" element={<Community />} />
        <Route path="/forgotP1" element={<ForgotPassword1 />} />
        <Route path="/forgotP2" element={<ForgotPassword2 />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/heatmap" element={<Heatmap />} />
        <Route path="/formatos" element={<FormatosR />} />
        <Route path="/informe" element={<InformeCrimenes />} />
      </Routes>
    </Router>
  );
}

export default App;


