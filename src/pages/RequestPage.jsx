import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../components/AuthContext";
import { categories, services, packages } from "../data/staticData";
import { Upload, CheckCircle, ArrowLeft } from "lucide-react";

export default function RequestPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, addOrder } = useAuth();

  const initCategory = searchParams.get("category") || "writing";
  const initService = searchParams.get("service") || "";
  const initPackage = searchParams.get("package") || "";

  const [form, setForm] = useState({
    category: initCategory,
    service: initService,
    details: "",
    file: null,
    package: initPackage,
  });
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const currentServices = services[form.category] || [];
  const selectedService = currentServices.find(s => s.id === form.service);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) { navigate("/login"); return; }
    if (!form.service || !form.details) return;

    const order = addOrder({
      service: form.service,
      category: form.category,
      details: form.details,
      package: form.package,
      status: "pending",
      rated: false,
      rating: null,
    });
    setOrderId(order.id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F7FB] pt-20 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl shadow-gray-100 border border-gray-100">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("request.success")}</h2>
          <p className="text-gray-500 mb-2">رقم طلبك:</p>
          <div className="bg-purple-50 rounded-xl px-6 py-3 text-purple-700 font-bold text-lg mb-8">{orderId}</div>
          <div className="flex gap-3">
            <button onClick={() => navigate("/orders")} className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
              {t("nav.orders")}
            </button>
            <button onClick={() => navigate("/home")} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
              {t("nav.home")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] pt-20">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          رجوع
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("request.title")}</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">التخصص</label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setForm({ ...form, category: cat.id, service: "" })}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${form.category === cat.id
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 text-gray-600 hover:border-purple-300"
                      }`}
                  >
                    <span>{cat.icon}</span>
                    {t(`categories.${cat.id}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Service */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t("request.selectService")}</label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                required
              >
                <option value="">-- اختر الخدمة --</option>
                {currentServices.map((svc) => (
                  <option key={svc.id} value={svc.id}>
                    {t(`services.${form.category}Services.${svc.id}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Details */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t("request.details")}</label>
              <textarea
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                placeholder={t("request.detailsPlaceholder")}
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t("request.uploadFile")}</label>
              <label className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all">
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {form.file ? form.file.name : "اسحب ملفاً أو انقر للاختيار"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
                />
              </label>
            </div>

            {/* Package */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t("request.selectPackage")}</label>
              <div className="space-y-3">
                {packages.filter(pkg =>
                  pkg.id === "comprehensive" || pkg.includes.includes(form.category)
                ).map((pkg) => (<label
                  key={pkg.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.package === pkg.id
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="package"
                    value={pkg.id}
                    checked={form.package === pkg.id}
                    onChange={() => setForm({ ...form, package: pkg.id })}
                    className="accent-purple-600"
                  />
                  <span className="text-xl">{pkg.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-sm">{t(`packages.${pkg.id}`)}</div>
                  </div>
                </label>
                ))}
              </div>
            </div>

            {form.service && selectedService && (
              <div className="bg-purple-50 border border-purple-200 rounded-xl px-5 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">الخدمة المختارة:</span>
                  <span className="text-gray-800 font-semibold text-sm">
                    {t(`services.${form.category}Services.${form.service}`)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-purple-200 pt-3">
                  <span className="text-gray-600 text-sm font-medium">التكلفة التقديرية:</span>
                  <span className="text-purple-700 font-bold text-xl">
                    {selectedService.price}
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-purple-200"
            >
              {t("request.submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
