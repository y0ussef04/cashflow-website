export type Language = "ar" | "en";

export interface FeatureItem {
  id: string;
  icon: "wallets" | "transactions" | "commissions" | "reports" | "expenses" | "closing" | "sms" | "offline";
  title: string;
  description: string;
  badge: string;
}

export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  screenId: string;
}

export interface PreviewScreen {
  id: string;
  src: string;
  title: string;
  caption: string;
  tag: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TranslationContent {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    subtitle: string;
    logoAlt: string;
  };
  nav: {
    home: string;
    features: string;
    howItWorks: string;
    preview: string;
    faq: string;
    downloadCta: string;
    comingSoonCta: string;
    switchLanguageLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    primaryCtaAvailable: string;
    primaryCtaComingSoon: string;
    secondaryCta: string;
    supportedProvidersLabel: string;
    trustPoints: {
      offline: string;
      android: string;
      localData: string;
    };
    screenCaption: string;
  };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FeatureItem[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: WorkflowStep[];
  };
  preview: {
    eyebrow: string;
    title: string;
    subtitle: string;
    note: string;
    screens: PreviewScreen[];
  };
  download: {
    eyebrow: string;
    title: string;
    subtitle: string;
    trialNotice: string;
    statusAvailable: string;
    statusComingSoon: string;
    comingSoonHeading: string;
    comingSoonBody: string;
    downloadButton: string;
    comingSoonButton: string;
    metaLabels: {
      version: string;
      size: string;
      updatedAt: string;
      compatibility: string;
      packageId: string;
      sha256: string;
    };
    metaPending: string;
    installTitle: string;
    installSteps: string[];
    safetyTitle: string;
    safetyNote: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  developer: {
    eyebrow: string;
    name: string;
    role: string;
    education: string;
    linkedinLabel: string;
  };
  footer: {
    description: string;
    navigationTitle: string;
    contactTitle: string;
    legalTitle: string;
    contactPhoneLabel: string;
    contactEmailLabel: string;
    contactWhatsappLabel: string;
    contactLinkedinLabel: string;
    privacyPolicy: string;
    copyright: string;
  };
  privacyModal: {
    title: string;
    lastUpdated: string;
    close: string;
    sections: {
      heading: string;
      body: string;
    }[];
  };
}

export const translations: Record<Language, TranslationContent> = {
  ar: {
    meta: {
      title: "CashFlow — إدارة المحافظ الإلكترونية والعمولات لمكاتب الكاش",
      description:
        "تطبيق أندرويد متخصص لإدارة معاملات المحافظ الإلكترونية (فودافون كاش، أورنج كاش، إي آند كاش، وي باي)، حساب العمولات، متابعة الأرباح، والتقفيل اليومي.",
    },
    brand: {
      name: "CashFlow",
      subtitle: "إدارة المحافظ والعمولات",
      logoAlt: "شعار تطبيق CashFlow",
    },
    nav: {
      home: "الرئيسية",
      features: "المميزات",
      howItWorks: "كيف يعمل",
      preview: "معاينة التطبيق",
      faq: "الأسئلة الشائعة",
      downloadCta: "تحميل APK",
      comingSoonCta: "التحميل قريباً",
      switchLanguageLabel: "Switch to English",
      openMenuLabel: "فتح القائمة",
      closeMenuLabel: "إغلاق القائمة",
    },
    hero: {
      badge: "تطبيق أندرويد لمكاتب ومحال المحافظ الإلكترونية في مصر",
      headline: "إدارة شغلك.. بذكاء وبدون تعقيد.",
      subheadline:
        "CashFlow يساعدك تدير معاملات المحافظ الإلكترونية، تتابع عمولاتك، وتراجع حساباتك من مكان واحد.",
      primaryCtaAvailable: "تحميل تطبيق أندرويد (APK)",
      primaryCtaComingSoon: "التحميل قريباً — تفاصيل الإصدار",
      secondaryCta: "استكشف المميزات",
      supportedProvidersLabel: "يدعم محافظ الشبكات المصرية:",
      trustPoints: {
        offline: "يعمل بدون اتصال دائم بالإنترنت",
        android: "متوافق مع Android 8.0 فأحدث",
        localData: "دفاتر حساباتك محفوظة محلياً على جهازك",
      },
      screenCaption: "لقطة حقيقية من الشاشة الرئيسية لتطبيق CashFlow على أندرويد",
    },
    features: {
      eyebrow: "المميزات الفعلية في التطبيق",
      title: "كل ما يحتاجه مكتب الكاش في دفتر رقمي دقيق",
      subtitle:
        "صُمّم CashFlow ليتطابق مع طريقة العمل اليومية في مكاتب التحويل، بحسابات دقيقة بالقرش وواجهات واضحة بدون تعقيد.",
      items: [
        {
          id: "wallets",
          icon: "wallets",
          badge: "المحافظ والخزنة",
          title: "إدارة عدة محافظ إلكترونية والخزنة النقدية",
          description:
            "أضف كل خطوطك من فودافون كاش وأورنج كاش وإي آند كاش ووي باي مع تتبع رصيد كل محفظة ورصيد الخزنة النقدية في وقت واحد.",
        },
        {
          id: "transactions",
          icon: "transactions",
          badge: "الإيداع والسحب",
          title: "تسجيل معاملات Cash In وCash Out بدقة",
          description:
            "سجّل عمليات الإيداع والسحب مع رسوم الشركة وحركة الكاش والمحفظة تلقائياً، مع إمكانية عكس أي عملية بقيود محاسبية سليمة.",
        },
        {
          id: "commissions",
          icon: "commissions",
          badge: "نظام العمولة",
          title: "إدارة العمولات حسب إعداداتك الخاصة",
          description:
            "اضبط عمولة الإيداع والسحب لكل 500 ج.م أو أنشئ شرائح عمولة مخصصة، مع تحديد طريقة تحصيل العمولة (نقداً أو مخصومة أو على التحويل).",
        },
        {
          id: "reports",
          icon: "reports",
          badge: "التقارير والأرباح",
          title: "تقارير يومية وأسبوعية وشهرية وفترات مخصصة",
          description:
            "راجع صافي الربح وإجمالي العمولات وحجم الإيداع والسحب وكشف حساب كل محفظة لأي فترة تختارها، مع إمكانية تصدير التقرير بصيغة CSV.",
        },
        {
          id: "expenses",
          icon: "expenses",
          badge: "المصروفات",
          title: "إدارة مصروفات التشغيل وربطها بالأرباح",
          description:
            "سجّل الإيجار والكهرباء والإنترنت والمرتبات ومستلزمات المحل سواء دُفعت من الخزنة أو من محفظة، لتظهر مباشرة في صافي الربح.",
        },
        {
          id: "closing",
          icon: "closing",
          badge: "تقفيل اليوم",
          title: "تقفيل يومي ومطابقة الخزنة والمحافظ",
          description:
            "قارن الرصيد الفعلي في الخزنة والمحافظ مع الرصيد الدفتري المتوقع بنهاية اليوم واكتشف أي عجز أو زيادة فوراً مع حفظ لقطة التقفيل.",
        },
        {
          id: "sms",
          icon: "sms",
          badge: "رسائل المحافظ",
          title: "قراءة رسائل المحافظ ومراجعتها قبل التسجيل",
          description:
            "يدعم اختيارياً قراءة رسائل SMS الواردة من شركات المحافظ على جهازك وتحويلها إلى قائمة مراجعة وتأكيد مع منع التكرار.",
        },
        {
          id: "offline",
          icon: "offline",
          badge: "عمل محلي آمن",
          title: "يعمل بدون إنترنت دائم مع نسخ احتياطي وقفل بصمة",
          description:
            "تُسجَّل عملياتك وحساباتك محلياً على هاتفك بدون الحاجة لاتصال مستمر بالإنترنت، مع نسخ احتياطي محلي وقفل بالبصمة أو رمز الجهاز.",
        },
      ],
    },
    howItWorks: {
      eyebrow: "كيف يعمل التطبيق",
      title: "ابدأ تنظيم حساباتك في 4 خطوات بسيطة",
      subtitle:
        "خطوات إعداد واضحة داخل التطبيق تنقلك من التسجيل العشوائي إلى دفتر حسابات منظم خلال دقائق.",
      steps: [
        {
          number: "01",
          title: "أضف محافظك ورصيد الخزنة الافتتاحي",
          description:
            "سجّل خطوط المحافظ الإلكترونية (فودافون، أورنج، إي آند، وي باي) وأدخل رصيد البداية لكل محفظة وللخزنة النقدية.",
          screenId: "wallets",
        },
        {
          number: "02",
          title: "اضبط نظام العمولات حسب شغلك",
          description:
            "حدّد عمولة الإيداع والسحب لكل 500 ج.م أو أضف شرائح مخصصة للمبالغ المختلفة لتُحسب تلقائياً عند كل عملية.",
          screenId: "dashboard",
        },
        {
          number: "03",
          title: "سجّل عمليات Cash In وCash Out يومياً",
          description:
            "أضف العمليات يدوياً في ثوانٍ أو أكّدها من قائمة مراجعة رسائل المحافظ ليتحدث رصيد المحفظة والخزنة والأرباح فوراً.",
          screenId: "transactions",
        },
        {
          number: "04",
          title: "راجع التقارير واقفل يومك بدقة",
          description:
            "تابع صافي ربحك ومصروفاتك وتقارير الفترات المختلفة، واعتمد تقفيل اليوم بمطابقة الخزنة والمحافظ مع تصدير CSV عند الحاجة.",
          screenId: "reports",
        },
      ],
    },
    preview: {
      eyebrow: "معاينة حقيقية للتطبيق",
      title: "شاشات فعلية من تطبيق CashFlow على أندرويد",
      subtitle:
        "لقطات حقيقية مأخوذة مباشرة من التطبيق لتتعرف على التصميم الواضح وتنظيم الأرقام قبل التثبيت.",
      note: "جميع الشاشات المعروضة هي لقطات فعلية من واجهة CashFlow لنظام أندرويد بالوضع الفاتح واللغة العربية.",
      screens: [
        {
          id: "dashboard",
          src: "/screenshots/dashboard.png",
          title: "الشاشة الرئيسية والملخص اليومي",
          caption: "متابعة إجمالي الرصيد (الخزنة + المحافظ)، صافي الربح اليومي، والإجراءات السريعة.",
          tag: "الرئيسية",
        },
        {
          id: "transactions",
          src: "/screenshots/transactions.png",
          title: "سجل العمليات والمعاملات",
          caption: "عرض منظم لجميع عمليات الإيداع والسحب مع تفاصيل العمولة ورسوم الشركة والمصدر.",
          tag: "العمليات",
        },
        {
          id: "sms",
          src: "/screenshots/sms.png",
          title: "قائمة مراجعة رسائل المحافظ",
          caption: "فحص رسائل شركات المحافظ الواردة ومراجعتها وتأكيدها قبل الترحيل للدفتر.",
          tag: "الرسائل",
        },
        {
          id: "reports",
          src: "/screenshots/reports.png",
          title: "التقارير المالية وتصدير CSV",
          caption: "تقارير يومية وأسبوعية وشهرية وفترات مخصصة مع مقارنة المحافظ وتصدير ملف Excel (CSV).",
          tag: "التقارير",
        },
        {
          id: "wallets",
          src: "/screenshots/wallets.png",
          title: "المحافظ الإلكترونية والخزنة",
          caption: "إدارة جميع خطوط المحافظ ورصيد الخزنة النقدية وتسويات الأرصدة من مكان واحد.",
          tag: "المحافظ والخزنة",
        },
      ],
    },
    download: {
      eyebrow: "التحميل والتثبيت",
      title: "احصل على تطبيق CashFlow لأجهزة أندرويد",
      subtitle:
        "تنزيل مباشر لملف التثبيت الرسمي (APK) مع جميع معلومات الإصدار والتوافق وخطوات التثبيت الآمن.",
      trialNotice:
        "تظهر أهلية التجربة ومدتها داخل التطبيق وفق الترخيص الحالي.",
      statusAvailable: "الإصدار الرسمي متاح للتحميل",
      statusComingSoon: "قريباً — جاري تجهيز ملف الإصدار الرسمي",
      comingSoonHeading: "ملف التحميل الرسمي قيد التجهيز",
      comingSoonBody:
        "لم يتم رفع ملف APK الموقع للإصدار العام بعد. بمجرد تجهيز النسخة النهائية ورفعها على خادم التحميل الرسمي، سيظهر زر التحميل المباشر هنا مع حجم الملف وتاريخ التحديث.",
      downloadButton: "تحميل ملف APK الآن",
      comingSoonButton: "قريباً — التحميل غير متاح بعد",
      metaLabels: {
        version: "الإصدار الحالي",
        size: "حجم الملف",
        updatedAt: "آخر تحديث",
        compatibility: "توافق أندرويد",
        packageId: "معرّف التطبيق",
        sha256: "بصمة التحقق SHA-256",
      },
      metaPending: "يُحدَّد عند النشر",
      installTitle: "خطوات تثبيت ملف APK على هاتف أندرويد",
      installSteps: [
        "اضغط على زر تحميل APK لتنزيل الملف الرسمي على هاتفك.",
        "افتح الملف من قائمة التنزيلات (Downloads) أو من شريط الإشعارات.",
        "إذا طلب النظام الإذن، فعّل خيار «السماح من هذا المصدر» للمتصفح أو مدير الملفات ثم اضغط «تثبيت».",
        "افتح تطبيق CashFlow واتبع خطوات البدء السريع لإضافة محافظك ورصيد الخزنة.",
      ],
      safetyTitle: "ملاحظة حول التثبيت الآمن",
      safetyNote:
        "قم بتحميل CashFlow من هذا الموقع الرسمي فقط وتأكد من معرّف الحزمة com.cashflow.app. يُنصح بإيقاف إذن التثبيت من مصادر غير معروفة بعد إتمام التثبيت للحفاظ على أمان هاتفك.",
    },
    faq: {
      eyebrow: "الأسئلة الشائعة",
      title: "إجابات واضحة حول CashFlow",
      subtitle: "تفاصيل دقيقة مبنية على البنية الفعلية للتطبيق وكيفية تعامله مع بياناتك.",
      items: [
        {
          question: "ما هو تطبيق CashFlow؟",
          answer:
            "CashFlow هو تطبيق أندرويد لإدارة حسابات المحافظ الإلكترونية والخزنة النقدية. يساعدك على تسجيل عمليات الإيداع (Cash In) والسحب (Cash Out)، وحساب العمولات ورسوم الشركات والمصروفات، وإخراج تقارير الأرباح وتقفيل اليومية بدقة.",
        },
        {
          question: "لمن صُمّم هذا التطبيق؟",
          answer:
            "صُمّم خصيصاً لأصحاب ومشغّلي مكاتب ومحال التحويلات والمحافظ الإلكترونية في مصر الذين يتعاملون يومياً مع فودافون كاش وأورنج كاش وإي آند كاش ووي باي ويحتاجون لمتابعة أرصدة الخطوط والخزنة والأرباح بدون دفاتر ورقية أو حسابات معقدة.",
        },
        {
          question: "هل يدعم التطبيق أكثر من محفظة إلكترونية؟",
          answer:
            "نعم. يمكنك إضافة وإدارة عدة محافظ من فودافون كاش وأورنج كاش وإي آند كاش ووي باي داخل نفس التطبيق، مع متابعة رصيد كل محفظة على حدة بالإضافة إلى رصيد الخزنة النقدية وكشف حساب مفصل لكل خط.",
        },
        {
          question: "هل يعمل التطبيق بدون إنترنت؟",
          answer:
            "نعم، جميع وظائف الحسابات اليومية — تسجيل العمليات، إدارة المحافظ والخزنة، العمولات، المصروفات، التقفيل اليومي، التقارير، وتصدير CSV والنسخ الاحتياطي المحلي — تعمل محلياً على جهازك دون الحاجة لاتصال دائم بالإنترنت. يحتاج التطبيق لاتصال بالإنترنت فقط بشكل دوري عند التحقق من حالة الترخيص أو تفعيل الاشتراك.",
        },
        {
          question: "كيف أقوم بتثبيت ملف APK على هاتفي؟",
          answer:
            "بعد تحميل ملف APK الرسمي من قسم التحميل في هذه الصفحة، افتحه من مجلد التنزيلات، واسمح للنظام بالتثبيت من هذا المصدر عند الطلب، ثم اضغط «تثبيت». يتطلب التطبيق نظام Android 8.0 أو أحدث.",
        },
        {
          question: "هل يتم تخزين بياناتي المالية على خادم خارجي؟",
          answer:
            "لا. دفاترك المالية الكاملة — المحافظ، المعاملات، الأرصدة، المصروفات، تقفيلات اليومية، وقائمة مراجعة الرسائل — محفوظة محلياً داخل قاعدة بيانات SQLite (Room) على هاتفك فقط، ويمكنك أخذ نسخة احتياطية منها على جهازك في أي وقت. يقتصر الاتصال الخارجي فقط على بيانات ترخيص الجهاز وحالة الاشتراك عند المزامنة الدورية.",
        },
      ],
    },
    developer: {
      eyebrow: "عن المطوّر",
      name: "يوسف محمد رفعت",
      role: "مؤسس ومطوّر تطبيق CashFlow",
      education: "خريج كلية الحاسبات والذكاء الاصطناعي.",
      linkedinLabel: "الملف الشخصي على LinkedIn",
    },
    footer: {
      description:
        "تطبيق أندرويد متخصص لإدارة معاملات المحافظ الإلكترونية، العمولات، الخزنة النقدية، والتقفيل اليومي لمكاتب الكاش في مصر.",
      navigationTitle: "روابط سريعة",
      contactTitle: "الدعم الفني والتواصل",
      legalTitle: "الخصوصية والمعلومات",
      contactPhoneLabel: "هاتف الدعم الفني",
      contactEmailLabel: "البريد الإلكتروني للدعم",
      contactWhatsappLabel: "واتساب الدعم الفني",
      contactLinkedinLabel: "LinkedIn — يوسف محمد رفعت",
      privacyPolicy: "سياسة الخصوصية",
      copyright: "جميع الحقوق محفوظة لـ CashFlow.",
    },
    privacyModal: {
      title: "سياسة الخصوصية — CashFlow",
      lastUpdated: "تعكس البنية الفعلية لتطبيق CashFlow v1.1.0",
      close: "إغلاق",
      sections: [
        {
          heading: "1. البيانات المالية المحلية على جهازك",
          body: "تُخزَّن جميع السجلات المحاسبية للمكتب (المحافظ الإلكترونية، أرصدة الخزنة، عمليات الإيداع والسحب، العمولات، المصروفات، والتقفيلات اليومية) محلياً داخل قاعدة بيانات SQLite (Room) على هاتفك ولا يتم رفعها إلى خوادم خارجية. النسخ الاحتياطي وتصدير ملفات CSV يتم محلياً بناءً على طلبك.",
        },
        {
          heading: "2. صلاحيات رسائل SMS والإشعارات (اختيارية)",
          body: "في حال منحك صلاحية قراءة رسائل SMS أو الإشعارات، يقوم التطبيق بتحليل رسائل شركات المحافظ محلياً على جهازك فقط لإضافتها إلى قائمة المراجعة قبل الترحيل للدفتر. يمكنك استخدام التطبيق يدوياً بالكامل بدون منح هذه الصلاحيات.",
        },
        {
          heading: "3. مزامنة الترخيص والاشتراك",
          body: "للتحقق من حالة الترخيص أو تفعيل الاشتراك، يرسل التطبيق فقط معرفاً مشفراً للجهاز (Device Hash)، رمزاً مختصراً، وإصدار التطبيق إلى خدمة التراخيص، دون إرسال أي بيانات معاملات أو أرصدة أو تفاصيل عملاء.",
        },
        {
          heading: "4. الأمان وحماية الوصول",
          body: "يوفر التطبيق قفلاً اختيارياً بالبصمة أو رمز قفل الهاتف لحماية الوصول إلى سجلاتك، مع إخفاء معاينة الشاشة في قائمة التطبيقات الأخيرة عند تفعيل القفل.",
        },
      ],
    },
  },
  en: {
    meta: {
      title: "CashFlow — E-Wallet & Commission Ledger for Egyptian Cash Offices",
      description:
        "Android app built for Egyptian e-wallet cash offices to manage Vodafone Cash, Orange Cash, e& Cash, and WE Pay transactions, commissions, expenses, and daily closing.",
    },
    brand: {
      name: "CashFlow",
      subtitle: "Wallet & Commission Ledger",
      logoAlt: "CashFlow app logo",
    },
    nav: {
      home: "Home",
      features: "Features",
      howItWorks: "How It Works",
      preview: "App Preview",
      faq: "FAQ",
      downloadCta: "Download APK",
      comingSoonCta: "Coming Soon",
      switchLanguageLabel: "التبديل إلى العربية",
      openMenuLabel: "Open menu",
      closeMenuLabel: "Close menu",
    },
    hero: {
      badge: "Android App for Egyptian E-Wallet Cash Offices",
      headline: "Manage your cash office — clearly and without complexity.",
      subheadline:
        "CashFlow helps you manage e-wallet transactions, track commissions, and reconcile your accounts from one place.",
      primaryCtaAvailable: "Download Android APK",
      primaryCtaComingSoon: "Coming Soon — Release Details",
      secondaryCta: "Explore Features",
      supportedProvidersLabel: "Supports Egyptian e-wallet providers:",
      trustPoints: {
        offline: "Works offline without constant internet",
        android: "Compatible with Android 8.0 or higher",
        localData: "Financial ledger stored locally on your device",
      },
      screenCaption: "Real screenshot from the CashFlow Android Home screen",
    },
    features: {
      eyebrow: "Implemented Capabilities",
      title: "Everything a cash office needs in one accurate ledger",
      subtitle:
        "Built around real daily cash-office workflows with piastre-accurate accounting, clean hierarchy, and zero clutter.",
      items: [
        {
          id: "wallets",
          icon: "wallets",
          badge: "Wallets & Cashbox",
          title: "Multi-Wallet & Physical Cashbox Management",
          description:
            "Manage multiple Vodafone Cash, Orange Cash, e& Cash, and WE Pay lines alongside your physical cashbox balance in real time.",
        },
        {
          id: "transactions",
          icon: "transactions",
          badge: "Cash In & Out",
          title: "Accurate Cash In & Cash Out Recording",
          description:
            "Log Cash In and Cash Out operations with automatic cashbox and wallet ledger updates, provider fees, and proper accounting reversals.",
        },
        {
          id: "commissions",
          icon: "commissions",
          badge: "Commission Rules",
          title: "Customizable Commission Rules & Tiers",
          description:
            "Set Cash In and Cash Out rates per 500 EGP or define custom amount tiers, with flexible collection methods (included, deducted, separate, or wallet transfer).",
        },
        {
          id: "reports",
          icon: "reports",
          badge: "Reports & Profit",
          title: "Daily, Weekly, Monthly & Custom Period Reports",
          description:
            "Review net profit, total commissions, transaction volume, and per-wallet statements for any date range, with offline CSV export.",
        },
        {
          id: "expenses",
          icon: "expenses",
          badge: "Expenses",
          title: "Operating Expense Tracking",
          description:
            "Record rent, electricity, internet, salaries, and shop supplies paid from cashbox or wallet so net profit stays accurate.",
        },
        {
          id: "closing",
          icon: "closing",
          badge: "Daily Closing",
          title: "Daily Closing & Balance Reconciliation",
          description:
            "Compare actual counted cash and wallet balances against expected ledger balances at day's end, flagging shortages or overages immediately.",
        },
        {
          id: "sms",
          icon: "sms",
          badge: "Wallet SMS",
          title: "On-Device Wallet SMS Review Queue",
          description:
            "Optionally parse incoming Egyptian wallet SMS alerts on-device into a review queue with duplicate detection before posting to the ledger.",
        },
        {
          id: "offline",
          icon: "offline",
          badge: "Offline-First",
          title: "Offline Accounting, Local Backup & App Lock",
          description:
            "Run daily accounting offline with local SQLite storage, full device backup/restore, and optional biometric or device PIN app lock.",
        },
      ],
    },
    howItWorks: {
      eyebrow: "How It Works",
      title: "Organize your daily workflow in 4 clear steps",
      subtitle:
        "A guided setup inside the app moves you from paper notebooks to a structured digital ledger in minutes.",
      steps: [
        {
          number: "01",
          title: "Add Your Wallets & Opening Cashbox Balance",
          description:
            "Register your Vodafone Cash, Orange Cash, e& Cash, and WE Pay lines and set starting balances for each wallet and your cashbox.",
          screenId: "wallets",
        },
        {
          number: "02",
          title: "Configure Your Commission Rules",
          description:
            "Set your per-500 EGP rates or custom tiers for Cash In and Cash Out so commissions are calculated automatically on every entry.",
          screenId: "dashboard",
        },
        {
          number: "03",
          title: "Record Cash In & Cash Out Operations",
          description:
            "Log transactions manually in seconds or confirm parsed wallet SMS entries to update balances and profit instantly.",
          screenId: "transactions",
        },
        {
          number: "04",
          title: "Review Reports & Finalize Daily Closing",
          description:
            "Track net profit and expenses across any period, reconcile physical cash and wallets at day's end, and export CSV statements.",
          screenId: "reports",
        },
      ],
    },
    preview: {
      eyebrow: "App Preview",
      title: "Authentic screens from CashFlow for Android",
      subtitle:
        "Real screenshots captured directly from the Android application so you can inspect the interface before installing.",
      note: "All screenshots shown are captured directly from the actual CashFlow Android application.",
      screens: [
        {
          id: "dashboard",
          src: "/screenshots/dashboard.png",
          title: "Home Dashboard & Daily Summary",
          caption: "Total balance (cashbox + wallets), daily net profit, and quick Cash In / Cash Out actions.",
          tag: "Home",
        },
        {
          id: "transactions",
          src: "/screenshots/transactions.png",
          title: "Transactions Ledger",
          caption: "Structured list of Cash In and Cash Out operations with commissions, provider fees, and sources.",
          tag: "Ledger",
        },
        {
          id: "sms",
          src: "/screenshots/sms.png",
          title: "Wallet SMS Review Queue",
          caption: "Inspect incoming wallet SMS messages and confirm them before posting to your ledger.",
          tag: "SMS Queue",
        },
        {
          id: "reports",
          src: "/screenshots/reports.png",
          title: "Financial Reports & CSV Export",
          caption: "Daily, weekly, monthly, and custom-range reports with per-wallet statements and CSV export.",
          tag: "Reports",
        },
        {
          id: "wallets",
          src: "/screenshots/wallets.png",
          title: "Wallets & Physical Cashbox",
          caption: "Manage all e-wallet lines, physical cashbox balance, and balance adjustments in one view.",
          tag: "Wallets",
        },
      ],
    },
    download: {
      eyebrow: "Download & Install",
      title: "Get CashFlow for Android",
      subtitle:
        "Direct download of the official Android APK with verified version metadata, compatibility details, and safe installation instructions.",
      trialNotice:
        "Trial eligibility and duration are shown in the app under your current license.",
      statusAvailable: "Official release available",
      statusComingSoon: "Coming Soon — Official release APK preparing",
      comingSoonHeading: "Official Release APK Is Being Prepared",
      comingSoonBody:
        "The signed public release APK has not been published yet. Once uploaded to the official download host, the direct APK download button, file size, and release date will appear here automatically.",
      downloadButton: "Download APK Now",
      comingSoonButton: "Coming Soon — APK Not Yet Published",
      metaLabels: {
        version: "Current Version",
        size: "File Size",
        updatedAt: "Last Updated",
        compatibility: "Android Compatibility",
        packageId: "Package ID",
        sha256: "SHA-256 Checksum",
      },
      metaPending: "Published upon release",
      installTitle: "How to install the APK on Android",
      installSteps: [
        "Tap the Download APK button to save the official package to your Android device.",
        "Open the downloaded file from your browser Downloads list or notification shade.",
        "If prompted by Android, enable “Allow from this source” for your browser or file manager, then tap Install.",
        "Open CashFlow and complete the quick setup to add your wallets and cashbox balance.",
      ],
      safetyTitle: "Safe installation note",
      safetyNote:
        "Only download CashFlow from this official website and verify the package ID com.cashflow.app. After installation completes, you can turn off “Allow from this source” in Android settings.",
    },
    faq: {
      eyebrow: "Frequently Asked Questions",
      title: "Clear answers about CashFlow",
      subtitle: "Accurate information based directly on the Android application's architecture.",
      items: [
        {
          question: "What is CashFlow?",
          answer:
            "CashFlow is an Android accounting app built for e-wallet cash offices. It records Cash In and Cash Out transactions, calculates commissions and provider fees, tracks operating expenses, generates period financial reports, and supports daily cashbox reconciliation.",
        },
        {
          question: "Who is it designed for?",
          answer:
            "It is designed specifically for Egyptian e-wallet cash offices and agents operating Vodafone Cash, Orange Cash, e& Cash, and WE Pay lines who want accurate daily balances and profit tracking without paper notebooks.",
        },
        {
          question: "Does it support multiple wallets?",
          answer:
            "Yes. You can create and manage multiple wallet lines across Vodafone Cash, Orange Cash, e& Cash, and WE Pay alongside your physical cashbox, with individual balance tracking and per-wallet statements.",
        },
        {
          question: "Can it work offline?",
          answer:
            "Yes. All daily accounting features — recording transactions, managing wallets and cashbox, commission rules, expenses, daily closing, period reports, CSV export, and local backup — run locally on your device without requiring a continuous internet connection. Internet access is only needed periodically for license/subscription verification.",
        },
        {
          question: "How do I install the APK?",
          answer:
            "Download the official APK from the Download section on this page, open it from your Downloads folder, grant Android's “Allow from this source” permission if prompted, and tap Install. CashFlow requires Android 8.0 (API 26) or higher.",
        },
        {
          question: "Is my financial data stored on an external server?",
          answer:
            "No. Your complete business ledger — wallets, transactions, balances, expenses, daily closings, and SMS review entries — is stored locally on your device in an SQLite (Room) database, with local backup and restore under your control. Only minimal device license metadata (device hash, short code, and app version) is synced periodically for subscription verification.",
        },
      ],
    },
    developer: {
      eyebrow: "About the Developer",
      name: "Youssef Mohamed Refaat",
      role: "Founder & Developer of CashFlow",
      education: "Faculty of Computers and Artificial Intelligence graduate.",
      linkedinLabel: "LinkedIn Profile",
    },
    footer: {
      description:
        "Dedicated Android ledger for Egyptian e-wallet cash offices — managing multi-wallet transactions, commissions, expenses, and daily closing.",
      navigationTitle: "Navigation",
      contactTitle: "Technical Support & Contact",
      legalTitle: "Legal & Privacy",
      contactPhoneLabel: "Support Phone",
      contactEmailLabel: "Support Email",
      contactWhatsappLabel: "WhatsApp Support",
      contactLinkedinLabel: "LinkedIn — Youssef Mohamed Refaat",
      privacyPolicy: "Privacy Policy",
      copyright: "All rights reserved — CashFlow.",
    },
    privacyModal: {
      title: "Privacy Policy — CashFlow",
      lastUpdated: "Reflects the actual architecture of CashFlow v1.1.0",
      close: "Close",
      sections: [
        {
          heading: "1. Local On-Device Financial Data",
          body: "All business accounting records (e-wallets, cashbox balances, Cash In and Cash Out transactions, commissions, operating expenses, and daily closing snapshots) are stored locally in an SQLite (Room) database on your Android device and are not uploaded to external servers. Local backups and CSV exports are generated on-device only when you initiate them.",
        },
        {
          heading: "2. Optional SMS & Notification Permissions",
          body: "If you grant SMS or notification access, CashFlow parses Egyptian wallet provider messages locally on your device to populate the SMS review queue. You can skip these permissions and record all transactions manually.",
        },
        {
          heading: "3. License & Subscription Sync",
          body: "To verify license status or activate a subscription, the app sends only a hashed device identifier, short device code, and app version to the licensing service. No financial transactions, balances, or customer ledger records are transmitted.",
        },
        {
          heading: "4. Device Security",
          body: "CashFlow supports optional biometric or device screen-lock protection and hides app previews in Android Recent Apps when App Lock is enabled.",
        },
      ],
    },
  },
};
