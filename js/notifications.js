// ═══════════════════════════════════════════
// NOTES.EXE — NOTIFICATIONS MODULE
// Windows-style toast notifications
// ═══════════════════════════════════════════

const Notifications = {
  container: null,
  queue: [],
  isShowing: false,

  init() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(title, message, type = 'info') {
    const icons = {
      info: '💾',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      save: '♥',
      unsave: '♡',
      upload: '📤',
      system: '🖥️'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <div class="toast__titlebar">
        <span class="toast__icon">${icons[type] || '💬'}</span>
        <span class="toast__title">${title}</span>
        <button class="toast__close" aria-label="Close notification">×</button>
      </div>
      <div class="toast__body">${message}</div>
    `;

    // Close button
    toast.querySelector('.toast__close').addEventListener('click', () => {
      this.dismiss(toast);
    });

    this.container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('toast--visible');
    });

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      this.dismiss(toast);
    }, 4000);
  },

  dismiss(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.remove('toast--visible');
    toast.classList.add('toast--hiding');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  },

  // Convenience methods
  saved(noteTitle) {
    this.show('NOTE SAVED', `"${noteTitle}" ${NotesData.MESSAGES.notifications.save}`, 'save');
  },

  unsaved(noteTitle) {
    this.show('NOTE REMOVED', `"${noteTitle}" ${NotesData.MESSAGES.notifications.unsave}`, 'unsave');
  },

  uploaded(noteTitle) {
    this.show('UPLOAD COMPLETE', `"${noteTitle}" ${NotesData.MESSAGES.notifications.upload}`, 'upload');
  },

  welcome() {
    this.show('SYSTEM MESSAGE', NotesData.MESSAGES.notifications.welcome, 'system');
  },

  error(message) {
    this.show('SYSTEM ERROR', message, 'error');
  }
};

window.Notifications = Notifications;
