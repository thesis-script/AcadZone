import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#1E1E2F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AcadZone</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{t("footer.tagline")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t("nav.home")}</h4>
            <ul className="space-y-2">
              {["home", "about", "services", "contact"].map((key) => (
                <li key={key}>
                  <Link to={key === "home" ? "/" : `/${key}`} className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t("nav.services")}</h4>
            <ul className="space-y-2">
              {["writing", "translation", "powerpoint", "proofreading"].map((key) => (
                <li key={key}>
                  <Link to="/services" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
                    {t(`categories.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t("nav.contact")}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                {t("contact.address")}
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                {t("contact.phone")}
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                {t("contact.emailAddr")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 AcadZone. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-gray-500 text-sm">Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
