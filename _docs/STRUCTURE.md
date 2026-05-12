# STRUCTURE.md — Project Folder Structure

## Folder Structure
```
sahakari-website/
├── app/
│   ├── [domain]/          ← Public website (tenant अनुसार)
│   │   ├── page.tsx       ← Homepage
│   │   ├── services/      ← सेवाहरू page
│   │   ├── rates/         ← ब्याजदर page
│   │   ├── notice/        ← Notice board
│   │   └── contact/       ← सम्पर्क page
│   ├── admin/             ← Admin panel
│   │   ├── login/         ← Login page
│   │   ├── setup/         ← First-time setup wizard
│   │   ├── dashboard/     ← Main dashboard
│   │   ├── services/      ← सेवा manage
│   │   ├── rates/         ← ब्याजदर manage
│   │   ├── notices/       ← Notice manage
│   │   └── settings/      ← संस्थाको settings
│   └── api/               ← API routes
│       ├── tenant/        ← Tenant identify गर्ने
│       ├── auth/          ← Login/logout
│       └── content/       ← Content CRUD
├── components/
│   ├── public/            ← Public website components
│   └── admin/             ← Admin panel components
├── lib/
│   ├── mongodb.ts         ← Database connection
│   ├── tenant.ts          ← Tenant logic
│   └── auth.ts            ← Authentication logic
├── models/
│   ├── Tenant.ts          ← संस्थाको schema
│   ├── Service.ts         ← सेवाको schema
│   ├── Rate.ts            ← ब्याजदरको schema
│   └── Notice.ts          ← Noticeको schema
└── .env.local             ← Environment variables (GitHub मा upload नगर्ने)
```

## MongoDB Schema

### Tenant (संस्था)
```typescript
{
  _id: ObjectId,
  name: string,          // संस्थाको नाम
  domain: string,        // custom domain
  logo: string,          // logo URL
  address: string,       // ठेगाना
  phone: string,         // फोन
  email: string,         // इमेल
  isSetupComplete: boolean,  // wizard पूरा भयो?
  adminPassword: string, // hashed password
  createdAt: Date
}
```

### Service (सेवा)
```typescript
{
  _id: ObjectId,
  tenantId: ObjectId,    // कुन संस्थाको
  name: string,          // सेवाको नाम
  description: string,   // विवरण
  isActive: boolean
}
```

### Rate (ब्याजदर)
```typescript
{
  _id: ObjectId,
  tenantId: ObjectId,
  type: string,          // Saving / FD / Loan
  rate: number,          // ब्याज %
  duration: string,      // अवधि
  isActive: boolean
}
```

### Notice (सूचना)
```typescript
{
  _id: ObjectId,
  tenantId: ObjectId,
  title: string,
  content: string,
  publishedAt: Date,
  isActive: boolean
}
```

## Environment Variables (.env.local)
```
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```
