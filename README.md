# AcadZone - منصة الخدمات الأكاديمية

موقع أكاديمي عصري ومتجاوب باستخدام React + Tailwind CSS

## 🚀 التثبيت والتشغيل

```bash
# تثبيت المكتبات
npm install

# تشغيل الموقع في وضع التطوير
npm run dev

# بناء نسخة الإنتاج
npm run build
```

افتح المتصفح على: **http://localhost:5173**

## 🗂 هيكل المشروع

```
src/
├── components/
│   ├── AuthContext.jsx     # إدارة المصادقة والمستخدم
│   ├── Navbar.jsx          # شريط التنقل
│   └── Footer.jsx          # الذيل
├── pages/
│   ├── SplashScreen.jsx    # شاشة الترحيب
│   ├── UserTypePage.jsx    # اختيار نوع المستخدم
│   ├── AuthPage.jsx        # تسجيل الدخول / الحساب
│   ├── HomePage.jsx        # الصفحة الرئيسية
│   ├── ServicesPage.jsx    # الخدمات والباقات
│   ├── RequestPage.jsx     # طلب خدمة
│   ├── OrdersPage.jsx      # متابعة الطلبات
│   ├── RatingPage.jsx      # التقييم
│   ├── DashboardPage.jsx   # لوحة مقدم الخدمة
│   ├── AboutPage.jsx       # من نحن
│   └── ContactPage.jsx     # تواصل معنا
├── data/
│   └── staticData.js       # البيانات الثابتة
├── translations/
│   ├── ar.js               # العربية
│   ├── fr.js               # الفرنسية
│   └── en.js               # الإنجليزية
├── constants/
│   └── colors.js           # الألوان
├── i18n.js                 # إعداد الترجمة
├── App.jsx                 # التوجيه الرئيسي
└── main.jsx                # نقطة البداية
```

## 🌐 اللغات المدعومة
- العربية (افتراضي، RTL)
- الفرنسية (LTR)
- الإنجليزية (LTR)

## 📄 الصفحات
| الصفحة | المسار |
|--------|--------|
| Splash Screen | `/` |
| اختيار نوع المستخدم | `/user-type` |
| تسجيل الدخول | `/login` |
| إنشاء حساب | `/register` |
| الصفحة الرئيسية | `/home` |
| الخدمات | `/services` |
| طلب خدمة | `/request` |
| طلباتي | `/orders` |
| التقييم | `/rating/:id` |
| لوحة التحكم | `/dashboard` |
| من نحن | `/about` |
| تواصل معنا | `/contact` |

## 🔐 المصادقة
- بدون Backend: أي بيانات تُدخل تُقبل مباشرة
- البيانات تُحفظ في `localStorage`
- مستخدمو النوع "مقدم خدمات" يصلون للوحة التحكم

## 🎨 الألوان
```js
primary: "#6C63FF"    // بنفسجي
secondary: "#4A90E2"  // أزرق
dark: "#1E1E2F"       // داكن
light: "#F5F7FB"      // فاتح
```

## 🛠 التقنيات
- React 18
- React Router v6
- Tailwind CSS
- i18next (ترجمة)
- Lucide React (أيقونات)
