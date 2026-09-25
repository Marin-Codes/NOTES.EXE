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
  }
};

window.Modal = Modal;
