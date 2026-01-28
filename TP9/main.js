import { Player } from "./Models/Player.js";
import { Game } from "./Models/Game.js";
import { GameView } from "./Vue/GameView.js";
import { GameController } from "./Controllers/GameController.js";

const model = new Game();

const vue = new GameView();

const controller = new GameController();
