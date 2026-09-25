// ═══════════════════════════════════════════
// NOTES.EXE — STORAGE MODULE
// localStorage management for persistence
// ═══════════════════════════════════════════

const Storage = {
  KEYS: {
    SAVED_NOTES: 'notesexe_saved',
    UPLOADED_NOTES: 'notesexe_uploads',
    PROFILE: 'notesexe_profile',
    BOOT_SEEN: 'notesexe_boot_seen',
    THEME: 'notesexe_theme',
  },

  // ─── Saved Notes ────────────────────────
  getSavedNotes() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.SAVED_NOTES)) || [];
    } catch {
      return [];
    }
  },

  saveNote(noteId) {
    const saved = this.getSavedNotes();
    if (!saved.includes(noteId)) {
      saved.push(noteId);
      localStorage.setItem(this.KEYS.SAVED_NOTES, JSON.stringify(saved));
    }
    return saved;
  },

  unsaveNote(noteId) {
    let saved = this.getSavedNotes();
    saved = saved.filter(id => id !== noteId);
    localStorage.setItem(this.KEYS.SAVED_NOTES, JSON.stringify(saved));
    return saved;
  },

  isNoteSaved(noteId) {
    return this.getSavedNotes().includes(noteId);
  },

  toggleSaveNote(noteId) {
    if (this.isNoteSaved(noteId)) {
      this.unsaveNote(noteId);
      return false;
    } else {
      this.saveNote(noteId);
      return true;
    }
  },

  // ─── Uploaded Notes ─────────────────────
  getUploadedNotes() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.UPLOADED_NOTES)) || [];
    } catch {
      return [];
    }
  },

  addUploadedNote(note) {
    const uploads = this.getUploadedNotes();
    note.id = Date.now();
    note.dateAdded = new Date().toISOString().split('T')[0];
    note.downloads = 0;
    note.rating = 0;
    uploads.push(note);
    localStorage.setItem(this.KEYS.UPLOADED_NOTES, JSON.stringify(uploads));
    return note;
  },

  // ─── Profile ───────────────────────────
  getProfile() {
    try {
      const stored = JSON.parse(localStorage.getItem(this.KEYS.PROFILE));
      return stored || { ...NotesData.DEFAULT_PROFILE };
    } catch {
      return { ...NotesData.DEFAULT_PROFILE };
    }
  },

  saveProfile(profile) {
    localStorage.setItem(this.KEYS.PROFILE, JSON.stringify(profile));
  },

  // ─── Boot Flag ─────────────────────────
  hasSeenBoot() {
    return localStorage.getItem(this.KEYS.BOOT_SEEN) === 'true';
  },

  setBootSeen() {
    localStorage.setItem(this.KEYS.BOOT_SEEN, 'true');
  },

  // ─── Get All Notes (sample + uploaded) ──
  getAllNotes() {
    return [...NotesData.SAMPLE_NOTES, ...this.getUploadedNotes()];
  },

  // ─── Clear All ──────────────────────────
  clearAll() {
    Object.values(this.KEYS).forEach(key => localStorage.removeItem(key));
  }
};

window.Storage = Storage;
