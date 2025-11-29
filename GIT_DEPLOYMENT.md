# Git Deployment Guide for GoDaddy VPS

This guide walks you through setting up Git-based deployment for your IT OJT Platform on GoDaddy VPS.

## Prerequisites

- GoDaddy VPS with SSH access
- Root or sudo access
- Your GitHub repository: `jayher0824-coder/Capstone-1-2`

---

## Part 1: Initial Server Setup (One-Time)

### Step 1: Connect to Your GoDaddy VPS

```bash
ssh root@your-server-ip
# Or if you have a username:
ssh username@your-server-ip
```

### Step 2: Update System Packages

```bash
sudo apt update
sudo apt upgrade -y
```

### Step 3: Install Node.js 18.x

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show npm version
```

### Step 4: Install Git

```bash
sudo apt install -y git

# Configure git (use your GitHub credentials)
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### Step 5: Install PM2 Process Manager

```bash
sudo npm install -g pm2

# Set PM2 to start on system boot
pm2 startup
# Copy and run the command it outputs
```

### Step 6: Setup MongoDB

**Option A: MongoDB Atlas (Recommended - Easier)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)
5. Whitelist your server's IP address in Atlas

**Option B: Install MongoDB Locally**
```bash
# Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/mongodb-6.gpg

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
sudo systemctl status mongod
```

---

## Part 2: Clone Your Repository

### Step 1: Create Application Directory

```bash
sudo mkdir -p /var/www
cd /var/www
```

### Step 2: Clone Your Repository

**Option A: HTTPS (Easier for public repos)**
```bash
sudo git clone https://github.com/jayher0824-coder/Capstone-1-2.git it-ojt-platform
```

**Option B: SSH (Better for private repos)**
```bash
# Generate SSH key on server
ssh-keygen -t ed25519 -C "your-email@example.com"

# Display public key
cat ~/.ssh/id_ed25519.pub

# Copy the key and add it to GitHub:
# 1. Go to GitHub.com → Settings → SSH and GPG keys
# 2. Click "New SSH key"
# 3. Paste your key

# Then clone
sudo git clone git@github.com:jayher0824-coder/Capstone-1-2.git it-ojt-platform
```

### Step 3: Set Proper Ownership

```bash
sudo chown -R $USER:$USER /var/www/it-ojt-platform
cd /var/www/it-ojt-platform
```

---

## Part 3: Configure Your Application

### Step 1: Create Production Environment File

```bash
cd /var/www/it-ojt-platform
nano .env
```

### Step 2: Add Your Production Configuration

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# MongoDB Connection
# For Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/it-ojt-platform
# For Local:
# MONGODB_URI=mongodb://localhost:27017/it-ojt-platform

# JWT Secret (Generate secure random strings!)
JWT_SECRET=PASTE_YOUR_32_CHARACTER_RANDOM_STRING_HERE
SESSION_SECRET=PASTE_YOUR_32_CHARACTER_RANDOM_STRING_HERE

# Your Domain
CLIENT_URL=https://yourdomain.com
CORS_ORIGIN=https://yourdomain.com

# Google OAuth (if using)
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-client-secret
GOOGLE_CALLBACK_URL=https://yourdomain.com/api/auth/google/callback

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

**Generate Secure Secrets:**
```bash
# Run these commands to generate secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Install Dependencies

```bash
npm install --production
```

### Step 4: Create Required Directories

```bash
mkdir -p uploads/resumes uploads/avatars logs
chmod -R 755 uploads logs
```

### Step 5: Create Admin Account

```bash
npm run create-admin
# Follow the prompts to create your admin account
```

---

## Part 4: Deploy Application

### Step 1: Make Deploy Script Executable

```bash
chmod +x deploy.sh
```

### Step 2: Start Application with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
```

### Step 3: Verify Application is Running

```bash
pm2 status
pm2 logs it-ojt-platform

# Check if app is listening on port 3000
netstat -tlnp | grep 3000
```

---

## Part 5: Setup Nginx Reverse Proxy (Optional but Recommended)

### Step 1: Install Nginx

```bash
sudo apt install -y nginx
```

