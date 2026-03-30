import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

// ============================================================
// TRANSLATIONS
// ============================================================
const T = {
  en: {
    appName: 'Senior Citizen Helper',
    tagline: 'Your Daily Wellness Companion',
    welcome: 'Welcome!',
    welcomeSub: 'Choose your preferred language to get started',
    chooseLanguage: 'Choose Language',
    darkMode: '🌙 Dark',
    lightMode: '☀️ Light',
    changeLanguage: '🌐 Language',

    // Nav
    water: 'Water',
    medicine: 'Medicine',
    healthTips: 'Health Tips',
    memory: 'Memory',
    routine: 'Routine',
    alerts: 'Alerts',
    cyber: 'Cyber Safety',

    // Water
    waterTitle: 'Water Reminder 💧',
    waterDesc: 'Stay hydrated throughout the day',
    waterOn: 'Reminder is ON',
    waterOff: 'Reminder is OFF',
    waterInterval: 'Remind every:',
    min30: '30 min',
    min60: '1 hour',
    min90: '1.5 hrs',
    min120: '2 hours',
    waterCount: 'Glasses drunk today:',
    drinkNow: '+ Drink a Glass',
    resetWater: 'Reset Count',

    // Medicine
    medicineTitle: 'Medicine Reminder 💊',
    medicineDesc: 'Never miss your medications',
    addMedicine: 'Add Medicine',
    medName: 'Medicine Name',
    medTime: 'Time',
    medFreq: 'Frequency',
    once: 'Once daily',
    twice: 'Twice daily',
    thrice: 'Three times',
    addBtn: '+ Add',
    markTaken: '✓ Taken',
    undo: 'Undo',
    deleteMed: '✕ Delete',
    noMeds: 'No medicines added yet',

    // Health Tips
    tipsTitle: 'Daily Health Tips 📰',
    tipsDesc: 'A new tip to brighten your day',
    nextTip: '▶ Next Tip',

    // Memory
    memoryTitle: 'Memory Helper 🧠',
    memoryDesc: 'Checklist for daily safety',
    memoryProgress: 'Tasks completed:',
    resetMemory: 'Reset All',

    // Routine
    routineTitle: 'Daily Routine ⏰',
    routineDesc: 'Keep your day on track',
    markDone: 'Done ✓',
    doneLabel: '✓ Done',
    resetRoutine: 'Reset Day',

    // Alerts
    alertsTitle: 'Missed Reminder Alerts 🔔',
    alertsDesc: 'Reminders you may have missed',
    noAlerts: 'All clear! No missed reminders.',
    dismissAll: 'Dismiss All',

    // Cyber
    cyberTitle: 'Cyber Safety 🛡️',
    cyberDesc: 'Stay safe from online fraud & scams',

    // Footer
    builtBy: 'Built by Kanak Bari Team',
    enquiry: 'For any enquiry, click here to send your questions via email',
    email: 'barikanak19@gmail.com',
    copyright: '© 2025 Senior Citizen Helper App. All rights reserved.',
  },
  hi: {
    appName: 'वरिष्ठ नागरिक सहायक',
    tagline: 'आपका दैनिक स्वास्थ्य सहयोगी',
    welcome: 'स्वागत है!',
    welcomeSub: 'शुरू करने के लिए अपनी भाषा चुनें',
    chooseLanguage: 'भाषा चुनें',
    darkMode: '🌙 डार्क',
    lightMode: '☀️ लाइट',
    changeLanguage: '🌐 भाषा',

    water: 'पानी',
    medicine: 'दवाई',
    healthTips: 'स्वास्थ्य',
    memory: 'याददाश्त',
    routine: 'दिनचर्या',
    alerts: 'अलर्ट',
    cyber: 'सुरक्षा',

    waterTitle: 'पानी रिमाइंडर 💧',
    waterDesc: 'दिन भर हाइड्रेटेड रहें',
    waterOn: 'रिमाइंडर चालू है',
    waterOff: 'रिमाइंडर बंद है',
    waterInterval: 'याद दिलाएं हर:',
    min30: '30 मिनट',
    min60: '1 घंटा',
    min90: '1.5 घंटे',
    min120: '2 घंटे',
    waterCount: 'आज पिए गिलास:',
    drinkNow: '+ एक गिलास पिएं',
    resetWater: 'रीसेट करें',

    medicineTitle: 'दवाई रिमाइंडर 💊',
    medicineDesc: 'अपनी दवाइयाँ कभी न भूलें',
    addMedicine: 'दवाई जोड़ें',
    medName: 'दवाई का नाम',
    medTime: 'समय',
    medFreq: 'आवृत्ति',
    once: 'एक बार',
    twice: 'दो बार',
    thrice: 'तीन बार',
    addBtn: '+ जोड़ें',
    markTaken: '✓ ले ली',
    undo: 'वापस',
    deleteMed: '✕ हटाएं',
    noMeds: 'कोई दवाई नहीं जोड़ी गई',

    tipsTitle: 'दैनिक स्वास्थ्य सुझाव 📰',
    tipsDesc: 'आपके दिन को बेहतर बनाने के लिए एक सुझाव',
    nextTip: '▶ अगला सुझाव',

    memoryTitle: 'याददाश्त सहायक 🧠',
    memoryDesc: 'दैनिक सुरक्षा चेकलिस्ट',
    memoryProgress: 'पूरे हुए कार्य:',
    resetMemory: 'सब रीसेट करें',

    routineTitle: 'दैनिक दिनचर्या ⏰',
    routineDesc: 'अपना दिन व्यवस्थित रखें',
    markDone: 'हो गया ✓',
    doneLabel: '✓ हो गया',
    resetRoutine: 'दिन रीसेट करें',

    alertsTitle: 'छूटे रिमाइंडर अलर्ट 🔔',
    alertsDesc: 'जो रिमाइंडर छूट गए हों',
    noAlerts: 'सब ठीक! कोई छूटा रिमाइंडर नहीं।',
    dismissAll: 'सब हटाएं',

    cyberTitle: 'साइबर सुरक्षा 🛡️',
    cyberDesc: 'ऑनलाइन धोखाधड़ी से सुरक्षित रहें',

    builtBy: 'कनक बारी टीम द्वारा निर्मित',
    enquiry: 'किसी भी पूछताछ के लिए, ईमेल द्वारा अपने प्रश्न भेजें',
    email: 'barikanak19@gmail.com',
    copyright: '© 2025 वरिष्ठ नागरिक सहायक ऐप।',
  },
  mr: {
    appName: 'ज्येष्ठ नागरिक सहाय्यक',
    tagline: 'तुमचा दैनंदिन आरोग्य सहकारी',
    welcome: 'स्वागत आहे!',
    welcomeSub: 'सुरू करण्यासाठी तुमची भाषा निवडा',
    chooseLanguage: 'भाषा निवडा',
    darkMode: '🌙 डार्क',
    lightMode: '☀️ लाइट',
    changeLanguage: '🌐 भाषा',

    water: 'पाणी',
    medicine: 'औषध',
    healthTips: 'आरोग्य',
    memory: 'स्मृती',
    routine: 'दिनक्रम',
    alerts: 'सूचना',
    cyber: 'सुरक्षा',

    waterTitle: 'पाणी स्मरणपत्र 💧',
    waterDesc: 'दिवसभर हायड्रेटेड राहा',
    waterOn: 'स्मरणपत्र सुरू आहे',
    waterOff: 'स्मरणपत्र बंद आहे',
    waterInterval: 'आठवण करून द्या दर:',
    min30: '30 मिनिटे',
    min60: '1 तास',
    min90: '1.5 तास',
    min120: '2 तास',
    waterCount: 'आज प्यालेले ग्लास:',
    drinkNow: '+ एक ग्लास प्या',
    resetWater: 'रीसेट करा',

    medicineTitle: 'औषध स्मरणपत्र 💊',
    medicineDesc: 'तुमची औषधे कधीही विसरू नका',
    addMedicine: 'औषध जोडा',
    medName: 'औषधाचे नाव',
    medTime: 'वेळ',
    medFreq: 'वारंवारता',
    once: 'दिवसातून एकदा',
    twice: 'दिवसातून दोनदा',
    thrice: 'दिवसातून तीनदा',
    addBtn: '+ जोडा',
    markTaken: '✓ घेतले',
    undo: 'परत करा',
    deleteMed: '✕ हटवा',
    noMeds: 'कोणतेही औषध जोडले नाही',

    tipsTitle: 'दैनिक आरोग्य टिप्स 📰',
    tipsDesc: 'तुमचा दिवस उजळवण्यासाठी एक टिप',
    nextTip: '▶ पुढील टिप',

    memoryTitle: 'स्मृती सहाय्यक 🧠',
    memoryDesc: 'दैनंदिन सुरक्षा चेकलिस्ट',
    memoryProgress: 'पूर्ण झालेली कामे:',
    resetMemory: 'सर्व रीसेट करा',

    routineTitle: 'दैनंदिन दिनक्रम ⏰',
    routineDesc: 'तुमचा दिवस व्यवस्थित ठेवा',
    markDone: 'झाले ✓',
    doneLabel: '✓ झाले',
    resetRoutine: 'दिवस रीसेट करा',

    alertsTitle: 'चुकलेल्या स्मरणपत्राच्या सूचना 🔔',
    alertsDesc: 'जी स्मरणपत्रे चुकली असतील',
    noAlerts: 'सर्व ठीक! कोणतेही चुकलेले स्मरणपत्र नाही.',
    dismissAll: 'सर्व काढा',

    cyberTitle: 'सायबर सुरक्षा 🛡️',
    cyberDesc: 'ऑनलाइन फसवणुकीपासून सुरक्षित राहा',

    builtBy: 'कनक बारी टीमने बनवले',
    enquiry: 'कोणत्याही चौकशीसाठी, ईमेलद्वारे तुमचे प्रश्न पाठवा',
    email: 'barikanak19@gmail.com',
    copyright: '© 2025 ज्येष्ठ नागरिक सहाय्यक अॅप.',
  },
};

