import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../components/AuthContext";
import { mockOrders } from "../data/staticData";
import { BarChart2, CheckCircle, Clock, Loader, TrendingUp, Lock } from "lucide-react";

const statusOptions = ["pending", "inProgress", "completed"];

export default function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, orders, updateOrderStatus } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState({});

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F5F7FB] pt-20 flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-4">يجب تسجيل الدخول</h2>
          <button onClick={() => navigate("/login")} className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold">تسجيل الدخول</button>
        </div>
      </div>
    );
  }

  const allOrders = [...mockOrders, ...orders];

  const stats = [
    { label: t("dashboard.totalOrders"), value: allOrders.length, icon: BarChart2, color: "text-purple-600", bg: "bg-purple-100" },
    { label: t("dashboard.activeOrders"), value: allOrders.filter((o) => o.status === "inProgress").length, icon: Loader, color: "text-blue-600", bg: "bg-blue-100" },
    { label: t("dashboard.completedOrders"), value: allOrders.filter((o) => o.status === "completed").length, icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
    { label: t("dashboard.revenue"), value: "47,500 دج", icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  const handleStatusChange = (orderId, status) => {
    updateOrderStatus(orderId, status);
    setSelectedStatus((prev) => ({ ...prev, [orderId]: status }));
  };

  const statusColors = {
    pending: "text-yellow-600 bg-yellow-50 border-yellow-200",
    inProgress: "text-blue-600 bg-blue-50 border-blue-200",
    completed: "text-green-600 bg-green-50 border-green-200",
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{t("dashboard.title")}</h1>
          <p className="text-gray-500">مرحباً، {user.name} 👋</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">{t("dashboard.manageOrders")}</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">رقم الطلب</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("orders.service")}</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("orders.orderDate")}</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("orders.status")}</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allOrders.map((order) => {
                  const currentStatus = selectedStatus[order.id] || order.status;
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-gray-600">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{order.details}</div>
                        <div className="text-xs text-gray-400">{order.category}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[currentStatus]}`}>
                          {t(`orders.${currentStatus}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={currentStatus}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s}>{t(`orders.${s}`)}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
