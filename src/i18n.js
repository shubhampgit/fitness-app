import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  lng: savedLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        welcome: "Train Hard. Eat Clean. Live Strong.",
        startTraining: "Start Training",
        strengthTraining: "Strength Training",
        cardioPrograms: "Cardio Programs",
        dietPlanning: "Diet Planning",
        personalCoaching: "Personal Coaching",
        signInGoogle: "Sign in with Google",
        signInText: "Sign in to continue your fitness journey",
        termsText: "By continuing you agree to our Terms & Privacy Policy.",
        footerText:
          "Empowering you to train harder, eat smarter, and live stronger. Join us on your journey toward a healthier lifestyle and sustainable fitness success.",
        copyrightText:
          "Fitness Pro. All rights reserved. Built to inspire strength, discipline, and healthy living.",
        signOutButton: "Sign Out",
        serviceHeading: "Our Services",
        serviceText:
          "We provide complete fitness and nutrition solutions to help you achieve your health goals efficiently and sustainably.",
        strengthTrainingDesc:
            "Build muscle mass, improve endurance, and increase overall body strength with structured gym workouts.",
        cardioProgramsDesc:
            "Enhance heart health, burn calories, and boost stamina through personalized cardio routines.",
        dietPlanningDesc:
            "Customized meal plans designed to complement your workouts and maximize performance and recovery.",
        personalCoachingDesc:
            "One-on-one expert guidance to ensure proper form, motivation, and consistent progress.",
        greeting: "Hi, {{name}} 👋",
        appName: "Fitness Pro",
      },
    },

    hi: {
      translation: {
        welcome: "कड़ी मेहनत से ट्रेन करें। संतुलित आहार लें। मजबूत बनें।",
        startTraining: "प्रशिक्षण शुरू करें",
        strengthTraining: "स्ट्रेंथ ट्रेनिंग",
        cardioPrograms: "कार्डियो प्रोग्राम",
        dietPlanning: "डाइट प्लानिंग",
        personalCoaching: "व्यक्तिगत कोचिंग",
        signInGoogle: "गूगल के साथ साइन इन करें",
        signInText: "अपनी फिटनेस यात्रा जारी रखने के लिए साइन इन करें",
        termsText:
          "आगे बढ़कर आप हमारी शर्तों और गोपनीयता नीति से सहमत होते हैं।",
        footerText:
          "हम आपको और अधिक मेहनत करने, समझदारी से खाने और मजबूत जीवन जीने के लिए प्रेरित करते हैं। स्वस्थ जीवनशैली और स्थायी फिटनेस सफलता की दिशा में हमारे साथ जुड़ें।",
        copyrightText:
          "Fitness Pro. सर्वाधिकार सुरक्षित। शक्ति, अनुशासन और स्वस्थ जीवन के लिए समर्पित।",
        signOutButton: "साइन आउट",
        serviceHeading: "हमारी सेवाएँ",
        serviceText:
          "हम आपके स्वास्थ्य लक्ष्यों को कुशलतापूर्वक और स्थायी रूप से प्राप्त करने में सहायता के लिए संपूर्ण फिटनेस और पोषण समाधान प्रदान करते हैं।",
        strengthTrainingDesc:
            "संरचित जिम वर्कआउट्स के माध्यम से मांसपेशियों का विकास करें, सहनशक्ति बढ़ाएं और संपूर्ण शारीरिक शक्ति में सुधार करें।",
        cardioProgramsDesc:
            "व्यक्तिगत कार्डियो रूटीन के जरिए हृदय स्वास्थ्य बेहतर करें, कैलोरी जलाएं और अपनी सहनशक्ति बढ़ाएं।",
        dietPlanningDesc:
            "आपके वर्कआउट्स को समर्थन देने और प्रदर्शन तथा रिकवरी को अधिकतम करने के लिए अनुकूलित भोजन योजनाएँ।",
        personalCoachingDesc:
            "सही फॉर्म, प्रेरणा और निरंतर प्रगति सुनिश्चित करने के लिए विशेषज्ञों द्वारा व्यक्तिगत मार्गदर्शन।",
        greeting: "नमस्ते, {{name}} 👋",
        appName: "फिटनेस प्रो",
      },
    },

    mr: {
      translation: {
        welcome: "कठोर प्रशिक्षण घ्या. स्वच्छ आहार घ्या. मजबूत व्हा.",
        startTraining: "प्रशिक्षण सुरू करा",
        strengthTraining: "स्ट्रेंथ ट्रेनिंग",
        cardioPrograms: "कार्डिओ प्रोग्राम",
        dietPlanning: "आहार नियोजन",
        personalCoaching: "वैयक्तिक मार्गदर्शन",
        signInGoogle: "Google द्वारे साइन इन करा",
        signInText: "आपली फिटनेस यात्रा सुरू ठेवण्यासाठी साइन इन करा",
        termsText: "पुढे जाताना आपण आमच्या अटी व गोपनीयता धोरणास सहमती देता.",
        footerText:
          "आपल्याला अधिक मेहनत घेण्यासाठी, योग्य आहार घेण्यासाठी आणि मजबूत जीवन जगण्यासाठी प्रेरित करणे हे आमचे ध्येय आहे. निरोगी जीवनशैली आणि शाश्वत फिटनेस यशासाठी आमच्यासोबत या.",
        copyrightText:
          "Fitness Pro. सर्व हक्क राखीव. ताकद, शिस्त आणि निरोगी जीवनासाठी समर्पित.",
        signOutButton: "साइन आउट",
        serviceHeading: "आमच्या सेवा",
        serviceText:
            "आपली आरोग्य उद्दिष्टे कार्यक्षम आणि शाश्वत पद्धतीने साध्य करण्यासाठी आम्ही संपूर्ण फिटनेस आणि पोषण उपाय प्रदान करतो.",
        strengthTrainingDesc:
            "संरचित जिम वर्कआउट्सद्वारे स्नायूंची वाढ करा, सहनशक्ती वाढवा आणि एकूण शारीरिक ताकद सुधारा.",
        cardioProgramsDesc:
            "वैयक्तिक कार्डिओ रूटीनद्वारे हृदयाचे आरोग्य सुधारवा, कॅलरी जाळा आणि सहनशक्ती वाढवा.",
        dietPlanningDesc:
            "आपल्या वर्कआउटला पूरक ठरणाऱ्या आणि कार्यक्षमता तसेच पुनर्प्राप्ती वाढवणाऱ्या सानुकूल आहार योजना.",
        personalCoachingDesc:
            "योग्य तंत्र, प्रेरणा आणि सातत्यपूर्ण प्रगती सुनिश्चित करण्यासाठी तज्ज्ञांकडून वैयक्तिक मार्गदर्शन.",
        greeting: "नमस्कार, {{name}} 👋",
        appName: "फिटनेस प्रो",
      },
    },

    fr: {
      translation: {
        welcome: "Entraînez-vous dur. Mangez sainement. Restez fort.",
        startTraining: "Commencer l'entraînement",
        strengthTraining: "Entraînement de force",
        cardioPrograms: "Programmes cardio",
        dietPlanning: "Planification alimentaire",
        personalCoaching: "Coaching personnalisé",
        signInGoogle: "Se connecter avec Google",
        signInText: "Connectez-vous pour continuer votre parcours fitness",
        termsText:
          "En continuant, vous acceptez nos Conditions et notre Politique de confidentialité.",
        footerText:
          "Nous vous aidons à vous entraîner plus dur, à manger plus intelligemment et à vivre plus fort. Rejoignez-nous pour un mode de vie plus sain et un succès fitness durable.",
        copyrightText:
          "Fitness Pro. Tous droits réservés. Conçu pour inspirer la force, la discipline et une vie saine.",
        signOutButton: "Se déconnecter",
        serviceHeading: "Nos Services",
        serviceText:
            "Nous proposons des solutions complètes de fitness et de nutrition pour vous aider à atteindre vos objectifs de santé de manière efficace et durable.",
        strengthTrainingDesc:
            "Développez votre masse musculaire, améliorez votre endurance et augmentez votre force globale grâce à des entraînements structurés en salle.",
        cardioProgramsDesc:
        "Améliorez la santé de votre cœur, brûlez des calories et augmentez votre endurance grâce à des routines cardio personnalisées.",
        dietPlanningDesc:
        "Des plans alimentaires personnalisés conçus pour compléter vos entraînements et optimiser vos performances et votre récupération.",
        personalCoachingDesc:
        "Un accompagnement individuel par des experts pour garantir une bonne posture, motivation et progression constante.",
        greeting: "Bonjour, {{name}} 👋",
        appName: "Fitness Pro", 
      },
    },

    ar: {
      translation: {
        welcome: "تدرب بقوة. تناول طعامًا صحيًا. كن قويًا.",
        startTraining: "ابدأ التدريب",
        strengthTraining: "تدريب القوة",
        cardioPrograms: "برامج الكارديو",
        dietPlanning: "تخطيط النظام الغذائي",
        personalCoaching: "تدريب شخصي",
        signInGoogle: "تسجيل الدخول عبر جوجل",
        signInText: "سجّل الدخول لمتابعة رحلتك في اللياقة البدنية",
        termsText:
          "بالمتابعة، فإنك توافق على الشروط وسياسة الخصوصية الخاصة بنا.",
        footerText:
          "نساعدك على التدريب بقوة أكبر، وتناول طعام صحي، والعيش بأسلوب أقوى. انضم إلينا نحو أسلوب حياة صحي ونجاح مستدام في اللياقة.",
        copyrightText:
          "Fitness Pro. جميع الحقوق محفوظة. مصمم لإلهام القوة والانضباط والحياة الصحية.",
        signOutButton: "تسجيل الخروج",
        serviceHeading: "خدماتنا",
        serviceText:
            "نقدم حلولاً متكاملة للياقة والتغذية لمساعدتك في تحقيق أهدافك الصحية بكفاءة واستدامة.",
        strengthTrainingDesc:
            "قم ببناء كتلة عضلية، وحسّن قدرتك على التحمل، وزد من قوتك البدنية العامة من خلال تمارين رياضية منظمة في النادي.",
        cardioProgramsDesc:
            "حسّن صحة قلبك، واحرق السعرات الحرارية، وزد من قدرتك على التحمل من خلال برامج كارديو مخصصة.",
        dietPlanningDesc:
            "خطط غذائية مخصصة لدعم تمارينك وتعزيز أدائك وتسريع عملية التعافي.",
        personalCoachingDesc:
            "إرشاد فردي من خبراء لضمان الأداء الصحيح، والتحفيز المستمر، وتحقيق تقدم ثابت.",
        greeting: "مرحبًا، {{name}} 👋",
        appName: "Fitness Pro", 
      },
    },
  },
});

if (savedLang === "ar") {
  document.documentElement.dir = "rtl";
}

export default i18n;