// ============================================================
// DATA
// ============================================================
const HEALTH_TIPS = [
  { icon: '🥗', text: 'Eat a colourful plate — include green vegetables, orange carrots, and red tomatoes every day.', category: 'Nutrition', hi: 'रोज़ हरी सब्ज़ियाँ, गाजर और टमाटर खाएं — रंगीन थाली आपको स्वस्थ रखती है।', mr: 'रोज हिरव्या भाज्या, गाजर आणि टोमॅटो खा — रंगीत ताट तुम्हाला निरोगी ठेवते.' },
  { icon: '🚶', text: 'A 30-minute walk each morning improves heart health, mood, and joint flexibility.', category: 'Exercise', hi: 'हर सुबह 30 मिनट की सैर करें — यह हृदय, मूड और जोड़ों के लिए फायदेमंद है।', mr: 'दर सकाळी 30 मिनिटांची चाल करा — हृदय, मूड आणि सांध्यासाठी फायदेशीर आहे.' },
  { icon: '😴', text: 'Sleep 7–8 hours every night. Good sleep helps memory, immunity, and energy levels.', category: 'Sleep', hi: 'हर रात 7-8 घंटे सोएं — अच्छी नींद याददाश्त, इम्यूनिटी और ऊर्जा के लिए जरूरी है।', mr: 'रोज रात 7-8 तास झोपा — चांगली झोप स्मृती, रोगप्रतिकार शक्ती आणि ऊर्जेसाठी महत्त्वाची आहे.' },
  { icon: '🫁', text: 'Practice deep breathing for 5 minutes daily. It calms the mind and lowers blood pressure.', category: 'Breathing', hi: 'रोज 5 मिनट गहरी सांस लेने का अभ्यास करें — यह मन को शांत करता है और ब्लड प्रेशर कम करता है।', mr: 'दररोज 5 मिनिटे दीर्घ श्वासोच्छवासाचा सराव करा — हे मन शांत करते आणि रक्तदाब कमी करते.' },
  { icon: '☀️', text: 'Spend 15 minutes in morning sunlight daily for natural Vitamin D and a positive mood.', category: 'Vitamin D', hi: 'हर दिन सुबह 15 मिनट धूप में बिताएं — प्राकृतिक विटामिन D और सकारात्मकता के लिए।', mr: 'दर दिवशी सकाळी 15 मिनिटे उन्हात राहा — नैसर्गिक व्हिटॅमिन D आणि सकारात्मकतेसाठी.' },
  { icon: '🍌', text: 'Eat a banana or handful of nuts as a morning snack. They boost energy and heart health.', category: 'Snacks', hi: 'सुबह के नाश्ते में एक केला या मुट्ठीभर नट्स खाएं — ऊर्जा और हृदय स्वास्थ्य के लिए।', mr: 'सकाळच्या नाश्त्यात एक केळी किंवा मूठभर सुकामेवा खा — ऊर्जा आणि हृदयाच्या आरोग्यासाठी.' },
  { icon: '🧘', text: '10 minutes of gentle yoga or stretching each morning reduces stiffness and improves balance.', category: 'Yoga', hi: 'हर सुबह 10 मिनट हल्का योग या स्ट्रेचिंग करें — अकड़न कम होती है और संतुलन सुधरता है।', mr: 'दर सकाळी 10 मिनिटे हलके योग किंवा स्ट्रेचिंग करा — कडकपणा कमी होतो आणि संतुलन सुधारते.' },
  { icon: '👥', text: 'Stay socially connected — call a friend or family member daily. It reduces loneliness and stress.', category: 'Social', hi: 'सामाजिक रूप से जुड़े रहें — रोज़ किसी दोस्त या परिवार को कॉल करें। अकेलापन कम होता है।', mr: 'सामाजिकदृष्ट्या जोडलेले राहा — रोज एखाद्या मित्राला किंवा कुटुंबाला फोन करा.' },
];

