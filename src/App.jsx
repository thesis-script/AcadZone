import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import UserTypePage from "./pages/UserTypePage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import RequestPage from "./pages/RequestPage";
import OrdersPage from "./pages/OrdersPage";
import RatingPage from "./pages/RatingPage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

// Routes that should NOT have the navbar (full-screen special pages)
const NO_NAV_ROUTES = ["/user-type"];

function Layout({ children, path }) {
  const hideNav = NO_NAV_ROUTES.includes(path);
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNav && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideNav && <Footer />}
    </div>
  );
}

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Routes>
      {/* Landing page: Splash + About + Services + Contact all in one scroll */}
      <Route path="/" element={<Layout path="/"><LandingPage /></Layout>} />

      {/* Auth flow */}
      <Route path="/user-type" element={<Layout path="/user-type"><UserTypePage /></Layout>} />
      <Route path="/login" element={<Layout path="/login"><AuthPage mode="login" /></Layout>} />
      <Route path="/register" element={<Layout path="/register"><AuthPage mode="register" /></Layout>} />

      {/* App pages */}
      <Route path="/home" element={<Layout path="/home"><HomePage /></Layout>} />
      <Route path="/services" element={<Layout path="/services"><ServicesPage /></Layout>} />
      <Route path="/request" element={<Layout path="/request"><RequestPage /></Layout>} />
      <Route path="/orders" element={<Layout path="/orders"><OrdersPage /></Layout>} />
      <Route path="/rating/:orderId" element={<Layout path="/rating"><RatingPage /></Layout>} />
      <Route path="/dashboard" element={<Layout path="/dashboard"><DashboardPage /></Layout>} />
      <Route path="/about" element={<Layout path="/about"><AboutPage /></Layout>} />
      <Route path="/contact" element={<Layout path="/contact"><ContactPage /></Layout>} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
