// Government Services Database

export type Language = 'en' | 'hi' | 'mr';

export interface ServiceFlow {
  id: string;
  keywords: string[];
  questions: {
    [key: string]: {
      text: { [key in Language]: string };
      validation?: (answer: string) => { valid: boolean; message?: { [key in Language]: string } };
      nextStep?: string | ((answer: string) => string);
    };
  };
  finalOutput: { [key in Language]: string };
  checklist: { [key in Language]: string[] };
  officialLink: string;
  helpline: string;
}

export const translations = {
  en: {
    greeting: "Hello! I am SAHAI (सहाय), your digital assistant for government services. I can help you with pension, Aadhar, scholarships, driving license, ration card, PAN card, voter ID, PM-KISAN, Ayushman Bharat, and passport services. What do you need help with today?",
    simplify: "🔄 Simplify",
    documentsNeeded: "📋 Documents Needed",
    processComplete: "✓ Process Complete!",
    visitWebsite: "🔗 Visit Official Website",
    helpline: "📞 Helpline",
    disclaimer: "⚠️ Important Note:\n• I am a guide, not a government officer\n• Information may change - check official website\n• I cannot guarantee approval\n• For legal advice, consult a lawyer",
    anythingElse: "Is there anything else I can help you with?",
    thankYou: "Thank you! 🙏",
    typeMessage: "Type your message...",
    send: "Send",
    selectLanguage: "Select Language",
    quickActions: "Quick Actions",
  },
  hi: {
    greeting: "नमस्ते! मैं सहाय हूं, आपका सरकारी सेवाओं का डिजिटल सहायक। मैं पेंशन, आधार, छात्रवृत्ति, ड्राइविंग लाइसेंस, राशन कार्ड, पैन कार्ड, वोटर आईडी, पीएम-किसान, आयुष्मान भारत और पासपोर्ट सेवाओं में मदद कर सकता हूं। आज आपको किस चीज़ में मदद चाहिए?",
    simplify: "🔄 सरल करें",
    documentsNeeded: "📋 आवश्यक दस्तावेज़",
    processComplete: "✓ प्रक्रिया पूर्ण!",
    visitWebsite: "🔗 आधिकारिक वेबसाइट पर जाएं",
    helpline: "📞 हेल्पलाइन",
    disclaimer: "⚠️ महत्वपूर्ण सूचना:\n• मैं एक गाइड हूं, सरकारी अधिकारी नहीं\n• जानकारी बदल सकती है - आधिकारिक वेबसाइट देखें\n• मैं मंजूरी की गारंटी नहीं दे सकता\n• कानूनी सलाह के लिए वकील से परामर्श करें",
    anythingElse: "क्या मैं आपकी और किसी चीज़ में मदद कर सकता हूं?",
    thankYou: "धन्यवाद! 🙏",
    typeMessage: "अपना संदेश लिखें...",
    send: "भेजें",
    selectLanguage: "भाषा चुनें",
    quickActions: "त्वरित कार्य",
  },
  mr: {
    greeting: "नमस्कार! मी सहाय आहे, तुमचा सरकारी सेवांसाठी डिजिटल सहाय्यक. मी पेन्शन, आधार, शिष्यवृत्ती, ड्रायव्हिंग लायसन्स, रेशन कार्ड, पॅन कार्ड, मतदार ओळखपत्र, पीएम-किसान, आयुष्मान भारत आणि पासपोर्ट सेवांमध्ये मदत करू शकतो. आज तुम्हाला कशात मदत हवी आहे?",
    simplify: "🔄 सोपे करा",
    documentsNeeded: "📋 आवश्यक कागदपत्रे",
    processComplete: "✓ प्रक्रिया पूर्ण!",
    visitWebsite: "🔗 अधिकृत वेबसाइटला भेट द्या",
    helpline: "📞 हेल्पलाइन",
    disclaimer: "⚠️ महत्त्वाची सूचना:\n• मी एक मार्गदर्शक आहे, सरकारी अधिकारी नाही\n• माहिती बदलू शकते - अधिकृत वेबसाइट पहा\n• मी मंजुरीची हमी देऊ शकत नाही\n• कायदेशीर सल्ल्यासाठी वकिलाशी संपर्क साधा",
    anythingElse: "मी तुम्हाला आणखी कशात मदत करू शकतो?",
    thankYou: "धन्यवाद! 🙏",
    typeMessage: "तुमचा संदेश लिहा...",
    send: "पाठवा",
    selectLanguage: "भाषा निवडा",
    quickActions: "जलद क्रिया",
  },
};

