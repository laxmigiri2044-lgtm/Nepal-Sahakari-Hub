# SEED_DATA.md — Development को लागि Sample Data

## ⚠️ महत्त्वपूर्ण
यो data सिर्फ **development र testing** को लागि हो।
Production मा यो data कहिल्यै use गर्न हुँदैन।

---

## Sample Tenant (संस्था)
```json
{
  "name": "नमूना बचत तथा ऋण सहकारी संस्था लि.",
  "domain": "localhost:3000",
  "logo": "/sample-logo.png",
  "address": "काठमाडौं-१०, बागबजार",
  "phone": "01-4567890",
  "email": "info@namuna-sahakari.com",
  "isSetupComplete": true
}
```

## Sample Services (सेवाहरू)
```json
[
  {
    "name": "बचत खाता",
    "description": "नियमित बचत खाता — जुनसुकै बेला पैसा राख्न र निकाल्न सकिन्छ।"
  },
  {
    "name": "मुद्दती बचत (FD)",
    "description": "निश्चित अवधिको लागि बचत — उच्च ब्याजदर।"
  },
  {
    "name": "कर्जा सेवा",
    "description": "व्यक्तिगत, व्यापारिक, र कृषि कर्जा उपलब्ध।"
  },
  {
    "name": "सामाजिक सुरक्षा कोष",
    "description": "सदस्यहरूको लागि बीमा र सामाजिक सुरक्षा।"
  }
]
```

## Sample Rates (ब्याजदर)
```json
[
  { "type": "बचत", "rate": 8.5, "duration": "वार्षिक" },
  { "type": "मुद्दती बचत", "rate": 11.0, "duration": "१ वर्ष" },
  { "type": "मुद्दती बचत", "rate": 12.5, "duration": "२ वर्ष" },
  { "type": "व्यक्तिगत कर्जा", "rate": 14.0, "duration": "वार्षिक" },
  { "type": "व्यापारिक कर्जा", "rate": 13.0, "duration": "वार्षिक" }
]
```

## Sample Notices (सूचनाहरू)
```json
[
  {
    "title": "वार्षिक साधारण सभाको सूचना",
    "content": "यस संस्थाको वार्षिक साधारण सभा मिति २०८१ पुस १५ गते बस्ने भएकोले सम्पूर्ण सदस्यहरूलाई उपस्थित हुन अनुरोध गरिन्छ।",
    "publishedAt": "2024-12-01"
  },
  {
    "title": "नयाँ ब्याजदर लागू",
    "content": "मिति २०८१ मंसिर १ गतेदेखि नयाँ ब्याजदर लागू भएको जानकारी गराइन्छ।",
    "publishedAt": "2024-11-15"
  }
]
```
