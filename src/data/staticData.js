export const userTypes = [
  { id: "student", icon: "🎓", color: "#6C63FF" },
  { id: "researcher", icon: "🔬", color: "#4A90E2" },
  { id: "professor", icon: "👨‍🏫", color: "#7C3AED" },
  { id: "translator", icon: "🌐", color: "#059669" },
  { id: "writer", icon: "✍️", color: "#DC2626" },
  { id: "provider", icon: "🏢", color: "#D97706" },
];

export const categories = [
  {
    id: "writing",
    icon: "📝",
    gradient: "from-purple-500 to-indigo-600",
    color: "#6C63FF",
  },
  {
    id: "translation",
    icon: "🌐",
    gradient: "from-blue-500 to-cyan-600",
    color: "#4A90E2",
  },
  {
    id: "powerpoint",
    icon: "📊",
    gradient: "from-pink-500 to-rose-600",
    color: "#EC4899",
  },
  {
    id: "proofreading",
    icon: "✅",
    gradient: "from-green-500 to-emerald-600",
    color: "#10B981",
  },
];

export const services = {
  writing: [
    { id: "memoir", icon: "📄", price: "من 5,000 دج" },
    { id: "research", icon: "📚", price: "من 3,000 دج" },
    { id: "methodology", icon: "🔍", price: "من 2,000 دج" },
    { id: "plan", icon: "📋", price: "من 1,500 دج" },
  ],
  translation: [
    { id: "frArEn", icon: "🔤", price: "من 500 دج/صفحة" },
    { id: "academic", icon: "🎓", price: "من 800 دج/صفحة" },
    { id: "summary", icon: "📃", price: "من 300 دج/صفحة" },
  ],
  powerpoint: [
    { id: "templates", icon: "🎨", price: "من 1,000 دج" },
    { id: "professional", icon: "💼", price: "من 3,000 دج" },
    { id: "academic", icon: "🏫", price: "من 2,000 دج" },
  ],
  proofreading: [
    { id: "correction", icon: "✏️", price: "من 400 دج/صفحة" },
    { id: "reformulation", icon: "🔄", price: "من 600 دج/صفحة" },
    { id: "apa", icon: "📐", price: "من 800 دج" },
  ],
};

export const packages = [
  {
    id: "comprehensive",
    icon: "⭐",
    color: "#6C63FF",
    price: "15,000 دج",
    popular: true,
    includes: ["writing", "translation", "powerpoint", "proofreading"],
  },
  {
    id: "translation",
    icon: "🌐",
    color: "#4A90E2",
    price: "5,000 دج",
    popular: false,
    includes: ["translation"],
  },
  {
    id: "proofreading",
    icon: "✅",
    color: "#10B981",
    price: "4,000 دج",
    popular: false,
    includes: ["proofreading"],
  },
  {
    id: "powerpoint",
    icon: "📊",
    color: "#EC4899",
    price: "6,000 دج",
    popular: false,
    includes: ["powerpoint"],
  },
  {
    id: "writing",
    icon: "📝",
    color: "#7C3AED",
    price: "8,000 دج",
    popular: false,
    includes: ["writing"],
  },
];

export const mockOrders = [
  {
    id: "ORD-001",
    service: "memoir",
    category: "writing",
    status: "completed",
    date: "2024-01-15",
    details: "مذكرة تخرج في تخصص علوم الحاسوب",
    package: "writing",
    rated: true,
    rating: 5,
  },
  {
    id: "ORD-002",
    service: "frArEn",
    category: "translation",
    status: "inProgress",
    date: "2024-01-20",
    details: "ترجمة بحث من الفرنسية إلى العربية - 20 صفحة",
    package: "translation",
    rated: false,
    rating: null,
  },
  {
    id: "ORD-003",
    service: "professional",
    category: "powerpoint",
    status: "pending",
    date: "2024-01-22",
    details: "عرض تقديمي لمشروع التخرج - 25 شريحة",
    package: "powerpoint",
    rated: false,
    rating: null,
  },
];

export const teamMembers = [
  { name: "أ. سارة بن علي", role: "مختصة أكاديمية", avatar: "👩‍🎓" },
  { name: "أ. كريم مصطفى", role: "مترجم معتمد", avatar: "👨‍💼" },
  { name: "أ. ليلى حمدي", role: "مدققة لغوية", avatar: "👩‍💻" },
  { name: "أ. يوسف زيدان", role: "مصمم جرافيك", avatar: "👨‍🎨" },
];
