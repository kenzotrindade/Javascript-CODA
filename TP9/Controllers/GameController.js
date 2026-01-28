import { Game } from "../Models/Game.js";
import { GameView } from "../Vue/GameView.js";

export class GameController {
  constructor() {
    // Server Network Stats
    this.SERVER_TICK_RATE = 20;
    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

    this.gameData = new Game();
    this.gameView = new GameView(this.gameData);

    // Take the localstorage Data's
    this.name = localStorage.getItem("pseudo");
    this.serverUrl = localStorage.getItem("serverUrl");
    this.spritePath = localStorage.getItem("skinPath");

    // Key Logger and Sender for Server
    this.inputState = {
      up: false,
      down: false,
      left: false,
      right: false,
      attack: false,
    };

    // Launch Server Listener
    this.socket = new WebSocket(this.serverUrl);
    this.initInput();
    this.initSocket();
    this.startInputSender();

    // Take Now Server Tick
    this.lastTick = performance.now();

    // Dans ton GameController.js
    window.game = this.gameData;
    this.gameView = new GameView(this.gameData);
    window.gameView = this.gameView;
    window.controller = this;

    // Launch Game Loop
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  initSocket() {
    // Open Listener with Server & Send Data to it
    this.socket.onopen = () => {
      console.log("Connected");

      this.socket.send(
        JSON.stringify({
          name: this.name,
          skinPath: this.spritePath,
        }),
      );
    };

    // Take Data's server if he send a message
    this.socket.onmessage = (event) => {
      console.log("Server Send a message !");
      const newMessage = JSON.parse(event.data);
      this.gameData.update(newMessage);
      this.gameData.lastTick = performance.now();
    };
  }

  initInput() {
    // Key Logger for Key Object -> send to server
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        this.inputState.up = true;
      } else if (e.key === "s") {
        this.inputState.down = true;
      } else if (e.key === "q") {
        this.inputState.left = true;
      } else if (e.key === "d") {
        this.inputState.right = true;
      } else if (e.key === " ") {
        this.inputState.attack = true;
      }

      // [DEBUG] -> Print all keys are pressed
      console.log("Keydown : ", this.inputState);
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "z") {
        this.inputState.up = false;
      } else if (e.key === "s") {
        this.inputState.down = false;
      } else if (e.key === "q") {
        this.inputState.left = false;
      } else if (e.key === "d") {
        this.inputState.right = false;
      } else if (e.key === " ") {
        this.inputState.attack = false;
      }

      // [DEBUG] -> Print all keys are unpressed
      console.log("Keyup : ", this.inputState);
    });
  }

  startInputSender() {
    setInterval(() => {
      // If server is Ready and Reachable
      if (this.socket.readyState === WebSocket.OPEN) {
        // Send Data's to server (encrypt on JSON stringify)
        this.socket.send(
          JSON.stringify({
            type: "input",
            input: this.inputState,
          }),
        );
      } else {
        return;
      }
      // Send this to server every "SERVER_INTERVAL" -> 20ms
    }, this.SERVER_INTERVAL);
  }

  loop(timestamp) {
    // Loop the Game
    let now = performance.now();
    // Take the time between the last message of the server & take it
    let alpha = (now - this.lastTick) / this.SERVER_INTERVAL;

    for (let id in this.gameData.players) {
      // Interpolate all of player's of frontend
      this.gameData.players[id].interpolate(alpha);
    }

    // Start RENDER and LOOP for launch game
    this.gameView.render();
    requestAnimationFrame(this.loop);
  }
}
