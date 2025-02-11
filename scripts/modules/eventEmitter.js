class EventEmitter {
  constructor() {
    this.eventos = {};
  }

  on(evento, callback) {
    if (!this.eventos[evento]) {
      this.eventos[evento] = [];
    }
    this.eventos[evento].push(callback);
  }

  off(evento, callback) {
    if (!this.eventos[evento]) return;
    this.eventos[evento] = this.eventos[evento].filter(cb => cb !== callback);
  }

  emit(evento, ...args) {
    if (this.eventos[evento]) {
      this.eventos[evento].forEach(callback => callback(...args));
    }
  }
}

export const eventEmitter = new EventEmitter()