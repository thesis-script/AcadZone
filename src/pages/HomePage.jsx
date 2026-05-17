import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../components/AuthContext";
import { categories, packages } from "../data/staticData";
import { ArrowLeft, Star, Users, BookOpen, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "مستخدم نشط" },
  { icon: BookOpen, value: "50,000+", label: "طلب منجز" },
  { icon: Star, value: "4.9", label: "تقييم متوسط" },
  { icon: Award, value: "3+", label: "سنوات خبرة" },
];

export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1E1E2F] via-purple-900 to-[#1E1E2F] pt-28 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            منصة أكاديمية موثوقة منذ 2021
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t("home.heroTitle")}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            {t("home.heroSubtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/services")}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-2xl shadow-purple-500/30 hover:scale-105 active:scale-95"
            >
              {t("home.categoriesTitle")}
            </button>
            {!user && (
              <button
                onClick={() => navigate("/user-type")}
                className="px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                {t("nav.register")}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
      </section>

      {/* Categories */}
      <section className="py-20 bg-[#F5F7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t("home.categoriesTitle")}</h2>
            <p className="text-gray-500">اختر الخدمة التي تناسب احتياجاتك</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/services?cat=${cat.id}`)}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-all hover:-translate-y-1 text-right"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-2xl mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t(`categories.${cat.id}`)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(`categories.${cat.id}Desc`)}</p>
                <div className="flex items-center gap-1 mt-4 text-purple-600 text-sm font-medium">
                  <span>تصفح الخدمات</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t("packages.title")}</h2>
            <p className="text-gray-500">اختر الباقة التي تلائم ميزانيتك</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.slice(0, 3).map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-2xl p-6 border-2 transition-all ${
                  pkg.popular
                    ? "border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-xl shadow-purple-100"
                    : "border-gray-100 bg-white hover:border-purple-200 hover:shadow-lg"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 right-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    الأكثر طلباً
                  </span>
                )}
                <div className="text-3xl mb-4">{pkg.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{t(`packages.${pkg.id}`)}</h3>
                <p className="text-gray-500 text-sm mb-4">{t(`packages.${pkg.id}Desc`)}</p>
                <button
                  onClick={() => navigate(`/request?package=${pkg.id}`)}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    pkg.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 shadow-lg"
                      : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                  }`}
                >
                  {t("packages.choose")}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/services")}
              className="text-purple-600 font-semibold hover:underline"
            >
              عرض جميع الباقات ←
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-500">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">هل أنت مستعد للبدء؟</h2>
          <p className="text-white/80 mb-8">انضم لآلاف الطلاب والباحثين الذين يثقون بـ AcadZone</p>
          <button
            onClick={() => navigate(user ? "/services" : "/user-type")}
            className="px-10 py-4 bg-white text-purple-700 font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            {user ? "تصفح الخدمات" : "إنشاء حساب مجاني"}
          </button>
        </div>
      </section>
    </div>
  );
}
