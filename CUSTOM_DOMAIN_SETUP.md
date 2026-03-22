# 🔧 Custom Domain DNS Setup Guide - robinsgupta.xyz

## ⚠️ IMPORTANT: DNS Configuration Required

Your CNAME file has been added to GitHub Pages, but you're seeing a DNS error because your domain's DNS records need to be configured at your domain registrar.

---

## 🎯 What I've Done

✅ Created `CNAME` file with `robinsgupta.xyz`  
✅ Updated `vite.config.js` base path to `/`  
✅ Updated `package.json` homepage to `https://robinsgupta.xyz`  
✅ Pushed all changes to GitHub  

**Repository Status:** ✅ Updated and pushed

---

## 📋 DNS Configuration Steps

### Step 1: Access Your Domain Registrar

Log in to where you purchased `robinsgupta.xyz`:
- GoDaddy
- Namecheap
- Google Domains
- Cloudflare
- Or any other registrar

### Step 2: Add DNS Records

You need to add **TWO types of records**:

#### A) A Records (Required)

Add these **4 A records** pointing to GitHub's servers:

| Type | Host/Name | Value/IP Address | TTL |
|------|-----------|------------------|-----|
| A | @ | 185.199.108.153 | Auto or 1 hour |
| A | @ | 185.199.109.153 | Auto or 1 hour |
| A | @ | 185.199.110.153 | Auto or 1 hour |
| A | @ | 185.199.111.153 | Auto or 1 hour |

**Note:** 
- `@` means the root domain (robinsgupta.xyz)
- Some registrars use blank instead of `@`
- If you already have A records, replace them

#### B) CNAME Record (Required)

Add this CNAME record for the www subdomain:

| Type | Host/Name | Value/Target | TTL |
|------|-----------|--------------|-----|
| CNAME | www | robinsgupta09-maker.github.io | Auto or 1 hour |

---

## 🔍 Example Configurations by Registrar

### GoDaddy

1. Go to **My Products** → Click **DNS** next to your domain
2. Under **Records**, click **Add**
3. Add 4 A records with the IPs above
4. Add 1 CNAME record for www
5. Click **Save**

### Namecheap

1. Go to **Domain List** → Click **Manage** next to your domain
2. Go to **Advanced DNS** tab
3. Click **Add New Record**
4. Add the A records and CNAME record
5. Click the checkmark to save each one

### Google Domains (Now Squarespace)

1. Select your domain
2. Go to **DNS** tab
3. Scroll to **Custom resource records**
4. Add the records
5. Click **Save**

### Cloudflare

1. Select your domain
2. Go to **DNS** → **Records**
3. Click **Add record**
4. Add A records (set proxy status to DNS only if needed)
5. Add CNAME record
6. Click **Save**

---

## ⏱️ DNS Propagation Time

After adding the DNS records:

- **Typical time:** 15 minutes to 1 hour
- **Maximum time:** 24-48 hours
- **Most common:** 30 minutes to 2 hours

**Why it takes time:**
DNS changes need to propagate across the internet globally.

---

## ✅ Verify DNS Configuration

### Method 1: Online DNS Checker

Visit these sites to check your DNS:

1. **WhatsMyDNS.net**
   - https://www.whatsmydns.net/
   - Enter: `robinsgupta.xyz`
   - Check A records show GitHub IPs

2. **DNS Checker**
   - https://dnschecker.org/
   - Verify all 4 A records are visible worldwide

3. **GitHub Status**
   - Check: https://www.githubstatus.com/

### Method 2: Command Line (Windows PowerShell)

```powershell
# Check A records
nslookup robinsgupta.xyz

# Check CNAME record
nslookup www.robinsgupta.xyz

# Should return: robinsgupta09-maker.github.io
```

### Method 3: GitHub Repository Check

1. Go to: https://github.com/robinsgupta09-maker/My_portfolio/settings/pages
2. Look for **Custom domain** section
3. It should show: `robinsgupta.xyz`
4. Status should change from "DNS check unsuccessful" to active

---

## 🔒 HTTPS/SSL Certificate

After DNS is configured:

