# How to Deploy Your Portfolio for Free

The easiest way to put your Next.js website on the internet for free is **Vercel**.

## Step 1: Push your code to GitHub
1.  Go to [GitHub.com](https://github.com) and create a new repository (name it `my-portfolio`).
2.  Open your terminal in VS Code.
3.  Run these commands (replace the URL with your new repo URL):
    ```bash
    git add .
    git commit -m "Ready for deployment"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
    git push -u origin main
    ```

## Step 2: Deploy on Vercel
1.  Go to [Vercel.com](https://vercel.com) and sign up (login with GitHub).
2.  Click **"Add New..."** -> **"Project"**.
3.  You will see your `my-portfolio` repository. Click **"Import"**.
4.  Click **"Deploy"**.

## Step 3: Connect Your Custom Domain
You own the domain **`rakibulhasan.pro.bd`**. Here is how to link it to your Vercel site.

### 1. Tell Vercel about your domain
1.  Go to your project dashboard on Vercel.
2.  Click **Settings** -> **Domains**.
3.  Enter `rakibulhasan.pro.bd` in the input box and click **Add**.
4.  It will show an "Invalid Configuration" error. **This is normal.** It will ensure you the values you need (A Record: `76.76.21.21`).

### 2. Update your DNS in Ready.bd
Go to the page shown in your screenshot (Ready.bd Control Panel) and update these records:

**A Record (For the root domain)**
*   **Type**: `A`
*   **Name**: `rakibulhasan.pro.bd` (or `@` if it allows)
*   **Content**: `76.76.21.21` (Change this from `185.174...`)
*   **TTL**: `3600`

**CNAME Record (For www)**
*   **Type**: `CNAME`
*   **Name**: `www.rakibulhasan.pro.bd`
*   **Content**: `cname.vercel-dns.com` (Change this from `rakibulhasan.pro.bd`)
*   **TTL**: `3600`

> **Note:** It may take up to 24 hours for these changes to work everywhere, but usually it happens within minutes!

## That's it!
your site will be live at `https://rakibulhasan.pro.bd`.
