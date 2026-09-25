// ═══════════════════════════════════════════
// NOTES.EXE — UI MODULE
// DOM utilities and component helpers
// ═══════════════════════════════════════════

const UI = {
  // ─── DOM Helpers ────────────────────────
  $(selector) {
    return document.querySelector(selector);
  },

  $$(selector) {
    return document.querySelectorAll(selector);
  },

  create(tag, className, innerHTML) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (innerHTML) el.innerHTML = innerHTML;
    return el;
  },

  // ─── Note Card Component ───────────────
  createNoteCard(note) {
    const isSaved = Storage.isNoteSaved(note.id);
    const subject = NotesData.SUBJECTS.find(s => s.id === note.subject);
    const typeInfo = NotesData.NOTE_TYPES.find(t => t.id === note.type);
    const subjectName = subject ? subject.abbr : note.subject;

    const card = this.create('div', 'note-card');
    card.dataset.noteId = note.id;
    card.innerHTML = `
      <div class="note-card__header">
        <span class="note-card__type-badge">${typeInfo ? typeInfo.icon : '📄'} ${typeInfo ? typeInfo.name : note.type}</span>
      </div>
      <h3 class="note-card__title">${this.escapeHtml(note.title)}</h3>
      <div class="note-card__meta">
        <span>${subjectName}</span>
        <span>SEM ${note.semester}</span>
        <span>UNIT ${note.unit}</span>
      </div>
      <p class="note-card__desc">${this.escapeHtml(note.description)}</p>
      <div class="note-card__footer">
        <div class="note-card__stats">
          <span class="note-card__rating">⭐ ${note.rating || '—'}</span>
          <span class="note-card__author">👤 ${this.escapeHtml(note.author)}</span>
        </div>
        <div class="note-card__actions">
          <button class="btn btn--retro btn--small btn--view" data-note-id="${note.id}" aria-label="View note">VIEW</button>
          <button class="btn btn--retro btn--small btn--save ${isSaved ? 'btn--saved' : ''}" data-note-id="${note.id}" aria-label="${isSaved ? 'Unsave' : 'Save'} note">
            ${isSaved ? '♥' : '♡'} ${isSaved ? 'SAVED' : 'SAVE'}
          </button>
        </div>
      </div>
    `;

    // Bind events
    card.querySelector('.btn--view').addEventListener('click', (e) => {
      e.stopPropagation();
      Modal.openNoteViewer(note);
    });

    card.querySelector('.btn--save').addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleSave(note, e.currentTarget);
    });

    // Clicking the card also opens viewer
    card.addEventListener('click', () => {
      Modal.openNoteViewer(note);
    });

    return card;
  },

  // ─── Toggle Save ────────────────────────
  toggleSave(note, btn) {
    const wasSaved = Storage.isNoteSaved(note.id);
    Storage.toggleSaveNote(note.id);
    const isSaved = !wasSaved;

    if (btn) {
      btn.classList.toggle('btn--saved', isSaved);
      btn.innerHTML = `${isSaved ? '♥' : '♡'} ${isSaved ? 'SAVED' : 'SAVE'}`;
      btn.setAttribute('aria-label', `${isSaved ? 'Unsave' : 'Save'} note`);
    }

    // Update all other instances of this note's save button
    document.querySelectorAll(`.btn--save[data-note-id="${note.id}"]`).forEach(b => {
      if (b !== btn) {
        b.classList.toggle('btn--saved', isSaved);
        b.innerHTML = `${isSaved ? '♥' : '♡'} ${isSaved ? 'SAVED' : 'SAVE'}`;
      }
    });

    if (isSaved) {
      Notifications.saved(note.title);
    } else {
      Notifications.unsaved(note.title);
    }

    // Refresh saved notes view if it's open
    if (document.getElementById('view-saved').classList.contains('view--active')) {
      Notes.renderSavedNotes();
    }

    // Update taskbar saved count
    this.updateSavedCount();
  },

  // ─── Subject Card ──────────────────────
  createSubjectFolder(subject, noteCount) {
    const folder = this.create('div', 'folder');
    folder.dataset.subjectId = subject.id;
    folder.innerHTML = `
      <div class="folder__icon">📁</div>
      <div class="folder__info">
        <span class="folder__name">${subject.icon} ${this.escapeHtml(subject.name)}</span>
        <span class="folder__count">${noteCount} file${noteCount !== 1 ? 's' : ''}</span>
      </div>
    `;
    folder.addEventListener('click', () => {
      Notes.openSubject(subject);
    });
    return folder;
  },

  // ─── Semester Folder ───────────────────
  createSemesterFolder(semester, subjectCount) {
    const folder = this.create('div', 'folder folder--semester');
    folder.dataset.semesterId = semester.id;
    folder.innerHTML = `
      <div class="folder__icon">📁</div>
      <div class="folder__info">
        <span class="folder__name">${semester.name}</span>
        <span class="folder__count">${subjectCount} subject${subjectCount !== 1 ? 's' : ''}</span>
      </div>
    `;
    folder.addEventListener('click', () => {
      Notes.openSemester(semester);
    });
    return folder;
  },

  // ─── Empty State ───────────────────────
  createEmptyState(icon, title, message, actionText, actionCallback) {
    const empty = this.create('div', 'empty-state');
    const iconHtml = (typeof icon === 'string' && (icon.includes('/') || icon.endsWith('.png')))
      ? `<img src="${icon}" class="empty-state__pixel-icon" alt="">`
      : icon;
    empty.innerHTML = `
      <div class="empty-state__icon">${iconHtml}</div>
      <h3 class="empty-state__title">${title}</h3>
      <p class="empty-state__message">${message}</p>
      ${actionText ? `<button class="btn btn--retro btn--primary">${actionText}</button>` : ''}
    `;
    if (actionText && actionCallback) {
      empty.querySelector('.btn').addEventListener('click', actionCallback);
    }
    return empty;
  },

  // ─── Render Note Grid ──────────────────
  renderNoteGrid(notes, container) {
    container.innerHTML = '';
    if (notes.length === 0) {
      container.appendChild(
        this.createEmptyState(
          '📂',
          'THIS FOLDER IS EMPTY',
          NotesData.MESSAGES.empty.notes,
          'BROWSE NOTES',
          () => App.navigate('notes')
        )
      );
      return;
    }
    const grid = this.create('div', 'note-grid');
    notes.forEach(note => {
      grid.appendChild(this.createNoteCard(note));
    });
    container.appendChild(grid);
  },

  // ─── Update Saved Count ─────────────────
  updateSavedCount() {
    const count = Storage.getSavedNotes().length;
    const badge = document.getElementById('saved-count-badge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
  },

  // ─── Update Clock ──────────────────────
  updateClock() {
    const clock = document.getElementById('taskbar-clock');
    if (clock) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      clock.textContent = `${hours}:${minutes}`;
    }
  },

  // ─── Escape HTML ───────────────────────
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  // ─── Format Date ───────────────────────
  formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  },

  // ─── Simple Markdown to HTML ────────────
  markdownToHtml(md) {
    if (!md) return '';
    return md
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="lang-$1">$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Headers
      .replace(/^### (.+)$/gm, '<h4>$1</h4>')
      .replace(/^## (.+)$/gm, '<h3>$1</h3>')
      .replace(/^# (.+)$/gm, '<h2>$1</h2>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Blockquotes
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      // Tables (simple)
      .replace(/\|(.+)\|/g, (match) => {
        const cells = match.split('|').filter(c => c.trim());
        if (cells.every(c => /^[-\s:]+$/.test(c.trim()))) return '';
        const tag = 'td';
        return '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
      })
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
  }
};

window.UI = UI;
