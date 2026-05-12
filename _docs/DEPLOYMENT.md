# DEPLOYMENT.md — Deploy गर्ने Step-by-Step Guide

## पहिलो पटक Setup

### Step 1: GitHub
1. github.com मा login गर्नुस्
2. New repository बनाउनुस् — नाम: `sahakari-website`
3. VS Code मा terminal खोल्नुस्:
```bash
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/YOUR_USERNAME/sahakari-website.git
git push -u origin main
```

### Step 2: MongoDB Atlas
1. mongodb.com/atlas मा account बनाउनुस्
2. New Project → New Cluster (Free tier)
3. Database User बनाउनुस् (username + password)
4. Network Access → Add IP: `0.0.0.0/0`
5. Connect → Connection String copy गर्नुस्
```
mongodb+srv://username:password@cluster.mongodb.net/
```

### Step 3: Vercel
1. vercel.com मा GitHub account बाट login गर्नुस्
2. "Import Project" → GitHub repo छान्नुस्
3. Environment Variables थप्नुस्:
```
MONGODB_URI = [MongoDB connection string]
NEXTAUTH_SECRET = [जुनसुकै लामो random text]
NEXTAUTH_URL = https://your-vercel-url.vercel.app
```
4. Deploy थिच्नुस्

---

## नयाँ संस्था थप्दा (हरेक पटक)

### Step 1: Database बनाउने
- MongoDB Atlas मा नयाँ database बनाउनुस्
- नाम: संस्थाको नाम (जस्तै: `namuna-sahakari`)

### Step 2: Vercel मा Environment Variable थप्ने
```
MONGODB_URI_NAMUNA = mongodb+srv://...namuna-sahakari
```

### Step 3: Domain Connect गर्ने (Cloudflare)
1. संस्थाले domain किनिसकेपछि Cloudflare मा add गर्नुस्
2. Vercel मा: Project Settings → Domains → Add Domain
3. Cloudflare मा CNAME record थप्नुस्:
```
Type: CNAME
Name: @
Target: cname.vercel-dns.com
```
4. ५–१० मिनेट पर्खनुस् — live हुन्छ

### Step 4: Admin Login दिने
- Admin panel URL: `https://संस्थाको-domain.com/admin/login`
- Username र password संस्थालाई दिनुस्

---

## Troubleshooting

### Website live भएन
- Vercel deployment log हेर्नुस्
- Environment variables सही छ कि छैन check गर्नुस्

### Database connect भएन
- MongoDB Atlas मा IP whitelist check गर्नुस्
- Connection string सही छ कि छैन check गर्नुस्

### Domain काम गरेन
- Cloudflare DNS propagation को लागि २४ घण्टासम्म पर्खनुस्
- Vercel मा domain verify भयो कि छैन हेर्नुस्
