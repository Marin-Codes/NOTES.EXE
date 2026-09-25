// ═══════════════════════════════════════════
// NOTES.EXE — UPLOAD MODULE
// Simulated file upload system
// ═══════════════════════════════════════════

const Upload = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    const form = document.getElementById('upload-form');
    if (!form) return;

    const dropzone = document.getElementById('upload-dropzone');
    const fileInput = document.getElementById('upload-file');
    const semesterSelect = document.getElementById('upload-semester');
    const subjectSelect = document.getElementById('upload-subject');

    // Dropzone interactions
    if (dropzone) {
      dropzone.addEventListener('click', () => fileInput?.click());

      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dropzone--active');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dropzone--active');
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dropzone--active');
        if (e.dataTransfer.files.length > 0) {
          this.handleFile(e.dataTransfer.files[0]);
        }
      });
    }

    // File input change
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          this.handleFile(e.target.files[0]);
        }
      });
    }

    // Semester change → update subject options
    if (semesterSelect) {
      semesterSelect.addEventListener('change', (e) => {
        this.updateSubjectOptions(parseInt(e.target.value));
      });
    }

    // Form submit
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitUpload();
      });
    }
  },

  handleFile(file) {
    const display = document.getElementById('upload-file-display');
    if (display) {
      display.innerHTML = `
        <span class="file-selected">📎 ${UI.escapeHtml(file.name)} (${this.formatFileSize(file.size)})</span>
      `;
      display.dataset.fileName = file.name;
    }
  },

  updateSubjectOptions(semester) {
    const subjectSelect = document.getElementById('upload-subject');
    if (!subjectSelect) return;

    const subjects = Filters.getSubjectsForSemester(semester);
    subjectSelect.innerHTML = '<option value="">Select Subject...</option>';
    subjects.forEach(s => {
      subjectSelect.innerHTML += `<option value="${s.id}">${s.icon} ${s.name}</option>`;
    });
  },

  submitUpload() {
    const title = document.getElementById('upload-title')?.value;
    const subject = document.getElementById('upload-subject')?.value;
    const semester = document.getElementById('upload-semester')?.value;
    const unit = document.getElementById('upload-unit')?.value;
    const type = document.getElementById('upload-type')?.value;
    const description = document.getElementById('upload-description')?.value;
    const tags = document.getElementById('upload-tags')?.value;
    const fileDisplay = document.getElementById('upload-file-display');

    // Validation
    if (!title || !subject || !semester || !unit) {
      Notifications.error('Please fill in all required fields! 📋');
      return;
    }

    // Create note object
    const note = {
      title,
      subject,
      semester: parseInt(semester),
      unit: parseInt(unit),
      type: type || 'notes',
      author: Storage.getProfile().name,
      description: description || '',
      tags: tags ? tags.split(',').map(t => t.trim().toLowerCase()) : [],
      content: `# ${title}\n\nUploaded by ${Storage.getProfile().name}\n\n${description || 'No description provided.'}`,
      file: fileDisplay?.dataset.fileName || null,
    };

    // Show fake upload progress
    this.showUploadProgress(note);
  },

  showUploadProgress(note) {
    const btn = document.getElementById('upload-submit');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '⏳ UPLOADING...';
    }

    // Simulate upload with progress
    let progress = 0;
    const progressBar = document.getElementById('upload-progress');
    const progressFill = document.getElementById('upload-progress-fill');

    if (progressBar) progressBar.style.display = 'block';

    const interval = setInterval(() => {
      progress += Math.random() * 25 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        if (progressFill) progressFill.style.width = '100%';

        // Save the note
        const saved = Storage.addUploadedNote(note);
        Notifications.uploaded(note.title);

        // Reset form
        setTimeout(() => {
          this.resetForm();
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '📤 UPLOAD NOTE';
          }
          if (progressBar) progressBar.style.display = 'none';
          if (progressFill) progressFill.style.width = '0%';
        }, 1000);
      } else {
        if (progressFill) progressFill.style.width = progress + '%';
      }
    }, 200);
  },

  resetForm() {
    const form = document.getElementById('upload-form');
    if (form) form.reset();

    const fileDisplay = document.getElementById('upload-file-display');
    if (fileDisplay) {
      fileDisplay.innerHTML = '';
      delete fileDisplay.dataset.fileName;
    }
  },

  formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
};

window.Upload = Upload;
