# 📚 Classroom Tools

Simple classroom management tools for teachers.

---

## 📁 This Folder Contains

All files related to the **Classroom Tools** web application:

```
classroom-tools/
├── index.html              # Main application file (cleaned, production-ready)
├── index-new.html          # Alternate/backup version
├── js/                     # JavaScript modules
│   ├── analytics.js        # Visitor tracking
│   ├── app.js              # Main app logic
│   ├── proxy.js            # Proxy functionality
│   └── styles.js           # Dynamic styles
├── config.example.js       # Configuration template
├── PROXY-CONFIG.md         # Proxy setup quick guide
└── README.md               # This file
```

---

## ✨ Features

### Built-in Widgets:

- ⏱️ **Timer** - Countdown timer for activities
- 🕐 **Clock** - Live clock and date display  
- 🎯 **Name Picker** - Random student selector
- 📝 **Notes** - Text area for quick notes
- 🚦 **Traffic Light** - Visual status indicator
- 🔢 **Dice** - Random number generator
- 👥 **Work Mode** - Activity type indicators
- 🎨 **Whiteboard** - Drawing canvas
- 📚 **Resources** - Website viewer with iframe support
- 👥 **Groups** - Random group generator
- 📋 **Agenda** - Checklist/todo manager
- 📈 **Analytics** - Visitor statistics

---

## 🚀 Usage

### Local Development:

```bash
# Simply open in a browser
open index.html

# Or use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

### Deploy to GitHub Pages:

The main `index.html` and `js/` folder are copied to the root directory for GitHub Pages compatibility.

1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Done! ✅

---

## 🔧 Configuration

### Proxy Server (Optional)

The Resource Viewer widget can load external websites via a proxy server.

**Quick Setup:**

1. Deploy the proxy server (see `../server/DEPLOYMENT-GUIDE.md`)
2. Copy `config.example.js` to `config.js`
3. Update with your server URL:
   ```javascript
   window.PROXY_SERVER_URL = 'https://your-server.com';
   ```
4. Include in HTML:
   ```html
   <script src="config.js"></script>
   ```

**See:** `PROXY-CONFIG.md` for detailed instructions

---

## 🏗️ Project Structure

```
rafas-classroom/
├── CNAME                   # GitHub Pages domain config
├── index.html              # Main entry (copied from classroom-tools/)
├── js/                     # JS files (copied from classroom-tools/)
├── classroom-tools/        # 👈 THIS FOLDER - Source files
├── games/                  # Separate games project
└── server/                 # Proxy server
```

**Note:** `index.html` and `js/` exist in both root and `classroom-tools/`.  
The root copies are for GitHub Pages. Edit files in `classroom-tools/` then copy to root.

---

## 🎨 Customization

### Change Site Name:

Edit `index.html` lines:
- Line ~34: `<title>`
- Line ~862: Header logo
- Line ~886: Footer

### Add/Remove Widgets:

Edit `addWidget()` function starting around line ~939

### Styling:

All CSS is embedded in `index.html` (lines ~35-808)

---

## 📊 Analytics

The site tracks:
- **Total visitors** (global, via CounterAPI)
- **Your visits** (local, via localStorage)
- **Last 7 days chart** (your browser only)

No personal data is collected or stored externally.

---

## 🔒 Privacy & Security

- ✅ No user accounts or authentication
- ✅ No personal data collection
- ✅ All widgets work client-side
- ✅ LocalStorage only for your own stats
- ✅ Optional proxy server for resource loading

---

## 🐛 Known Limitations

1. **Resource Viewer requires proxy server** in production (or some sites will block)
2. **Some websites block iframes** (expected behavior, not a bug)
3. **Render free tier sleeps** after inactivity (first load slow)

---

## 📚 Documentation

- **Proxy Setup:** `PROXY-CONFIG.md` (quick guide)
- **Server Deployment:** `../server/DEPLOYMENT-GUIDE.md` (complete guide)
- **Server Details:** `../server/README.md`

---

## 🎯 Version Info

- **Name:** Classroom Tools (formerly EduTools Pro)
- **Version:** 3.2.1 (cleaned/optimized)
- **Updated:** February 2026
- **License:** MIT

---

## 🤝 Contributing

This is a personal project, but feel free to:
- Fork and customize
- Report issues
- Suggest improvements

---

## ⚠️ Important Notes

### For GitHub Pages:

After editing files in this folder, copy to root:

```bash
cp classroom-tools/index.html .
cp -r classroom-tools/js .
```

### For Local Development:

You can work directly in this folder. Just open `index.html`.

---

**Happy Teaching! 📚✨**
