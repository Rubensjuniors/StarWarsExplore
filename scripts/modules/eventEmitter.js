class EventEmitter {
  constructor() {
    this.events = {};
  }

  // Adiciona um ouvinte para um evento específico
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // Emite um evento, chamando todos os ouvintes associados
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(...args));
    }
  }

  // Remove um ouvinte específico para um evento
  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((l) => l !== listener);
    }
  }
}

export const emitter = new EventEmitter();