export const services: ServiceFlow[] = [
  {
    id: 'pension',
    keywords: ['pension', 'old age', 'senior citizen', 'बुजुर्ग', 'पेंशन', 'वृद्धावस्था', 'पेन्शन', 'वृद्ध'],
    questions: {
      start: {
        text: {
          en: "How old are you?",
          hi: "आपकी उम्र क्या है?",
          mr: "तुमचे वय किती आहे?",
        },
        validation: (answer) => {
          const age = parseInt(answer);
          if (isNaN(age)) return { valid: true };
          if (age < 60) {
            return {
              valid: false,
              message: {
                en: "Sorry, you must be 60+ years old to apply for Old Age Pension. You can apply when you turn 60.",
                hi: "क्षमा करें, वृद्धावस्था पेंशन के लिए आपकी उम्र 60+ वर्ष होनी चाहिए। आप 60 वर्ष के होने पर आवेदन कर सकते हैं।",
                mr: "माफ करा, वृद्धापकाळ पेन्शनसाठी तुमचे वय 60+ वर्षे असणे आवश्यक आहे. तुम्ही 60 वर्षांचे झाल्यावर अर्ज करू शकता.",
              },
            };
          }
          return { valid: true };
        },
        nextStep: 'income',
      },
      income: {
        text: {
          en: "What is your monthly family income?",
          hi: "आपकी मासिक पारिवारिक आय क्या है?",
          mr: "तुमचे मासिक कौटुंबिक उत्पन्न किती आहे?",
        },
        nextStep: 'bpl',
      },
      bpl: {
        text: {
          en: "Do you have a BPL card (Below Poverty Line card)? This is usually a yellow or pink ration card that says 'Below Poverty Line' on it.",
          hi: "क्या आपके पास बीपीएल कार्ड (गरीबी रेखा से नीचे का कार्ड) है? यह आमतौर पर पीला या गुलाबी राशन कार्ड होता है जिस पर 'गरीबी रेखा से नीचे' लिखा होता है।",
          mr: "तुमच्याकडे बीपीएल कार्ड (दारिद्र्य रेषेखालील कार्ड) आहे का? हे सामान्यतः पिवळे किंवा गुलाबी रेशन कार्ड असते ज्यावर 'दारिद्र्य रेषेखाली' लिहिलेले असते.",
        },
        nextStep: 'complete',
      },
    },
    finalOutput: {
      en: `Here's how to apply for Old Age Pension:

1. Visit your Gram Panchayat or Municipal office
2. Ask for "Old Age Pension Form"
3. Fill the form with your Aadhar number and bank details
4. Attach these documents:
   • Aadhar Card (photocopy)
   • Age Proof - Voter ID or Birth Certificate
   • BPL Card (yellow/pink ration card)
   • Bank Passbook (first page copy)
   • 2 passport photos
5. Submit the form to the officer
6. Get acknowledgment receipt
7. Your pension (₹200-500/month) will start in 30-45 days

⚠️ This is guidance only. Final approval by government office.`,
      hi: `वृद्धावस्था पेंशन के लिए आवेदन कैसे करें:

1. अपने ग्राम पंचायत या नगरपालिका कार्यालय जाएं
2. "वृद्धावस्था पेंशन फॉर्म" मांगें
3. फॉर्म में अपना आधार नंबर और बैंक विवरण भरें
4. ये दस्तावेज़ संलग्न करें:
   • आधार कार्ड (फोटोकॉपी)
   • उम्र का प्रमाण - वोटर आईडी या जन्म प्रमाणपत्र
   • बीपीएल कार्ड (पीला/गुलाबी राशन कार्ड)
   • बैंक पासबुक (पहले पेज की कॉपी)
   • 2 पासपोर्ट फोटो
5. अधिकारी को फॉर्म जमा करें
6. पावती रसीद लें
7. आपकी पेंशन (₹200-500/महीना) 30-45 दिनों में शुरू हो जाएगी

⚠️ यह केवल मार्गदर्शन है। अंतिम मंजूरी सरकारी कार्यालय द्वारा।`,
      mr: `वृद्धापकाळ पेन्शनसाठी अर्ज कसा करावा:

1. तुमच्या ग्रामपंचायत किंवा नगरपालिका कार्यालयाला भेट द्या
2. "वृद्धापकाळ पेन्शन फॉर्म" मागा
3. फॉर्ममध्ये तुमचा आधार नंबर आणि बँक तपशील भरा
4. हे कागदपत्रे जोडा:
   • आधार कार्ड (फोटोकॉपी)
   • वयाचा पुरावा - मतदार ओळखपत्र किंवा जन्म प्रमाणपत्र
   • बीपीएल कार्ड (पिवळे/गुलाबी रेशन कार्ड)
   • बँक पासबुक (पहिल्या पानाची प्रत)
   • 2 पासपोर्ट फोटो
5. अधिकाऱ्याला फॉर्म सबमिट करा
6. पोहोच पावती घ्या
7. तुमची पेन्शन (₹200-500/महिना) 30-45 दिवसांत सुरू होईल

⚠️ हे केवळ मार्गदर्शन आहे. अंतिम मंजुरी सरकारी कार्यालयाद्वारे.`,
    },
    checklist: {
      en: ['Aadhar Card (photocopy)', 'Age Proof (Voter ID/Birth Certificate)', 'BPL Card', 'Bank Passbook (first page)', '2 Passport Photos'],
      hi: ['आधार कार्ड (फोटोकॉपी)', 'उम्र का प्रमाण (वोटर आईडी/जन्म प्रमाणपत्र)', 'बीपीएल कार्ड', 'बैंक पासबुक (पहला पेज)', '2 पासपोर्ट फोटो'],
      mr: ['आधार कार्ड (फोटोकॉपी)', 'वयाचा पुरावा (मतदार ओळखपत्र/जन्म प्रमाणपत्र)', 'बीपीएल कार्ड', 'बँक पासबुक (पहिले पान)', '2 पासपोर्ट फोटो'],
    },
    officialLink: 'https://nsap.nic.in/',
    helpline: '1800-110-181',
  },
  {
    id: 'aadhar',
    keywords: ['aadhar', 'aadhaar', 'uidai', 'download aadhar', 'e-aadhar', 'आधार', 'डाउनलोड'],
    questions: {
      start: {
        text: {
          en: "Do you want to Download Aadhar or Update details?",
          hi: "क्या आप आधार डाउनलोड करना चाहते हैं या विवरण अपडेट करना चाहते हैं?",
          mr: "तुम्हाला आधार डाउनलोड करायचा आहे की तपशील अपडेट करायचे आहेत?",
        },
        nextStep: 'complete',
      },
    },
    finalOutput: {
      en: `To download your e-Aadhar:

1. Open website: https://myaadhaar.uidai.gov.in
2. Click "Download Aadhaar" button
3. Enter your 12-digit Aadhar number
4. Enter security code shown on screen
5. Click "Send OTP"
6. Check your mobile for 6-digit code
7. Enter OTP and click "Download"
8. Your PDF will download
9. Password to open PDF: 
   First 4 letters of NAME (capitals) + Year of birth
   Example: RAMA1980

💡 Tip: Save PDF on your phone for future use.`,
      hi: `अपना ई-आधार डाउनलोड करने के लिए:

1. वेबसाइट खोलें: https://myaadhaar.uidai.gov.in
2. "Download Aadhaar" बटन पर क्लिक करें
3. अपना 12 अंकों का आधार नंबर दर्ज करें
4. स्क्रीन पर दिखाया गया सुरक्षा कोड दर्ज करें
5. "Send OTP" पर क्लिक करें
6. अपने मोबाइल पर 6 अंकों का कोड देखें
7. OTP दर्ज करें और "Download" पर क्लिक करें
8. आपकी PDF डाउनलोड हो जाएगी
9. PDF खोलने का पासवर्ड:
   नाम के पहले 4 अक्षर (बड़े अक्षर) + जन्म का वर्ष
   उदाहरण: RAMA1980

💡 सुझाव: भविष्य में उपयोग के लिए PDF को अपने फोन में सेव करें।`,
      mr: `तुमचे ई-आधार डाउनलोड करण्यासाठी:

1. वेबसाइट उघडा: https://myaadhaar.uidai.gov.in
2. "Download Aadhaar" बटणावर क्लिक करा
3. तुमचा 12 अंकी आधार नंबर टाका
4. स्क्रीनवर दाखवलेला सुरक्षा कोड टाका
5. "Send OTP" वर क्लिक करा
6. तुमच्या मोबाइलवर 6 अंकी कोड तपासा
7. OTP टाका आणि "Download" वर क्लिक करा
8. तुमची PDF डाउनलोड होईल
9. PDF उघडण्यासाठी पासवर्ड:
   नावाची पहिली 4 अक्षरे (कॅपिटल) + जन्म वर्ष
   उदाहरण: RAMA1980

💡 टीप: भविष्यातील वापरासाठी PDF तुमच्या फोनवर सेव्ह करा.`,
    },
    checklist: {
      en: ['Registered Mobile Number', 'Aadhar Number (12 digits)'],
      hi: ['पंजीकृत मोबाइल नंबर', 'आधार नंबर (12 अंक)'],
      mr: ['नोंदणीकृत मोबाइल नंबर', 'आधार नंबर (12 अंक)'],
    },
    officialLink: 'https://myaadhaar.uidai.gov.in/',
    helpline: '1947',
  },
  {
    id: 'scholarship',
    keywords: ['scholarship', 'student', 'school', 'college', 'छात्रवृत्ति', 'विद्यार्थी', 'शिष्यवृत्ती'],
    questions: {
      start: {
        text: {
          en: "Which class are you studying in?",
          hi: "आप किस कक्षा में पढ़ रहे हैं?",
          mr: "तुम्ही कोणत्या वर्गात शिकत आहात?",
        },
        nextStep: 'income',
      },
      income: {
        text: {
          en: "What is your family's yearly income?",
          hi: "आपके परिवार की वार्षिक आय क्या है?",
          mr: "तुमच्या कुटुंबाचे वार्षिक उत्पन्न किती आहे?",
        },
        nextStep: 'category',
      },
      category: {
        text: {
          en: "Do you belong to SC/ST/OBC/Minority category?",
          hi: "क्या आप SC/ST/OBC/अल्पसंख्यक श्रेणी से हैं?",
          mr: "तुम्ही SC/ST/OBC/अल्पसंख्याक वर्गातून आहात का?",
        },
        nextStep: 'complete',
      },
    },
    finalOutput: {
      en: `Apply for scholarship on National Scholarship Portal:

1. Visit: https://scholarships.gov.in
2. Click "New Registration"
3. Select your State and District
4. Choose your category scholarship (SC/ST/OBC/Minority)
5. Fill form with:
   • Student details (name, class, school name)
   • Parent income
   • Bank account (in student's name, linked to Aadhar)
6. Upload documents:
   • Student photo
   • Aadhar card
   • Last year marksheet
   • Caste certificate
   • Income certificate
   • Bank passbook
   • School bonafide letter
7. Submit before deadline (usually October-November)
8. School will verify your application
9. Money will come to bank if approved

💰 Amount: ₹1,000-10,000 per year (varies by class)`,
      hi: `राष्ट्रीय छात्रवृत्ति पोर्टल पर छात्रवृत्ति के लिए आवेदन करें:

1. वेबसाइट खोलें: https://scholarships.gov.in
2. "New Registration" पर क्लिक करें
3. अपना राज्य और जिला चुनें
4. अपनी श्रेणी की छात्रवृत्ति चुनें (SC/ST/OBC/अल्पसंख्यक)
5. फॉर्म भरें:
   • छात्र विवरण (नाम, कक्षा, स्कूल का नाम)
   • माता-पिता की आय
   • बैंक खाता (छात्र के नाम पर, आधार से जुड़ा)
6. दस्तावेज़ अपलोड करें:
   • छात्र का फोटो
   • आधार कार्ड
   • पिछले साल की मार्कशीट
   • जाति प्रमाणपत्र
   • आय प्रमाणपत्र
   • बैंक पासबुक
   • स्कूल बोनाफाइड लेटर
7. अंतिम तिथि से पहले जमा करें (आमतौर पर अक्टूबर-नवंबर)
8. स्कूल आपके आवेदन की पुष्टि करेगा
9. मंजूरी मिलने पर पैसे बैंक में आ जाएंगे

💰 राशि: ₹1,000-10,000 प्रति वर्ष (कक्षा के अनुसार)`,
      mr: `राष्ट्रीय शिष्यवृत्ती पोर्टलवर शिष्यवृत्तीसाठी अर्ज करा:

1. वेबसाइट उघडा: https://scholarships.gov.in
2. "New Registration" वर क्लिक करा
3. तुमचे राज्य आणि जिल्हा निवडा
4. तुमच्या वर्गाची शिष्यवृत्ती निवडा (SC/ST/OBC/अल्पसंख्याक)
5. फॉर्म भरा:
   • विद्यार्थी तपशील (नाव, वर्ग, शाळेचे नाव)
   • पालकांचे उत्पन्न
   • बँक खाते (विद्यार्थ्याच्या नावावर, आधारशी जोडलेले)
6. कागदपत्रे अपलोड करा:
   • विद्यार्थ्याचा फोटो
   • आधार कार्ड
   • मागील वर्षाची मार्कशीट
   • जात प्रमाणपत्र
   • उत्पन्न प्रमाणपत्र
   • बँक पासबुक
   • शाळा बोनाफाईड पत्र
7. अंतिम तारखेपूर्वी सबमिट करा (सामान्यतः ऑक्टोबर-नोव्हेंबर)
8. शाळा तुमच्या अर्जाची पडताळणी करेल
9. मंजूर झाल्यास पैसे बँकेत येतील

💰 रक्कम: ₹1,000-10,000 प्रति वर्ष (वर्गानुसार)`,
    },
    checklist: {
      en: ['Student Photo', 'Aadhar Card', 'Previous Year Marksheet', 'Caste Certificate (SC/ST/OBC)', 'Income Certificate', 'Bank Passbook (Student name)', 'School Bonafide Letter'],
      hi: ['छात्र का फोटो', 'आधार कार्ड', 'पिछले साल की मार्कशीट', 'जाति प्रमाणपत्र (SC/ST/OBC)', 'आय प्रमाणपत्र', 'बैंक पासबुक (छात्र के नाम)', 'स्कूल बोनाफाइड लेटर'],
      mr: ['विद्यार्थ्याचा फोटो', 'आधार कार्ड', 'मागील वर्षाची मार्कशीट', 'जात प्रमाणपत्र (SC/ST/OBC)', 'उत्पन्न प्रमाणपत्र', 'बँक पासबुक (विद्यार्थ्याच्या नावाने)', 'शाळा बोनाफाईड पत्र'],
    },
    officialLink: 'https://scholarships.gov.in/',
    helpline: '0120-6619540',
  },
  {
    id: 'license',
    keywords: ['license', 'driving', 'DL', 'learner', 'ड्राइविंग लाइसेंस', 'लाइसेंस', 'ड्रायव्हिंग लायसन्स'],
    questions: {
      start: {
        text: {
          en: "How old are you?",
          hi: "आपकी उम्र क्या है?",
          mr: "तुमचे वय किती आहे?",
        },
        validation: (answer) => {
          const age = parseInt(answer);
          if (isNaN(age)) return { valid: true };
          if (age < 16) {
            return {
              valid: false,
              message: {
                en: "You must be at least 16 years old to apply for a two-wheeler license, and 18+ for a car license.",
                hi: "दोपहिया वाहन के लाइसेंस के लिए आपकी उम्र कम से कम 16 वर्ष और कार के लिए 18+ वर्ष होनी चाहिए।",
                mr: "दुचाकी परवान्यासाठी तुमचे वय किमान 16 वर्षे आणि कारसाठी 18+ वर्षे असणे आवश्यक आहे.",
              },
            };
          }
          return { valid: true };
        },
        nextStep: 'vehicle',
      },
      vehicle: {
        text: {
          en: "Do you want Two-wheeler or Four-wheeler license?",
          hi: "आप दोपहिया या चार पहिया वाहन का लाइसेंस चाहते हैं?",
          mr: "तुम्हाला दुचाकी की चारचाकी परवाना हवा आहे?",
        },
        nextStep: 'complete',
      },
    },
    finalOutput: {
      en: `To apply for Learner's License:

1. Visit: https://parivahan.gov.in/parivahan/
2. Click "Online Services" → "Driving License"
3. Select your State
4. Click "Apply for Learner Licence"
5. Fill Form 2 with personal details
6. Upload documents:
   • Age proof (10th marksheet/Birth certificate)
   • Address proof (Aadhar/Ration card)
   • 3 passport photos
   • Medical Certificate - Form 1A (get from any doctor)
7. Pay fee online: ₹200-400
8. Book test slot at nearest RTO
9. Visit RTO on test day with printout and originals
10. Pass written test (30 questions, need 24 correct)
11. Get Learner's License same day (valid 6 months)

📝 Test is about traffic rules and road signs.`,
      hi: `लर्नर्स लाइसेंस के लिए आवेदन करने के लिए:

1. वेबसाइट खोलें: https://parivahan.gov.in/parivahan/
2. "Online Services" → "Driving License" पर क्लिक करें
3. अपना राज्य चुनें
4. "Apply for Learner Licence" पर क्लिक करें
5. व्यक्तिगत विवरण के साथ फॉर्म 2 भरें
6. दस्तावेज़ अपलोड करें:
   • उम्र का प्रमाण (10वीं मार्कशीट/जन्म प्रमाणपत्र)
   • पता प्रमाण (आधार/राशन कार्ड)
   • 3 पासपोर्ट फोटो
   • मेडिकल सर्टिफिकेट - फॉर्म 1A (किसी भी डॉक्टर से)
7. ऑनलाइन शुल्क भुगतान करें: ₹200-400
8. नजदीकी आरटीओ में टेस्ट स्लॉट बुक करें
9. टेस्ट के दिन प्रिंटआउट और ओरिजिनल के साथ आरटीओ जाएं
10. लिखित परीक्षा पास करें (30 सवाल, 24 सही चाहिए)
11. उसी दिन लर्नर्स लाइसेंस प्राप्त करें (6 महीने के लिए वैध)

📝 परीक्षा ट्रैफिक नियमों और सड़क चिन्हों के बारे में है।`,
      mr: `लर्नर्स लायसन्ससाठी अर्ज करण्यासाठी:

1. वेबसाइट उघडा: https://parivahan.gov.in/parivahan/
2. "Online Services" → "Driving License" वर क्लिक करा
3. तुमचे राज्य निवडा
4. "Apply for Learner Licence" वर क्लिक करा
5. वैयक्तिक तपशीलांसह फॉर्म 2 भरा
6. कागदपत्रे अपलोड करा:
   • वयाचा पुरावा (10वी मार्कशीट/जन्म प्रमाणपत्र)
   • पत्त्याचा पुरावा (आधार/रेशन कार्ड)
   • 3 पासपोर्ट फोटो
   • वैद्यकीय प्रमाणपत्र - फॉर्म 1A (कोणत्याही डॉक्टरकडून)
7. ऑनलाइन शुल्क भरा: ₹200-400
8. जवळच्या RTO मध्ये चाचणी स्लॉट बुक करा
9. चाचणीच्या दिवशी प्रिंटआउट आणि मूळ प्रतींसह RTO ला जा
10. लेखी परीक्षा उत्तीर्ण करा (30 प्रश्न, 24 बरोबर हवेत)
11. त्याच दिवशी लर्नर्स लायसन्स मिळवा (6 महिने वैध)

📝 परीक्षा वाहतूक नियम आणि रस्त्यांच्या चिन्हांबद्दल आहे.`,
    },
    checklist: {
      en: ['Age Proof (10th Marksheet)', 'Address Proof (Aadhar)', '3 Passport Photos', 'Medical Certificate (Form 1A)'],
      hi: ['उम्र का प्रमाण (10वीं मार्कशीट)', 'पता प्रमाण (आधार)', '3 पासपोर्ट फोटो', 'मेडिकल सर्टिफिकेट (फॉर्म 1A)'],
      mr: ['वयाचा पुरावा (10वी मार्कशीट)', 'पत्त्याचा पुरावा (आधार)', '3 पासपोर्ट फोटो', 'वैद्यकीय प्रमाणपत्र (फॉर्म 1A)'],
    },
    officialLink: 'https://parivahan.gov.in/',
    helpline: '0120-4256900',
  },
  {
    id: 'ration',
    keywords: ['ration card', 'food card', 'राशन कार्ड', 'BPL card', 'राशन', 'रेशन कार्ड'],
    questions: {
      start: {
        text: {
          en: "Is this for new ration card or update existing one?",
          hi: "यह नए राशन कार्ड के लिए है या मौजूदा को अपडेट करने के लिए?",
          mr: "हे नवीन रेशन कार्डसाठी आहे की विद्यमान अपडेट करण्यासाठी?",
        },
        nextStep: 'members',
      },
      members: {
        text: {
          en: "How many members in your family?",
          hi: "आपके परिवार में कितने सदस्य हैं?",
          mr: "तुमच्या कुटुंबात किती सदस्य आहेत?",
        },
        nextStep: 'complete',
      },
    },
    finalOutput: {
      en: `To get new Ration Card:

1. Visit Food & Civil Supplies office in your area
2. Ask for "Ration Card Application Form"
3. Fill form with:
   • Head of family name
   • All family members names
   • Complete address
   • Income details
4. Attach documents:
   • Aadhar cards of all family members
   • Address proof (Electricity bill/Rent agreement)
   • Income certificate
   • Passport photos of all members
5. Submit at office counter
6. Officer will visit your home for verification
7. Card will be issued in 30-60 days
8. Collect from your area Fair Price Shop (ration shop)

🌾 Types:
• Antyodaya (AAY) - Poorest families - 35kg free
• Priority (PHH) - Below poverty - ₹2-3/kg
• Non-Priority (NPHH) - Above poverty - market rate`,
      hi: `नया राशन कार्ड प्राप्त करने के लिए:

1. अपने क्षेत्र के खाद्य और नागरिक आपूर्ति कार्यालय जाएं
2. "राशन कार्ड आवेदन फॉर्म" मांगें
3. फॉर्म भरें:
   • परिवार के मुखिया का नाम
   • सभी परिवार के सदस्यों के नाम
   • पूरा पता
   • आय विवरण
4. दस्तावेज़ संलग्न करें:
   • सभी परिवार के सदस्यों के आधार कार्ड
   • पता प्रमाण (बिजली बिल/किराया समझौता)
   • आय प्रमाणपत्र
   • सभी सदस्यों के पासपोर्ट फोटो
5. कार्यालय काउंटर पर जमा करें
6. अधिकारी सत्यापन के लिए आपके घर आएंगे
7. कार्ड 30-60 दिनों में जारी होगा
8. अपने क्षेत्र की उचित मूल्य की दुकान से प्राप्त करें

🌾 प्रकार:
• अंत्योदय (AAY) - सबसे गरीब परिवार - 35 किलो मुफ्त
• प्राथमिकता (PHH) - गरीबी से नीचे - ₹2-3/किलो
• गैर-प्राथमिकता (NPHH) - गरीबी से ऊपर - बाजार दर`,
      mr: `नवीन रेशन कार्ड मिळवण्यासाठी:

1. तुमच्या भागातील अन्न व नागरी पुरवठा कार्यालयाला भेट द्या
2. "रेशन कार्ड अर्ज फॉर्म" मागा
3. फॉर्म भरा:
   • कुटुंब प्रमुखाचे नाव
   • सर्व कुटुंब सदस्यांची नावे
   • संपूर्ण पत्ता
   • उत्पन्न तपशील
4. कागदपत्रे जोडा:
   • सर्व कुटुंब सदस्यांचे आधार कार्ड
   • पत्त्याचा पुरावा (वीज बिल/भाडे करार)
   • उत्पन्न प्रमाणपत्र
   • सर्व सदस्यांचे पासपोर्ट फोटो
5. कार्यालय काउंटरवर सबमिट करा
6. पडताळणीसाठी अधिकारी तुमच्या घरी येतील
7. कार्ड 30-60 दिवसांत जारी होईल
8. तुमच्या भागातील स्वस्त धान्य दुकानातून घ्या

🌾 प्रकार:
• अंत्योदय (AAY) - सर्वात गरीब कुटुंबे - 35 किलो मोफत
• प्राधान्य (PHH) - दारिद्र्य रेषेखालील - ₹2-3/किलो
• गैर-प्राधान्य (NPHH) - दारिद्र्य रेषेवरील - बाजार दर`,
    },
    checklist: {
      en: ['Aadhar Cards (All members)', 'Address Proof', 'Income Certificate', 'Passport Photos (All members)'],
      hi: ['आधार कार्ड (सभी सदस्य)', 'पता प्रमाण', 'आय प्रमाणपत्र', 'पासपोर्ट फोटो (सभी सदस्य)'],
      mr: ['आधार कार्ड (सर्व सदस्य)', 'पत्त्याचा पुरावा', 'उत्पन्न प्रमाणपत्र', 'पासपोर्ट फोटो (सर्व सदस्य)'],
    },
    officialLink: 'https://nfsa.gov.in/',
    helpline: '1967',
  },
  {
    id: 'pan',
    keywords: ['pan card', 'income tax', 'PAN', 'पैन कार्ड', 'पॅन कार्ड'],
    questions: {
      start: {
        text: {
          en: "Do you want to apply for a new PAN card or get a reprint of existing one?",
          hi: "क्या आप नए पैन कार्ड के लिए आवेदन करना चाहते हैं या मौजूदा का रीप्रिंट लेना चाहते हैं?",
          mr: "तुम्हाला नवीन पॅन कार्डसाठी अर्ज करायचा आहे की विद्यमान कार्डाची रीप्रिंट घ्यायची आहे?",
        },
        nextStep: 'complete',
      },
    },
    finalOutput: {
      en: `To apply for PAN Card:

1. Visit: https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html
2. Fill Form 49A (for Indian citizens)
3. Upload:
   • Your photo
   • Your signature
   • Age proof (Aadhar/Voter ID)
   • Address proof
4. Pay ₹107 online
5. Submit application
6. PAN will arrive by post in 15-20 days

✨ Faster option: Visit nearest PAN center with documents
   Get e-PAN same day!`,
      hi: `पैन कार्ड के लिए आवेदन करने के लिए:

1. वेबसाइट खोलें: https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html
2. फॉर्म 49A भरें (भारतीय नागरिकों के लिए)
3. अपलोड करें:
   • आपका फोटो
   • आपके हस्ताक्षर
   • उम्र का प्रमाण (आधार/वोटर आईडी)
   • पता प्रमाण
4. ₹107 ऑनलाइन भुगतान करें
5. आवेदन जमा करें
6. पैन 15-20 दिनों में डाक से आएगा

✨ तेज विकल्प: दस्तावेजों के साथ नजदीकी पैन केंद्र जाएं
   उसी दिन ई-पैन प्राप्त करें!`,
      mr: `पॅन कार्डसाठी अर्ज करण्यासाठी:

1. वेबसाइट उघडा: https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html
2. फॉर्म 49A भरा (भारतीय नागरिकांसाठी)
3. अपलोड करा:
   • तुमचा फोटो
   • तुमची स्वाक्षरी
   • वयाचा पुरावा (आधार/मतदार ओळखपत्र)
   • पत्त्याचा पुरावा
4. ₹107 ऑनलाइन भरा
5. अर्ज सबमिट करा
6. पॅन 15-20 दिवसांत पोस्टाने येईल

✨ जलद पर्याय: कागदपत्रांसह जवळच्या पॅन केंद्राला भेट द्या
   त्याच दिवशी ई-पॅन मिळवा!`,
    },
    checklist: {
      en: ['Photo', 'Signature', 'Age Proof (Aadhar/Voter ID)', 'Address Proof'],
      hi: ['फोटो', 'हस्ताक्षर', 'उम्र का प्रमाण (आधार/वोटर आईडी)', 'पता प्रमाण'],
      mr: ['फोटो', 'स्वाक्षरी', 'वयाचा पुरावा (आधार/मतदार ओळखपत्र)', 'पत्त्याचा पुरावा'],
    },
    officialLink: 'https://www.incometax.gov.in/',
    helpline: '020-27218080',
  },
  {
    id: 'voter',
    keywords: ['voter id', 'election card', 'मतदाता पहचान पत्र', 'वोटर आईडी', 'मतदार ओळखपत्र'],
    questions: {
      start: {
        text: {
          en: "Are you 18 years or older?",
          hi: "क्या आप 18 वर्ष या उससे अधिक हैं?",
          mr: "तुम्ही 18 वर्षे किंवा त्याहून अधिक वयाचे आहात का?",
        },
        validation: (answer) => {
          const lowerAnswer = answer.toLowerCase();
          if (lowerAnswer.includes('no') || lowerAnswer.includes('नहीं') || lowerAnswer.includes('नाही')) {
            return {
              valid: false,
              message: {
                en: "You must be 18 years or older to apply for Voter ID. You can apply when you turn 18.",
                hi: "वोटर आईडी के लिए आवेदन करने के लिए आपकी उम्र 18 वर्ष या उससे अधिक होनी चाहिए।",
                mr: "मतदार ओळखपत्रासाठी अर्ज करण्यासाठी तुमचे वय 18 वर्षे किंवा त्याहून अधिक असणे आवश्यक आहे.",
              },
            };
          }
          return { valid: true };
        },
        nextStep: 'complete',
      },
    },
    finalOutput: {
      en: `To get Voter ID Card:

1. Visit: https://voters.eci.gov.in/
2. Click "Apply for New Voter ID"
3. Fill Form 6 with personal details
4. Upload:
   • Your photo
   • Age proof (must be 18+)
   • Address proof
5. Submit form online
6. Booth Level Officer (BLO) will visit your home
7. Card issued in 30 days

🗳️ With this card, you can vote in elections!`,
      hi: `वोटर आईडी कार्ड प्राप्त करने के लिए:

1. वेबसाइट खोलें: https://voters.eci.gov.in/
2. "Apply for New Voter ID" पर क्लिक करें
3. व्यक्तिगत विवरण के साथ फॉर्म 6 भरें
4. अपलोड करें:
   • आपका फोटो
   • उम्र का प्रमाण (18+ होना चाहिए)
   • पता प्रमाण
5. ऑनलाइन फॉर्म जमा करें
6. बूथ स्तरीय अधिकारी (BLO) आपके घर आएंगे
7. 30 दिनों में कार्ड जारी होगा

🗳️ इस कार्ड से आप चुनाव में वोट कर सकते हैं!`,
      mr: `मतदार ओळखपत्र मिळवण्यासाठी:

1. वेबसाइट उघडा: https://voters.eci.gov.in/
2. "Apply for New Voter ID" वर क्लिक करा
3. वैयक्तिक तपशीलांसह फॉर्म 6 भरा
4. अपलोड करा:
   • तुमचा फोटो
   • वयाचा पुरावा (18+ असणे आवश्यक)
   • पत्त्याचा पुरावा
5. ऑनलाइन फॉर्म सबमिट करा
6. बूथ स्तरावरील अधिकारी (BLO) तुमच्या घरी येतील
7. 30 दिवसांत कार्ड जारी होईल

🗳️ या कार्डाने तुम्ही निवडणुकीत मतदान करू शकता!`,
    },
    checklist: {
      en: ['Photo', 'Age Proof (18+)', 'Address Proof'],
      hi: ['फोटो', 'उम्र का प्रमाण (18+)', 'पता प्रमाण'],
      mr: ['फोटो', 'वयाचा पुरावा (18+)', 'पत्त्याचा पुरावा'],
    },
    officialLink: 'https://eci.gov.in/',
    helpline: '1950',
  },
  {
    id: 'kisan',
    keywords: ['kisan', 'farmer', 'pm kisan', 'किसान योजना', 'पीएम किसान', 'शेतकरी'],
    questions: {
      start: {
        text: {
          en: "Do you own agricultural land?",
          hi: "क्या आपके पास कृषि भूमि है?",
          mr: "तुमच्याकडे शेतजमीन आहे का?",
        },
        nextStep: 'complete',
      },
    },
    finalOutput: {
      en: `PM-KISAN gives ₹6,000/year to farmers:

1. Visit: https://pmkisan.gov.in/
2. Click "Farmers Corner" → "New Farmer Registration"
3. Enter your Aadhar number
4. Fill bank account details
5. Upload land documents (7/12 extract or land papers)
6. Submit form
7. Money comes in 3 parts:
   • ₹2,000 in April-July
   • ₹2,000 in August-November  
   • ₹2,000 in December-March

🌾 Money goes directly to your bank account!`,
      hi: `पीएम-किसान किसानों को ₹6,000/वर्ष देता है:

1. वेबसाइट खोलें: https://pmkisan.gov.in/
2. "Farmers Corner" → "New Farmer Registration" पर क्लिक करें
3. अपना आधार नंबर दर्ज करें
4. बैंक खाता विवरण भरें
5. जमीन के दस्तावेज़ अपलोड करें (7/12 उद्धरण या जमीन के कागज)
6. फॉर्म जमा करें
7. पैसे 3 भागों में आते हैं:
   • अप्रैल-जुलाई में ₹2,000
   • अगस्त-नवंबर में ₹2,000  
   • दिसंबर-मार्च में ₹2,000

🌾 पैसे सीधे आपके बैंक खाते में जाते हैं!`,
      mr: `पीएम-किसान शेतकऱ्यांना ₹6,000/वर्ष देतो:

1. वेबसाइट उघडा: https://pmkisan.gov.in/
2. "Farmers Corner" → "New Farmer Registration" वर क्लिक करा
3. तुमचा आधार नंबर टाका
4. बँक खाते तपशील भरा
5. जमिनीचे कागदपत्रे अपलोड करा (7/12 उतारा किंवा जमीन कागदपत्रे)
6. फॉर्म सबमिट करा
7. पैसे 3 भागांत येतात:
   • एप्रिल-जुलैमध्ये ₹2,000
   • ऑगस्ट-नोव्हेंबरमध्ये ₹2,000  
   • डिसेंबर-मार्चमध्ये ₹2,000

🌾 पैसे थेट तुमच्या बँक खात्यात जातात!`,
    },
    checklist: {
      en: ['Aadhar Card', 'Bank Account Details', 'Land Documents (7/12 Extract)'],
      hi: ['आधार कार्ड', 'बैंक खाता विवरण', 'जमीन के दस्तावेज़ (7/12 उद्धरण)'],
      mr: ['आधार कार्ड', 'बँक खाते तपशील', 'जमीन कागदपत्रे (7/12 उतारा)'],
    },
    officialLink: 'https://pmkisan.gov.in/',
    helpline: '155261',
  },
  {
    id: 'ayushman',
    keywords: ['health card', 'ayushman', 'hospital', 'आयुष्मान', 'health insurance', 'आयुष्मान भारत'],
    questions: {
      start: {
        text: {
          en: "What is your family's yearly income? (Ayushman is for families with income less than ₹5 lakh/year)",
          hi: "आपके परिवार की वार्षिक आय क्या है? (आयुष्मान ₹5 लाख/वर्ष से कम आय वाले परिवारों के लिए है)",
          mr: "तुमच्या कुटुंबाचे वार्षिक उत्पन्न किती आहे? (आयुष्मान ₹5 लाख/वर्षापेक्षा कमी उत्पन्न असलेल्या कुटुंबांसाठी आहे)",
        },
        nextStep: 'complete',
      },
    },
    finalOutput: {
      en: `Ayushman Bharat gives FREE hospital treatment up to ₹5 lakh:

1. Check if eligible: https://pmjay.gov.in/
   (Family income must be < ₹5 lakh/year)
2. Visit nearest government hospital
3. Ask for "Ayushman Mitra"
4. Give them:
   • Aadhar card
   • Ration card
5. They will do fingerprint scan
6. Card issued immediately (same day!)
7. Use card at any empaneled hospital for free treatment

🏥 Covers: Surgery, medicines, room charges - all FREE!`,
      hi: `आयुष्मान भारत ₹5 लाख तक मुफ्त अस्पताल इलाज देता है:

1. पात्रता जांचें: https://pmjay.gov.in/
   (परिवार की आय ₹5 लाख/वर्ष से कम होनी चाहिए)
2. नजदीकी सरकारी अस्पताल जाएं
3. "आयुष्मान मित्र" से मिलें
4. उन्हें दें:
   • आधार कार्ड
   • राशन कार्ड
5. वे फिंगरप्रिंट स्कैन करेंगे
6. कार्ड तुरंत जारी (उसी दिन!)
7. किसी भी सूचीबद्ध अस्पताल में मुफ्त इलाज के लिए कार्ड का उपयोग करें

🏥 कवर: सर्जरी, दवाइयां, कमरे का खर्च - सब मुफ्त!`,
      mr: `आयुष्मान भारत ₹5 लाखपर्यंत मोफत हॉस्पिटल उपचार देतो:

1. पात्रता तपासा: https://pmjay.gov.in/
   (कुटुंबाचे उत्पन्न ₹5 लाख/वर्षापेक्षा कमी असणे आवश्यक)
2. जवळच्या सरकारी हॉस्पिटलला भेट द्या
3. "आयुष्मान मित्र" ला भेटा
4. त्यांना द्या:
   • आधार कार्ड
   • रेशन कार्ड
5. ते फिंगरप्रिंट स्कॅन करतील
6. कार्ड लगेच जारी (त्याच दिवशी!)
7. कोणत्याही सूचीबद्ध हॉस्पिटलमध्ये मोफत उपचारासाठी कार्ड वापरा

🏥 समाविष्ट: शस्त्रक्रिया, औषधे, खोलीचे शुल्क - सर्व मोफत!`,
    },
    checklist: {
      en: ['Aadhar Card', 'Ration Card'],
      hi: ['आधार कार्ड', 'राशन कार्ड'],
      mr: ['आधार कार्ड', 'रेशन कार्ड'],
    },
    officialLink: 'https://pmjay.gov.in/',
    helpline: '14555',
  },
  {
    id: 'passport',
    keywords: ['passport', 'travel', 'पासपोर्ट', 'विदेश यात्रा'],
    questions: {
      start: {
        text: {
          en: "Do you need Normal (30 days) or Tatkal (7 days) passport?",
          hi: "आपको सामान्य (30 दिन) या तत्काल (7 दिन) पासपोर्ट चाहिए?",
          mr: "तुम्हाला सामान्य (30 दिवस) की तात्काळ (7 दिवस) पासपोर्ट हवा आहे?",
        },
        nextStep: 'complete',
      },
    },
    finalOutput: {
      en: `To apply for Passport:

1. Register on: https://portal2.passportindia.gov.in/
2. Fill application form online
3. Upload documents and photo
4. Pay fee:
   • Normal: ₹1,500
   • Tatkal (urgent): ₹3,500
5. Book appointment at PSK (Passport Seva Kendra)
6. Visit PSK on appointment day with:
   • Printout of application
   • All original documents
7. They will take photo and fingerprints
8. Police will visit your home for verification
9. Passport delivered by post:
   • Normal: 30-45 days
   • Tatkal: 7-10 days

✈️ With passport, you can travel to other countries!`,
      hi: `पासपोर्ट के लिए आवेदन करने के लिए:

1. पंजीकरण करें: https://portal2.passportindia.gov.in/
2. ऑनलाइन आवेदन फॉर्म भरें
3. दस्तावेज़ और फोटो अपलोड करें
4. शुल्क भुगतान करें:
   • सामान्य: ₹1,500
   • तत्काल (जरूरी): ₹3,500
5. PSK (पासपोर्ट सेवा केंद्र) में अपॉइंटमेंट बुक करें
6. अपॉइंटमेंट के दिन PSK जाएं:
   • आवेदन का प्रिंटआउट
   • सभी मूल दस्तावेज़
7. वे फोटो और फिंगरप्रिंट लेंगे
8. पुलिस सत्यापन के लिए आपके घर आएंगे
9. पासपोर्ट डाक से आएगा:
   • सामान्य: 30-45 दिन
   • तत्काल: 7-10 दिन

✈️ पासपोर्ट से आप दूसरे देशों की यात्रा कर सकते हैं!`,
      mr: `पासपोर्टसाठी अर्ज करण्यासाठी:

1. नोंदणी करा: https://portal2.passportindia.gov.in/
2. ऑनलाइन अर्ज फॉर्म भरा
3. कागदपत्रे आणि फोटो अपलोड करा
4. शुल्क भरा:
   • सामान्य: ₹1,500
   • तात्काळ (तातडीचे): ₹3,500
5. PSK (पासपोर्ट सेवा केंद्र) येथे भेटीची वेळ बुक करा
6. भेटीच्या दिवशी PSK ला जा:
   • अर्जाची प्रिंटआउट
   • सर्व मूळ कागदपत्रे
7. ते फोटो आणि फिंगरप्रिंट घेतील
8. पडताळणीसाठी पोलिस तुमच्या घरी येतील
9. पासपोर्ट पोस्टाने येईल:
   • सामान्य: 30-45 दिवस
   • तात्काळ: 7-10 दिवस

✈️ पासपोर्टसह तुम्ही इतर देशांत प्रवास करू शकता!`,
    },
    checklist: {
      en: ['Photo', 'Age Proof (Birth Certificate/10th Marksheet)', 'Address Proof (Aadhar/Voter ID)', 'Old Passport (if renewal)'],
      hi: ['फोटो', 'उम्र का प्रमाण (जन्म प्रमाणपत्र/10वीं मार्कशीट)', 'पता प्रमाण (आधार/वोटर आईडी)', 'पुराना पासपोर्ट (नवीनीकरण के लिए)'],
      mr: ['फोटो', 'वयाचा पुरावा (जन्म प्रमाणपत्र/10वी मार्कशीट)', 'पत्त्याचा पुरावा (आधार/मतदार ओळखपत्र)', 'जुना पासपोर्ट (नूतनीकरणासाठी)'],
    },
    officialLink: 'https://www.passportindia.gov.in/',
    helpline: '1800-258-1800',
  },
];

