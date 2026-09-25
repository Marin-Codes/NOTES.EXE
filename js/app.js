// ═══════════════════════════════════════════
// NOTES.EXE — APP MODULE
// Main application initialization & routing
// ═══════════════════════════════════════════

const App = {
  currentView: 'home',

  init() {
    // Initialize all modules
    Notifications.init();
    Modal.init();
    Boot.init();
    Upload.init();

    // Initial renders
    Notes.renderHome();
    Notes.renderExplorer();
    Notes.renderSavedNotes();
    Notes.renderProfile();
    Notes.renderAllNotes();
    UI.updateSavedCount();

    // Bind navigation
    this.bindNavigation();
    this.bindSearch();
    this.bindFilters();
    this.bindDesktopIcons();
    this.bindStartMenu();

    // Update clock
    UI.updateClock();
    setInterval(() => UI.updateClock(), 30000);

    // Set initial view
    this.navigate('home');
  },

  // ─── Navigation ────────────────────────
  navigate(view) {
    this.currentView = view;

    // Update views
    document.querySelectorAll('.view').forEach(v => {
      v.classList.remove('view--active');
    });
    const target = document.getElementById(`view-${view}`);
    if (target) {
      target.classList.add('view--active');
    }

    // Update nav
    document.querySelectorAll('.nav__item').forEach(item => {
      item.classList.remove('nav__item--active');
    });
    document.querySelectorAll(`.nav__item[data-view="${view}"]`).forEach(item => {
      item.classList.add('nav__item--active');
    });

    // Update mobile nav
    document.querySelectorAll('.mobile-nav__item').forEach(item => {
      item.classList.remove('mobile-nav__item--active');
    });
    document.querySelectorAll(`.mobile-nav__item[data-view="${view}"]`).forEach(item => {
      item.classList.add('mobile-nav__item--active');
    });

    // Update taskbar
    this.updateTaskbar(view);

    // Refresh content for certain views
    if (view === 'saved') Notes.renderSavedNotes();
    if (view === 'profile') Notes.renderProfile();
    if (view === 'notes') Notes.renderExplorer();
    if (view === 'home') Notes.renderHome();
    if (view === 'browse') Notes.renderAllNotes();

    // Scroll to top
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.scrollTop = 0;

    // Close start menu if open
    this.closeStartMenu();
  },

  bindNavigation() {
    // Main nav items
    document.querySelectorAll('.nav__item[data-view]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigate(item.dataset.view);
      });
    });

    // Mobile nav
    document.querySelectorAll('.mobile-nav__item[data-view]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigate(item.dataset.view);
      });
    });

    // Quick action buttons on home
    document.querySelectorAll('[data-navigate]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.navigate(btn.dataset.navigate);
      });
    });
  },

  // ─── Desktop Icons ─────────────────────
  bindDesktopIcons() {
    document.querySelectorAll('.desktop-icon').forEach(icon => {
      icon.addEventListener('dblclick', () => {
        const view = icon.dataset.view;
        if (view) this.navigate(view);
      });
      icon.addEventListener('click', () => {
        // Highlight selected icon
        document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('desktop-icon--selected'));
        icon.classList.add('desktop-icon--selected');
      });
    });
  },

  // ─── Search ────────────────────────────
  bindSearch() {
    const searchInputs = document.querySelectorAll('.search-input');

    searchInputs.forEach(input => {
      let debounceTimer;

      input.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const query = e.target.value.trim();
          if (query.length >= 2) {
            this.navigate('search');
            Notes.renderSearchResults(query);
            // Sync all search inputs
            searchInputs.forEach(si => { if (si !== input) si.value = query; });
          }
        }, 300);
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const query = e.target.value.trim();
          if (query) {
            this.navigate('search');
            Notes.renderSearchResults(query);
            searchInputs.forEach(si => { if (si !== input) si.value = query; });
          }
        }
      });
    });
  },

  // ─── Filters ───────────────────────────
  bindFilters() {
    // Semester filter
    const semFilter = document.getElementById('filter-semester');
    if (semFilter) {
      semFilter.addEventListener('change', (e) => {
        Filters.setFilter('semester', e.target.value);
        // Update subject dropdown
        this.updateFilterSubjects(e.target.value);
        Notes.renderAllNotes();
      });
    }

    // Subject filter
    const subFilter = document.getElementById('filter-subject');
    if (subFilter) {
      subFilter.addEventListener('change', (e) => {
        Filters.setFilter('subject', e.target.value);
        Notes.renderAllNotes();
      });
    }

    // Type filter
    const typeFilter = document.getElementById('filter-type');
    if (typeFilter) {
      typeFilter.addEventListener('change', (e) => {
        Filters.setFilter('type', e.target.value);
        Notes.renderAllNotes();
      });
    }

    // Sort filter
    const sortFilter = document.getElementById('filter-sort');
    if (sortFilter) {
      sortFilter.addEventListener('change', (e) => {
        Filters.setFilter('sort', e.target.value);
        Notes.renderAllNotes();
      });
    }

    // Reset button
    const resetBtn = document.getElementById('filter-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        Filters.resetFilters();
        // Reset all dropdowns
        document.querySelectorAll('.filter-select').forEach(s => s.selectedIndex = 0);
        Notes.renderAllNotes();
      });
    }
  },

  updateFilterSubjects(semester) {
    const subFilter = document.getElementById('filter-subject');
    if (!subFilter) return;

    const subjects = semester
      ? NotesData.SUBJECTS.filter(s => s.semester === parseInt(semester))
      : NotesData.SUBJECTS;

    subFilter.innerHTML = '<option value="">All Subjects</option>';
    subjects.forEach(s => {
      subFilter.innerHTML += `<option value="${s.id}">${s.icon} ${s.name}</option>`;
    });
  },

  // ─── Start Menu ────────────────────────
  bindStartMenu() {
    const startBtn = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');

    if (startBtn && startMenu) {
      startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startMenu.classList.toggle('start-menu--visible');
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!startMenu.contains(e.target) && e.target !== startBtn) {
          this.closeStartMenu();
        }
      });

      // Start menu items
      startMenu.querySelectorAll('[data-view]').forEach(item => {
        item.addEventListener('click', () => {
          this.navigate(item.dataset.view);
          this.closeStartMenu();
        });
      });
    }
  },

  closeStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (startMenu) startMenu.classList.remove('start-menu--visible');
  },

  // ─── Taskbar ───────────────────────────
  updateTaskbar(view) {
    const viewLabels = {
      home: '<img src="assets/icons/computer.png" class="taskbar__window-pixel-icon" alt=""> Home',
      notes: '<img src="assets/icons/search-folder.png" class="taskbar__window-pixel-icon" alt=""> Explorer',
      browse: '<img src="assets/icons/books.png" class="taskbar__window-pixel-icon" alt=""> Browse',
      search: '🔎 Search',
      saved: '<img src="assets/icons/clipboard.png" class="taskbar__window-pixel-icon" alt=""> Saved',
      upload: '📤 Upload',
      profile: '<img src="assets/icons/profile.png" class="taskbar__window-pixel-icon" alt=""> Profile'
    };

    const activeWindow = document.getElementById('taskbar-active-window');
    if (activeWindow) {
      activeWindow.innerHTML = viewLabels[view] || view;
    }
  }
};

// ─── Initialize on DOM Ready ─────────────
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

window.App = App;
