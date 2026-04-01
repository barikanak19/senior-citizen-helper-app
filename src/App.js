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
    feedback: 'Feedback',

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
    builtBy: 'Built by - Kanak Bari Team',
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
    feedback: 'फीडबैक',

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
    feedback: 'अभिप्राय',

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
// DATA — HEALTH TIPS (60 plain strings)
// ============================================================
const HEALTH_TIPS = [
  "Drink at least 8 glasses of water every day to stay hydrated.",
  "Take a 30-minute walk every morning to keep your heart healthy.",
  "Eat fresh fruits and vegetables with every meal for good health.",
  "Never skip breakfast — it gives you energy for the whole day.",
  "Sleep 7 to 8 hours every night for your body to rest and repair.",
  "Do light stretching exercises every morning after waking up.",
  "Avoid adding extra salt to your food — it raises blood pressure.",
  "Replace cold drinks and soda with water, buttermilk or coconut water.",
  "Take your medicines on time every day without missing a dose.",
  "Visit your doctor for a routine check-up every 3 months.",
  "Check your blood pressure regularly at home and keep a record.",
  "If you are diabetic, check your blood sugar as advised by your doctor.",
  "Wear comfortable and well-fitting shoes to prevent falls.",
  "Keep all rooms and staircases brightly lit to avoid accidents.",
  "Use a walking stick if you feel unsteady — it prevents dangerous falls.",
  "Drink milk and eat curd daily for strong bones and teeth.",
  "Sit in morning sunlight for 15 to 20 minutes to get natural Vitamin D.",
  "Avoid smoking and alcohol — they damage your heart and lungs.",
  "Do deep breathing exercises for 5 to 10 minutes every day.",
  "Do not lift heavy objects — always ask for help when needed.",
  "Save your doctor and ambulance numbers on your phone and on paper at home.",
  "Wash your hands with soap for 20 seconds before meals and after the toilet.",
  "Eat 5 small meals throughout the day instead of 3 large meals.",
  "Avoid fried and oily foods — choose baked, steamed or boiled food instead.",
  "Eat oats, lentils and vegetables daily to prevent constipation.",
  "Talk to family and friends every day to stay mentally healthy.",
  "Read books or newspapers daily to keep your brain active.",
  "Solve puzzles, crosswords or sudoku to keep your mind sharp.",
  "Sit quietly and meditate for 10 minutes each morning to calm your mind.",
  "If you feel chest pain or breathing difficulty, call a doctor immediately.",
  "Always carry a written list of all your medicines when you go out.",
  "Get up and move for 5 minutes every 30 minutes — do not sit too long.",
  "Hold the railing firmly when using stairs to prevent slipping.",
  "Place non-slip rubber mats in the bathroom and keep the floor dry.",
  "Eat eggs, dal, paneer or fish daily to maintain muscle strength.",
  "Drink no more than 1 to 2 cups of tea or coffee per day.",
  "Visit an eye doctor once a year to check for vision changes.",
  "Get a hearing test done if you have difficulty hearing clearly.",
  "Wear a hat and apply sunscreen when going out in the afternoon sun.",
  "If you are diabetic, check your feet every day for cuts or sores.",
  "Avoid very spicy food — it can cause acidity and stomach discomfort.",
  "Do chair yoga or gentle seated exercises if outdoor walking is difficult.",
  "Learn something new every week to keep your brain young and active.",
  "Drink a glass of warm water with lemon every morning to aid digestion.",
  "Eat spinach, dates and lentils to maintain iron levels and prevent anaemia.",
  "Do not hold back urination — go to the toilet when you feel the urge.",
  "Remove loose rugs and wires from walkways to prevent tripping at home.",
  "Listen to calm and soothing music every day to reduce stress and anxiety.",
  "Take a short nap of 20 to 30 minutes in the afternoon when tired.",
  "Never give your medicines to others — every person's dose is different.",
  "Keep a stocked first aid kit at home and know how to use it.",
  "Brush your teeth twice daily and visit the dentist every 6 months.",
  "Maintain a healthy weight with balanced meals and regular light exercise.",
  "Eat slowly and chew your food well to improve digestion.",
  "Wear warm layered clothing in winter to protect your joints and chest.",
  "Take calcium and Vitamin D supplements if your doctor advises you to.",
  "Never start a new medicine without consulting your doctor first.",
  "Laugh every day — it reduces stress and boosts your immunity.",
  "Drink a glass of warm turmeric milk at night to help you sleep better.",
  "End each day by thinking of 3 things you are grateful for.",
];

