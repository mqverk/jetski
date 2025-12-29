// Event manager for handling Discord events
class EventManager {
  constructor(client) {
    this.client = client;
    this.events = new Map();
  }

  // Register an event listener
  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    this.events.get(eventName).push(callback);
    console.log(`✅ Registered event: ${eventName}`);
  }

  // Trigger all callbacks for an event
  async emit(eventName, ...args) {
    const callbacks = this.events.get(eventName);

    if (!callbacks) {
      return;
    }

    for (const callback of callbacks) {
      try {
        await callback(...args);
      } catch (error) {
        console.error(`Error in event ${eventName}:`, error);
      }
    }
  }

  // Get all registered events
  getAll() {
    return this.events;
  }
}

module.exports = EventManager;
