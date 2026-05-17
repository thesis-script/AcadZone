import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  GraduationCap, Sparkles, ChevronDown,
  Target, Eye, Shield, Zap,
  ArrowLeft, Users, BookOpen, Award, Star
} from "lucide-react";
import { categories, services, teamMembers } from "../data/staticData";
import { Mail, Phone, MapPin, Send, CheckCircle, Facebook, Instagram, Twitter } from "lucide-react";


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
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  // Determine direction based on current language
  const dir = i18n.language.startsWith('ar') ? 'rtl' : 'ltr';

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    setTimeout(() => setTextVisible(true), 500);
    setTimeout(() => setBtnVisible(true), 900);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen bg-[#0D0B2B] relative overflow-hidden flex items-center"
    >
      {/* Purple glow blob behind image */}
      <div className="absolute right-0 top-0 w-[600px] h-full bg-purple-700/30 blur-3xl pointer-events-none rounded-l-full" />

      <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10 pt-24 pb-10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>

        {/* ── Left: text ── */}
        <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'} flex-1`} dir={dir}>

          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
            {t("splash.subtitle")}
          </p>

          {/* CTAs */}
          <div className={`flex flex-wrap gap-4 ${dir === 'rtl' ? 'justify-end' : 'justify-start'} mb-12`}>
            <button
              onClick={() => navigate("/user-type")}
              className="px-8 py-3.5 text-base font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 rounded-xl transition-all shadow-lg"
            >
              {t("hero.startBtn")}
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="px-8 py-3.5 text-base font-semibold text-white bg-white/10 border border-white/30 rounded-xl hover:bg-white/20 transition-all"
            >
              {t("hero.exploreServices")}
            </button>
          </div>

          {/* 3 feature pills */}
          <div className={`flex flex-wrap gap-4 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
            {[
              { icon: Shield, label: t("hero.guaranteedQuality") },
              { icon: Users, label: t("hero.expertWriters") },
              { icon: Zap, label: t("hero.fastDelivery") },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white/80 text-sm">
                <Icon className="w-4 h-4 text-purple-300" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: image + service icons below ── */}
        <div className="flex-1 flex flex-col items-center gap-6">
          {/* Replace src with your actual image */}
          <img
            src="/girl.png"
            alt={t("hero.agentImgAlt")}
            className="w-full max-w-sm md:max-w-md object-contain drop-shadow-2xl"
          />

          {/* Service icon row */}
          <div className="flex gap-3 flex-wrap justify-center">
            {[
              { icon: "📄", label: t("hero.academicWriting") },
              { icon: "🔍", label: t("hero.quantitativeAnalysis") },
              { icon: "📊", label: t("hero.powerpoint") },
              { icon: "🔬", label: t("hero.scientificResearch") },
              { icon: "✅", label: t("hero.proofreading") },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white text-xs w-20 text-center">
                <span className="text-2xl">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── About section ────────────────────────────────────────────────────────────
function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="bg-white">
      {/* Section header */}
      <div className="bg-gradient-to-br from-[#1E1E2F] to-purple-900 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4">
            {t("nav.about")}
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">{t("about.title")}</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t("about.subtitle")}</p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-[#F5F7FB] py-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("about.mission")}</h3>
            <p className="text-gray-600 leading-relaxed">{t("about.missionText")}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl p-8 text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t("about.vision")}</h3>
            <p className="text-white/90 leading-relaxed">{t("about.visionText")}</p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">قيمنا</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="text-center p-6 rounded-2xl bg-[#F5F7FB] hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{label}</h4>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services preview section ─────────────────────────────────────────────────
function ServicesSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("writing");
  const currentServices = services[activeCategory] || [];

  return (
    <section id="services" className="bg-[#F5F7FB]">
      <div className="bg-gradient-to-br from-purple-900 to-[#1E1E2F] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4">
            {t("nav.services")}
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">{t("services.title")}</h2>
          <p className="text-gray-300">اختر التخصص الذي تحتاجه</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {[
            { id: "writing", icon: "📝" },
            { id: "translation", icon: "🌐" },
            { id: "powerpoint", icon: "📊" },
            { id: "proofreading", icon: "✅" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${activeCategory === cat.id
                ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-200"
                : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300"
                }`}
            >
              <span>{cat.icon}</span>
              {t(`categories.${cat.id}`)}
            </button>
          ))}
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {currentServices.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-purple-50 transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                {svc.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                {t(`services.${activeCategory}Services.${svc.id}`)}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">
                {t(`services.${activeCategory}Services.${svc.id}Desc`)}
              </p>
              <div className="flex items-center justify-end">
                <button
                  onClick={() => navigate(`/request?service=${svc.id}&category=${activeCategory}`)}
                  className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  {t("services.requestBtn")}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center">
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-purple-200 text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-colors shadow-sm"
          >
            عرض جميع الخدمات
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Contact section ──────────────────────────────────────────────────────────
function ContactSection() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    { icon: MapPin, label: t("contact.address"), value: "الجزائر، سطيف" },
    { icon: Phone, label: "الهاتف", value: t("contact.phone") },
    { icon: Mail, label: "البريد", value: t("contact.emailAddr") },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-white">
      <div className="bg-gradient-to-br from-[#1E1E2F] to-purple-900 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4">
            {t("nav.contact")}
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">{t("contact.title")}</h2>
          <p className="text-gray-300">نحن هنا للإجابة على جميع استفساراتك</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="space-y-4">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-[#F5F7FB] rounded-2xl p-6 border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">{label}</div>
                  <div className="font-semibold text-gray-900 text-sm">{value}</div>
                </div>
              </div>
            ))}
            <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl p-6 text-white">
              <h4 className="font-bold mb-3">تابعنا على</h4>
              <div className="flex gap-3">
                {[
                  { name: "Facebook", icon: Facebook },
                  { name: "Instagram", icon: Instagram },
                  { name: "Twitter", icon: Twitter }
                ].map((social) => (
                  <div
                    key={social.name}
                    className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-sm cursor-pointer hover:bg-white/30 transition-colors"
                  >
                    <social.icon className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-[#F5F7FB] rounded-3xl p-12 text-center border border-gray-100">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{t("contact.success")}</h3>
                <p className="text-gray-500">سيتم الرد عليك في أقرب وقت ممكن</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 text-purple-600 border border-purple-200 rounded-xl text-sm font-semibold hover:bg-purple-50 transition-colors"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <div className="bg-[#F5F7FB] rounded-3xl p-8 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("contact.name")}</label>
                      <input
                        type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={t("contact.name")}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("contact.email")}</label>
                      <input
                        type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="example@email.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("contact.message")}</label>
                    <textarea
                      required value={form.message} rows={6}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="اكتب رسالتك هنا..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-purple-200"
                  >
                    <Send className="w-4 h-4" />
                    {t("contact.send")}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main landing page ────────────────────────────────────────────────────────
export default function LandingPage() {
  const location = useLocation();

  // Handle hash scrolling from navbar links like /#about
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => scrollToSection(id), 100);
    }
  }, [location.hash]);

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
