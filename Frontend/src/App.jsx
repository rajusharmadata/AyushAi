import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Practitioners from "./pages/practitioners";
import Remedies from "./pages/Remedies";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import ForgetPassword from "./pages/ForgetPassword";
import UserDashboard from "./pages/UserDashboard";
import NotFound from "./pages/NotFound";

function Layout() {
  const location = useLocation();
  const noNavFooterRoutes = ["/login", "/signup", "/forgot-password", "/user/*"];
  const showNavFooter = !noNavFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {showNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/practitioners" element={<Practitioners />} />
        <Route path="/remedies" element={<Remedies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/user/*" element={<UserDashboard />} />
        <Route path="*" element={<NotFound />} />
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