import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "./AuthContext";
import { Menu, X, Globe, GraduationCap, LogOut, User } from "lucide-react";
import { scrollToSection } from "../pages/LandingPage";

const languages = [
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "en", label: "English", dir: "ltr" },
];

const navLinks = [
  { anchor: "home",     route: "/",         labelKey: "nav.home" },
  { anchor: "about",    route: "/about",    labelKey: "nav.about" },
  { anchor: "services", route: "/services", labelKey: "nav.services" },
  { anchor: "contact",  route: "/contact",  labelKey: "nav.contact" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState("home");

  const isLanding = location.pathname === "/";
  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      if (isLanding) {
        const sections = ["home", "about", "services", "contact"];
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && window.scrollY >= el.offsetTop - 120) {
            setActiveAnchor(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLanding]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang.code);
    document.documentElement.dir = lang.dir;
    document.documentElement.lang = lang.code;
    setLangOpen(false);
  };

  const handleLogout = () => { logout(); navigate("/"); };

  const handleNavClick = (link) => {
    setMenuOpen(false);
    if (isLanding) {
      scrollToSection(link.anchor);
    } else {
      navigate(link.anchor === "home" ? "/" : `/#${link.anchor}`);
    }
  };

  const isActiveLink = (link) =>
    isLanding ? activeAnchor === link.anchor : location.pathname === link.route;

  // Transparent when on hero, solid after scroll or on other pages
  const transparent = isLanding && !scrolled;

  const navBg = transparent
    ? "bg-transparent border-transparent"
    : "bg-white/95 backdrop-blur-md shadow-sm border-b border-purple-100";

  const linkCls = (active) =>
    transparent
      ? active ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
      : active ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

  const iconCls = transparent ? "text-white/70 hover:text-white hover:bg-white/10" : "text-gray-600 hover:bg-gray-100";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={() => handleNavClick(navLinks[0])} className="flex items-center gap-2 group">
            <div className="w-12 h-12  from-purple-600 to-blue-500 flex items-center justify-center">
              {/* <GraduationCap className="w-5 h-5 text-white" /> */}
              <img src="/logo.jpg" alt="Logo"/>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
              AcadZone
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.anchor}
                onClick={() => handleNavClick(link)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${linkCls(isActiveLink(link))}`}
              >
                {t(link.labelKey)}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${iconCls}`}
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang.label}</span>
              </button>
              {langOpen && (
                <div className="absolute top-full mt-1 right-0 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[130px] z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang)}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-purple-50 hover:text-purple-700 transition-colors ${i18n.language === lang.code ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-700"}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                {user.userType === "provider" && (
                  <Link to="/dashboard" className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${transparent ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-purple-600 hover:bg-purple-50"}`}>
                    {t("nav.dashboard")}
                  </Link>
                )}
                <Link to="/orders" className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${iconCls}`}>
                  {t("nav.orders")}
                </Link>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${transparent ? "bg-white/10" : "bg-purple-50"}`}>
                  <User className={`w-4 h-4 ${transparent ? "text-white" : "text-purple-600"}`} />
                  <span className={`text-sm font-medium ${transparent ? "text-white" : "text-purple-700"}`}>{user.name?.split(" ")[0]}</span>
                </div>
                <button onClick={handleLogout} className={`p-2 rounded-lg transition-colors ${transparent ? "text-white/50 hover:bg-white/10 hover:text-white" : "text-gray-400 hover:bg-red-50 hover:text-red-500"}`}>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className={`px-4 py-2 text-sm font-medium transition-colors ${transparent ? "text-white/70 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
                  {t("nav.login")}
                </Link>
                <Link to="/user-type" className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-opacity shadow-md shadow-purple-500/30">
                  {t("nav.register")}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${iconCls}`}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className={`md:hidden py-4 border-t space-y-1 ${transparent ? "border-white/20 bg-[#1E1E2F]/95 backdrop-blur-md" : "border-gray-100 bg-white"}`}>
            {navLinks.map((link) => (
              <button
                key={link.anchor}
                onClick={() => handleNavClick(link)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${linkCls(isActiveLink(link))}`}
              >
                {t(link.labelKey)}
              </button>
            ))}
            <div className="pt-2 border-t border-white/10 flex gap-2 px-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${i18n.language === lang.code ? "bg-purple-600 text-white" : transparent ? "bg-white/10 text-white/70" : "bg-gray-100 text-gray-600"}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            {user ? (
              <div className="pt-2 space-y-1">
                <Link to="/orders" onClick={() => setMenuOpen(false)} className={`block px-4 py-2.5 rounded-lg text-sm ${transparent ? "text-white/70 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"}`}>{t("nav.orders")}</Link>
                {user.userType === "provider" && (
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className={`block px-4 py-2.5 rounded-lg text-sm ${transparent ? "text-purple-300 hover:bg-white/10" : "text-purple-600 hover:bg-purple-50"}`}>{t("nav.dashboard")}</Link>
                )}
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-900/20">{t("nav.logout")}</button>
              </div>
            ) : (
              <div className="pt-2 flex gap-2 px-2">
                <Link to="/login" onClick={() => setMenuOpen(false)} className={`flex-1 text-center px-4 py-2 text-sm rounded-lg border ${transparent ? "border-white/20 text-white/70" : "border-gray-200 text-gray-600"}`}>{t("nav.login")}</Link>
                <Link to="/user-type" onClick={() => setMenuOpen(false)} className="flex-1 text-center px-4 py-2 text-sm text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-semibold">{t("nav.register")}</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
