# RULES.md — AI ले कहिल्यै नतोड्ने Rules

## Code Rules
- सधैं **TypeScript** use गर्ने, plain JavaScript होइन
- सधैं **Next.js App Router** use गर्ने, Pages Router होइन
- CSS को लागि सधैं **Tailwind CSS** use गर्ने
- हरेक component **mobile-first** बनाउने

## Multi-Tenant Rules
- हरेक संस्थाको data **अलग MongoDB database** मा राख्ने
- एउटा संस्थाको data अर्कोमा कहिल्यै mix हुन हुँदैन
- Domain बाट tenant identify गर्ने
- Admin ले आफ्नो संस्थाको data मात्र हेर्न/फेर्न पाउने

## Database Rules
- MongoDB connection string सधैं **environment variable** मा राख्ने
- Code मा कहिल्यै API key वा password लेख्न हुँदैन
- हरेक database operation मा error handling हुनुपर्छ

## UI/UX Rules
- Placeholder text कहिल्यै public website मा देखिन हुँदैन
- Setup wizard पूरा नभएसम्म public website "Coming Soon" देखाउने
- सबै forms मा Nepali language support हुनुपर्छ
- Loading state सधैं देखाउने

## Deployment Rules
- Environment variables Vercel मा set गर्ने, code मा होइन
- हरेक deploy अघि build error छैन भनी confirm गर्ने
- Production मा console.log राख्न हुँदैन

## AI Behavior Rules
- नयाँ feature थप्नु अघि PROJECT.md पढ्ने
- Bug fix गर्दा RULES.md विपरीत काम गर्न हुँदैन
- Seed/fake data production code मा राख्न हुँदैन
- एकपटकमा एउटा मात्र काम गर्ने, धेरै एकसाथ होइन
