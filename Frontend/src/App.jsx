
/* App.jsx - Main application component with routing and conditional rendering of Navbar and Footer. Excludes Navbar and Footer on Login, Signup, and ForgetPassword pages. */

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Practitioners from "./pages/Practitioners";
import Remedies from "./pages/Remedies";
import Login from "./pages/Login";
import { Sinup } from "./pages/Sinup";
import Footer from "./components/Footer";
import ForgetPassword from "./pages/ForgetPassword";
import User from "./pages/user";

// Component to conditionally render Navbar and Footer
function Layout() {
  const location = useLocation();
  // Define routes where Navbar and Footer should not appear
  const noNavFooterRoutes = ["/login", "/sinup", "/forgot-password"];
  const showNavFooter = !noNavFooterRoutes.includes(location.pathname);

  return (
    <>
      {showNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/practitioners" element={<Practitioners />} />
        <Route path="/remedies" element={<Remedies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sinup" element={<Sinup />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path ="/user" element={<User/>}/>
      </Routes>
      {showNavFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    
      <Layout />
    
  );
}

export default App;
