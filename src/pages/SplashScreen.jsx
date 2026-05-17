import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GraduationCap, BookOpen, Sparkles } from "lucide-react";

export default function SplashScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    setTimeout(() => setTextVisible(true), 600);
    setTimeout(() => setBtnVisible(true), 1100);
  }, []);

  return (
    <div className="min-h-screen bg-[#1E1E2F] relative overflow-hidden flex items-center justify-center">
      {/* Background orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-3xl"></div>

      {/* Floating icons */}
      <div className="absolute top-20 left-10 animate-bounce delay-100">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
          📚
        </div>
      </div>
      <div className="absolute top-32 right-16 animate-bounce delay-300">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
          🔬
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-bounce delay-500">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
          ✍️
        </div>
      </div>
      <div className="absolute bottom-20 right-10 animate-bounce delay-200">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
          🌐
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-2xl mx-auto">
        {/* Logo */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
        >
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30">
            <img src="/logo.jpg" alt="Logo" />
          </div>
        </div>

        {/* Text */}
        <div className={`transition-all duration-700 delay-300 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-gray-400 text-lg mb-2">{t("splash.welcome")}</p>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            AcadZone
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-lg mx-auto">
            {t("splash.subtitle")}
          </p>
        </div>

        {/* Features pills */}
        <div className={`flex flex-wrap justify-center gap-3 mt-8 transition-all duration-700 delay-500 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {["📝 كتابة أكاديمية", "🌐 ترجمة", "✅ تدقيق", "📊 PowerPoint"].map((tag) => (
            <span key={tag} className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-10 transition-all duration-700 delay-700 ${btnVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <button
            onClick={() => navigate("/user-type")}
            className="px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl hover:opacity-90 transition-all shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              {t("splash.getStarted")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
