import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { categories, services, packages } from "../data/staticData";

export default function ServicesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("cat") || "writing");

  const currentServices = services[activeCategory] || [];

  return (
    <div className="min-h-screen bg-[#F5F7FB] pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E1E2F] to-purple-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">{t("services.title")}</h1>
          <p className="text-gray-300">اختر التخصص وابدأ طلبك</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300"
              }`}
            >
              <span>{cat.icon}</span>
              {t(`categories.${cat.id}`)}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {currentServices.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-purple-50 transition-all hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                {svc.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t(`services.${activeCategory}Services.${svc.id}`)}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {t(`services.${activeCategory}Services.${svc.id}Desc`)}
              </p>
              <div className="flex items-center justify-end mt-auto">
                <button
                  onClick={() => navigate(`/request?service=${svc.id}&category=${activeCategory}`)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-purple-200"
                >
                  {t("services.requestBtn")}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Packages Section */}
        <div className="mt-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("packages.title")}</h2>
            <p className="text-gray-500">وفّر أكثر مع باقاتنا المتكاملة</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-2xl p-6 border-2 ${
                  pkg.popular
                    ? "border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50"
                    : "border-gray-100 bg-white"
                } hover:shadow-xl transition-all`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 right-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ⭐ الأفضل
                  </span>
                )}
                <div className="text-3xl mb-3">{pkg.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{t(`packages.${pkg.id}`)}</h3>
                <ul className="space-y-1 mb-5">
                  {pkg.includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="text-green-500">✓</span>
                      {t(`categories.${inc}`)}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate(`/request?package=${pkg.id}`)}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    pkg.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                      : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                  }`}
                >
                  {t("packages.choose")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
