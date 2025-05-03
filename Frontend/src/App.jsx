import { BrowserRouter, Route, Routes, useLocation, useParams } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Practitioners from "./pages/practitioners";
import Remedies from "./pages/Remedies";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import ForgetPassword from "./pages/ForgetPassword";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import UserChatPage from "./pages/UserChatPage";


function Layout() {
  const location = useLocation();
  const noNavFooterRoutes = ["/login", "/signup", "/forgot-password", "/userChatPage"];
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
        <Route path="/userChatPage" element={<UserChatPage />} />
        {/* Add more routes as needed */}
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showNavFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Layout />
    </ErrorBoundary>
  );
}

export default App;