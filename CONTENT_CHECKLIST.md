# Content Checklist - MUST UPDATE BEFORE DEPLOYING

Your portfolio looks great, but these placeholder items MUST be replaced with real content before going live.

## 🚨 Critical (Looks Broken Without These)

### 1. Social Links (`src/components/Footer.tsx`)
Find `SOCIAL_LINKS` at the top and replace:
```javascript
const SOCIAL_LINKS = {
    linkedin: 'https://linkedin.com/in/YOUR_USERNAME',  // ← Your LinkedIn
    github: 'https://github.com/YOUR_USERNAME',         // ← Your GitHub
    twitter: 'https://twitter.com/YOUR_USERNAME',       // ← Your Twitter
    email: 'm.rakibul.h45@gmail.com'                    // ✅ Already set
};
```

### 2. Project URLs (`src/components/Projects.tsx`)
Find the `projects` array and update `liveUrl` and `codeUrl` for each project:
```javascript
{
    title: "StockNiche AI",
    liveUrl: "https://your-live-site.com",  // ← Real demo URL
    codeUrl: "https://github.com/you/repo"  // ← Real GitHub repo
}
```

### 3. Resume PDF (`public/resume.pdf`)
Delete the placeholder and upload your ACTUAL resume PDF.

---

## ⚠️ Recommended (Looks Generic Without These)

### 4. Your Photo (`src/components/About.tsx`)
Replace the "RS" placeholder with an actual image:
- Add your photo to `public/` folder (e.g., `public/rakibul.jpg`)
- Update the About component to use `<Image src="/rakibul.jpg" ... />`

### 5. Testimonials (`src/components/Testimonials.tsx`)
Either:
- Replace with REAL testimonials from actual clients
- OR remove the Testimonials section entirely if you don't have real ones

---

## ✅ Already Done
- Email address (m.rakibul.h45@gmail.com)
- Contact form (EmailJS ready)
- SEO metadata
- All animations and effects
