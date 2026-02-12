# 🚀 Deploy to VPS (DigitalOcean/AWS/Azure)

## 📋 Overview

This guide covers deploying to a Virtual Private Server (VPS) for full control.

**Platforms Covered:**
- DigitalOcean Droplet
- AWS EC2
- Azure VM
- Any Ubuntu/Debian VPS

**Time Required:** 1-2 hours

---

## 🎯 Step 1: Setup VPS

### Option A: DigitalOcean (Recommended for Beginners)

1. Go to https://www.digitalocean.com/
2. Create account
3. Click "Create" → "Droplets"
4. Choose:
   - **Image:** Ubuntu 22.04 LTS
   - **Plan:** Basic ($6/month)
   - **CPU:** Regular (1GB RAM)
   - **Datacenter:** Closest to you
   - **Authentication:** SSH Key (recommended) or Password
5. Click "Create Droplet"
6. Note your IP address: `123.456.789.0`

### Option B: AWS EC2

1. Go to AWS Console
2. Launch EC2 instance
3. Choose Ubuntu 22.04 AMI
4. Instance type: t2.micro (free tier)
5. Configure security group (ports 22, 80, 443, 4000, 3000)
6. Launch and download key pair

### Option C: Azure VM

1. Go to Azure Portal
2. Create Virtual Machine
3. Choose Ubuntu 22.04
4. Size: B1s (free tier eligible)
5. Configure networking
6. Create

---

## 🎯 Step 2: Connect to VPS

### Via SSH

```bash
# DigitalOcean/Generic VPS
ssh root@YOUR_IP_ADDRESS

# AWS EC2
ssh -i your-key.pem ubuntu@YOUR_IP_ADDRESS

# Azure
ssh azureuser@YOUR_IP_ADDRESS
```

---

## 🎯 Step 3: Initial Server Setup

### 3.1 Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### 3.2 Install Node.js

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### 3.3 Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### 3.4 Install Nginx (Web Server)

```bash
sudo apt install -y nginx
```

### 3.5 Setup Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## 🎯 Step 4: Setup MongoDB

### Option A: MongoDB Atlas (Recommended)

Follow MongoDB Atlas setup from `DEPLOY_VERCEL_RAILWAY.md`

### Option B: Install MongoDB on VPS

```bash
# Import MongoDB GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
sudo systemctl status mongod
```

---

## 🎯 Step 5: Deploy Backend

### 5.1 Clone Repository

```bash
cd /var/www
sudo git clone https://github.com/YOUR_USERNAME/internal-dashboard.git
cd internal-dashboard
```

### 5.2 Setup Backend

```bash
cd backend
sudo npm install

# Create .env file
sudo nano .env
```

Add environment variables:
```env
MONGODB_URI=mongodb://localhost:27017/internal-dashboard
# Or use MongoDB Atlas URI

PAYLOAD_SECRET=your-super-secret-key-at-least-32-characters-long

PORT=4000

FRONTEND_URL=http://YOUR_IP_ADDRESS

NODE_ENV=production
```

Save: `Ctrl+X`, `Y`, `Enter`

### 5.3 Build Backend

```bash
sudo npm run build
```

### 5.4 Seed Database

```bash
sudo npm run seed
```

### 5.5 Start Backend with PM2

```bash
sudo pm2 start npm --name "backend" -- start
sudo pm2 save
sudo pm2 startup
```

### 5.6 Verify Backend

```bash
curl http://localhost:4000/api
# Should return API response
```

---

## 🎯 Step 6: Deploy Frontend

### 6.1 Setup Frontend

```bash
cd /var/www/internal-dashboard/frontend
sudo npm install

# Create .env.local
sudo nano .env.local
```

Add:
```env
NEXT_PUBLIC_API_URL=http://YOUR_IP_ADDRESS:4000/api
NODE_ENV=production
```

### 6.2 Build Frontend

```bash
sudo npm run build
```

### 6.3 Start Frontend with PM2

```bash
sudo pm2 start npm --name "frontend" -- start
sudo pm2 save
```

### 6.4 Verify Services

```bash
sudo pm2 list
# Should show both backend and frontend running
```

---

## 🎯 Step 7: Configure Nginx

### 7.1 Create Nginx Config

```bash
sudo nano /etc/nginx/sites-available/internal-dashboard
```

Add this configuration:

