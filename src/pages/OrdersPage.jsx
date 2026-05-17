import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../components/AuthContext";
import { mockOrders } from "../data/staticData";
import { Clock, Loader, CheckCircle, Star, Package } from "lucide-react";

const statusConfig = {
  pending: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
  inProgress: { icon: Loader, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  completed: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
};

export default function OrdersPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, orders } = useAuth();
  const [filter, setFilter] = useState("all");

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F5F7FB] pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">يجب تسجيل الدخول أولاً</h2>
          <button onClick={() => navigate("/login")} className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
            تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  const allOrders = [...mockOrders, ...orders];
  const filtered = filter === "all" ? allOrders : allOrders.filter((o) => o.status === filter);

  const filters = [
    { key: "all", label: "الكل" },
    { key: "pending", label: t("orders.pending") },
    { key: "inProgress", label: t("orders.inProgress") },
    { key: "completed", label: t("orders.completed") },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FB] pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t("orders.title")}</h1>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                filter === f.key
                  ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300"
              }`}
            >
              {f.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${filter === f.key ? "bg-white/20" : "bg-gray-100"}`}>
                {f.key === "all" ? allOrders.length : allOrders.filter((o) => o.status === f.key).length}
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{t("orders.noOrders")}</p>
            <button onClick={() => navigate("/services")} className="mt-4 px-6 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors text-sm">
              تصفح الخدمات
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order) => {
              const cfg = statusConfig[order.status];
              const StatusIcon = cfg.icon;
              return (
                <div key={order.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">{order.id}</span>
                        <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {t(`orders.${order.status}`)}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm font-medium mb-1">{order.details}</p>
                      <p className="text-gray-400 text-xs">{order.date}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {order.status === "completed" && !order.rated && (
                        <button
                          onClick={() => navigate(`/rating/${order.id}`)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-sm font-semibold hover:bg-amber-100 transition-colors"
                        >
                          <Star className="w-4 h-4" />
                          {t("orders.rate")}
                        </button>
                      )}
                      {order.rated && (
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(order.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