export const quickActions = [
  { id: 'pension', label: { en: 'Old Age Pension', hi: 'वृद्धावस्था पेंशन', mr: 'वृद्धापकाळ पेन्शन' }, icon: '👴' },
  { id: 'aadhar', label: { en: 'Download Aadhar', hi: 'आधार डाउनलोड', mr: 'आधार डाउनलोड' }, icon: '🪪' },
  { id: 'scholarship', label: { en: 'Student Scholarship', hi: 'छात्र छात्रवृत्ति', mr: 'विद्यार्थी शिष्यवृत्ती' }, icon: '🎓' },
  { id: 'license', label: { en: 'Driving License', hi: 'ड्राइविंग लाइसेंस', mr: 'ड्रायव्हिंग लायसन्स' }, icon: '🚗' },
  { id: 'ration', label: { en: 'Ration Card', hi: 'राशन कार्ड', mr: 'रेशन कार्ड' }, icon: '🌾' },
  { id: 'pan', label: { en: 'PAN Card', hi: 'पैन कार्ड', mr: 'पॅन कार्ड' }, icon: '💳' },
  { id: 'voter', label: { en: 'Voter ID', hi: 'वोटर आईडी', mr: 'मतदार ओळखपत्र' }, icon: '🗳️' },
  { id: 'kisan', label: { en: 'PM-KISAN', hi: 'पीएम-किसान', mr: 'पीएम-किसान' }, icon: '👨‍🌾' },
  { id: 'ayushman', label: { en: 'Ayushman Bharat', hi: 'आयुष्मान भारत', mr: 'आयुष्मान भारत' }, icon: '🏥' },
  { id: 'passport', label: { en: 'Passport', hi: 'पासपोर्ट', mr: 'पासपोर्ट' }, icon: '✈️' },
];

