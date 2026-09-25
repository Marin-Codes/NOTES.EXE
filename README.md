# NOTES.EXE 💾

### Student Notes Platform — Windows 95 × Y2K × Gen Z

> "A computer from 1998 that somehow became a student productivity app in 2026."

NOTES.EXE is a nostalgic, student-focused notes platform designed around an authentic **Windows 95 + Y2K + Gen Z internet aesthetic**. Built with pure vanilla web technologies with zero build steps or heavy dependencies.

---

## ⚡ Features

- **🖥️ Retro Desktop OS Interface**:
  - Classic Windows 95 titlebars, bevels, drop shadows, and window controls (minimize/maximize/close).
  - Windows XP Bliss wallpaper background with authentic desktop icons.
  - Interactive Start Menu with fast access to all views and utilities.
  - Windows Taskbar with running window status, system tray, and live clock.
  - Retro pixel cursor and boot screen terminal sequence.

- **📁 Notes Explorer**:
  - Hierarchical semester folders (Semester 1–6) and subject drives.
  - Unit-wise notes organization with breadcrumb path navigation.

- **📚 Browse & Filter Notes**:
  - Filter by semester, subject, and note type (Notes, Cheat Sheets, Important Questions, Previous Papers, Formula Sheets, Summaries).
  - Sort by recent, rating, downloads, or title.

- **🔍 Live Search**:
  - Real-time search across note titles, descriptions, subjects, and tags.

- **💾 Saved Notes & Note Viewer**:
  - Save and unsave notes with instant feedback and toast notifications.
  - Modal note viewer styled like a Windows application with formatted content, ratings, download counters, and tag badges.
  - All saved notes and custom uploads persist in `localStorage`.

- **📤 Note Upload System**:
  - Upload notes with title, subject, semester, unit, type, tags, description, and markdown content.
  - Newly uploaded notes immediately appear in the system and persist locally.

- **👤 Student Profile**:
  - Retro profile card with student stats (upload count, saved count, helpfulness score).
  - Editable user profile information and pixel avatar.

- **📱 Fully Responsive**:
  - Desktop view with desktop icons, full Windows chrome, and taskbar.
  - Mobile-optimized interface with a retro mobile navigation bar.

---

## 🚀 Getting Started

No build tools, Node modules, or package managers required.

Simply clone the repository and open `index.html` in any modern browser:

```bash
git clone https://github.com/Marin-Codes/NOTES.EXE.git
cd NOTES.EXE
```

Double click `index.html` or serve with any static server:

```bash
# Python
python -m http.server 3000

# or Node / npx
npx serve .
```

---

## 🗂️ Project Structure

```
NOTES.EXE/
├── index.html              # Main OS shell and application windows
├── README.md               # Project documentation
├── assets/
│   ├── backgrounds/        # Bliss wallpaper & desktop backgrounds
│   └── icons/              # Custom transparent pixel art icons (computer, books, clipboard, etc.)
├── css/
│   └── style.css           # Complete retro design system & responsive styling
└── js/
    ├── app.js              # Application controller & view routing
    ├── boot.js             # Retro boot screen & startup animation
    ├── data.js             # Initial curriculum data & sample notes
    ├── filters.js          # Semester & subject filter logic
    ├── modal.js            # Window modal manager
    ├── notes.js            # Note rendering & Explorer views
    ├── notifications.js    # Windows toast notification system
    ├── search.js           # Full-text query engine
    ├── storage.js          # LocalStorage persistence manager
    ├── ui.js               # UI components & DOM utilities
    └── upload.js           # Note submission & validation handler
```

---

## 🌐 Deploy to GitHub Pages

1. Go to repository **Settings** → **Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose branch `main` and folder `/ (root)`.
4. Click **Save**. Your site will be live at `https://marin-codes.github.io/NOTES.EXE/`!

---

## 📄 License

MIT License. Designed with nostalgia for students everywhere. 🌸