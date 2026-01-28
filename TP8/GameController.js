class GameController {
  constructor() {
    // Server sends updates at 20 ticks per second
    this.SERVER_TICK_RATE = 20;
    // Duration between two server ticks in milliseconds
    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

    // Permanently bind "this" at the instance of the GameController class
    this.loop = this.loop.bind(this);

    // Regulates framerate to keep 60fps
    requestAnimationFrame(this.loop);

    this.gameData = new Game();

    this.name = localStorage.getItem("pseudo");
    this.serverUrl = "ws://localhost:8000/ws";
    this.spritePath = localStorage.getItem("skinPath");

    this.inputState = {
      up: false,
      down: false,
      left: false,
      right: false,
      attack: false,
    };

    this.socket = new WebSocket(this.serverUrl);

    this.initInput();
    this.initSocket();
    this.startInputSender();
  }

  initSocket() {
    this.socket.onopen = () => {
      console.log("Connected");

      this.socket.send(
        JSON.stringify({
          name: this.name,
          skinPath: this.spritePath,
        }),
      );
    };

    this.socket.onmessage = (event) => {
      console.log("Server Send a message !");
      const newMessage = JSON.parse(event.data);
      this.gameData.update(newMessage);
    };
  }

  initInput() {
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

      console.log("Keyup : ", this.inputState);
    });
  }

  startInputSender() {
    setInterval(() => {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(
          JSON.stringify({
            type: "input",
            input: this.inputState,
          }),
        );
      } else {
        return;
      }
    }, this.SERVER_INTERVAL);
  }

  // === Main render loop ===
  loop(timestamp) {
    // Request the next frame
    requestAnimationFrame(this.loop);
  }
}

// === Start the game controller by instantiating the GameController class ===
// This line will execute the constructor (e.g, launch the frontend)
new GameController();
