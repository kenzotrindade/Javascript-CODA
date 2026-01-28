import { Game } from "./Models/Game.js";
import { GameView } from "./Vue/GameView.js";
import { GameController } from "./Controllers/GameController.js";

const game = new Game();

const vue = new GameView(game);

const controller = new GameController(game, vue);
