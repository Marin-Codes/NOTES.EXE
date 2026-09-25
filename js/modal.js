// ═══════════════════════════════════════════
// NOTES.EXE — MODAL MODULE
// Windows-style modal/window management
// ═══════════════════════════════════════════

const Modal = {
  overlay: null,
  activeModal: null,

  init() {
    this.overlay = document.getElementById('modal-overlay');

    // Close on overlay click
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.close();
      }
    });
  },

  // ─── Open Note Viewer ──────────────────
  openNoteViewer(note) {
    const isSaved = Storage.isNoteSaved(note.id);
    const subject = NotesData.SUBJECTS.find(s => s.id === note.subject);
    const typeInfo = NotesData.NOTE_TYPES.find(t => t.id === note.type);

    const modal = document.createElement('div');
    modal.className = 'win-window win-window--modal note-viewer';
    modal.innerHTML = `
      <div class="win-titlebar">
        <div class="win-titlebar__left">
          <span class="win-titlebar__icon"><img src="assets/icons/clipboard.png" class="win-titlebar__pixel-icon" alt=""></span>
          <span class="win-titlebar__text">${UI.escapeHtml(note.title)}</span>
        </div>
        <div class="win-titlebar__buttons">
          <button class="win-titlebar__btn win-titlebar__btn--minimize" aria-label="Minimize">─</button>
          <button class="win-titlebar__btn win-titlebar__btn--maximize" aria-label="Maximize">□</button>
          <button class="win-titlebar__btn win-titlebar__btn--close" aria-label="Close">×</button>
        </div>
      </div>
      <div class="win-menubar">
        <span class="win-menu-item">File</span>
        <span class="win-menu-item">Edit</span>
        <span class="win-menu-item">View</span>
        <span class="win-menu-item">Help</span>
      </div>
      <div class="note-viewer__meta">
        <div class="note-viewer__meta-row">
          <span class="badge badge--subject">${subject ? subject.icon + ' ' + subject.name : note.subject}</span>
          <span class="badge badge--semester">SEM ${note.semester}</span>
          <span class="badge badge--unit">UNIT ${note.unit}</span>
          <span class="badge badge--type">${typeInfo ? typeInfo.icon + ' ' + typeInfo.name : note.type}</span>
        </div>
        <div class="note-viewer__meta-row">
          <span>👤 ${UI.escapeHtml(note.author)}</span>
          <span>⭐ ${note.rating}</span>
          <span>📥 ${note.downloads} downloads</span>
          <span>📅 ${UI.formatDate(note.dateAdded)}</span>
        </div>
      </div>
      <div class="note-viewer__content">
        ${UI.markdownToHtml(note.content)}
      </div>
      <div class="note-viewer__toolbar win-statusbar">
        <button class="btn btn--retro btn--save-viewer ${isSaved ? 'btn--saved' : ''}" data-note-id="${note.id}">
          ${isSaved ? '♥ SAVED' : '♡ SAVE'}
        </button>
        <button class="btn btn--retro btn--download" data-note-id="${note.id}">
          ⬇ DOWNLOAD
        </button>
        <button class="btn btn--retro btn--close-viewer">
          ← CLOSE
        </button>
      </div>
    `;

    // Bind events
    modal.querySelector('.win-titlebar__btn--close').addEventListener('click', () => this.close());
    modal.querySelector('.btn--close-viewer').addEventListener('click', () => this.close());

    modal.querySelector('.btn--save-viewer').addEventListener('click', (e) => {
      UI.toggleSave(note, e.currentTarget);
    });

    modal.querySelector('.btn--download').addEventListener('click', () => {
      Notifications.show('DOWNLOAD', `"${note.title}" download started... (simulated)`, 'info');
    });

    // Make title bar draggable on desktop
    this.makeDraggable(modal, modal.querySelector('.win-titlebar'));

    this.show(modal);
  },

  // ─── Show Modal ─────────────────────────
  show(modal) {
    if (this.activeModal) {
      this.close();
    }

    this.activeModal = modal;
    this.overlay.innerHTML = '';
    this.overlay.appendChild(modal);
    this.overlay.classList.add('modal-overlay--visible');
    document.body.classList.add('modal-open');

    // Focus trap
    requestAnimationFrame(() => {
      modal.classList.add('win-window--visible');
      const firstBtn = modal.querySelector('button');
      if (firstBtn) firstBtn.focus();
    });
  },

  // ─── Close Modal ────────────────────────
  close() {
    if (!this.activeModal) return;

    this.activeModal.classList.remove('win-window--visible');
    this.overlay.classList.remove('modal-overlay--visible');
    document.body.classList.remove('modal-open');

    setTimeout(() => {
      this.overlay.innerHTML = '';
      this.activeModal = null;
    }, 200);
  },

  // ─── Make Draggable ─────────────────────
  makeDraggable(element, handle) {
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    handle.style.cursor = 'move';

    handle.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('win-titlebar__btn')) return;

      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;

      const rect = element.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;

      element.style.position = 'fixed';
      element.style.left = startLeft + 'px';
      element.style.top = startTop + 'px';
      element.style.transform = 'none';
      element.style.margin = '0';

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      e.preventDefault();
    });

    function onMouseMove(e) {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      element.style.left = (startLeft + dx) + 'px';
      element.style.top = (startTop + dy) + 'px';
    }

    function onMouseUp() {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  },

  // ─── CD Player Profile Panel (Popup) ───
  openProfilePanel() {
    const profile = Storage.getProfile();
    const savedCount = Storage.getSavedNotes().length;
    const uploadCount = Storage.getUploadedNotes().length;
    const pfpSrc = profile.pfp || 'assets/avatars/cd-avatar.png';
    const currentAppIcon = profile.appIcon || 'magic-book';

    const modal = document.createElement('div');
    modal.className = 'win-window win-window--modal win-window--cd-modal';
    modal.innerHTML = `
      <!-- Titlebar -->
      <div class="win-titlebar">
        <div class="win-titlebar__left">
          <span class="win-titlebar__icon">💿</span>
          <span class="win-titlebar__text">CD Player — Profile</span>
        </div>
        <div class="win-titlebar__buttons">
          <button class="win-titlebar__btn win-titlebar__btn--minimize" aria-label="Minimize">─</button>
          <button class="win-titlebar__btn win-titlebar__btn--maximize" aria-label="Maximize">□</button>
          <button class="win-titlebar__btn win-titlebar__btn--close" aria-label="Close">×</button>
        </div>
      </div>

      <!-- CD Player Body -->
      <div class="cd-player">
        <div class="cd-player__deck">

          <!-- Left: PFP / Album Cover -->
          <div class="cd-player__disc-section">
            <div class="cd-player__cover-frame" id="cd-pfp-frame" title="Click to upload your custom picture">
              <img src="${pfpSrc}" alt="Profile Picture" class="cd-player__cover-art" id="cd-pfp-img">
              <span class="cd-player__disc-tag">PFP</span>
            </div>
            <div class="cd-player__disc-status">
              <span class="cd-disc-status__indicator"></span>
              <span>ONLINE</span>
            </div>
            <div class="cd-player__pfp-button-row">
              <button class="cd-player__mini-btn" id="cd-btn-change-pfp" title="Upload custom photo">📷 Choose PFP</button>
              <button class="cd-player__mini-btn" id="cd-btn-reset-pfp" title="Reset to Britney CD avatar">↺ Reset</button>
            </div>
          </div>

          <!-- Right: Info & Editable Controls -->
          <div class="cd-player__controls-section">

            <!-- Name Field (replaces Artist) -->
            <div class="cd-player__field-row">
              <label class="cd-player__label" for="cd-profile-name">Name:</label>
              <div class="cd-player__sunken-box">
                <input type="text" class="cd-player__input" id="cd-profile-name" value="${UI.escapeHtml(profile.name)}" placeholder="Enter your name">
              </div>
            </div>

            <!-- Degree Field (replaces Track) -->
            <div class="cd-player__field-row">
              <label class="cd-player__label" for="cd-profile-course">Degree:</label>
              <div class="cd-player__sunken-box">
                <input type="text" class="cd-player__input" id="cd-profile-course" value="${UI.escapeHtml(profile.course)}" placeholder="e.g. BSc Computer Science">
              </div>
            </div>

            <!-- Semester Field -->
            <div class="cd-player__field-row">
              <label class="cd-player__label" for="cd-profile-semester">Semester:</label>
              <div class="cd-player__sunken-box cd-player__sunken-box--select">
                <select class="cd-player__select" id="cd-profile-semester">
                  ${NotesData.SEMESTERS.map(s => `<option value="${s.id}" ${profile.semester === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}
                </select>
              </div>
            </div>

            <!-- App Icon Selector -->
            <div class="cd-player__field-row">
              <label class="cd-player__label" for="cd-profile-appicon">App Icon:</label>
              <div class="cd-player__sunken-box cd-player__sunken-box--select">
                <select class="cd-player__select" id="cd-profile-appicon">
                  <option value="magic-book" ${currentAppIcon === 'magic-book' ? 'selected' : ''}>✨ Magic Grimoire (Purple Book)</option>
                  <option value="computer" ${currentAppIcon === 'computer' ? 'selected' : ''}>💻 Retro PC (Windows 95)</option>
                  <option value="floppy" ${currentAppIcon === 'floppy' ? 'selected' : ''}>💾 3.5" Floppy Disk</option>
                  <option value="books" ${currentAppIcon === 'books' ? 'selected' : ''}>📚 Study Books</option>
                </select>
              </div>
              <div class="cd-player__icon-preview-box" id="cd-appicon-preview" title="App Icon Preview">
                <img src="${App.getIconUrl(currentAppIcon)}" alt="" id="cd-preview-icon" class="cd-player__preview-icon-img">
              </div>
            </div>

            <!-- Save Changes Button Row -->
            <div class="cd-player__save-row">
              <button class="btn btn--retro btn--primary cd-player__save-btn" id="cd-btn-save-profile">
                💾 SAVE CHANGES
              </button>
              <button class="btn btn--retro cd-player__cancel-btn" id="cd-btn-cancel-profile">
                CANCEL
              </button>
            </div>

          </div>
        </div>

        <!-- LED Stats Display -->
        <div class="cd-player__led">
          <div class="cd-player__led-top">
            <span>STUDENT ID: #<span id="cd-led-user">${UI.escapeHtml(profile.username || 'student.exe')}</span></span>
            <span class="cd-player__led-mode">● STUDY MODE READY</span>
          </div>
          <div class="cd-player__led-stats">
            <span>📤 ${uploadCount} uploaded</span>
            <span>💾 ${savedCount} saved</span>
            <span>⭐ 4.8 rating</span>
            <span>📅 Member since ${profile.joinDate || '2026-09-01'}</span>
          </div>
        </div>

        <!-- Action Links -->
        <div class="cd-player__actions">
          <button class="cd-player__btn" id="cd-btn-my-notes">📚 MY NOTES (${uploadCount})</button>
          <button class="cd-player__btn" id="cd-btn-my-saved">⭐ SAVED NOTES (${savedCount})</button>
          <button class="cd-player__btn cd-player__btn--close-act" id="cd-btn-bottom-close" style="margin-left:auto;">✕ CLOSE</button>
        </div>
      </div>
    `;

    // ─── Hidden File Input for PFP ───
    let pfpInput = document.getElementById('cd-pfp-file-input');
    if (!pfpInput) {
      pfpInput = document.createElement('input');
      pfpInput.type = 'file';
      pfpInput.id = 'cd-pfp-file-input';
      pfpInput.accept = 'image/*';
      pfpInput.style.display = 'none';
      document.body.appendChild(pfpInput);
    }

    // Close buttons
    modal.querySelector('.win-titlebar__btn--close').addEventListener('click', () => this.close());
    modal.querySelector('#cd-btn-cancel-profile').addEventListener('click', () => this.close());
    modal.querySelector('#cd-btn-bottom-close').addEventListener('click', () => this.close());

    // PFP click → open file picker
    modal.querySelector('#cd-pfp-frame').addEventListener('click', () => {
      pfpInput.click();
    });
    modal.querySelector('#cd-btn-change-pfp').addEventListener('click', () => {
      pfpInput.click();
    });

    // Reset PFP to Britney CD Avatar
    modal.querySelector('#cd-btn-reset-pfp').addEventListener('click', () => {
      const defaultPfp = 'assets/avatars/cd-avatar.png';
      const img = modal.querySelector('#cd-pfp-img');
      if (img) img.src = defaultPfp;
      modal._pendingPfp = defaultPfp;
      Notifications.show('PFP SELECTED', 'Britney avatar selected! Click SAVE CHANGES to save. 💿', 'info');
    });

    // PFP file chosen → read as base64 and preview immediately
    pfpInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        Notifications.show('FILE TOO LARGE', 'Max PFP size is 2MB. Compress it first! 📸', 'warning');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        modal._pendingPfp = dataUrl;
        const img = modal.querySelector('#cd-pfp-img');
        if (img) img.src = dataUrl;
        Notifications.show('PFP SELECTED', 'Photo chosen! Click SAVE CHANGES to save. 📸✨', 'info');
      };
      reader.readAsDataURL(file);
    };

    // Live App Icon preview on select change
    const iconSelect = modal.querySelector('#cd-profile-appicon');
    const previewImg = modal.querySelector('#cd-preview-icon');
    iconSelect.addEventListener('change', () => {
      if (previewImg) {
        previewImg.src = App.getIconUrl(iconSelect.value);
      }
    });

    // Save Changes button
    modal.querySelector('#cd-btn-save-profile').addEventListener('click', () => {
      const nameVal = modal.querySelector('#cd-profile-name').value.trim();
      const courseVal = modal.querySelector('#cd-profile-course').value.trim();
      const semVal = parseInt(modal.querySelector('#cd-profile-semester').value);
      const appIconVal = modal.querySelector('#cd-profile-appicon').value;

      const p = Storage.getProfile();
      if (nameVal) p.name = nameVal;
      if (courseVal) p.course = courseVal;
      if (semVal) p.semester = semVal;
      if (appIconVal) p.appIcon = appIconVal;
      if (modal._pendingPfp) p.pfp = modal._pendingPfp;

      // Save to localStorage
      Storage.saveProfile(p);

      // Apply app icon everywhere
      App.applyAppIcon(p.appIcon);

      // Re-render UI components
      Notes.renderWelcomeMessage();
      Notes.renderProfile(false);

      // Notification
      Notifications.show('PROFILE UPDATED', 'Your profile changes have been saved! 💾✨', 'success');

      // Close modal
      this.close();
    });

    // Navigation links
    modal.querySelector('#cd-btn-my-notes').addEventListener('click', () => {
      this.close();
      App.navigate('notes');
    });

    modal.querySelector('#cd-btn-my-saved').addEventListener('click', () => {
      this.close();
      App.navigate('saved');
    });

    // Make draggable
    this.makeDraggable(modal, modal.querySelector('.win-titlebar'));

    this.show(modal);
  }
};

window.Modal = Modal;
