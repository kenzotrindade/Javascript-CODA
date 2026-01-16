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
}
