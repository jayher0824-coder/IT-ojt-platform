# 🚀 Pre-Deployment Checklist - Ready to Deploy

## ✅ What's Already Done

- [x] Secure JWT_SECRET generated: `29340fc86997d18de4aa72311e17c5d25dcc5bf9b5f31ec3e17c6ab57d57ce8b`
- [x] Secure SESSION_SECRET generated: `e5441ab2b898c59d9ae14c7061154f70c2a4bff23d50cfae2bdac89cc9dc481e`
- [x] Deployment scripts created (deploy.sh)
- [x] Deployment guides created (GIT_DEPLOYMENT.md, QUICK_DEPLOY.md)
- [x] Production environment template created (.env.production)
- [x] .gitignore configured (protects .env file)

---

## 📋 What You Need to Do Before Deploying

### 1. Purchase & Setup GoDaddy VPS
- [ ] Purchase GoDaddy VPS (NOT shared hosting - Node.js required)
- [ ] Note your server IP address: `________________`
- [ ] Note SSH username: `________________`
- [ ] Note SSH password/key: `________________`

### 2. Domain Configuration
- [ ] Domain name ready: `________________`
- [ ] DNS configured to point to VPS IP
- [ ] Wait 24-48 hours for DNS propagation (if just configured)

### 3. Database Setup (Choose One)

**Option A: MongoDB Atlas (Recommended - Easier)**
- [ ] Create account at https://cloud.mongodb.com
- [ ] Create free cluster
- [ ] Create database user with username & password
- [ ] Whitelist VPS IP address (or use 0.0.0.0/0 for all)
- [ ] Get connection string: `mongodb+srv://...`
- [ ] Save connection string: `________________`

**Option B: Local MongoDB on VPS**
- [ ] Will install during deployment following GIT_DEPLOYMENT.md

### 4. Google OAuth Setup (Optional but Recommended)

- [ ] Go to https://console.cloud.google.com
- [ ] Select existing project or create new: `________________`
- [ ] Enable Google+ API
- [ ] Go to Credentials → Create Credentials → OAuth 2.0 Client ID
- [ ] Application type: Web application
- [ ] Add Authorized JavaScript origins:
  - `https://yourdomain.com`
  - `https://www.yourdomain.com`
- [ ] Add Authorized redirect URIs:
  - `https://yourdomain.com/api/auth/google/callback`
- [ ] Save Client ID: `________________`
- [ ] Save Client Secret: `________________`

### 5. Update .env.production File

Open `.env.production` and update these values:

```env
# Update these lines:
MONGODB_URI=YOUR_ACTUAL_MONGODB_CONNECTION_STRING
CLIENT_URL=https://your-actual-domain.com
CORS_ORIGIN=https://your-actual-domain.com
GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_ACTUAL_CLIENT_SECRET
GOOGLE_CALLBACK_URL=https://your-actual-domain.com/api/auth/google/callback
```

---

## 🎯 Deployment Day - Step by Step

### Step 1: Connect to Your VPS

```bash
ssh root@YOUR_SERVER_IP
# Or: ssh username@YOUR_SERVER_IP
```

### Step 2: Run Quick Install (Copy entire block)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs git

# Install PM2
sudo npm install -g pm2

# Setup PM2 startup
pm2 startup

# Verify
node --version
npm --version
```

### Step 3: Clone Your Repository

```bash
sudo mkdir -p /var/www
cd /var/www
sudo git clone https://github.com/jayher0824-coder/Capstone-1-2.git it-ojt-platform
sudo chown -R $USER:$USER /var/www/it-ojt-platform
cd /var/www/it-ojt-platform
```

### Step 4: Transfer Your .env File

**From your Windows machine, copy .env.production to server:**

1. Open .env.production in VS Code
2. Update all YOUR_* placeholders with real values
3. Copy the entire content
4. On the server, run:
```bash
nano /var/www/it-ojt-platform/.env
```
5. Paste the content
6. Press Ctrl+X, then Y, then Enter to save

**Or use SCP from Windows PowerShell:**
```powershell
scp .env.production root@YOUR_SERVER_IP:/var/www/it-ojt-platform/.env
```

### Step 5: Install and Start

```bash
cd /var/www/it-ojt-platform

# Install dependencies
npm install --production

# Create directories
mkdir -p uploads/resumes uploads/avatars logs
chmod -R 755 uploads logs

# Make deploy script executable
chmod +x deploy.sh

# Create admin account
npm run create-admin

# Start with PM2
pm2 start ecosystem.config.js
pm2 save

# Check status
pm2 status
pm2 logs it-ojt-platform
```

### Step 6: Install Nginx

```bash
sudo apt install -y nginx

# Create config
sudo nano /etc/nginx/sites-available/it-ojt-platform
```

**Paste this (replace yourdomain.com with your actual domain):**

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location /uploads {
        alias /var/www/it-ojt-platform/uploads;
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    client_max_body_size 10M;
}
```

**Enable and restart:**
```bash
sudo ln -s /etc/nginx/sites-available/it-ojt-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 7: Setup SSL Certificate

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Step 8: Configure Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
```

---

## ✅ Post-Deployment Verification

### Check Application
- [ ] Visit: https://yourdomain.com
- [ ] Site loads successfully
- [ ] Login page appears
- [ ] Can create account
- [ ] Can login with admin account
- [ ] Google OAuth works (if enabled)
- [ ] Can upload files (resume, avatar)
- [ ] Assessments load properly
- [ ] Dashboard works
- [ ] Mobile responsive check

### Check Server Status
```bash
pm2 status
pm2 logs it-ojt-platform
sudo systemctl status nginx
sudo certbot certificates
```

### Security Check
- [ ] HTTPS works (green lock icon in browser)
- [ ] HTTP redirects to HTTPS
- [ ] .env file has proper permissions: `chmod 600 .env`
- [ ] Firewall is enabled
- [ ] MongoDB connection secured (username/password or IP whitelist)

---

## 📞 Quick Troubleshooting

### Application won't start
```bash
pm2 logs it-ojt-platform --err
cd /var/www/it-ojt-platform
node server/server.js  # Test manually
```

### Database connection error
- Check MongoDB Atlas: Is VPS IP whitelisted?
- Test connection string format
- Verify username/password

### Can't access website
- Check DNS: `nslookup yourdomain.com`
- Check Nginx: `sudo nginx -t`
- Check firewall: `sudo ufw status`
- Check PM2: `pm2 status`

### SSL not working
- Wait 5-10 minutes after Certbot
- Check: `sudo certbot certificates`
- Verify DNS is pointing to correct IP

---

## 🔄 Future Deployments (After Setup)

Every time you update your code:

```bash
cd /var/www/it-ojt-platform
./deploy.sh
```

Or manually:
```bash
git pull origin main
npm install --production
pm2 reload ecosystem.config.js
```

---

## 📊 Monitoring Commands

```bash
# View real-time logs
pm2 logs it-ojt-platform

# Monitor resources
pm2 monit

# Check disk space
df -h

# Check memory
free -h

# Check running processes
pm2 list
```

---

## 🎉 You're Ready!

Follow this checklist step by step, and you'll have your IT OJT Platform deployed on GoDaddy in about 30-45 minutes.

**Need help?** Refer to the detailed guides:
- `GIT_DEPLOYMENT.md` - Complete detailed guide
- `QUICK_DEPLOY.md` - Quick reference commands
- `DEPLOYMENT.md` - Original deployment documentation

**Your generated secrets are saved in `.env.production` - don't lose them!**

Good luck with your deployment! 🚀
