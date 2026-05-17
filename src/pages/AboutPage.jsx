import { useTranslation } from "react-i18next";
import { teamMembers } from "../data/staticData";
import { Target, Eye, Shield, Zap } from "lucide-react";

const values = [
  { icon: Shield, label: "الموثوقية", desc: "نضمن جودة عالية في كل خدمة نقدمها" },
  { icon: Zap, label: "السرعة", desc: "نلتزم بالمواعيد المحددة دون أي تأخير" },
  { icon: Target, label: "الدقة", desc: "نهتم بكل التفاصيل لتحقيق أفضل النتائج" },
  { icon: Eye, label: "الشفافية", desc: "تواصل واضح ومستمر مع عملائنا" },
];

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E1E2F] to-purple-900 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{t("about.title")}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t("about.subtitle")}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#F5F7FB]">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("about.mission")}</h2>
            <p className="text-gray-600 leading-relaxed">{t("about.missionText")}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl p-8 text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">{t("about.vision")}</h2>
            <p className="text-white/90 leading-relaxed">{t("about.visionText")}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">قيمنا</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="text-center p-6 rounded-2xl bg-[#F5F7FB] hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{label}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#F5F7FB]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t("about.team")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{member.avatar}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{member.name}</h3>
                <p className="text-gray-500 text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
