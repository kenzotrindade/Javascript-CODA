import Player from "./Player.js";

export default class Game {
  constructor() {
    this.isRunning = false;
    this.isOver = false;
    this.timer;
    this.players = {};
  }

  update(gameStateFromServer) {
    // Update MetaData if server change it
    for (let key in gameStateFromServer) {
      if (key !== "players") {
        this[key] = gameStateFromServer[key];
      }
    }

    // Create player if he does'nt exist for server
    if (gameStateFromServer.players) {
      for (let id in gameStateFromServer.players) {
        const data = gameStateFromServer.players[id];

        if (this.players[id]) {
          this.players[id].update(data);
        } else {
          this.players[id] = new Player(
            id,
            data.name,
            data.skinPath,
            data.position,
          );
        }
      }

      // Delete player if he does'nt exist for server
      for (let id in this.players) {
        if (!(id in gameStateFromServer.players)) {
          delete this.players[id];
        }
      }
    }
  }
}