// ============================================================
// DATA — MEMORY ITEMS
// ============================================================
const MEMORY_ITEMS_DEFAULT = [
  { id: 1, text: 'Lock the door',       hiText: 'दरवाज़ा बंद करें',          mrText: 'दरवाजा बंद करा',          emoji: '🚪', checked: false },
  { id: 2, text: 'Turn off the gas',    hiText: 'गैस बंद करें',              mrText: 'गॅस बंद करा',             emoji: '🔥', checked: false },
  { id: 3, text: 'Turn off the lights', hiText: 'बत्ती बंद करें',            mrText: 'दिवे बंद करा',            emoji: '💡', checked: false },
  { id: 4, text: 'Close all windows',   hiText: 'खिड़कियाँ बंद करें',        mrText: 'सर्व खिडक्या बंद करा',   emoji: '🪟', checked: false },
  { id: 5, text: 'Take medicine',       hiText: 'दवाई लें',                  mrText: 'औषध घ्या',                emoji: '💊', checked: false },
  { id: 6, text: 'Drink water',         hiText: 'पानी पिएं',                 mrText: 'पाणी प्या',               emoji: '💧', checked: false },
  { id: 7, text: 'Carry keys',          hiText: 'चाबियाँ लें',              mrText: 'चाव्या घ्या',             emoji: '🗝️', checked: false },
  { id: 8, text: 'Check wallet / phone',hiText: 'बटुआ / फोन चेक करें',      mrText: 'पाकीट / फोन तपासा',      emoji: '📱', checked: false },
];

// ============================================================
// DATA — DAILY ROUTINE
// ============================================================
const ROUTINE_ITEMS_DEFAULT = [
  { id: 1,  emoji: '🌅', label: 'Morning Walk',       hiLabel: 'सुबह की सैर',          mrLabel: 'सकाळची चाल',            time: '6:00 AM',  done: false },
  { id: 2,  emoji: '🍳', label: 'Breakfast',           hiLabel: 'नाश्ता',               mrLabel: 'नाश्ता',                 time: '8:00 AM',  done: false },
  { id: 3,  emoji: '💊', label: 'Morning Medicine',    hiLabel: 'सुबह की दवाई',         mrLabel: 'सकाळची औषधे',           time: '9:00 AM',  done: false },
  { id: 4,  emoji: '☀️', label: 'Sunlight / Yoga',     hiLabel: 'धूप / योग',            mrLabel: 'उन्ह / योग',            time: '10:00 AM', done: false },
  { id: 5,  emoji: '🍱', label: 'Lunch',               hiLabel: 'दोपहर का खाना',        mrLabel: 'दुपारचे जेवण',          time: '1:00 PM',  done: false },
  { id: 6,  emoji: '😴', label: 'Afternoon Rest',      hiLabel: 'दोपहर का आराम',        mrLabel: 'दुपारची विश्रांती',     time: '2:30 PM',  done: false },
  { id: 7,  emoji: '🚶', label: 'Evening Walk',        hiLabel: 'शाम की सैर',           mrLabel: 'संध्याकाळची चाल',       time: '5:00 PM',  done: false },
  { id: 8,  emoji: '🍵', label: 'Evening Tea / Snack', hiLabel: 'शाम की चाय',           mrLabel: 'संध्याकाळचा चहा',       time: '5:30 PM',  done: false },
  { id: 9,  emoji: '🌙', label: 'Dinner',              hiLabel: 'रात का खाना',          mrLabel: 'रात्रीचे जेवण',         time: '8:00 PM',  done: false },
  { id: 10, emoji: '🛏️', label: 'Sleep',               hiLabel: 'सोने का समय',          mrLabel: 'झोपण्याची वेळ',         time: '10:00 PM', done: false },
];

