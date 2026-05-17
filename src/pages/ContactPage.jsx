import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Send, CheckCircle, Facebook, Instagram, Twitter } from "lucide-react";

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: MapPin, label: t("contact.address"), value: "الجزائر، سوق أهراس" },
    { icon: Phone, label: "الهاتف", value: t("contact.phone") },
    { icon: Mail, label: "البريد", value: t("contact.emailAddr") },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FB] pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E1E2F] to-purple-900 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{t("contact.title")}</h1>
          <p className="text-gray-300">نحن هنا للإجابة على جميع استفساراتك</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">{label}</div>
                  <div className="font-semibold text-gray-900 text-sm">{value}</div>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-3">تابعنا على</h3>
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
              <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("contact.success")}</h2>
                <p className="text-gray-500">سيتم الرد عليك في أقرب وقت ممكن</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("contact.name")}</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder={t("contact.name")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("contact.email")}</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("contact.message")}</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      placeholder="اكتب رسالتك هنا..."
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
    </div>
  );
}
