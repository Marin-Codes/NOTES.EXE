// ═══════════════════════════════════════════
// NOTES.EXE — NOTES MODULE
// Note rendering, subject explorer, views
// ═══════════════════════════════════════════

const Notes = {
  currentPath: [], // breadcrumb trail

  // ─── Render Home Page ──────────────────
  renderHome() {
    this.renderTrendingNotes();
    this.renderRecentNotes();
    this.renderSystemStatus();
    this.renderWelcomeMessage();
  },

  renderWelcomeMessage() {
    const el = document.getElementById('welcome-message');
    if (!el) return;
    const profile = Storage.getProfile();
    const msgs = NotesData.MESSAGES.welcome;
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    el.innerHTML = `
      <h2 class="welcome__title">HELLO, ${UI.escapeHtml(profile.name.toUpperCase())}! 👋</h2>
      <p class="welcome__subtitle">${msg}</p>
    `;
  },

  renderTrendingNotes() {
    const container = document.getElementById('trending-notes');
    if (!container) return;
    const allNotes = Storage.getAllNotes();
    const trending = [...allNotes].sort((a, b) => b.downloads - a.downloads).slice(0, 4);
    UI.renderNoteGrid(trending, container);
  },

  renderRecentNotes() {
    const container = document.getElementById('recent-notes');
    if (!container) return;
    const allNotes = Storage.getAllNotes();
    const recent = [...allNotes].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 4);
    UI.renderNoteGrid(recent, container);
  },

  renderSystemStatus() {
    const el = document.getElementById('system-status');
    if (!el) return;
    const s = NotesData.SYSTEM_STATUS;
    const allNotes = Storage.getAllNotes();
    el.innerHTML = `
      <div class="status-grid">
        <div class="status-item">
          <span class="status-item__label">Notes indexed</span>
          <span class="status-item__value">${allNotes.length} <span class="status-ok">✓</span></span>
        </div>
        <div class="status-item">
          <span class="status-item__label">Subjects</span>
          <span class="status-item__value">${NotesData.SUBJECTS.length} <span class="status-ok">✓</span></span>
        </div>
        <div class="status-item">
          <span class="status-item__label">Students online</span>
          <span class="status-item__value">${s.studentsOnline} <span class="status-ok">✓</span></span>
        </div>
        <div class="status-item">
          <span class="status-item__label">Coffee consumed</span>
          <span class="status-item__value">${s.coffeeConsumed} ☕</span>
        </div>
      </div>
    `;
  },

  // ─── Render Subject Explorer ───────────
  renderExplorer() {
    const container = document.getElementById('explorer-content');
    if (!container) return;

    this.currentPath = [];
    this.updateBreadcrumb();

    container.innerHTML = '';
    const allNotes = Storage.getAllNotes();

    NotesData.SEMESTERS.forEach(sem => {
      const subjects = NotesData.SUBJECTS.filter(s => s.semester === sem.id);
      if (subjects.length > 0) {
        container.appendChild(UI.createSemesterFolder(sem, subjects.length));
      }
    });
  },

  openSemester(semester) {
    const container = document.getElementById('explorer-content');
    if (!container) return;

    this.currentPath = [{ label: semester.name, action: () => this.openSemester(semester) }];
    this.updateBreadcrumb();

    container.innerHTML = '';
    const allNotes = Storage.getAllNotes();
    const subjects = NotesData.SUBJECTS.filter(s => s.semester === semester.id);

    subjects.forEach(subject => {
      const count = allNotes.filter(n => n.subject === subject.id).length;
      container.appendChild(UI.createSubjectFolder(subject, count));
    });

    // Back button
    const backBtn = UI.create('div', 'folder folder--back');
    backBtn.innerHTML = `
      <div class="folder__icon">⬆️</div>
      <div class="folder__info">
        <span class="folder__name">.. Back to Semesters</span>
      </div>
    `;
    backBtn.addEventListener('click', () => this.renderExplorer());
    container.insertBefore(backBtn, container.firstChild);
  },

  openSubject(subject) {
    const container = document.getElementById('explorer-content');
    if (!container) return;

    const semester = NotesData.SEMESTERS.find(s => s.id === subject.semester);
    this.currentPath = [
      { label: semester.name, action: () => this.openSemester(semester) },
      { label: subject.name, action: () => this.openSubject(subject) }
    ];
    this.updateBreadcrumb();

    container.innerHTML = '';
    const allNotes = Storage.getAllNotes();
    const subjectNotes = allNotes.filter(n => n.subject === subject.id);

    if (subjectNotes.length === 0) {
      container.appendChild(
        UI.createEmptyState(
          '📂',
          'THIS FOLDER IS EMPTY',
          'Be the first one to add something useful!',
          '📤 UPLOAD NOTE',
          () => App.navigate('upload')
        )
      );
    } else {
      // Group by unit
      const units = [...new Set(subjectNotes.map(n => n.unit))].sort((a, b) => a - b);
      units.forEach(unit => {
        const unitNotes = subjectNotes.filter(n => n.unit === unit);
        const unitHeader = UI.create('div', 'explorer__unit-header');
        unitHeader.innerHTML = `<h3>📁 Unit ${unit} <span class="explorer__unit-count">(${unitNotes.length} files)</span></h3>`;
        container.appendChild(unitHeader);

        const grid = UI.create('div', 'note-grid');
        unitNotes.forEach(note => {
          grid.appendChild(UI.createNoteCard(note));
        });
        container.appendChild(grid);
      });
    }

    // Back button
    const backBtn = UI.create('div', 'folder folder--back');
    backBtn.innerHTML = `
      <div class="folder__icon">⬆️</div>
      <div class="folder__info">
        <span class="folder__name">.. Back to ${semester.name}</span>
      </div>
    `;
    backBtn.addEventListener('click', () => this.openSemester(semester));
    container.insertBefore(backBtn, container.firstChild);
  },

  // ─── Breadcrumb ────────────────────────
  updateBreadcrumb() {
    const breadcrumb = document.getElementById('explorer-breadcrumb');
    if (!breadcrumb) return;

    let html = `<span class="breadcrumb__item breadcrumb__item--clickable" data-action="root">📁 My Computer</span>`;

    this.currentPath.forEach((crumb, i) => {
      html += ` <span class="breadcrumb__separator">›</span> `;
      html += `<span class="breadcrumb__item breadcrumb__item--clickable" data-index="${i}">${crumb.label}</span>`;
    });

    breadcrumb.innerHTML = html;

    // Bind click events
    breadcrumb.querySelector('[data-action="root"]').addEventListener('click', () => this.renderExplorer());
    breadcrumb.querySelectorAll('[data-index]').forEach(el => {
      const index = parseInt(el.dataset.index);
      el.addEventListener('click', () => this.currentPath[index].action());
    });
  },

  // ─── Render Saved Notes ────────────────
  renderSavedNotes() {
    const container = document.getElementById('saved-notes-content');
    if (!container) return;

    const savedIds = Storage.getSavedNotes();
    const allNotes = Storage.getAllNotes();
    const saved = allNotes.filter(n => savedIds.includes(n.id));

    const header = document.getElementById('saved-notes-count');
    if (header) {
      header.textContent = `${saved.length} saved note${saved.length !== 1 ? 's' : ''}`;
    }

    if (saved.length === 0) {
      container.innerHTML = '';
      container.appendChild(
        UI.createEmptyState(
          'assets/icons/clipboard.png',
          'NOTHING HERE YET',
          NotesData.MESSAGES.empty.saved,
          'BROWSE NOTES',
          () => App.navigate('browse')
        )
      );
    } else {
      UI.renderNoteGrid(saved, container);
    }
  },

  // ─── Render Search Results ─────────────
  renderSearchResults(query) {
    const container = document.getElementById('search-results-content');
    if (!container) return;

    const results = Search.search(query);
    const header = document.getElementById('search-results-count');

    if (header) {
      header.textContent = query
        ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
        : '';
    }

    if (!query) {
      container.innerHTML = '';
      return;
    }

    if (results.length === 0) {
      container.innerHTML = '';
      container.appendChild(
        UI.createEmptyState(
          'assets/icons/search-folder.png',
          'FILE NOT FOUND',
          NotesData.MESSAGES.empty.search,
          null, null
        )
      );
    } else {
      UI.renderNoteGrid(results, container);
    }
  },

  // ─── Browse All Notes (with filters) ───
  renderAllNotes() {
    const container = document.getElementById('browse-notes-content');
    if (!container) return;

    const allNotes = Storage.getAllNotes();
    const filtered = Filters.apply(allNotes);
    const countEl = document.getElementById('browse-notes-count');
    if (countEl) {
      countEl.textContent = `${filtered.length} note${filtered.length !== 1 ? 's' : ''}`;
    }

    UI.renderNoteGrid(filtered, container);
  },

  // ─── Render Profile ────────────────────
  renderProfile() {
    const container = document.getElementById('profile-content');
    if (!container) return;

    const profile = Storage.getProfile();
    const savedCount = Storage.getSavedNotes().length;
    const uploadCount = Storage.getUploadedNotes().length;

    const avatarHtml = (!profile.avatar || profile.avatar === '👤' || profile.avatar.includes('/') || profile.avatar.endsWith('.png'))
      ? `<img src="assets/icons/profile.png" class="profile-card__pixel-avatar" alt="Avatar">`
      : profile.avatar;

    container.innerHTML = `
      <div class="profile-card">
        <div class="profile-card__avatar">${avatarHtml}</div>
        <h2 class="profile-card__name">${UI.escapeHtml(profile.name.toUpperCase())}</h2>
        <p class="profile-card__course">${UI.escapeHtml(profile.course)}</p>
        <p class="profile-card__username">@${UI.escapeHtml(profile.username)}</p>
        <div class="profile-card__divider"></div>
        <div class="profile-card__stats">
          <div class="profile-stat">
            <span class="profile-stat__value">${uploadCount}</span>
            <span class="profile-stat__label">NOTES UPLOADED</span>
          </div>
          <div class="profile-stat">
            <span class="profile-stat__value">${savedCount}</span>
            <span class="profile-stat__label">NOTES SAVED</span>
          </div>
          <div class="profile-stat">
            <span class="profile-stat__value">⭐ 4.8</span>
            <span class="profile-stat__label">HELPFULNESS</span>
          </div>
        </div>
        <div class="profile-card__divider"></div>
        <div class="profile-card__actions">
          <button class="btn btn--retro" onclick="App.navigate('notes')">📚 MY NOTES</button>
          <button class="btn btn--retro" onclick="App.navigate('saved')">⭐ SAVED</button>
          <button class="btn btn--retro" id="btn-edit-profile">✏️ EDIT PROFILE</button>
        </div>
      </div>
      <div id="profile-edit-form" class="profile-edit" style="display:none;">
        <div class="win-window">
          <div class="win-titlebar">
            <div class="win-titlebar__left">
              <span class="win-titlebar__icon">✏️</span>
              <span class="win-titlebar__text">Edit Profile</span>
            </div>
          </div>
          <div class="profile-edit__fields">
            <label class="form-field">
              <span class="form-field__label">Display Name</span>
              <input type="text" class="form-input" id="edit-name" value="${UI.escapeHtml(profile.name)}">
            </label>
            <label class="form-field">
              <span class="form-field__label">Username</span>
              <input type="text" class="form-input" id="edit-username" value="${UI.escapeHtml(profile.username)}">
            </label>
            <label class="form-field">
              <span class="form-field__label">Course</span>
              <input type="text" class="form-input" id="edit-course" value="${UI.escapeHtml(profile.course)}">
            </label>
            <label class="form-field">
              <span class="form-field__label">Semester</span>
              <select class="form-input" id="edit-semester">
                ${NotesData.SEMESTERS.map(s => `<option value="${s.id}" ${profile.semester === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}
              </select>
            </label>
            <label class="form-field">
              <span class="form-field__label">Avatar Emoji</span>
              <input type="text" class="form-input" id="edit-avatar" value="${profile.avatar}" maxlength="2">
            </label>
            <div class="profile-edit__actions">
              <button class="btn btn--retro btn--primary" id="btn-save-profile">💾 SAVE</button>
              <button class="btn btn--retro" id="btn-cancel-profile">CANCEL</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Edit profile toggle
    container.querySelector('#btn-edit-profile').addEventListener('click', () => {
      container.querySelector('#profile-edit-form').style.display = 'block';
    });

    container.querySelector('#btn-cancel-profile').addEventListener('click', () => {
      container.querySelector('#profile-edit-form').style.display = 'none';
    });

    container.querySelector('#btn-save-profile').addEventListener('click', () => {
      const updated = {
        ...profile,
        name: document.getElementById('edit-name').value || profile.name,
        username: document.getElementById('edit-username').value || profile.username,
        course: document.getElementById('edit-course').value || profile.course,
        semester: parseInt(document.getElementById('edit-semester').value),
        avatar: document.getElementById('edit-avatar').value || '👤',
      };
      Storage.saveProfile(updated);
      Notifications.show('PROFILE UPDATED', 'Your identity has been refreshed! 🖥️', 'success');
      this.renderProfile();
      // Also update welcome
      this.renderWelcomeMessage();
    });
  }
};

window.Notes = Notes;