```nginx
# Backend API
server {
    listen 80;
    server_name YOUR_IP_ADDRESS;

    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /admin {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 7.2 Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/internal-dashboard /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

---

## 🎯 Step 8: Setup SSL (HTTPS)

### 8.1 Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 8.2 Get SSL Certificate

**If you have a domain:**
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

**If using IP only:**
SSL not available for IP addresses. Consider using a free domain from:
- Freenom
- No-IP
- DuckDNS

### 8.3 Auto-Renewal

```bash
sudo certbot renew --dry-run
```

---

## 🎯 Step 9: Setup Domain (Optional)

### 9.1 Point Domain to VPS

Add DNS records:
```
Type: A
Name: @
Value: YOUR_IP_ADDRESS

Type: A
Name: www
Value: YOUR_IP_ADDRESS
```

### 9.2 Update Nginx Config

```bash
sudo nano /etc/nginx/sites-available/internal-dashboard
```

Change `server_name YOUR_IP_ADDRESS` to `server_name yourdomain.com www.yourdomain.com`

```bash
sudo nginx -t
sudo systemctl restart nginx
```

### 9.3 Update Environment Variables

**Backend:**
```bash
cd /var/www/internal-dashboard/backend
sudo nano .env
```
Update `FRONTEND_URL=https://yourdomain.com`

**Frontend:**
```bash
cd /var/www/internal-dashboard/frontend
sudo nano .env.local
```
Update `NEXT_PUBLIC_API_URL=https://yourdomain.com/api`

Restart services:
```bash
sudo pm2 restart all
```

---

## 🎯 Step 10: Monitoring & Maintenance

### 10.1 View Logs

```bash
# PM2 logs
sudo pm2 logs

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# MongoDB logs (if local)
sudo tail -f /var/log/mongodb/mongod.log
```

### 10.2 PM2 Commands

```bash
# List processes
sudo pm2 list

# Restart service
sudo pm2 restart backend
sudo pm2 restart frontend

# Stop service
sudo pm2 stop backend

# Delete service
sudo pm2 delete backend

# Monitor
sudo pm2 monit
```

### 10.3 Update Application

```bash
cd /var/www/internal-dashboard
sudo git pull origin main

# Update backend
cd backend
sudo npm install
sudo npm run build
sudo pm2 restart backend

# Update frontend
cd ../frontend
sudo npm install
sudo npm run build
sudo pm2 restart frontend
```

---

## 📊 Deployment Summary

### Your URLs
```
Frontend:  http://YOUR_IP_ADDRESS (or https://yourdomain.com)
Backend:   http://YOUR_IP_ADDRESS:4000 (or https://yourdomain.com/api)
Admin:     http://YOUR_IP_ADDRESS/admin
```

### Services Running
```bash
sudo pm2 list
# backend - port 4000
# frontend - port 3000
```

### Nginx Configuration
```
Port 80/443 → Nginx → Backend (4000) + Frontend (3000)
```

---

## 🐛 Troubleshooting

### Issue 1: Can't Connect to Server
```bash
# Check firewall
sudo ufw status

# Allow ports
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 4000
sudo ufw allow 3000
```

### Issue 2: Services Not Running
```bash
# Check PM2
sudo pm2 list
sudo pm2 logs

# Restart services
sudo pm2 restart all
```

### Issue 3: Nginx Error
```bash
# Check configuration
sudo nginx -t

# Check logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### Issue 4: MongoDB Connection Failed
```bash
# Check MongoDB status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check logs
sudo tail -f /var/log/mongodb/mongod.log
```

---

## 💰 Cost Estimate

### DigitalOcean
- Basic Droplet: $6/month
- 1GB RAM, 25GB SSD
- 1TB transfer

### AWS EC2
- t2.micro: Free tier (1 year)
- Then ~$8/month

### Azure VM
- B1s: ~$8/month
- Free tier available

---

## 🔒 Security Checklist

- [ ] SSH key authentication enabled
- [ ] Password authentication disabled
- [ ] Firewall configured (UFW)
- [ ] SSL certificate installed
- [ ] MongoDB authentication enabled
- [ ] Regular backups configured
- [ ] Fail2ban installed (optional)
- [ ] Automatic security updates enabled

---

## 🎉 Success!

Your application is deployed on your own VPS! 🚀

**Advantages:**
- Full control over server
- No platform limitations
- Can install any software
- Better performance

**Maintenance Required:**
- Server updates
- Security patches
- Backups
- Monitoring

---

## 📞 Need Help?

**Useful Commands:**
```bash
# System status
sudo systemctl status nginx
sudo systemctl status mongod
sudo pm2 list

# Logs
sudo pm2 logs
sudo tail -f /var/log/nginx/error.log

# Restart everything
sudo pm2 restart all
sudo systemctl restart nginx
```

---

**Congratulations on your VPS deployment!** 🎊✨
