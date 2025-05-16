import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reports from "./pages/Reports";
import Community from "./pages/Community";
import ForgotPassword1 from "./pages/ForgotPassword1";
import ForgotPassword2 from "./pages/ForgotPassword2";
import Profile from "./pages/Profile";
import H2 from "./pages/H2";
import FormatosR from "./pages/formatosR";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/community" element={<Community />} />
        <Route path="/forgotP1" element={<ForgotPassword1 />} />
        <Route path="/forgotP2" element={<ForgotPassword2 />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/heatmap" element={<H2 />} />
        <Route path="/formatos" element={<FormatosR />} />
      </Routes>
    </Router>
  );
}

export default App;


