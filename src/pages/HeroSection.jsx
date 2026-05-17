import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  GraduationCap, Sparkles, ChevronDown,
  Target, Eye, Shield, Zap,
  Mail, Phone, MapPin, Send, CheckCircle,
  ArrowLeft, Users, BookOpen, Award, Star
} from "lucide-react";
import { categories, services, teamMembers } from "../data/staticData";

// ─── helpers ──────────────────────────────────────────────────────────────────
const values = [
  { icon: Shield, label: "الموثوقية", desc: "نضمن جودة عالية في كل خدمة نقدمها" },
  { icon: Zap, label: "السرعة", desc: "نلتزم بالمواعيد المحددة دون أي تأخير" },
  { icon: Target, label: "الدقة", desc: "نهتم بكل التفاصيل لتحقيق أفضل النتائج" },
  { icon: Eye, label: "الشفافية", desc: "تواصل واضح ومستمر مع عملائنا" },
];

const stats = [
  { icon: Users, value: "10,000+", label: "مستخدم نشط" },
  { icon: BookOpen, value: "50,000+", label: "طلب منجز" },
  { icon: Star, value: "4.9", label: "تقييم متوسط" },
  { icon: Award, value: "3+", label: "سنوات خبرة" },
];

// ─── section scroll helper ────────────────────────────────────────────────────
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ─── Hero section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    setTimeout(() => setTextVisible(true), 500);
    setTimeout(() => setBtnVisible(true), 900);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen bg-[#1E1E2F] relative overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

      {/* Floating icons */}
      {[
        { pos: "top-24 left-10", icon: "📚", delay: "delay-100" },
        { pos: "top-36 right-16", icon: "🔬", delay: "delay-300" },
        { pos: "bottom-36 left-20", icon: "✍️", delay: "delay-500" },
        { pos: "bottom-24 right-10", icon: "🌐", delay: "delay-200" },
      ].map(({ pos, icon, delay }) => (
        <div key={icon} className={`absolute ${pos} animate-bounce ${delay} hidden md:block`}>
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
            {icon}
          </div>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-20">
        {/* Logo icon */}
        <div className={`transition-all duration-700 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
          <div className="w-24 h-24 rounded-3xl bg-white from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30">
            <img src="/logo.jpg" alt="Logo" />
          </div>
        </div>

        {/* Text */}
        <div className={`transition-all duration-700 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-gray-400 text-lg mb-2">{t("splash.welcome")}</p>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            AcadZone
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
            {t("splash.subtitle")}
          </p>
        </div>

        {/* Pills */}
        <div className={`flex flex-wrap justify-center gap-3 mt-8 transition-all duration-700 delay-200 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {["📝 كتابة أكاديمية", "🌐 ترجمة", "✅ تدقيق", "📊 PowerPoint"].map((tag) => (
            <span key={tag} className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${btnVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <button
            onClick={() => navigate("/user-type")}
            className="px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl hover:opacity-90 transition-all shadow-2xl shadow-purple-500/40 hover:scale-105 active:scale-95 flex items-center gap-2 justify-center"
          >
            <Sparkles className="w-5 h-5" />
            {t("splash.getStarted")}
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="px-10 py-4 text-lg font-semibold text-white bg-white/10 border border-white/30 rounded-2xl hover:bg-white/20 transition-all backdrop-blur-sm"
          >
            {t("nav.services")}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors animate-bounce"
      >
        <span className="text-xs tracking-widest uppercase">scroll</span>
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
}
