# SeekProof Production Deployment & Operations Guide

This guide details the complete deployment, security hardening, and operational maintenance procedures for the **SeekProof** enterprise private investigation and corporate intelligence platform.

---

## 1. System Architecture Overview

```mermaid
graph TD
    Client[Web Browser / Mobile Client] -->|HTTPS 443 / WSS| CDN[Cloudflare / Edge CDN]
    CDN -->|TLS Reverse Proxy| Nginx[Nginx Reverse Proxy / Load Balancer]
    Nginx -->|Static Assets / SPA Fallback| Dist[client/dist]
    Nginx -->|API Proxy: /api/v1/*| NodeApp[Node.js Express API Cluster (PM2)]
    NodeApp -->|Encrypted Pool Connection| DB[(MySQL 8.0+ Enterprise Database)]
    NodeApp -->|Audit & Error Logs| LogVault[/var/log/seekproof/]
```

---

## 2. Environment Variables & Secret Configuration

Create `/etc/seekproof/production.env` with restricted permissions (`chmod 600`):

### Server Configuration (`server/.env`)
```env
# Application Runtime
NODE_ENV=production
PORT=5000
API_PREFIX=/api/v1

# Security & CORS
ALLOWED_ORIGINS=https://seekproof.in,https://www.seekproof.in
CORS_CREDENTIALS=true

# Database Connection Pool
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=seekproof_db_user
DB_PASSWORD=YOUR_STRONG_DATABASE_PASSWORD_HERE
DB_NAME=seekproof_db
DB_CONNECTION_LIMIT=20
DB_QUEUE_LIMIT=0
DB_WAIT_FOR_CONNECTIONS=true

# Cryptographic Token Secrets (Generate using: openssl rand -base64 64)
JWT_SECRET=YOUR_SUPER_LONG_CRYPTOGRAPHIC_JWT_SECRET_STRING_64_CHARS_MIN
JWT_EXPIRES_IN=8h
REFRESH_TOKEN_SECRET=YOUR_SUPER_LONG_REFRESH_TOKEN_SECRET_STRING_64_CHARS_MIN
REFRESH_TOKEN_EXPIRES_IN=7d

# Rate Limiting & DoS Protection
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
AUTH_RATE_LIMIT_MAX=5
```

### Client Configuration (`client/.env.production`)
```env
VITE_API_URL=https://seekproof.in/api
VITE_SITE_URL=https://seekproof.in
VITE_EMERGENCY_HOTLINE=+91 7304679756
VITE_ADVISORY_PHONE=+91 9152695373
VITE_CONTACT_EMAIL=seekproof47@gmail.com
VITE_OFFICE_ADDRESS=Maker Chambers V, Nariman Point, Mumbai, Maharashtra 400021, India
VITE_ENCRYPTION_ID=SP-PGP-90218-SEC
```

---

## 3. Production Build & Deployment Pipeline

### Step 1: Install Dependencies & Build
```bash
# 1. Clone or pull repository
git pull origin main

# 2. Build Server
cd server
npm ci --omit=dev
npm run build

# 3. Build Client Frontend SPA
cd ../client
npm ci
npm run build
```

### Step 2: Database Migrations
```bash
# Run database schema migrations and seed scripts
cd ../server
npm run db:migrate
```

---

## 4. Process Management (PM2 Cluster)

Create `ecosystem.config.js` in the project root:

```javascript
module.exports = {
  apps: [
    {
      name: 'seekproof-api',
      script: './server/dist/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/var/log/seekproof/api-error.log',
      out_file: '/var/log/seekproof/api-out.log',
      merge_logs: true
    }
  ]
};
```

### Launch Commands:
```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

---

## 5. Nginx Reverse Proxy & SSL Hardening

Place the following configuration in `/etc/nginx/sites-available/seekproof.conf`:

```nginx
# HTTP to HTTPS Redirect
server {
    listen 80;
    listen [::]:80;
    server_name seekproof.in www.seekproof.in;
    return 301 https://seekproof.in$request_uri;
}

# Production HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name seekproof.in www.seekproof.in;

    # SSL Certificates (Let's Encrypt / Certbot)
    ssl_certificate /etc/letsencrypt/live/seekproof.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seekproof.in/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    # Modern TLS Hardening
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src 'self' https://www.google.com; connect-src 'self' https://seekproof.in https://wa.me;" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    # Root Directory for React Client SPA
    root /var/www/seekproof/client/dist;
    index index.html;

    # Client SPA Routing Fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static Assets Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }

    # API Proxy
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90s;
    }

    # Sitemap and Robots.txt
    location = /sitemap.xml {
        try_files /sitemap.xml =404;
    }

    location = /robots.txt {
        try_files /robots.txt =404;
    }
}
```

---

## 6. Health Checks, Monitoring & Backups

### Automated Daily Database Backup Script
Create `/usr/local/bin/backup-seekproof-db.sh`:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/seekproof/db"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
mkdir -p "$BACKUP_DIR"

mysqldump -u seekproof_db_user -p"$DB_PASSWORD" seekproof_db | gzip > "$BACKUP_DIR/seekproof_backup_$TIMESTAMP.sql.gz"

# Retain last 30 days only
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +30 -exec rm {} \;
```

Cron Job:
```cron
0 2 * * * /usr/local/bin/backup-seekproof-db.sh > /dev/null 2>&1
```

### Health Check Endpoint
- **URL**: `https://seekproof.in/api/v1/health`
- **Expected Response**: `{"status":"UP","timestamp":"2026-09-10T...","database":"healthy"}`
