// ═══════════════════════════════════════════
// NOTES.EXE — FILTERS MODULE
// Filter notes by various criteria
// ═══════════════════════════════════════════

const Filters = {
  currentFilters: {
    semester: null,
    subject: null,
    unit: null,
    type: null,
    rating: null,
    sort: 'recent'
  },

  apply(notes, filters = null) {
    const f = filters || this.currentFilters;
    let filtered = [...notes];

    if (f.semester) {
      filtered = filtered.filter(n => n.semester === parseInt(f.semester));
    }

    if (f.subject) {
      filtered = filtered.filter(n => n.subject === f.subject);
    }

    if (f.unit) {
      filtered = filtered.filter(n => n.unit === parseInt(f.unit));
    }

    if (f.type) {
      filtered = filtered.filter(n => n.type === f.type);
    }

    if (f.rating) {
      filtered = filtered.filter(n => n.rating >= parseFloat(f.rating));
    }

    // Sorting
    switch (f.sort) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'downloads':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  },

  setFilter(key, value) {
    this.currentFilters[key] = value || null;
  },

  resetFilters() {
    this.currentFilters = {
      semester: null,
      subject: null,
      unit: null,
      type: null,
      rating: null,
      sort: 'recent'
    };
  },

  getSubjectsForSemester(semester) {
    if (!semester) return NotesData.SUBJECTS;
    return NotesData.SUBJECTS.filter(s => s.semester === parseInt(semester));
  },

  getActiveFilterCount() {
    return Object.entries(this.currentFilters)
      .filter(([key, val]) => val !== null && key !== 'sort')
      .length;
  }
};

window.Filters = Filters;
