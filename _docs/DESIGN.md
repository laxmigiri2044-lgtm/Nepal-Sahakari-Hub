# DESIGN.md — Nepal Sahakari Hub Design System

## Design Philosophy
**Fast + Clean + Professional + Subtle = विश्वासयोग्य**

सहकारी संस्था financial institution हो।
Design ले भन्नुपर्छ: *"यहाँ तपाईंको पैसा सुरक्षित छ।"*
Cinematic होइन — confident।

---

## Color System

### Primary Colors
```css
--color-primary: #1B4F72      /* गाढा नीलो — trust, stability */
--color-primary-light: #2E86C1 /* medium नीलो — hover states */
--color-accent: #27AE60        /* हरियो — success, growth */
```

### Neutral Colors
```css
--color-bg: #FFFFFF            /* सेतो background */
--color-bg-soft: #F8F9FA       /* हल्का grey — sections */
--color-text: #1A1A2E          /* गाढा — main text */
--color-text-muted: #6C757D    /* हल्का — secondary text */
--color-border: #E9ECEF        /* border */
```

### Danger / Warning
```css
--color-danger: #E74C3C
--color-warning: #F39C12
```

---

## Typography

### Font
```css
/* Nepali + English दुवै support */
font-family: 'Noto Sans Devanagari', 'Inter', sans-serif;
```

### Size Scale
```css
--text-xs: 12px
--text-sm: 14px
--text-base: 16px      /* body text */
--text-lg: 18px
--text-xl: 20px
--text-2xl: 24px
--text-3xl: 30px
--text-4xl: 36px       /* hero heading */
```

### Rules
- Body text minimum **16px** — सदस्यहरू बुढा पनि हुन्छन्
- Line height minimum **1.6** — Nepali text को लागि
- Heading — **bold र clear**
- कहिल्यै ४ भन्दा बढी font size एकै page मा नराख्ने

---

## Spacing System
```css
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
--space-3xl: 64px
```

---

## Animation Rules

### ✅ राख्ने — Subtle र Purposeful
```css
/* Fade in — page load मा */
transition: opacity 0.4s ease, transform 0.4s ease;

/* Hover effect — buttons मा */
transition: background-color 0.2s ease, transform 0.1s ease;

/* Scroll reveal — sections मा */
/* Framer Motion: initial opacity 0, animate opacity 1 */
/* Duration: 0.5s, delay: staggered 0.1s each */
```

### ❌ नराख्ने
- 3D transforms र Three.js
- Morphing effects
- Video background
- Parallax heavy
- Infinite looping animations
- Page transition धेरै लामो (0.3s भन्दा बढी)

### Animation Philosophy
> *"Animation ले content लाई support गर्छ — animation नै content हुँदैन।"*

---

## Component Rules

### Hero Section
```
- संस्थाको नाम — ठूलो, bold, center
- एक line tagline — Nepali मा
- दुईवटा CTA buttons: "सेवाहरू हेर्नुस्" + "सम्पर्क गर्नुस्"
- Background: solid color वा subtle gradient — image/video होइन
```

### ब्याजदर Section
```
- यो सबैभन्दा important section हो
- Table वा card format — clearly readable
- Saving / FD / Loan — अलग अलग
- Color coding: हरियो = saving, नीलो = FD, सुन्तला = loan
```

### Notice Board
```
- Latest ३ notices homepage मा
- Date clearly देखिने
- "सबै हेर्नुस्" button
```

### Navigation
```
- Logo बायाँ
- Menu items: सेवा, ब्याजदर, सूचना, सम्पर्क
- Mobile: hamburger menu
- Sticky top — scroll गर्दा पनि देखिने
```

---

## Mobile Rules (अनिवार्य)

Nepal मा ७०%+ users मोबाइलबाट आउँछन्।

```
- Minimum touch target: 44x44px
- Font size कहिल्यै 14px भन्दा सानो नराख्ने
- Horizontal scroll कहिल्यै नहोस्
- Images lazy load गर्ने
- First load: 3 seconds भित्र — Nepal को internet सोचेर
```

---

## Performance Rules

```
- Images: WebP format, compressed
- Fonts: केवल use भएका weights load गर्ने
- No heavy libraries — jQuery, Bootstrap नराख्ने
- Lighthouse score: minimum 85+
```

---

## Reference Websites (inspiration)
Design गर्दा यी हेर्नुस् — copy होइन, feel लिनुस्:
- **stripe.com** — clean, professional, trustworthy
- **linear.app** — subtle animation, modern
- **vercel.com** — fast, minimal

---

## AI लाई भन्ने बेला
Design बनाउन Kilo लाई यसरी भन्नुस्:

> *"@_docs/DESIGN.md पढ र [component नाम] बनाइदे।
> Noto Sans Devanagari font use गर।
> Colors DESIGN.md बाट लिनुस्।
> Mobile-first बनाउनुस्।
> Heavy animation राख्नु हुँदैन।"*
