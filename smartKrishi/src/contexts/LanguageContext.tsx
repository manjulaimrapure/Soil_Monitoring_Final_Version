
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'mr' | 'hi';

// Define translations interface
export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Create the initial translations
export const translations: Translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.sensors": "Soil Sensors",
    "nav.analysis": "Data Analysis",
    "nav.alerts": "Alerts",
    "nav.farm": "Farm Management",
    "nav.users": "User Access",
    "nav.knowledge": "Soil Knowledge",
    "nav.contact": "Contact",
    "nav.login": "Login",
    
    // Common UI elements
    "ui.loading": "Loading...",
    "ui.error": "An error occurred",
    "ui.save": "Save",
    "ui.cancel": "Cancel",
    "ui.search": "Search",
    "ui.filter": "Filter",
    
    // Auth
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.forgotPassword": "Forgot password?",
    "auth.rememberMe": "Remember me",
    "auth.signIn": "Sign in",
    "auth.createAccount": "Create an account",
    "auth.alreadyHaveAccount": "Already have an account?",
    "auth.fullName": "Full Name",
    "auth.enterInfo": "Enter your information to create your SoilSense account",
    "auth.createStrongPassword": "Create a strong password",
    "auth.passwordRequirement": "Password must be at least 8 characters long",
    "auth.agreeToTerms": "I agree to the",
    "auth.termsOfService": "Terms of Service",
    "auth.and": "and",
    "auth.privacyPolicy": "Privacy Policy",
    
    // Home page
    "home.hero.tagline": "Innovative Farming Technology",
    "home.hero.title": "Smart Soil Monitoring",
    "home.hero.description": "Enhance your crop yield with real-time soil monitoring and AI-driven insights.",
    "home.cta.viewDashboard": "View Dashboard",
    "home.cta.login": "Login",
    "home.features.title": "Key Features",
    "home.features.soilMonitoring": "Real-time Soil Monitoring",
    "home.features.soilMonitoringDesc": "Track soil health metrics in real-time with advanced IoT sensors.",
    "home.features.dataAnalytics": "Data Analytics",
    "home.features.dataAnalyticsDesc": "Get insights and predictions based on historical soil data.",
    "home.features.aiRecommendations": "AI Recommendations",
    "home.features.aiRecommendationsDesc": "Receive AI-driven suggestions for optimal crop yield.",
    "home.features.moistureManagement": "Moisture Management",
    "home.features.moistureManagementDesc": "Monitor and manage soil moisture levels for optimal plant growth.",
    "home.features.fieldMapping": "Field Mapping",
    "home.features.fieldMappingDesc": "Map your fields and track soil health across different areas.",
    "home.bottomCta.title": "Ready to Improve Your Crop Yield?",
    "home.bottomCta.description": "Join thousands of farmers who are already using our platform to optimize their farming practices.",
    "home.bottomCta.getStarted": "Get Started",
  },
  mr: {
    // Navigation
    "nav.home": "मुख्यपृष्ठ",
    "nav.dashboard": "डॅशबोर्ड",
    "nav.sensors": "मातीचे सेन्सर",
    "nav.analysis": "डेटा विश्लेषण",
    "nav.alerts": "सूचना",
    "nav.farm": "शेत व्यवस्थापन",
    "nav.users": "वापरकर्ता प्रवेश",
    "nav.knowledge": "माती ज्ञान",
    "nav.contact": "संपर्क",
    "nav.login": "प्रवेश करा",
    
    // Common UI elements
    "ui.loading": "लोड होत आहे...",
    "ui.error": "एक त्रुटी आली",
    "ui.save": "जतन करा",
    "ui.cancel": "रद्द करा",
    "ui.search": "शोध",
    "ui.filter": "फिल्टर",
    
    // Auth
    "auth.email": "ईमेल",
    "auth.password": "पासवर्ड",
    "auth.forgotPassword": "पासवर्ड विसरलात?",
    "auth.rememberMe": "मला लक्षात ठेवा",
    "auth.signIn": "साइन इन करा",
    "auth.createAccount": "खाते तयार करा",
    "auth.alreadyHaveAccount": "आधीपासून खाते आहे?",
    "auth.fullName": "पूर्ण नाव",
    "auth.enterInfo": "आपली SoilSense खाते तयार करण्यासाठी आपली माहिती प्रविष्ट करा",
    "auth.createStrongPassword": "एक मजबूत पासवर्ड तयार करा",
    "auth.passwordRequirement": "पासवर्ड किमान 8 अक्षरे लांब असावा",
    "auth.agreeToTerms": "मी स्वीकारतो",
    "auth.termsOfService": "सेवा अटी",
    "auth.and": "आणि",
    "auth.privacyPolicy": "गोपनीयता धोरण",
    
    // Home page
    "home.hero.tagline": "अभिनव शेती तंत्रज्ञान",
    "home.hero.title": "स्मार्ट माती निरीक्षण",
    "home.hero.description": "रियल-टाइम माती निरीक्षण आणि AI-चालित अंतर्दृष्टीसह आपल्या पिकांची उत्पादकता वाढवा.",
    "home.cta.viewDashboard": "डॅशबोर्ड पहा",
    "home.cta.login": "प्रवेश करा",
    "home.features.title": "मुख्य वैशिष्ट्ये",
    "home.features.soilMonitoring": "रियल-टाइम माती निरीक्षण",
    "home.features.soilMonitoringDesc": "प्रगत IoT सेन्सरसह रियल-टाइम मातीच्या आरोग्याचे मापदंड ट्रॅक करा.",
    "home.features.dataAnalytics": "डेटा विश्लेषण",
    "home.features.dataAnalyticsDesc": "ऐतिहासिक माती डेटावर आधारित अंतर्दृष्टी आणि भविष्यवाणी मिळवा.",
    "home.features.aiRecommendations": "AI शिफारसी",
    "home.features.aiRecommendationsDesc": "इष्टतम पीक उत्पादनासाठी AI-चालित सूचना प्राप्त करा.",
    "home.features.moistureManagement": "ओलावा व्यवस्थापन",
    "home.features.moistureManagementDesc": "इष्टतम वनस्पती वाढीसाठी मातीच्या ओलाव्याची पातळी निरीक्षण आणि व्यवस्थापित करा.",
    "home.features.fieldMapping": "शेत मॅपिंग",
    "home.features.fieldMappingDesc": "आपल्या शेतांचे मॅपिंग करा आणि वेगवेगळ्या क्षेत्रांमध्ये मातीचे आरोग्य ट्रॅक करा.",
    "home.bottomCta.title": "आपली पीक उत्पादन सुधारण्यास तयार आहात?",
    "home.bottomCta.description": "हजारो शेतकरी आधीपासूनच आपल्या शेती पद्धती अनुकूलित करण्यासाठी आमचे प्लॅटफॉर्म वापरत आहेत त्यांच्यात सामील व्हा.",
    "home.bottomCta.getStarted": "सुरू करा",
  },
  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.dashboard": "डैशबोर्ड",
    "nav.sensors": "मिट्टी के सेंसर",
    "nav.analysis": "डेटा विश्लेषण",
    "nav.alerts": "अलर्ट",
    "nav.farm": "खेत प्रबंधन",
    "nav.users": "उपयोगकर्ता पहुंच",
    "nav.knowledge": "मिट्टी का ज्ञान",
    "nav.contact": "संपर्क",
    "nav.login": "लॉगिन",
    
    // Common UI elements
    "ui.loading": "लोड हो रहा है...",
    "ui.error": "एक त्रुटि हुई",
    "ui.save": "सहेजें",
    "ui.cancel": "रद्द करें",
    "ui.search": "खोज",
    "ui.filter": "फ़िल्टर",
    
    // Auth
    "auth.email": "ईमेल",
    "auth.password": "पासवर्ड",
    "auth.forgotPassword": "पासवर्ड भूल गए?",
    "auth.rememberMe": "मुझे याद रखें",
    "auth.signIn": "साइन इन करें",
    "auth.createAccount": "एक खाता बनाएं",
    "auth.alreadyHaveAccount": "पहले से ही खाता है?",
    "auth.fullName": "पूरा नाम",
    "auth.enterInfo": "अपना SoilSense खाता बनाने के लिए अपनी जानकारी दर्ज करें",
    "auth.createStrongPassword": "एक मजबूत पासवर्ड बनाएं",
    "auth.passwordRequirement": "पासवर्ड कम से कम 8 अक्षर लंबा होना चाहिए",
    "auth.agreeToTerms": "मैं सहमत हूं",
    "auth.termsOfService": "सेवा की शर्तें",
    "auth.and": "और",
    "auth.privacyPolicy": "गोपनीयता नीति",
    
    // Home page
    "home.hero.tagline": "नवीन कृषि प्रौद्योगिकी",
    "home.hero.title": "स्मार्ट मिट्टी निगरानी",
    "home.hero.description": "रीयल-टाइम मिट्टी की निगरानी और एआई-संचालित अंतर्दृष्टि के साथ अपनी फसल की पैदावार बढ़ाएं।",
    "home.cta.viewDashboard": "डैशबोर्ड देखें",
    "home.cta.login": "लॉगिन करें",
    "home.features.title": "मुख्य विशेषताएं",
    "home.features.soilMonitoring": "रीयल-टाइम मिट्टी निगरानी",
    "home.features.soilMonitoringDesc": "उन्नत IoT सेंसर के साथ रीयल-टाइम में मिट्टी के स्वास्थ्य मेट्रिक्स को ट्रैक करें।",
    "home.features.dataAnalytics": "डेटा एनालिटिक्स",
    "home.features.dataAnalyticsDesc": "ऐतिहासिक मिट्टी डेटा के आधार पर अंतर्दृष्टि और भविष्यवाणियां प्राप्त करें।",
    "home.features.aiRecommendations": "एआई सिफारिशें",
    "home.features.aiRecommendationsDesc": "इष्टतम फसल उपज के लिए एआई-संचालित सुझाव प्राप्त करें।",
    "home.features.moistureManagement": "नमी प्रबंधन",
    "home.features.moistureManagementDesc": "इष्टतम पौधे की वृद्धि के लिए मिट्टी की नमी के स्तर की निगरानी और प्रबंधन करें।",
    "home.features.fieldMapping": "फील्ड मैपिंग",
    "home.features.fieldMappingDesc": "अपने खेतों को मैप करें और विभिन्न क्षेत्रों में मिट्टी के स्वास्थ्य को ट्रैक करें।",
    "home.bottomCta.title": "अपनी फसल की पैदावार में सुधार करने के लिए तैयार हैं?",
    "home.bottomCta.description": "हजारों किसानों से जुड़ें जो पहले से ही अपनी कृषि प्रथाओं को अनुकूलित करने के लिए हमारे प्लेटफॉर्म का उपयोग कर रहे हैं।",
    "home.bottomCta.getStarted": "शुरू करें",
  }
};

// Create the language context
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const defaultLanguageContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: () => '',
};

export const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

// Create language provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    
    // Fallback to English if translation doesn't exist
    if (translations['en'] && translations['en'][key]) {
      return translations['en'][key];
    }
    
    // Return the key if no translation found
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using translations
export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