// ============================================================
// DATA — CYBER TIPS (25 tips)
// ============================================================
const CYBER_TIPS = [
  { icon: '🔐', rule: 'Never share your OTP',                       detail: 'No bank, government office or company will ever ask for your OTP. Hang up immediately if someone asks.',                        color: 'red',    hiRule: 'कभी OTP शेयर न करें',                          mrRule: 'कधीही OTP शेअर करू नका' },
  { icon: '📵', rule: 'Avoid unknown calls',                        detail: 'Do not trust calls claiming to be from banks, government or police asking for personal info.',                                   color: 'blue',   hiRule: 'अज्ञात कॉल से सावधान रहें',                    mrRule: 'अज्ञात कॉलपासून सावध राहा' },
  { icon: '🏦', rule: 'Never share bank details',                   detail: 'Do not share your account number, PIN, CVV, or password with anyone — not even your family.',                                   color: 'purple', hiRule: 'बैंक विवरण कभी न शेयर करें',                   mrRule: 'बँक तपशील कधीही शेअर करू नका' },
  { icon: '🔗', rule: 'Do not click unknown links',                 detail: 'Suspicious links in SMS or WhatsApp can steal your data. Always verify before clicking.',                                        color: 'orange', hiRule: 'अज्ञात लिंक पर क्लिक न करें',                 mrRule: 'अज्ञात लिंकवर क्लिक करू नका' },
  { icon: '💸', rule: 'Beware of "free prize" scams',               detail: 'If someone says you won a lottery or prize, it is almost certainly a fraud. Do not pay any "processing fee."',                  color: 'red',    hiRule: '"मुफ्त इनाम" घोटालों से सावधान रहें',          mrRule: '"मोफत बक्षीस" घोटाळ्यांपासून सावध राहा' },
  { icon: '🛡️', rule: 'Use strong passwords',                       detail: 'Use a unique password for each app or website. Do not use birthdays or simple number sequences.',                               color: 'green',  hiRule: 'मजबूत पासवर्ड का उपयोग करें',                  mrRule: 'मजबूत पासवर्ड वापरा' },
  { icon: '📲', rule: 'Do not install unknown apps',                detail: 'Never install an app on your phone if an unknown caller or message asks you to do so.',                                          color: 'orange', hiRule: 'अज्ञात ऐप्स इंस्टॉल न करें',                  mrRule: 'अज्ञात अॅप्स इन्स्टॉल करू नका' },
  { icon: '📷', rule: 'Never scan unknown QR codes',                detail: 'Scanning a QR code sent by a stranger can result in money being withdrawn from your account instantly.',                        color: 'red',    hiRule: 'अज्ञात QR कोड कभी स्कैन न करें',              mrRule: 'अज्ञात QR कोड कधीही स्कॅन करू नका' },
  { icon: '🌐', rule: 'Avoid public Wi-Fi for banking',             detail: 'Never do banking or payments on public Wi-Fi at malls, hotels or railway stations — it is not safe.',                          color: 'purple', hiRule: 'बैंकिंग के लिए सार्वजनिक Wi-Fi से बचें',      mrRule: 'बँकिंगसाठी सार्वजनिक Wi-Fi टाळा' },
  { icon: '🏧', rule: 'Be careful at ATMs',                         detail: 'Do not let strangers help you at ATMs. Cover the keypad while entering your PIN. Check for hidden cameras.',                   color: 'blue',   hiRule: 'ATM पर सावधान रहें',                            mrRule: 'ATM वर सावध राहा' },
  { icon: '📞', rule: 'Verify before you trust',                    detail: 'If someone claims to be from a government office or bank, hang up and call back on the official number yourself.',             color: 'green',  hiRule: 'भरोसा करने से पहले सत्यापित करें',             mrRule: 'विश्वास ठेवण्यापूर्वी सत्यापित करा' },
  { icon: '💬', rule: 'Do not forward unverified messages',         detail: 'Do not forward WhatsApp messages about fake offers, government schemes or health cures without checking.',                     color: 'orange', hiRule: 'बिना जाँचे संदेश फॉरवर्ड न करें',              mrRule: 'न तपासता संदेश फॉरवर्ड करू नका' },
  { icon: '🔒', rule: 'Lock your phone always',                     detail: 'Always keep your phone locked with a PIN, pattern or fingerprint to protect your personal information.',                       color: 'blue',   hiRule: 'फोन हमेशा लॉक रखें',                           mrRule: 'फोन नेहमी लॉक ठेवा' },
  { icon: '📋', rule: 'Check bank statements regularly',            detail: 'Review your bank passbook or app every week for unknown transactions. Report any suspicious entry immediately.',               color: 'green',  hiRule: 'बैंक स्टेटमेंट नियमित जाँचें',                 mrRule: 'बँक स्टेटमेंट नियमित तपासा' },
  { icon: '🚫', rule: 'Never give your phone to strangers',         detail: 'Do not hand your phone to an unknown person to make a call — they may install spy apps or steal your data.',                  color: 'red',    hiRule: 'अजनबियों को फोन न दें',                         mrRule: 'अनोळखी व्यक्तींना फोन देऊ नका' },
  { icon: '📧', rule: 'Ignore suspicious emails',                   detail: 'Do not open emails from unknown senders asking for passwords, bank info or personal documents.',                               color: 'purple', hiRule: 'संदिग्ध ईमेल को अनदेखा करें',                  mrRule: 'संशयास्पद ईमेल दुर्लक्षित करा' },
  { icon: '🌍', rule: 'Do not call back unknown international numbers', detail: 'If you receive a missed call from an unknown international number, do not call it back — it may be a scam.',              color: 'orange', hiRule: 'अज्ञात अंतर्राष्ट्रीय नंबर वापस न करें',       mrRule: 'अज्ञात आंतरराष्ट्रीय नंबरवर परत कॉल करू नका' },
  { icon: '🧾', rule: 'Set transaction limits on your account',     detail: 'Ask your bank to set daily transaction limits on your account to reduce risk in case of fraud.',                              color: 'green',  hiRule: 'खाते पर लेनदेन सीमा निर्धारित करें',           mrRule: 'खात्यावर व्यवहार मर्यादा सेट करा' },
  { icon: '🤝', rule: 'Consult family before big payments',         detail: 'Always talk to a trusted family member before making any large payment or financial decision online.',                         color: 'blue',   hiRule: 'बड़े भुगतान से पहले परिवार से सलाह लें',        mrRule: 'मोठे पेमेंट करण्यापूर्वी कुटुंबाशी सल्लामसलत करा' },
  { icon: '🆘', rule: 'Report cyber fraud immediately',             detail: 'If you are cheated online, call the National Cyber Crime Helpline at 1930 without any delay.',                                color: 'red',    hiRule: 'साइबर धोखाधड़ी तुरंत रिपोर्ट करें',            mrRule: 'सायबर फसवणूक त्वरित नोंदवा' },
  { icon: '🧠', rule: 'Beware of emotional manipulation',           detail: 'Scammers create urgency or fear to confuse you. Stay calm and never make rushed decisions over the phone.',                   color: 'purple', hiRule: 'भावनात्मक हेरफेर से सावधान रहें',               mrRule: 'भावनिक फसवणुकीपासून सावध राहा' },
  { icon: '💳', rule: 'Use UPI and cards carefully',                detail: 'Never enter your UPI PIN to receive money — PIN is only needed when you send money, not receive it.',                         color: 'orange', hiRule: 'UPI और कार्ड सावधानी से उपयोग करें',           mrRule: 'UPI आणि कार्ड सावधानीने वापरा' },
  { icon: '🖥️', rule: 'Use only official banking websites',         detail: "Always type your bank's website address yourself in the browser. Do not rely on links from search engines or messages.",     color: 'green',  hiRule: 'केवल आधिकारिक बैंकिंग वेबसाइट का उपयोग करें', mrRule: 'फक्त अधिकृत बँकिंग वेबसाइट वापरा' },
  { icon: '🔕', rule: 'Block and report spam calls',                detail: "Use your phone's built-in feature or apps like Truecaller to identify and block suspicious spam callers.",                   color: 'blue',   hiRule: 'स्पैम कॉल को ब्लॉक और रिपोर्ट करें',           mrRule: 'स्पॅम कॉल ब्लॉक करा आणि रिपोर्ट करा' },
  { icon: '👨‍👩‍👧', rule: 'Stay educated about new scams',            detail: 'Ask your children or grandchildren to regularly update you about new types of online frauds happening around.',             color: 'green',  hiRule: 'नए घोटालों के बारे में जागरूक रहें',            mrRule: 'नवीन घोटाळ्यांबद्दल जागरूक राहा' },
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
    setValue(prev => {
      const next = typeof val === 'function' ? val(prev) : val;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
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
    { code: 'hi', name: 'Hindi',   native: 'हिन्दी',  flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', native: 'मराठी',   flag: '🟠' },
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
  const [on, setOn]                     = useLocalStorage('water_on', false);
  const [interval, setIntervalMins]     = useLocalStorage('water_interval', 60);
  const [glasses, setGlasses]           = useLocalStorage('water_glasses', 0);
  const timerRef                        = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (on) {
      timerRef.current = setInterval(() => {
        showToast('💧 Time to drink water! Stay hydrated.', 'info', '💧');
        const now     = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        addAlert({ id: Date.now(), type: 'info', icon: '💧', title: 'Water Reminder', detail: `Reminder sent at ${timeStr}`, auto: true });
      }, interval * 60 * 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [on, interval]); // eslint-disable-line

  const intervals = [
    { mins: 30,  label: t.min30  },
    { mins: 60,  label: t.min60  },
    { mins: 90,  label: t.min90  },
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
              <span key={i} className="glass-item" title={`Glass ${i + 1}`}>
                {i < glasses ? '🥛' : '🫙'}
              </span>
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
function MedicineReminder({ t, addAlert, showToast }) {
  const [medicines, setMedicines] = useLocalStorage('medicines', []);
  const [medName, setMedName]     = useState('');
  const [medTime, setMedTime]     = useState('08:00');
  const [medFreq, setMedFreq]     = useState('once');

  const freqOptions = [
    { val: 'once',   label: t.once   },
    { val: 'twice',  label: t.twice  },
    { val: 'thrice', label: t.thrice },
  ];

  const addMed = () => {
    if (!medName.trim()) { showToast('Please enter medicine name.', 'warning', '⚠️'); return; }
    const newMed = { id: Date.now(), name: medName.trim(), time: medTime, freq: medFreq, taken: false };
    setMedicines(prev => [...prev, newMed]);
    setMedName('');
    showToast(`✅ ${medName} added to reminders!`, 'success', '💊');
  };

  const toggleTaken = (id) => {
    setMedicines(prev => prev.map(m => {
      if (m.id === id) {
        if (!m.taken) showToast(`💊 ${m.name} marked as taken!`, 'success', '💊');
        return { ...m, taken: !m.taken };
      }
      return m;
    }));
  };

  const deleteMed = (id) => {
    setMedicines(prev => prev.filter(m => m.id !== id));
    showToast('Medicine removed.', 'info', '💊');
  };

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
function HealthTips({ t }) {
  const [tipIdx, setTipIdx] = useLocalStorage('tip_idx', 0);
  const [animate, setAnimate] = useState(false);

  const currentIndex = tipIdx % HEALTH_TIPS.length;
  const currentTip   = HEALTH_TIPS[currentIndex] || 'No tip available';

  const nextTip = () => {
    setAnimate(true);
    setTimeout(() => {
      setTipIdx(i => (i + 1) % HEALTH_TIPS.length);
      setAnimate(false);
    }, 250);
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
        <div className="tip-icon">💡</div>
        <p className="tip-text">{currentTip}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={nextTip}>{t.nextTip}</button>
        <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 700 }}>
          Tip {currentIndex + 1} of {HEALTH_TIPS.length}
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
  const pct          = Math.round((checkedCount / items.length) * 100);

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
  const dismiss    = (id) => setAlerts(prev => prev.filter(a => a.id !== id));
  const dismissAll = ()   => setAlerts([]);

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
// FEEDBACK
// ============================================================
function Feedback({ lang }) {
  const [name, setName]           = useState('');
  const [message, setMessage]     = useState('');
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState('');

  // Labels for all 3 languages
  const labels = {
    en: {
      title:              'Feedback 💬',
      desc:               'We value your thoughts and suggestions',
      namePlaceholder:    'Enter your name',
      messagePlaceholder: 'Write your feedback here...',
      nameLabel:          'Your Name',
      messageLabel:       'Your Feedback',
      submit:             '📩 Submit Feedback',
      submitting:         '⏳ Submitting...',
      successMsg:         '🎉 Thank you for your feedback!',
      successSub:         'Your response has been recorded.',
      errorEmpty:         'Please fill in both Name and Feedback before submitting.',
      errorFail:          'Something went wrong. Please try again.',
      reset:              '✏️ Submit Another',
    },
    hi: {
      title:              'फीडबैक 💬',
      desc:               'हम आपके विचारों और सुझावों को महत्व देते हैं',
      namePlaceholder:    'अपना नाम दर्ज करें',
      messagePlaceholder: 'यहाँ अपना फीडबैक लिखें...',
      nameLabel:          'आपका नाम',
      messageLabel:       'आपका फीडबैक',
      submit:             '📩 फीडबैक भेजें',
      submitting:         '⏳ भेजा जा रहा है...',
      successMsg:         '🎉 आपके फीडबैक के लिए धन्यवाद!',
      successSub:         'आपका जवाब दर्ज कर लिया गया है।',
      errorEmpty:         'कृपया सबमिट करने से पहले नाम और फीडबैक दोनों भरें।',
      errorFail:          'कुछ गलत हुआ। कृपया पुनः प्रयास करें।',
      reset:              '✏️ एक और भेजें',
    },
    mr: {
      title:              'अभिप्राय 💬',
      desc:               'आम्ही तुमचे विचार आणि सूचना महत्त्वाच्या मानतो',
      namePlaceholder:    'तुमचे नाव टाका',
      messagePlaceholder: 'येथे तुमचा अभिप्राय लिहा...',
      nameLabel:          'तुमचे नाव',
      messageLabel:       'तुमचा अभिप्राय',
      submit:             '📩 अभिप्राय पाठवा',
      submitting:         '⏳ पाठवत आहे...',
      successMsg:         '🎉 तुमच्या अभिप्रायाबद्दल धन्यवाद!',
      successSub:         'तुमचा प्रतिसाद नोंदवला गेला आहे।',
      errorEmpty:         'कृपया सबमिट करण्यापूर्वी नाव आणि अभिप्राय दोन्ही भरा।',
      errorFail:          'काहीतरी चुकले. कृपया पुन्हा प्रयत्न करा.',
      reset:              '✏️ आणखी एक पाठवा',
    },
  };

  const L = labels[lang] || labels.en;

  // Replace this URL with your Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERhttps://script.google.com/macros/s/AKfycbwkXtxX7b1fWm4iLQMdqEyqAzdzVSkelhpghftBFPB6VYkSF5smlWustTGlWUVExHZjRQ/execE';

  const handleSubmit = async () => {
    setError('');

    if (!name.trim() || !message.trim()) {
      setError(L.errorEmpty);
      return;
    }

    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // required for Google Apps Script
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    name.trim(),
          message: message.trim(),
        }),
      });
      // no-cors means we can't read the response — assume success
      setSubmitted(true);
      setName('');
      setMessage('');
    } catch (err) {
      setError(L.errorFail);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError('');
  };

  return (
    <section className="feature-section" id="feedback">
      <div className="section-header">
        <span className="section-icon">💬</span>
        <div>
          <h2 className="section-title">{L.title}</h2>
          <p className="section-desc">{L.desc}</p>
        </div>
      </div>

      {submitted ? (
        <div style={{
          textAlign:    'center',
          padding:      '32px 16px',
          background:   'var(--card-bg)',
          borderRadius: 16,
          border:       '2px solid var(--border)',
          marginTop:    8,
        }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>✅</div>
          <div style={{
            fontSize:     20,
            fontWeight:   800,
            color:        'var(--text-primary)',
            marginBottom: 6,
          }}>
            {L.successMsg}
          </div>
          <div style={{
            fontSize:     14,
            color:        'var(--text-muted)',
            marginBottom: 24,
          }}>
            {L.successSub}
          </div>
          <button className="btn btn-outline btn-sm" onClick={handleReset}>
            {L.reset}
          </button>
        </div>
      ) : (
        <div style={{
          background:    'var(--card-bg)',
          borderRadius:  16,
          border:        '2px solid var(--border)',
          padding:       '24px 20px',
          marginTop:     8,
          display:       'flex',
          flexDirection: 'column',
          gap:           18,
        }}>
          {/* Name Field */}
          <div className="form-group">
            <label className="form-label">{L.nameLabel}</label>
            <input
              className="form-input"
              type="text"
              placeholder={L.namePlaceholder}
              value={name}
              onChange={e => { setName(e.target.value); setError(''); }}
              disabled={loading}
              style={{ fontSize: 16 }}
            />
          </div>

          {/* Feedback Textarea */}
          <div className="form-group">
            <label className="form-label">{L.messageLabel}</label>
            <textarea
              className="form-input"
              placeholder={L.messagePlaceholder}
              value={message}
              onChange={e => { setMessage(e.target.value); setError(''); }}
              disabled={loading}
              rows={5}
              style={{
                resize:     'vertical',
                fontSize:   16,
                lineHeight: 1.6,
                minHeight:  120,
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background:   'var(--danger-bg, #fff0f0)',
              border:       '1.5px solid var(--danger, #e53e3e)',
              borderRadius: 10,
              padding:      '10px 14px',
              color:        'var(--danger, #c53030)',
              fontSize:     14,
              fontWeight:   600,
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              fontSize: 16,
              padding:  '12px 24px',
              opacity:  loading ? 0.7 : 1,
              cursor:   loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? L.submitting : L.submit}
          </button>
        </div>
      )}
    </section>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [lang, setLang]           = useLocalStorage('selected_lang', null);
  const [darkMode, setDarkMode]   = useLocalStorage('dark_mode', false);
  const [alerts, setAlerts]       = useLocalStorage('alerts_list', []);
  const [toasts, setToasts]       = useState([]);
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
      const top    = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActiveNav(id);
  };

  if (!lang) {
    return <LanguageScreen onSelect={(l) => setLang(l)} />;
  }

  const t = T[lang] || T.en;

  const navItems = [
    { id: 'water',    icon: '💧', label: t.water      },
    { id: 'medicine', icon: '💊', label: t.medicine   },
    { id: 'tips',     icon: '📰', label: t.healthTips },
    { id: 'memory',   icon: '🧠', label: t.memory     },
    { id: 'routine',  icon: '⏰', label: t.routine    },
    { id: 'alerts',   icon: '🔔', label: t.alerts     },
    { id: 'cyber',    icon: '🛡️', label: t.cyber      },
    { id: 'feedback', icon: '💬', label: t.feedback   },
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
        <WaterReminder    t={t} lang={lang} addAlert={addAlert} showToast={showToast} />
        <MedicineReminder t={t} lang={lang} addAlert={addAlert} showToast={showToast} />
        <HealthTips       t={t} lang={lang} />
        <MemoryHelper     t={t} lang={lang} />
        <DailyRoutine     t={t} lang={lang} />
        <AlertsSection    t={t} alerts={alerts} setAlerts={setAlerts} />
        <CyberSafety      t={t} lang={lang} />
        <Feedback         lang={lang} />
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="footer-divider" />
        <div className="footer-brand">🧓 {t.builtBy}</div>
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