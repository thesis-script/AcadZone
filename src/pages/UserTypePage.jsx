import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Check } from "lucide-react";
import { userTypes } from "../data/staticData";

export default function UserTypePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (selected) {
      navigate("/register", { state: { userType: selected } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{t("userType.title")}</h1>
          <p className="text-gray-500 text-lg">{t("userType.subtitle")}</p>
        </div>

        {/* Type Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {userTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelected(type.id)}
              className={`relative p-6 rounded-2xl border-2 transition-all text-center group ${
                selected === type.id
                  ? "border-purple-500 bg-purple-50 shadow-lg shadow-purple-100"
                  : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
              }`}
            >
              {selected === type.id && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div className="text-4xl mb-3">{type.icon}</div>
              <div
                className={`text-sm font-semibold ${
                  selected === type.id ? "text-purple-700" : "text-gray-700"
                }`}
              >
                {t(`userType.${type.id}`)}
              </div>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            رجوع
          </button>
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`flex-1 py-3 rounded-xl font-bold text-white transition-all ${
              selected
                ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 shadow-lg shadow-purple-200"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {t("userType.continue")}
          </button>
        </div>

        {/* Already have account */}
        <p className="text-center mt-6 text-gray-500 text-sm">
          {t("auth.haveAccount")}{" "}
          <button onClick={() => navigate("/login")} className="text-purple-600 font-semibold hover:underline">
            {t("auth.loginLink")}
          </button>
        </p>
      </div>
    </div>
  );
}