1. GitHub will automatically provision an SSL certificate
2. This can take 5-30 minutes after DNS is correct
3. GitHub will enforce HTTPS automatically
4. You'll see: "Your site is ready to be published at..."

**To enable HTTPS enforcement:**
1. Go to repository Settings → Pages
2. Under **Custom domain**, check "Enforce HTTPS"
3. Wait for certificate to be issued

---

## 🚨 Common Issues & Solutions

### Issue 1: "DNS check unsuccessful"

**Cause:** DNS records not yet propagated or incorrectly configured

**Solution:**
- Wait 15-60 minutes
- Double-check all 4 A records
- Verify CNAME record for www
- Use dnschecker.org to verify

### Issue 2: Site shows old version

**Cause:** Browser cache or CDN cache

**Solution:**
- Clear browser cache
- Try incognito/private mode
- Wait a few more minutes

### Issue 3: Mixed content warnings

**Cause:** Some resources loading over HTTP instead of HTTPS

**Solution:**
- Ensure all URLs in your code use HTTPS
- Update API endpoints to use HTTPS
- GitHub enforces HTTPS automatically

### Issue 4: Domain shows different website

**Cause:** Old DNS records still cached

**Solution:**
- Flush local DNS cache:
  ```powershell
  ipconfig /flushdns
  ```
- Wait for global propagation

---

## 📊 DNS Record Checklist

Before considering setup complete, verify:

- [ ] All 4 A records added with correct IPs
- [ ] CNAME record for www added
- [ ] No conflicting A records exist
- [ ] TTL set to reasonable value (1 hour or auto)
- [ ] DNS checker shows records propagating
- [ ] GitHub Pages shows domain as configured
- [ ] HTTPS certificate issued (after DNS propagates)
- [ ] Both robinsgupta.xyz AND www.robinsgupta.xyz work

---

## 🎯 Expected Final Result

After DNS propagation completes:

✅ **Primary URL:** https://robinsgupta.xyz  
✅ **Alternate URL:** https://www.robinsgupta.xyz  
✅ **HTTPS:** Enabled automatically  
✅ **GitHub Pages Status:** Active  
✅ **No DNS errors**

Both URLs will redirect to your portfolio!

---

## 🔄 What Happens Next (Automatic Process)

1. ✅ **Now:** CNAME file uploaded to GitHub
2. ⏳ **Next 15-60 min:** DNS propagates globally
3. ⏳ **After DNS:** GitHub detects valid DNS
4. ⏳ **5-30 min later:** SSL certificate issued
5. ✅ **Final:** Your site live at robinsgupta.xyz

---

## 📞 Quick Reference

### GitHub IP Addresses (A Records)
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### CNAME Target
```
robinsgupta09-maker.github.io
```

### Your Domain
```
robinsgupta.xyz
www.robinsgupta.xyz
```

### Useful Links
- GitHub Pages Docs: https://pages.github.com
- Custom Domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- DNS Checker: https://www.whatsmydns.net

---

## ⚡ Emergency Rollback

If you want to go back to github.io domain:

1. Delete the CNAME file from your repository
2. Remove custom domain from GitHub Pages settings
3. Revert vite.config.js base to `/My_portfolio/`
4. Revert package.json homepage
5. Commit and push

---

## 💡 Pro Tips

1. **Keep CNAME file** - It's required for custom domains
2. **Use both A and CNAME records** - Ensures all URLs work
3. **Lower TTL before changes** - Makes future changes faster
4. **Test both domains** - robinsgupta.xyz AND www.robinsgupta.xyz
5. **Enable HTTPS enforcement** - Important for security
6. **Monitor DNS propagation** - Use whatsmydns.net

---

## 🎉 After DNS is Working

Once you see your site live:

1. Share: https://robinsgupta.xyz
2. Update resume with custom domain
3. Add to LinkedIn profile
4. Share on social media
5. Celebrate! 🎉

---

**Current Status:** ⏳ Waiting for DNS propagation  
**Next Action:** Configure DNS records at your domain registrar  
**Expected Time:** 15 minutes to 2 hours after configuration

---

**Need help?** Check your DNS records at whatsmydns.net or contact your domain registrar's support!
