# Quick Deployment Checklist for GoDaddy VPS

Use this checklist for rapid deployment. For detailed instructions, see `GIT_DEPLOYMENT.md`.

## ☐ Before You Start

- [ ] GoDaddy VPS purchased (not shared hosting!)
- [ ] SSH access credentials received
- [ ] Domain name ready
- [ ] GitHub repository accessible
- [ ] MongoDB Atlas account created (or plan for local MongoDB)

---

## ☐ On Your Local Machine (Windows)

### Generate Production Secrets

```powershell
# Run these in PowerShell to generate secrets
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('SESSION_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

**Save these values** - you'll need them on the server!

### Setup Google OAuth (if using)

1. Go to: https://console.cloud.google.com
2. Select your project
3. Go to: Credentials → OAuth 2.0 Client IDs
4. Click your client ID
5. Under "Authorized JavaScript origins" add:
   - `https://yourdomain.com`
   - `https://www.yourdomain.com`
6. Under "Authorized redirect URIs" add:
   - `https://yourdomain.com/api/auth/google/callback`
   - `https://www.yourdomain.com/api/auth/google/callback`
7. Save and note your Client ID and Secret

---

## ☐ On GoDaddy VPS (SSH Connection)

### 1. Connect to Server

```bash
ssh root@your-server-ip
```

### 2. Quick Install Script (Copy & Paste)

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
# Run the command it outputs

# Verify installations
node --version
npm --version
git --version
pm2 --version
```

### 3. Clone Repository

```bash
# Create directory and clone
sudo mkdir -p /var/www
cd /var/www
sudo git clone https://github.com/jayher0824-coder/Capstone-1-2.git it-ojt-platform
sudo chown -R $USER:$USER /var/www/it-ojt-platform
cd /var/www/it-ojt-platform
```

### 4. Create Environment File

```bash
nano .env
```

**Paste this (update with YOUR values):**

```env
PORT=3000
NODE_ENV=production

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/it-ojt-platform

JWT_SECRET=YOUR_GENERATED_JWT_SECRET_HERE
SESSION_SECRET=YOUR_GENERATED_SESSION_SECRET_HERE

CLIENT_URL=https://yourdomain.com
CORS_ORIGIN=https://yourdomain.com

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://yourdomain.com/api/auth/google/callback

MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

**Save:** Press `Ctrl+X`, then `Y`, then `Enter`

### 5. Setup Application

```bash
# Install dependencies
npm install --production

# Create directories
mkdir -p uploads/resumes uploads/avatars logs
chmod -R 755 uploads logs

# Make deploy script executable
chmod +x deploy.sh

# Create admin account
npm run create-admin
```

### 6. Start Application

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 status
```

### 7. Install & Configure Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Create config file
sudo nano /etc/nginx/sites-available/it-ojt-platform
```

**Paste this (replace yourdomain.com):**

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

**Save:** Press `Ctrl+X`, then `Y`, then `Enter`

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/it-ojt-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 8. Setup SSL (HTTPS)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

**Follow prompts and choose to redirect HTTP to HTTPS**

### 9. Configure Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
sudo ufw status
```

---

## ☐ Verify Deployment

### Check Application Status

```bash
pm2 status
pm2 logs it-ojt-platform
```

### Test in Browser

1. Go to: `https://yourdomain.com`
2. You should see your application!

---

## ☐ Future Updates (Every Deploy)

```bash
cd /var/www/it-ojt-platform
./deploy.sh
```

Or manually:

```bash
cd /var/www/it-ojt-platform
git pull origin main
npm install --production
pm2 reload ecosystem.config.js
```

---

## 🆘 Quick Troubleshooting

### App not starting?
```bash
pm2 logs it-ojt-platform --err
node server/server.js  # Test manually
```

### Can't connect to MongoDB?
```bash
# Test connection string
node -e "require('mongoose').connect('YOUR_MONGODB_URI').then(() => console.log('OK')).catch(e => console.log(e))"
```

### Port 3000 in use?
```bash
sudo netstat -tlnp | grep 3000
pm2 kill
pm2 start ecosystem.config.js
```

### Permission errors?
```bash
sudo chown -R $USER:$USER /var/www/it-ojt-platform
chmod -R 755 uploads logs
```

### Nginx errors?
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

---

## 📋 Quick Reference Commands

| Action | Command |
|--------|---------|
| View logs | `pm2 logs it-ojt-platform` |
| Restart app | `pm2 restart it-ojt-platform` |
| Monitor resources | `pm2 monit` |
| Stop app | `pm2 stop it-ojt-platform` |
| Check Nginx | `sudo nginx -t` |
| Restart Nginx | `sudo systemctl restart nginx` |
| View Nginx logs | `sudo tail -f /var/log/nginx/error.log` |
| Check SSL | `sudo certbot certificates` |
| Renew SSL | `sudo certbot renew` |

---

## ✅ Post-Deployment Tasks

- [ ] Test login functionality
- [ ] Test file uploads
- [ ] Test assessments
- [ ] Verify Google OAuth (if enabled)
- [ ] Check mobile responsiveness
- [ ] Setup automated backups
- [ ] Configure monitoring alerts
- [ ] Add to Google Search Console
- [ ] Test email notifications (if configured)

---

## 📞 Need Help?

Check the detailed guide: `GIT_DEPLOYMENT.md`

Common issues:
- MongoDB connection: Check Atlas whitelist and connection string
- SSL not working: Wait 5-10 minutes after Certbot, check DNS
- App crashes: Check `pm2 logs` for errors
- Can't access site: Check firewall and Nginx config