const MEMORY_ITEMS_DEFAULT = [
  { id: 1, text: 'Lock the door',  hiText: 'दरवाज़ा बंद करें', mrText: 'दरवाजा बंद करा', emoji: '🚪', checked: false },
  { id: 2, text: 'Turn off the gas', hiText: 'गैस बंद करें', mrText: 'गॅस बंद करा', emoji: '🔥', checked: false },
  { id: 3, text: 'Turn off the lights', hiText: 'बत्ती बंद करें', mrText: 'दिवे बंद करा', emoji: '💡', checked: false },
  { id: 4, text: 'Close all windows', hiText: 'खिड़कियाँ बंद करें', mrText: 'सर्व खिडक्या बंद करा', emoji: '🪟', checked: false },
  { id: 5, text: 'Take medicine', hiText: 'दवाई लें', mrText: 'औषध घ्या', emoji: '💊', checked: false },
  { id: 6, text: 'Drink water', hiText: 'पानी पिएं', mrText: 'पाणी प्या', emoji: '💧', checked: false },
  { id: 7, text: 'Carry keys', hiText: 'चाबियाँ लें', mrText: 'चाव्या घ्या', emoji: '🗝️', checked: false },
  { id: 8, text: 'Check wallet / phone', hiText: 'बटुआ / फोन चेक करें', mrText: 'पाकीट / फोन तपासा', emoji: '📱', checked: false },
];

