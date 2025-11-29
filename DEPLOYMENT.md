# IT OJT Platform - Production Deployment Guide

## Prerequisites for GoDaddy VPS or Any Server

### System Requirements:
- Node.js v16+ installed
- MongoDB v4.4+ installed (or MongoDB Atlas cloud account)
- PM2 process manager
- Nginx (optional, for reverse proxy)
- SSL certificate (Let's Encrypt recommended)

## Step 1: Server Setup

### Install Node.js on your server:
```bash
# For Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Install MongoDB (or use MongoDB Atlas):
```bash
# Option A: Local MongoDB (Ubuntu/Debian)
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Option B: MongoDB Atlas (Recommended)
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create free cluster
# 3. Get connection string
```

### Install PM2 (Process Manager):
```bash
sudo npm install -g pm2
```

## Step 2: Upload Your Application

### Option A: Using Git (Recommended)
```bash
cd /var/www
git clone https://github.com/jayher0824-coder/Capstone-1-2.git it-ojt-platform
cd it-ojt-platform
```

### Option B: Using FTP/SFTP
1. Upload all files to `/var/www/it-ojt-platform`
2. Make sure all files are uploaded

## Step 3: Configure Environment Variables

```bash
cd /var/www/it-ojt-platform

# Copy example env file
cp .env.example .env

# Edit with your production settings
nano .env
```

### Required Environment Variables:
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://localhost:27017/it-ojt-platform
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/it-ojt-platform

JWT_SECRET=CHANGE_THIS_TO_RANDOM_STRING_min_32_characters_long
SESSION_SECRET=CHANGE_THIS_TO_RANDOM_STRING_min_32_characters
CLIENT_URL=https://yourdomain.com
CORS_ORIGIN=https://yourdomain.com
```

**IMPORTANT:** Generate secure secrets:
```bash
# Generate random secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 4: Install Dependencies

```bash
npm install --production
```

## Step 5: Create Required Directories

```bash
mkdir -p uploads/resumes uploads/avatars
mkdir -p logs
chmod 755 uploads
chmod 755 logs
```

## Step 6: Start Application with PM2

```bash
# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Set up PM2 to start on system boot
pm2 startup
# Follow the command it outputs

# Check application status
pm2 status
pm2 logs it-ojt-platform
```

## Step 7: Set Up Nginx Reverse Proxy (Recommended)

### Install Nginx:
```bash
sudo apt-get install -y nginx
```

### Create Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/it-ojt-platform
```

### Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration (after getting SSL certificate)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Static files
    location /uploads {
        alias /var/www/it-ojt-platform/uploads;
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    # Proxy to Node.js application
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

    # File upload size limit
    client_max_body_size 10M;
}
```

### Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/it-ojt-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 8: Get SSL Certificate (HTTPS)

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
# Test renewal:
sudo certbot renew --dry-run
```

## Step 9: Set Up Firewall

```bash
# Allow necessary ports
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

## Step 10: Create Admin User

```bash
cd /var/www/it-ojt-platform
npm run create-admin
```

## Useful PM2 Commands

```bash
# View logs
pm2 logs it-ojt-platform

# Restart application
pm2 restart it-ojt-platform

# Stop application
pm2 stop it-ojt-platform

# Monitor
pm2 monit

# View status
pm2 status

# Delete from PM2
pm2 delete it-ojt-platform
```

## Updating Your Application

```bash
cd /var/www/it-ojt-platform

# Pull latest changes
git pull origin main

# Install new dependencies
npm install --production

# Restart application
pm2 restart it-ojt-platform
```

## Troubleshooting

### Application won't start:
```bash
# Check logs
pm2 logs it-ojt-platform --lines 100

# Check if MongoDB is running
sudo systemctl status mongodb

# Check if port 3000 is available
sudo netstat -tulpn | grep 3000
```

### MongoDB connection issues:
```bash
# Test MongoDB connection
mongo --eval "db.adminCommand('ping')"

# Check MongoDB status
sudo systemctl status mongodb
```

### Nginx issues:
```bash
# Test configuration
sudo nginx -t

# Check error log
sudo tail -f /var/log/nginx/error.log
```

## Security Checklist

- [ ] Changed JWT_SECRET to random string
- [ ] Changed SESSION_SECRET to random string
- [ ] Set NODE_ENV=production
- [ ] Configured firewall (ufw)
- [ ] SSL certificate installed
- [ ] Disabled MongoDB remote access (if not using Atlas)
- [ ] Regular backups configured
- [ ] Updated all passwords
- [ ] Set up log rotation

## Backup Strategy

```bash
# Create backup script
sudo nano /usr/local/bin/backup-ojt.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/ojt"
mkdir -p $BACKUP_DIR

# Backup MongoDB
mongodump --out $BACKUP_DIR/mongodb_$DATE

# Backup uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /var/www/it-ojt-platform/uploads

# Remove backups older than 7 days
find $BACKUP_DIR -type f -mtime +7 -delete
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-ojt.sh

# Add to crontab (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup-ojt.sh") | crontab -
```

## Support

For issues or questions:
- Check logs: `pm2 logs it-ojt-platform`
- Check MongoDB: `sudo systemctl status mongodb`
- Check Nginx: `sudo systemctl status nginx`

## Important URLs

- Application: https://yourdomain.com
- MongoDB Atlas: https://cloud.mongodb.com
- Let's Encrypt: https://letsencrypt.org

---

**Note:** This guide assumes a Linux VPS. If you're using GoDaddy shared hosting, you'll need to upgrade to VPS or use a cloud platform like Render.com or Railway.app instead.
