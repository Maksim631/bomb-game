class GameClients {
  constructor() {
    this.clients = {};
  }

  addClient(clientName, client) {
    this.clients[clientName] = client;
  }

  removeClient(clientName) {
    delete this.clients[clientName];
  }

  getClient(name) {
    return this.clients[name];
  }

  sendToAll(message) {
    if (message.constructor !== Object) {
      this.forEachClient((client) => client.send(JSON.stringify(message)));
    } else {
      this.forEachClient((client) => client.send(message));
    }
  }

  sendTo(name, message) {
    const client = this.getClient(name);
    if (client) client.send(message);
  }

  get length() {
    return Object.keys(this.clients).length;
  }

  forEachClient(callback) {
    for (const id in this.clients) {
      callback(this.clients[id]);
    }
  }
}

export const gameClients = new GameClients();
