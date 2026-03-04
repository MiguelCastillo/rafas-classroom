# 🔧 Quick Proxy Configuration Guide

## The Problem
The Resource Viewer feature needs a proxy server to load external websites. Without it, the feature won't work in production (only localhost).

## ✅ Fixed Issues

1. **Endpoint Mismatch** - Server now responds to both `/api/proxy` and `/api/content`
2. **Placeholder URL** - Client now uses configurable server URL

## 🚀 Quick Setup (3 Steps)

### 1. Deploy the Server (Choose One)

**Easiest: Railway**
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select this repo, set root to `server/`
4. Copy your URL (e.g., `https://your-app.railway.app`)

**Alternative: Render**
- See full guide: `server/DEPLOYMENT-GUIDE.md`

### 2. Configure Client

**Option A: Use config.js (Recommended)**
```bash
cp config.example.js config.js
```

Edit `config.js`:
```javascript
window.PROXY_SERVER_URL = 'https://your-railway-app.railway.app';
```

Include in HTML before closing `</head>`:
```html
<script src="config.js"></script>
```

**Option B: Edit index.html directly**

Find line ~1276 and replace:
```javascript
: (window.PROXY_SERVER_URL || 'http://localhost:3000');
```

With:
```javascript
: 'https://your-railway-app.railway.app';
```

### 3. Update CORS (Important!)

Edit `server/server.js` line 16:
```javascript
origin: [
    'https://smart-classroom.castillo.me',
    'https://your-domain.com',  // ← Add your domain
    'http://localhost:8080',
    'http://127.0.0.1:8080'
],
```

Commit and push (Railway auto-deploys).

## 🧪 Test It

1. Visit: `https://your-server.com/api/health`
   - Should return: `{"status": "ok", ...}`

2. In your app:
   - Click "📚 Resources"
   - Enter a URL (e.g., `desmos.com`)
   - Click "Load"
   - Content should appear!

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Server not running" | Check `/api/health` endpoint |
| CORS error | Add your domain to CORS whitelist |
| Slow first load (Render) | Normal - free tier spins down |
| Some sites don't load | Expected - they block iframes |

## 📚 Full Documentation

- Complete deployment guide: `server/DEPLOYMENT-GUIDE.md`
- Server setup details: `server/README.md`
- Architecture overview: `classroom-tools/README.md`

## ⚡ Status

- ✅ Endpoint mismatch fixed (server responds to `/api/content`)
- ✅ Client configuration system added
- ✅ Deployment configs ready (Railway, Render, Fly.io)
- ⏳ Waiting for you to deploy server
- ⏳ Waiting for you to configure client URL

**The code is ready - just deploy and configure!** 🎉