export const simplifications: { [key: string]: string } = {
  'biometric verification': 'fingerprint scan',
  'biometric': 'fingerprint',
  'authenticate': 'confirm who you are',
  'authentication': 'proving who you are',
  'portal': 'website',
  'navigate to': 'go to',
  'navigate': 'go',
  'submit': 'give',
  'documentation': 'papers',
  'documents': 'papers',
  'eligibility': 'if you can apply',
  'eligible': 'can apply',
  'beneficiary': 'person who gets help',
  'disbursement': 'giving money',
  'verification': 'checking',
  'credentials': 'username and password',
  'mandatory': 'must have',
  'requisite': 'needed',
  'domicile': 'where you live',
  'attestation': 'signed copy',
  'affidavit': 'written promise on stamp paper',
  'acknowledgment': 'receipt',
  'proceedings': 'steps',
  'jurisdiction': 'area',
  'statutory': 'by law',
  'compliant': 'following rules',
  'pursuant': 'according to',
  'aforementioned': 'said before',
  'henceforth': 'from now',
  'wherein': 'where',
  'herewith': 'with this',
  'thereof': 'of it',
};

export function detectLanguage(text: string): Language {
  const hindiPattern = /[\u0900-\u097F]/;
  const marathiPattern = /[\u0900-\u097F]/;
  
  if (hindiPattern.test(text)) {
    // Check for Marathi-specific words
    const marathiWords = ['आहे', 'आहेत', 'करा', 'होते', 'असणे', 'तुम्ही', 'आम्ही'];
    const hasMarathiWords = marathiWords.some(word => text.includes(word));
    return hasMarathiWords ? 'mr' : 'hi';
  }
  
  return 'en';
}

export function detectService(message: string): ServiceFlow | null {
  const lowerMessage = message.toLowerCase();
  
  for (const service of services) {
    for (const keyword of service.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return service;
      }
    }
  }
  
  return null;
}

export function simplifyText(text: string): string {
  let simplified = text;
  
  for (const [complex, simple] of Object.entries(simplifications)) {
    const regex = new RegExp(complex, 'gi');
    simplified = simplified.replace(regex, simple);
  }
  
  // Break long sentences
  simplified = simplified.split('. ').map(sentence => {
    const words = sentence.split(' ');
    if (words.length > 15) {
      const mid = Math.floor(words.length / 2);
      return words.slice(0, mid).join(' ') + '.\n' + words.slice(mid).join(' ');
    }
    return sentence;
  }).join('. ');
  
  return simplified;
}
