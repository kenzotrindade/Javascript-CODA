const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const skinImg = new Image();
skinImg.src = "character-spritesheet.png";

const keys = {};
window.addEventListener("keydown", (e) => (keys[e.code] = true));
window.addEventListener("keyup", (e) => (keys[e.code] = false));

class Player {
  constructor(id, pseudo, skin, position) {
    this.id = id;
    this.pseudo = pseudo;
    this.skin = skin;
    this.maxHp = 100;
    this.hp = 100;
    this.attack = 20;
    this.regeneration = 0.2;
    this.attackCooldown = 2000;
    this.movementSpeed = 1;
    this.lvl = 1;
    this.x = position[0];
    this.y = position[1];
    this.isDying = false;
    this.isAttacking = false;
    this.isWalking = false;
    this.walkSpriteDuration = 2;
    this.attackSpriteDuration = 2;
    this.dieSpriteDuration = 2;
    this.walkSpriteIndex = 0;
    this.attackSpriteIndex = 0;
    this.dieSpriteIndex = 0;
    this.walkSpriteNumber = 9;
    this.attackSpriteNumber = 6;
    this.dieSpriteNumber = 6;
    this.currentWalkSriteStep = 0;
    this.currentDyingSriteStep = 0;
    this.currentAttackSriteStep = 0;
    this.frameWidth = 64;
    this.frameHeight = 64;
    this.currentRow = 0;
    this.currentColumn = 0;
    this.sx = 0;
    this.sy = 0;
  }

  update(data) {
    for (let key in data) {
      if (key === "position") {
        this.x = data.position[0];
        this.y = data.position[1];
      } else {
        this[key] = data[key];
      }
    }
  }

  Animation() {
    if (this.isWalking) {
      this.currentColumn = this.walkSpriteIndex;
      this.currentWalkSriteStep++;
      if (this.currentWalkSriteStep >= this.walkSpriteDuration) {
        this.currentWalkSriteStep = 0;
        this.walkSpriteIndex++;
      }
      if (this.walkSpriteIndex >= this.walkSpriteNumber) {
        this.walkSpriteIndex = 0;
      }
    } else if (this.isAttacking) {
      this.currentColumn = this.attackSpriteIndex;
      this.currentAttackSriteStep++;
      if (this.currentAttackSriteStep >= this.attackSpriteDuration) {
        this.currentAttackSriteStep = 0;
        this.attackSpriteIndex++;
      }
      if (this.attackSpriteIndex >= this.attackSpriteNumber) {
        this.attackSpriteIndex = 0;
        this.isAttacking = false;
      }
    } else if (this.isDying) {
      this.currentColumn = this.dieSpriteIndex;
      this.currentDyingSriteStep++;
      if (this.currentDyingSriteStep >= this.dieSpriteDuration) {
        this.currentDyingSriteStep = 0;
        this.dieSpriteIndex++;
      }
      if (this.dieSpriteIndex >= this.dieSpriteNumber) {
        this.dieSpriteIndex = this.dieSpriteNumber - 1;
      }
    } else {
      this.currentColumn = 0;
    }

    this.sx = this.currentColumn * this.frameWidth;
    this.sy = this.currentRow * this.frameHeight;
  }

  draw(ctx) {
    if (!this.skin) {
      return;
    }

    ctx.drawImage(
      this.skin,
      this.sx,
      this.sy,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.frameWidth,
      this.frameHeight
    );
  }
}

const p1 = new Player(42, "Moi", skinImg, [0, 0]);

function gameloop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (p1.isDying) {
    p1.isWalking = false;
    p1.isAttacking = false;
  }

  if (keys.ArrowUp) {
    p1.y -= p1.movementSpeed;
    p1.currentRow = 8;
    p1.isWalking = true;
  } else if (keys.ArrowDown) {
    p1.y += p1.movementSpeed;
    p1.currentRow = 10;
    p1.isWalking = true;
  } else if (keys.ArrowLeft) {
    p1.x -= p1.movementSpeed;
    p1.currentRow = 9;
    p1.isWalking = true;
  } else if (keys.ArrowRight) {
    p1.x += p1.movementSpeed;
    p1.currentRow = 11;
    p1.isWalking = true;
  } else if (keys.Space && !p1.isAttacking) {
    p1.isAttacking = true;
    p1.attackSpriteIndex = 0;
    p1.currentRow = 14;
  } else {
    p1.isWalking = false;
  }

  p1.Animation(); 
  p1.draw(ctx);
  requestAnimationFrame(gameloop);
}

gameloop();

document.getElementById("killBtn").addEventListener("click", () => {
  p1.isDying = true;
  p1.dieSpriteIndex = 0;
  p1.currentRow = 12;
});

// p1.isDying = true;

// for (let i = 0; i < 10; i++) {
//   p1.Animation();

//   console.log(`Frame ${i} :`);
//   console.log("  isWalking =", p1.isDying);
//   console.log("  Index actuel =", p1.dieSpriteIndex);
//   console.log(
//     "  Step =",
//     p1.currentDyingSriteStep + " / " + p1.dieSpriteDuration
//   );
// }
