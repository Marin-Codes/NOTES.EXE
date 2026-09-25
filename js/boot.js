// ═══════════════════════════════════════════
// NOTES.EXE — BOOT MODULE
// Startup animation sequence
// ═══════════════════════════════════════════

const Boot = {
  screen: null,
  progressBar: null,
  messageEl: null,
  isComplete: false,

  init() {
    this.screen = document.getElementById('boot-screen');
    this.progressBar = document.getElementById('boot-progress-fill');
    this.messageEl = document.getElementById('boot-message');

    // Check if boot was seen before
    if (Storage.hasSeenBoot()) {
      this.skip();
      return;
    }

    // Allow skipping
    this.screen.addEventListener('click', () => this.skip());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        this.skip();
      }
    });

    this.run();
  },

  async run() {
    const messages = NotesData.BOOT_MESSAGES;
    const totalSteps = messages.length;

    for (let i = 0; i < totalSteps; i++) {
      if (this.isComplete) return;

      const progress = ((i + 1) / totalSteps) * 100;
      this.messageEl.textContent = messages[i];
      this.progressBar.style.width = `${progress}%`;

      // Add scan lines to terminal output
      const termLine = document.createElement('div');
      termLine.className = 'boot-terminal__line';
      termLine.textContent = `> ${messages[i]}`;
      const terminal = document.getElementById('boot-terminal');
      if (terminal) {
        terminal.appendChild(termLine);
        terminal.scrollTop = terminal.scrollHeight;
      }

      await this.delay(400 + Math.random() * 300);
    }

    // Final pause
    await this.delay(600);
    this.complete();
  },

  skip() {
    if (this.isComplete) return;
    this.complete();
  },

  complete() {
    this.isComplete = true;
    Storage.setBootSeen();

    if (this.screen) {
      this.screen.classList.add('boot-screen--complete');
      setTimeout(() => {
        this.screen.style.display = 'none';
        document.body.classList.add('booted');
        // Show welcome notification
        setTimeout(() => Notifications.welcome(), 500);
      }, 500);
    }
  },

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

window.Boot = Boot;