const ROUTINE_ITEMS_DEFAULT = [
  { id: 1, emoji: '🌅', label: 'Morning Walk', hiLabel: 'सुबह की सैर', mrLabel: 'सकाळची चाल', time: '6:00 AM', done: false },
  { id: 2, emoji: '🍳', label: 'Breakfast', hiLabel: 'नाश्ता', mrLabel: 'नाश्ता', time: '8:00 AM', done: false },
  { id: 3, emoji: '💊', label: 'Morning Medicine', hiLabel: 'सुबह की दवाई', mrLabel: 'सकाळची औषधे', time: '9:00 AM', done: false },
  { id: 4, emoji: '☀️', label: 'Sunlight / Yoga', hiLabel: 'धूप / योग', mrLabel: 'उन्ह / योग', time: '10:00 AM', done: false },
  { id: 5, emoji: '🍱', label: 'Lunch', hiLabel: 'दोपहर का खाना', mrLabel: 'दुपारचे जेवण', time: '1:00 PM', done: false },
  { id: 6, emoji: '😴', label: 'Afternoon Rest', hiLabel: 'दोपहर का आराम', mrLabel: 'दुपारची विश्रांती', time: '2:30 PM', done: false },
  { id: 7, emoji: '🚶', label: 'Evening Walk', hiLabel: 'शाम की सैर', mrLabel: 'संध्याकाळची चाल', time: '5:00 PM', done: false },
  { id: 8, emoji: '🍵', label: 'Evening Tea / Snack', hiLabel: 'शाम की चाय', mrLabel: 'संध्याकाळचा चहा', time: '5:30 PM', done: false },
  { id: 9, emoji: '🌙', label: 'Dinner', hiLabel: 'रात का खाना', mrLabel: 'रात्रीचे जेवण', time: '8:00 PM', done: false },
  { id: 10, emoji: '🛏️', label: 'Sleep', hiLabel: 'सोने का समय', mrLabel: 'झोपण्याची वेळ', time: '10:00 PM', done: false },
];

const CYBER_TIPS = [
  { icon: '🔐', rule: 'Never share your OTP', detail: 'No bank, government office or company will ever ask for your OTP. Hang up immediately if someone asks.', color: 'red', hiRule: 'कभी OTP शेयर न करें', mrRule: 'कधीही OTP शेअर करू नका' },
  { icon: '📵', rule: 'Avoid unknown calls', detail: 'Do not trust calls claiming to be from banks, government or police asking for personal info.', color: 'blue', hiRule: 'अज्ञात कॉल से सावधान रहें', mrRule: 'अज्ञात कॉलपासून सावध राहा' },
  { icon: '🏦', rule: 'Never share bank details', detail: 'Do not share your account number, PIN, CVV, or password with anyone — not even your family.', color: 'purple', hiRule: 'बैंक विवरण कभी न शेयर करें', mrRule: 'बँक तपशील कधीही शेअर करू नका' },
  { icon: '🔗', rule: 'Do not click unknown links', detail: 'Suspicious links in SMS or WhatsApp can steal your data. Always verify before clicking.', color: 'orange', hiRule: 'अज्ञात लिंक पर क्लिक न करें', mrRule: 'अज्ञात लिंकवर क्लिक करू नका' },
  { icon: '💸', rule: 'Beware of "free prize" scams', detail: 'If someone says you won a lottery or prize, it is almost certainly a fraud. Do not pay any "processing fee."', color: 'red', hiRule: '"मुफ्त इनाम" घोटालों से सावधान रहें', mrRule: '"मोफत बक्षीस" घोटाळ्यांपासून सावध राहा' },
  { icon: '🛡️', rule: 'Use strong passwords', detail: 'Use a unique password for each app or website. Do not use birthdays or simple number sequences.', color: 'green', hiRule: 'मजबूत पासवर्ड का उपयोग करें', mrRule: 'मजबूत पासवर्ड वापरा' },
];

