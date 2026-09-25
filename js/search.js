// ═══════════════════════════════════════════
// NOTES.EXE — SEARCH MODULE
// Client-side full-text search
// ═══════════════════════════════════════════

const Search = {
  search(query) {
    if (!query || query.trim() === '') return [];

    const terms = query.toLowerCase().trim().split(/\s+/);
    const allNotes = Storage.getAllNotes();

    const results = allNotes.map(note => {
      let score = 0;
      const searchFields = [
        { text: note.title, weight: 5 },
        { text: note.subject, weight: 4 },
        { text: note.description, weight: 3 },
        { text: note.tags ? note.tags.join(' ') : '', weight: 3 },
        { text: note.author, weight: 2 },
        { text: note.type, weight: 2 },
        { text: `unit ${note.unit}`, weight: 2 },
        { text: `semester ${note.semester}`, weight: 2 },
        { text: note.content || '', weight: 1 },
      ];

      // Get subject name for searching
      const subjectObj = NotesData.SUBJECTS.find(s => s.id === note.subject);
      if (subjectObj) {
        searchFields.push({ text: subjectObj.name, weight: 4 });
        searchFields.push({ text: subjectObj.abbr, weight: 4 });
      }

      for (const term of terms) {
        for (const field of searchFields) {
          if (field.text && field.text.toLowerCase().includes(term)) {
            score += field.weight;
          }
        }
      }

      return { note, score };
    });

    return results
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(r => r.note);
  },

  // Get search suggestions
  getSuggestions(query) {
    if (!query || query.length < 2) return [];

    const q = query.toLowerCase();
    const suggestions = new Set();

    // Search in subjects
    NotesData.SUBJECTS.forEach(s => {
      if (s.name.toLowerCase().includes(q) || s.abbr.toLowerCase().includes(q)) {
        suggestions.add(s.name);
      }
    });

    // Search in note titles
    Storage.getAllNotes().forEach(note => {
      if (note.title.toLowerCase().includes(q)) {
        suggestions.add(note.title);
      }
    });

    // Search in tags
    Storage.getAllNotes().forEach(note => {
      if (note.tags) {
        note.tags.forEach(tag => {
          if (tag.toLowerCase().includes(q)) {
            suggestions.add(tag);
          }
        });
      }
    });

    return Array.from(suggestions).slice(0, 6);
  }
};

window.Search = Search;
