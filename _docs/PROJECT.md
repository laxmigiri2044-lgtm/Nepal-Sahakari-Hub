# PROJECT.md — Nepal Sahakari Hub

## Project Overview
Nepalका सहकारी संस्थाहरूको लागि multi-tenant website platform।
एउटै codebase बाट धेरै संस्थाको website चल्छ।
हरेक संस्थाको आफ्नै admin panel, custom domain, र अलग data।

## Problem Being Solved
Nepal मा धेरै सहकारी संस्थाहरूसँग आफ्नै website छैन।
यो platform ले तिनीहरूलाई सजिलो, सस्तो, र professional website दिन्छ।

## Target Users
- सहकारी संस्थाका अध्यक्ष / सचिव (non-tech)
- सर्वसाधारण जनता (website हेर्नेहरू)

## Tech Stack
- **Frontend + Backend:** Next.js (App Router)
- **Database:** MongoDB Atlas (हरेक संस्थाको अलग database)
- **Hosting:** Vercel
- **Domain/CDN:** Cloudflare (संस्थाको आफ्नै domain)
- **AI IDE:** Kilo AI (VS Code)
- **Version Control:** GitHub

## Architecture
Multi-tenant — एउटै codebase, हरेक संस्थाको अलग data।

```
User visits: sahakari-xyz.com
        ↓
Cloudflare → Vercel
        ↓
Next.js reads domain → MongoDB बाट त्यो संस्थाको data load
        ↓
Public website render हुन्छ
```

## Business Model
- Setup fee: एकपटक (रु. ५,०००–१५,०००)
- Monthly fee: hosting + support (रु. ५००–१,०००)
- Domain: संस्थाले आफैं किन्छ

## Core Features
1. Public website (homepage, सेवा, ब्याजदर, notice, सम्पर्क)
2. Admin panel (login गरेर content manage)
3. First-time setup wizard (placeholder शून्य)
4. Custom domain support per tenant
5. Mobile-first, Nepali language support