### Step 2: Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/it-ojt-platform
```

### Step 3: Add Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Static file serving
    location /uploads {
        alias /var/www/it-ojt-platform/uploads;
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    # Proxy to Node.js
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
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    client_max_body_size 10M;
}
```

### Step 4: Enable Site and Restart Nginx

```bash
sudo ln -s /etc/nginx/sites-available/it-ojt-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: Setup SSL Certificate (HTTPS)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts and choose to redirect HTTP to HTTPS
```

---

## Part 6: Future Deployments (Every Time You Update)

### Method 1: Using the Deploy Script (Recommended)

```bash
cd /var/www/it-ojt-platform
./deploy.sh
```

### Method 2: Manual Deployment

```bash
cd /var/www/it-ojt-platform

# Pull latest code
git pull origin main

# Install any new dependencies
npm install --production

# Restart application
pm2 reload ecosystem.config.js
```

---

## Useful PM2 Commands

```bash
# View logs
pm2 logs it-ojt-platform

# View real-time logs
pm2 logs it-ojt-platform --lines 100

# Monitor resources
pm2 monit

# Restart app
pm2 restart it-ojt-platform

# Stop app
pm2 stop it-ojt-platform

# Delete app from PM2
pm2 delete it-ojt-platform

# List all apps
pm2 list

# View detailed info
pm2 info it-ojt-platform
```

---

## Troubleshooting

### Application won't start
```bash
# Check logs
pm2 logs it-ojt-platform --err

# Check environment variables
pm2 env 0  # Replace 0 with your app ID from pm2 list

# Test Node.js manually
node server/server.js
```

### Database connection issues
```bash
# Test MongoDB connection
mongo  # For local MongoDB
mongosh  # For newer MongoDB versions

# Or use Node.js
node -e "require('mongoose').connect('YOUR_MONGODB_URI').then(() => console.log('Connected')).catch(err => console.log('Error:', err))"
```

### Port already in use
```bash
# Find process using port 3000
sudo netstat -tlnp | grep 3000

# Kill the process (replace PID with actual process ID)
sudo kill -9 PID
```

### Permission issues
```bash
# Fix ownership
sudo chown -R $USER:$USER /var/www/it-ojt-platform

# Fix directory permissions
chmod -R 755 /var/www/it-ojt-platform/uploads
chmod -R 755 /var/www/it-ojt-platform/logs
```

---

## Security Checklist

- [ ] Changed JWT_SECRET and SESSION_SECRET to random strings
- [ ] MongoDB secured with authentication
- [ ] Firewall configured (UFW)
- [ ] SSL certificate installed
- [ ] Google OAuth configured with production domain
- [ ] `.env` file has proper permissions (chmod 600 .env)
- [ ] Regular backups configured
- [ ] PM2 monitoring setup
- [ ] Nginx rate limiting configured

---

## Backup Strategy

### Backup MongoDB (if using local MongoDB)

```bash
# Create backup
mongodump --db it-ojt-platform --out /backup/mongodb-$(date +%Y%m%d)

# Restore backup
mongorestore --db it-ojt-platform /backup/mongodb-20231201/it-ojt-platform
```

### Backup Uploaded Files

```bash
# Backup uploads
tar -czf /backup/uploads-$(date +%Y%m%d).tar.gz /var/www/it-ojt-platform/uploads
```

---

## Next Steps After Deployment

1. **Test all features** - Login, upload, assessments, etc.
2. **Setup monitoring** - Consider using PM2 Plus or other monitoring tools
3. **Configure automated backups**
4. **Setup domain email** if needed
5. **Add Google Analytics** or other analytics
6. **Test on mobile devices**
7. **Setup staging environment** for testing before production

---

## Support Resources

- **PM2 Documentation:** https://pm2.keymetrics.io/docs/usage/quick-start/
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas/
- **Let's Encrypt:** https://letsencrypt.org/getting-started/
- **Nginx Documentation:** https://nginx.org/en/docs/

---

## Contact for Issues

If you encounter issues during deployment, check:
1. PM2 logs: `pm2 logs it-ojt-platform`
2. Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. System logs: `sudo journalctl -xe`
