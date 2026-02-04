# EmailJS Setup Guide

Your contact form is now configured to work with EmailJS for real email delivery.

## 🔧 Setup Steps

### 1. Create an EmailJS Account
Go to [https://www.emailjs.com/](https://www.emailjs.com/) and sign up (free tier: 200 emails/month).

### 2. Create an Email Service
1. Go to **Email Services** → **Add New Service**
2. Choose your email provider (Gmail recommended)
3. Connect your email account
4. Copy the **Service ID** (e.g., `service_abc123`)

### 3. Create an Email Template
1. Go to **Email Templates** → **Create New Template**
2. Set up your template with these variables:
   - `{{user_name}}` - Sender's name
   - `{{user_email}}` - Sender's email
   - `{{message}}` - Message content
3. Copy the **Template ID** (e.g., `template_xyz789`)

### 4. Get Your Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key**

### 5. Update Your Code
Open `src/components/Contact.tsx` and replace:

```typescript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';   // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // Replace with your Public Key
```

## ✅ Done!
Your contact form will now send real emails to `m.rakibul.h45@gmail.com`.

## 📝 Note
Until you configure EmailJS, the form falls back to opening the user's email client (mailto link).