// ============================================================
// HELPERS
// ============================================================
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch { return initialValue; }
  });

  const setValueAndStore = useCallback((val) => {
    setValue(val);
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {}
  }, [key]);

  return [value, setValueAndStore];
}

// ============================================================
// TOAST COMPONENT
// ============================================================
function Toast({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span>{t.icon}</span> {t.msg}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// LANGUAGE SCREEN
// ============================================================
function LanguageScreen({ onSelect }) {
  const [exiting, setExiting] = useState(false);

  const handleSelect = (lang) => {
    setExiting(true);
    setTimeout(() => onSelect(lang), 350);
  };

  const langs = [
    { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🟠' },
  ];

  return (
    <div className={`welcome-screen${exiting ? ' exiting' : ''}`}>
      <div className="welcome-logo">🧓</div>
      <h1 className="welcome-title">Senior Citizen Helper App</h1>
      <p className="welcome-subtitle">Wellness · Reminders · Safety</p>
      <p className="language-label">Choose Language</p>
      <div className="lang-buttons">
        {langs.map(l => (
          <button key={l.code} className="lang-btn" onClick={() => handleSelect(l.code)}>
            <span>{l.flag} {l.name}</span>
            <span className="lang-native">{l.native}</span>
            <span className="lang-arrow">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// WATER REMINDER
// ============================================================
function WaterReminder({ t, addAlert, showToast }) {
  const [on, setOn] = useLocalStorage('water_on', false);
  const [interval, setIntervalMins] = useLocalStorage('water_interval', 60);
  const [glasses, setGlasses] = useLocalStorage('water_glasses', 0);
  const timerRef = useRef(null);
  const lastReminderRef = useRef(Date.now());

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (on) {
      timerRef.current = setInterval(() => {
        showToast('💧 Time to drink water! Stay hydrated.', 'info', '💧');
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        lastReminderRef.current = Date.now();
        addAlert({ id: Date.now(), type: 'info', icon: '💧', title: 'Water Reminder', detail: `Reminder sent at ${timeStr}`, auto: true });
      }, interval * 60 * 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [on, interval]); // eslint-disable-line

  const intervals = [
    { mins: 30, label: t.min30 },
    { mins: 60, label: t.min60 },
    { mins: 90, label: t.min90 },
    { mins: 120, label: t.min120 },
  ];

  return (
    <section className="feature-section" id="water">
      <div className="section-header">
        <span className="section-icon">💧</span>
        <div>
          <h2 className="section-title">{t.waterTitle}</h2>
          <p className="section-desc">{t.waterDesc}</p>
        </div>
      </div>

      <div className="toggle-row">
        <div>
          <div className="toggle-label">{on ? t.waterOn : t.waterOff}</div>
          <div className="toggle-sublabel">{t.waterInterval} {intervals.find(i => i.mins === interval)?.label}</div>
        </div>
        <label className="toggle-switch">
          <input type="checkbox" checked={on} onChange={e => {
            setOn(e.target.checked);
            if (e.target.checked) showToast('💧 Water reminder turned ON!', 'success', '💧');
            else showToast('Water reminder turned OFF.', 'info', '💧');
          }} />
          <span className="toggle-slider" />
        </label>
      </div>

      <div className="interval-select-row">
        {intervals.map(i => (
          <button key={i.mins} className={`interval-chip${interval === i.mins ? ' selected' : ''}`}
            onClick={() => setIntervalMins(i.mins)}>
            {i.label}
          </button>
        ))}
      </div>

      <div className="water-status" style={{ marginTop: 18 }}>
        <span className="water-icon-big">💧</span>
        <div className="water-info">
          <div className="water-time-text">{t.waterCount} <strong>{glasses}</strong></div>
          <div className="water-count">Goal: 8 glasses per day</div>
          <div className="water-glass-row">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="glass-item"
                title={`Glass ${i + 1}`}>{i < glasses ? '🥛' : '🫙'}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={() => {
          setGlasses(g => Math.min(g + 1, 20));
          showToast('Well done! Stay hydrated 💧', 'success', '💧');
        }}>{t.drinkNow}</button>
        <button className="btn btn-outline btn-sm" onClick={() => setGlasses(0)}>{t.resetWater}</button>
      </div>
    </section>
  );
}

// ============================================================
// MEDICINE REMINDER
// ============================================================
function MedicineReminder({ t, lang, addAlert, showToast }) {
  const [medicines, setMedicines] = useLocalStorage('medicines', []);
  const [medName, setMedName] = useState('');
  const [medTime, setMedTime] = useState('08:00');
  const [medFreq, setMedFreq] = useState('once');

  const addMed = () => {
    if (!medName.trim()) { showToast('Please enter medicine name.', 'warning', '⚠️'); return; }
    const newMed = { id: Date.now(), name: medName.trim(), time: medTime, freq: medFreq, taken: false };
    setMedicines(prev => [...prev, newMed]);
    setMedName('');
    showToast(`✅ ${medName} added to reminders!`, 'success', '💊');
  };

  const toggleTaken = (id) => {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
    const med = medicines.find(m => m.id === id);
    if (med && !med.taken) showToast(`💊 ${med.name} marked as taken!`, 'success', '💊');
  };

  const deleteMed = (id) => {
    setMedicines(prev => prev.filter(m => m.id !== id));
    showToast('Medicine removed.', 'info', '💊');
  };

  const freqOptions = [
    { val: 'once', label: t.once },
    { val: 'twice', label: t.twice },
    { val: 'thrice', label: t.thrice },
  ];

  return (
    <section className="feature-section" id="medicine">
      <div className="section-header">
        <span className="section-icon">💊</span>
        <div>
          <h2 className="section-title">{t.medicineTitle}</h2>
          <p className="section-desc">{t.medicineDesc}</p>
        </div>
      </div>

      <div className="medicine-add-form">
        <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-secondary)', marginBottom: 14 }}>{t.addMedicine}</h3>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t.medName}</label>
            <input className="form-input" type="text" placeholder="e.g. Metformin 500mg"
              value={medName} onChange={e => setMedName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addMed()} />
          </div>
          <div className="form-group" style={{ flex: '0 0 140px' }}>
            <label className="form-label">{t.medTime}</label>
            <input className="form-input" type="time" value={medTime} onChange={e => setMedTime(e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: '0 0 170px' }}>
            <label className="form-label">{t.medFreq}</label>
            <select className="form-select" value={medFreq} onChange={e => setMedFreq(e.target.value)}>
              {freqOptions.map(f => <option key={f.val} value={f.val}>{f.label}</option>)}
            </select>
          </div>
        </div>
        <button className="btn btn-primary" onClick={addMed}>{t.addBtn}</button>
      </div>

      <div className="medicine-list">
        {medicines.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon">💊</span>
            {t.noMeds}
          </div>
        ) : medicines.map(m => (
          <div key={m.id} className={`medicine-card${m.taken ? ' taken' : ''}`}>
            <span className="med-icon">{m.taken ? '✅' : '💊'}</span>
            <div className="med-info">
              <div className="med-name">{m.name}</div>
              <div className="med-time">⏰ {m.time} · {freqOptions.find(f => f.val === m.freq)?.label}</div>
            </div>
            <div className="med-actions">
              <button className={`btn-check ${m.taken ? 'delete' : 'take'}`} onClick={() => toggleTaken(m.id)}>
                {m.taken ? t.undo : t.markTaken}
              </button>
              <button className="btn-check delete" onClick={() => deleteMed(m.id)}>{t.deleteMed}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// HEALTH TIPS
// ============================================================
function HealthTips({ t, lang }) {
  const [tipIdx, setTipIdx] = useLocalStorage('tip_idx', 0);
  const [animate, setAnimate] = useState(false);
  const tip = HEALTH_TIPS[tipIdx % HEALTH_TIPS.length];

  const nextTip = () => {
    setAnimate(true);
    setTimeout(() => {
      setTipIdx(i => (i + 1) % HEALTH_TIPS.length);
      setAnimate(false);
    }, 250);
  };

  const getText = () => {
    if (lang === 'hi' && tip.hi) return tip.hi;
    if (lang === 'mr' && tip.mr) return tip.mr;
    return tip.text;
  };

  return (
    <section className="feature-section" id="tips">
      <div className="section-header">
        <span className="section-icon">📰</span>
        <div>
          <h2 className="section-title">{t.tipsTitle}</h2>
          <p className="section-desc">{t.tipsDesc}</p>
        </div>
      </div>

      <div className="tip-card" style={{ opacity: animate ? 0 : 1, transition: 'opacity 0.25s' }}>
        <div className="tip-icon">{tip.icon}</div>
        <span className="tip-category">{tip.category}</span>
        <p className="tip-text">{getText()}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={nextTip}>{t.nextTip}</button>
        <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 700 }}>
          Tip {(tipIdx % HEALTH_TIPS.length) + 1} of {HEALTH_TIPS.length}
        </span>
      </div>
    </section>
  );
}

// ============================================================
// MEMORY HELPER
// ============================================================
function MemoryHelper({ t, lang }) {
  const [items, setItems] = useLocalStorage('memory_items', MEMORY_ITEMS_DEFAULT);

  const toggle = (id) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, checked: !it.checked } : it));
  };

  const reset = () => setItems(MEMORY_ITEMS_DEFAULT);

  const checkedCount = items.filter(i => i.checked).length;
  const pct = Math.round((checkedCount / items.length) * 100);

  const getLabel = (it) => {
    if (lang === 'hi' && it.hiText) return it.hiText;
    if (lang === 'mr' && it.mrText) return it.mrText;
    return it.text;
  };

  return (
    <section className="feature-section" id="memory">
      <div className="section-header">
        <span className="section-icon">🧠</span>
        <div>
          <h2 className="section-title">{t.memoryTitle}</h2>
          <p className="section-desc">{t.memoryDesc}</p>
        </div>
      </div>

      <div className="memory-grid">
        {items.map(it => (
          <div key={it.id} className={`memory-item${it.checked ? ' checked' : ''}`} onClick={() => toggle(it.id)}>
            <div className="memory-check">{it.checked ? '✓' : ''}</div>
            <span className="memory-emoji">{it.emoji}</span>
            <span className="memory-text">{getLabel(it)}</span>
          </div>
        ))}
      </div>

      <div className="memory-progress">
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
          {t.memoryProgress}
        </span>
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="progress-text">{checkedCount}/{items.length}</span>
      </div>

      <div style={{ marginTop: 16 }}>
        <button className="btn btn-outline btn-sm" onClick={reset}>{t.resetMemory}</button>
      </div>
    </section>
  );
}

// ============================================================
// DAILY ROUTINE
// ============================================================
function DailyRoutine({ t, lang }) {
  const [items, setItems] = useLocalStorage('routine_items', ROUTINE_ITEMS_DEFAULT);

  const toggle = (id) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, done: !it.done } : it));
  };

  const reset = () => setItems(ROUTINE_ITEMS_DEFAULT);

  const getLabel = (it) => {
    if (lang === 'hi' && it.hiLabel) return it.hiLabel;
    if (lang === 'mr' && it.mrLabel) return it.mrLabel;
    return it.label;
  };

  const doneCount = items.filter(i => i.done).length;

  return (
    <section className="feature-section" id="routine">
      <div className="section-header">
        <span className="section-icon">⏰</span>
        <div>
          <h2 className="section-title">{t.routineTitle}</h2>
          <p className="section-desc">{t.routineDesc} · {doneCount}/{items.length} done</p>
        </div>
      </div>

      <div className="routine-list">
        {items.map(it => (
          <div key={it.id} className={`routine-item${it.done ? ' done' : ''}`}>
            <div className="routine-left">
              <span className="routine-emoji">{it.emoji}</span>
              <div>
                <div className="routine-name">{getLabel(it)}</div>
                <div className="routine-time">⏰ {it.time}</div>
              </div>
            </div>
            <button
              className={`btn-done ${it.done ? 'done-state' : 'pending'}`}
              onClick={() => !it.done && toggle(it.id)}
            >
              {it.done ? t.doneLabel : t.markDone}
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <button className="btn btn-outline btn-sm" onClick={reset}>{t.resetRoutine}</button>
      </div>
    </section>
  );
}

// ============================================================
// MISSED ALERTS
// ============================================================
function AlertsSection({ t, alerts, setAlerts }) {
  const dismiss = (id) => setAlerts(prev => prev.filter(a => a.id !== id));
  const dismissAll = () => setAlerts([]);

  return (
    <section className="feature-section" id="alerts">
      <div className="section-header">
        <span className="section-icon">
          <span className="alert-bell">🔔</span>
        </span>
        <div>
          <h2 className="section-title">{t.alertsTitle}</h2>
          <p className="section-desc">{t.alertsDesc}</p>
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="alert-empty">
          <div className="alert-empty-icon">✅</div>
          {t.noAlerts}
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
            <button className="btn btn-sm btn-outline" onClick={dismissAll}>{t.dismissAll}</button>
          </div>
          <div className="alert-list">
            {alerts.map(a => (
              <div key={a.id} className={`alert-item ${a.type}`}>
                <span className="alert-icon">{a.icon}</span>
                <div className="alert-content">
                  <div className="alert-title">{a.title}</div>
                  <div className="alert-detail">{a.detail}</div>
                </div>
                <button className="btn-dismiss" onClick={() => dismiss(a.id)} title="Dismiss">✕</button>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

// ============================================================
// CYBER SAFETY
// ============================================================
function CyberSafety({ t, lang }) {
  const getRule = (tip) => {
    if (lang === 'hi' && tip.hiRule) return tip.hiRule;
    if (lang === 'mr' && tip.mrRule) return tip.mrRule;
    return tip.rule;
  };

  return (
    <section className="feature-section" id="cyber">
      <div className="section-header">
        <span className="section-icon">🛡️</span>
        <div>
          <h2 className="section-title">{t.cyberTitle}</h2>
          <p className="section-desc">{t.cyberDesc}</p>
        </div>
      </div>

      <div className="cyber-grid">
        {CYBER_TIPS.map((tip, i) => (
          <div key={i} className={`cyber-card ${tip.color}`}>
            <div className="cyber-icon">{tip.icon}</div>
            <div className="cyber-rule">{getRule(tip)}</div>
            <div className="cyber-detail">{tip.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [lang, setLang] = useLocalStorage('selected_lang', null);
  const [darkMode, setDarkMode] = useLocalStorage('dark_mode', false);
  const [alerts, setAlerts] = useLocalStorage('alerts_list', []);
  const [toasts, setToasts] = useState([]);
  const [activeNav, setActiveNav] = useState('water');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const showToast = useCallback((msg, type = 'info', icon = 'ℹ️') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, msg, type, icon }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const addAlert = useCallback((a) => {
    setAlerts(prev => [a, ...prev].slice(0, 10));
  }, [setAlerts]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActiveNav(id);
  };

  if (!lang) {
    return <LanguageScreen onSelect={(l) => setLang(l)} />;
  }

  const t = T[lang] || T.en;

  const navItems = [
    { id: 'water',    icon: '💧', label: t.water },
    { id: 'medicine', icon: '💊', label: t.medicine },
    { id: 'tips',     icon: '📰', label: t.healthTips },
    { id: 'memory',   icon: '🧠', label: t.memory },
    { id: 'routine',  icon: '⏰', label: t.routine },
    { id: 'alerts',   icon: '🔔', label: t.alerts },
    { id: 'cyber',    icon: '🛡️', label: t.cyber },
  ];

  return (
    <div className="app-wrapper">
      {/* HEADER */}
      <header className="app-header">
        <div className="header-top">
          <div className="header-left">
            <span className="header-icon">🧓</span>
            <div>
              <div className="header-title">{t.appName}</div>
              <div className="header-tagline">{t.tagline}</div>
            </div>
          </div>
          <div className="header-controls">
            <button className="dark-mode-btn" onClick={() => setDarkMode(d => !d)}>
              {darkMode ? t.lightMode : t.darkMode}
            </button>
            <button className="lang-switch-btn" onClick={() => setLang(null)}>
              {t.changeLanguage}
            </button>
          </div>
        </div>
      </header>

      {/* NAV BAR */}
      <nav className="nav-bar" role="navigation" aria-label="Feature navigation">
        <div className="nav-scroll">
          {navItems.map(n => (
            <button key={n.id}
              className={`nav-btn${activeNav === n.id ? ' active' : ''}`}
              onClick={() => scrollTo(n.id)}
              aria-label={n.label}
            >
              <span className="nav-icon">{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN */}
      <main className="main-content">
        <WaterReminder t={t} lang={lang} addAlert={addAlert} showToast={showToast} />
        <MedicineReminder t={t} lang={lang} addAlert={addAlert} showToast={showToast} />
        <HealthTips t={t} lang={lang} />
        <MemoryHelper t={t} lang={lang} />
        <DailyRoutine t={t} lang={lang} />
        <AlertsSection t={t} alerts={alerts} setAlerts={setAlerts} />
        <CyberSafety t={t} lang={lang} />
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="footer-divider" />
        <div className="footer-brand">
          🧓 {t.builtBy}
        </div>
        <p className="footer-contact">{t.enquiry}</p>
        <a className="footer-link" href={`mailto:${t.email}`}>{t.email}</a>
        <div className="footer-divider" />
        <p className="footer-copy">{t.copyright}</p>
      </footer>

      {/* TOAST */}
      <Toast toasts={toasts} />
    </div>
  );
}