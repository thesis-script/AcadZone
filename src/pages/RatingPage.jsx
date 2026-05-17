import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../components/AuthContext";
import { Star, CheckCircle } from "lucide-react";

export default function RatingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { rateOrder } = useAuth();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    rateOrder(orderId, rating, comment);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F7FB] pt-20 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-xl border border-gray-100">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("rating.thanks")}</h2>
          <div className="flex justify-center gap-1 my-4">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
            ))}
          </div>
          <button onClick={() => navigate("/orders")} className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
            {t("nav.orders")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] pt-20 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">{t("rating.title")}</h1>
        <p className="text-gray-500 text-center text-sm mb-8">طلب رقم: <span className="font-mono font-semibold text-purple-600">{orderId}</span></p>

        {/* Stars */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-600 mb-4">{t("rating.stars")}</p>
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-125"
              >
                <Star
                  className={`w-10 h-10 transition-colors ${
                    star <= (hover || rating)
                      ? "text-amber-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-amber-600 font-semibold mt-2 text-sm">
              {["", "ضعيف", "مقبول", "جيد", "جيد جداً", "ممتاز"][rating]}
            </p>
          )}
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">{t("rating.comment")}</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("rating.commentPlaceholder")}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full py-3.5 font-bold rounded-xl transition-all ${
            rating > 0
              ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 shadow-lg shadow-purple-200"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {t("rating.submit")}
        </button>
      </div>
    </div>
  );
}
