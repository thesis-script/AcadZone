import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../components/AuthContext";
import { Eye, EyeOff, GraduationCap, Mail, Lock, User } from "lucide-react";

export default function AuthPage({ mode = "login" }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();

  const userType = location.state?.userType || "student";

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const isRegister = mode === "register";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("يرجى ملء جميع الحقول");
      return;
    }

    if (isRegister) {
      if (!form.name) { setError("يرجى إدخال الاسم الكامل"); return; }
      if (form.password !== form.confirmPassword) { setError("كلمات المرور غير متطابقة"); return; }
      register({ name: form.name, email: form.email, password: form.password, userType });
    } else {
      login({ name: form.email.split("@")[0], email: form.email, password: form.password, userType: "student" });
    }

    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-200">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isRegister ? t("auth.registerTitle") : t("auth.loginTitle")}
          </h2>
          {isRegister && userType && (
            <p className="text-gray-500 mt-2 text-sm">
              التسجيل كـ: <span className="text-purple-600 font-semibold">{t(`userType.${userType}`)}</span>
            </p>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("auth.name")}</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder={t("auth.name")}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("auth.email")}</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("auth.password")}</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pr-10 pl-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("auth.confirmPassword")}</label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 font-bold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-purple-200 text-sm"
            >
              {isRegister ? t("auth.register") : t("auth.login")}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            {isRegister ? t("auth.haveAccount") : t("auth.noAccount")}{" "}
            <Link
              to={isRegister ? "/login" : "/user-type"}
              className="text-purple-600 font-semibold hover:underline"
            >
              {isRegister ? t("auth.loginLink") : t("auth.registerLink")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
