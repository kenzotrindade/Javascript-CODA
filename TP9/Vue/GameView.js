export default class GameView {
  constructor(game) {
    // Take canvas on HTML and let Context
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.game = game;
    this.playerSprites = {};
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  clear() {
    // Clear all of the drawing of the page, between the dimensions of window
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
    // Define the dimension of canvas window

    // Create radial gradient for background
    const gradient = this.ctx.createRadialGradient(
      this.width / 2,
      this.height / 2,
      0,
      this.width / 2,
      this.height / 2,
      this.width / 1.5,
    );
    gradient.addColorStop(0, "#1a0033");
    gradient.addColorStop(1, "#000000");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.strokeStyle = "rgba(160, 32, 240, 0.15)";
    this.ctx.lineWidth = 1;

    // Create horizontal grid for the background
    for (let x = 0; x <= this.width; x += 40) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }

    // Create vertical grid for the background
    for (let y = 0; y <= this.height; y += 40) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }

    this.ctx.strokeStyle = "rgba(255, 0, 255, 0.3)";
    this.ctx.lineWidth = 10;
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = "magenta";
    this.ctx.strokeRect(0, 0, this.width, this.height);

    this.ctx.shadowBlur = 0;
  }

  render() {
    // Final Render of Background & Player
    this.drawBackground();
    this.drawClassement();
    this.drawTimer();
    this.drawVictory();

    // Calculate the interpoling
    let now = performance.now();
    let alpha = (now - this.game.lastTick) / 50;
    if (alpha > 1) alpha = 1;
    if (alpha < 0) alpha = 0;

    // Launch & Interpolate every players
    for (let id in this.game.players) {
      const player = this.game.players[id];
      player.interpolate(alpha);
      player.Animation();
      this.drawPlayer(player);
    }
  }

  drawPlayer(player) {
    // If player if dead, stop to draw -> "Despawn"
    if (player.isDead) {
      return;
    }

    // If the player does'nt exist, created it -> for cache freeze and lagging (clone bug on attacking sprite)
    if (!(player.skin in this.playerSprites)) {
      const img = new Image();
      img.src = player.skin;
      this.playerSprites[player.skin] = img;
    }
    const img = this.playerSprites[player.skin];
    if (!img.complete) return;

    // Calculate the coords of player between he and the map
    let canvasX = player.renderX * this.canvas.width;
    let canvasY = player.renderY * this.canvas.height;

    // Calculate offsets for the attacking at 192x192 pixels
    let offsetX = (player.frameWidth - 64) / 2;
    let offsetY = (player.frameHeight - 64) / 2;

    this.ctx.drawImage(
      img,
      player.sx,
      player.sy,
      player.frameWidth,
      player.frameHeight,
      canvasX - offsetX,
      canvasY - offsetY,
      player.frameWidth,
      player.frameHeight,
    );

    // Draw the Pseudo & Lvl of the players
    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 12px Orbitron, sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `${player.pseudo} (LVL${player.lvl})`,
      canvasX + 30,
      canvasY - 25,
    );

    // Draw the lifebar of players
    const barWidth = 50;
    const barHeight = 5;
    const barX = canvasX + (64 - barWidth) / 2;
    const barY = canvasY - 15;

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(barX, barY, barWidth, barHeight);

    const hpPourcent = Math.max(0, player.hp / player.maxHp);
    // Change the color of lifebar if the lifebar of player if pretty low
    if (hpPourcent > 0.5) {
      this.ctx.fillStyle = "lime";
    } else if (hpPourcent > 0.3) {
      this.ctx.fillStyle = "yellow";
    } else {
      this.ctx.fillStyle = "red";
    }

    this.ctx.fillRect(barX, barY, barWidth * hpPourcent, barHeight);

    // Draw the cooldown bar
    if (player.attackCooldown > 0) {
      // If the cooldown of player if > 0 so he is attacking -> animate it
      const cooldownPourcent = Math.min(
        1,
        player.currentAttackCooldown / player.attackCooldown,
      );
      this.ctx.fillStyle = "magenta";
      // Draw it between lifebar and the head of players
      this.ctx.fillRect(barX, barY + barHeight, barWidth * cooldownPourcent, 2);
    }
  }

  drawClassement() {
    let totalPlayers = 0;
    let alivePlayers = 0;
    let list = [];

    for (let id in this.game.players) {
      let p = this.game.players[id];
      totalPlayers++;
      if (!p.isDead) {
        alivePlayers++;
      }
      list.push(p);
    }

    list.sort((a, b) => {
      if (a.isDead !== b.isDead) {
        return a.isDead ? 1 : -1;
      }

      return b.lvl - a.lvl;
    });

    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 16px Orbitron, sans-serif";
    this.ctx.textAlign = "left";
    this.ctx.fillText(`ALIVE: ${alivePlayers} / ${totalPlayers}`, 20, 40);

    this.ctx.textAlign = "right";
    this.ctx.fillText("CLASSEMENT", this.canvas.width - 20, 40);

    this.ctx.font = "12px Orbitron, sans-serif";
    for (let i = 0; i < list.length; i++) {
      let p = list[i];

      if (p.isDead) {
        this.ctx.fillStyle = "gray";
      } else {
        this.ctx.fillStyle = "white";
      }

      let text = `${i + 1}. ${p.pseudo} (LVL ${p.lvl})`;
      if (p.isDead) text += "(MORT)";

      this.ctx.fillText(text, this.canvas.width - 20, 75 + i * 20);
    }
  }

  drawTimer() {
    if (this.game.timer === undefined) return;
    const minutes = Math.floor(this.game.timer / 60);
    const seconds = Math.floor(this.game.timer % 60);
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 20px Orbitron, sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
      this.width / 2,
      40,
    );
  }

  drawVictory() {
    let alivePlayers = [];
    let totalCount = 0;

    // Count the last player on the game
    for (let id in this.game.players) {
      totalCount++;
      if (!this.game.players[id].isDead) {
        alivePlayers.push(this.game.players[id]);
      }
    }

    // If the game is Over ( backend ) OR Player of frontend is >= 1
    if (this.game.isOver || (totalCount > 1 && alivePlayers.length === 1)) {
      this.ctx.shadowBlur = 25;
      this.ctx.shadowColor = "yellow";
      this.ctx.font = "bold 100px Orbitron, sans-serif";
      this.ctx.fillStyle = "yellow";
      this.ctx.textAlign = "center";
      this.ctx.fillText("VICTORY", this.width / 2, this.height / 2);

      this.ctx.shadowBlur = 15;
      this.ctx.fillStyle = "white";
      this.ctx.font = "bold 50px Orbitron, sans-serif";

      this.ctx.fillText(
        `${alivePlayers[0].pseudo} Win !`,
        this.width / 2,
        this.height / 2 + 80,
      );
      this.ctx.shadowBlur = 0;
    }
  }
}
