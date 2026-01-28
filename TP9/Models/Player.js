export class Player {
  constructor(id, pseudo, skinPath, position) {
    // Player's DATAs
    this.id = id;
    this.pseudo = pseudo;
    this.skin = skinPath;
    this.maxHp = 100;
    this.hp = 100;
    this.attack = 20;
    this.regeneration = 0.2;
    this.attackCooldown = 2000;
    this.movementSpeed = 1;
    this.lvl = 1;
    this.x = position[0];
    this.y = position[1];

    // Player's STATEs
    this.direction = 0;
    this.isDying = false;
    this.isAttacking = false;
    this.isWalking = false;
    this.isDead = false;

    // Sprite's DATAs
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

    // Frame's & Coord's DATAs
    this.frameWidth = 64;
    this.frameHeight = 64;
    this.middle = 32;
    this.currentRow = 0;
    this.currentColumn = 0;
    this.sx = 0;
    this.sy = 0;

    // Interpolate's DATAs
    this.oldX = this.x;
    this.oldY = this.y;
    this.renderX = this.x;
    this.renderY = this.y;
  }

  update(data) {
    // Update above update for Interpolate
    this.oldX = this.x;
    this.oldY = this.y;

    // If the player attacking, reset it Sprite -> don't cause bugs / freezes
    // if (this.isAttacking && data.isAttacking === false) {
    //   this.attackSpriteIndex = 0;
    //   // this.currentAttackSriteStep = 0;
    // }

    // If the key is position, take x and y coords and update it
    for (let key in data) {
      if (key === "position") {
        this.x = data.position[0];
        this.y = data.position[1];
      } else {
        // Else, just update metadata's
        this[key] = data[key];
      }
    }
  }

  interpolate(alpha) {
    // Calculate the interpolate with old coords & actually coords
    this.renderX = this.oldX + (this.x - this.oldX) * alpha;
    this.renderY = this.oldY + (this.y - this.oldY) * alpha;
  }

  Animation() {
    // Define frame normal's dimensions
    this.frameWidth = 64;
    this.frameHeight = 64;

    if (this.isWalking) {
      // If he is walking, let's define the spritesheet rows & animate it
      const walkRows = { 0: 8, 1: 11, 2: 10, 3: 9 };
      this.currentRow = walkRows[this.direction] || 8;
      this.currentColumn = this.walkSpriteIndex;
      this.currentWalkSriteStep++;
      if (this.currentWalkSriteStep >= this.walkSpriteDuration) {
        this.currentWalkSriteStep = 0;
        this.walkSpriteIndex++;
      }
      if (this.walkSpriteIndex >= this.walkSpriteNumber) {
        this.walkSpriteIndex = 0;
      }
    } else if (
      this.isAttacking ||
      this.currentAttackSriteStep > 0 ||
      this.attackSpriteIndex > 0
    ) {
      // If he is attacking, same but redefine his dimensions like 192x192 for don't DESPAWN the player (Left Top Animated and the animation is broken ahah)
      this.frameHeight = 192;
      this.frameWidth = 192;
      const attackRows = { 0: 54, 1: 63, 2: 60, 3: 57 };
      this.currentRow = attackRows[this.direction] || 54;
      this.currentColumn = this.attackSpriteIndex;
      this.currentAttackSriteStep++;
      if (this.currentAttackSriteStep >= this.attackSpriteDuration) {
        this.currentAttackSriteStep = 0;
        this.attackSpriteIndex++;
      }
      if (this.attackSpriteIndex > this.attackSpriteNumber) {
        this.attackSpriteIndex = 0;
        this.isAttacking = false;
      }
    } else if (this.isDying) {
      // If the player if dying, play his animation
      this.currentRow = 20;
      this.currentColumn = this.dieSpriteIndex;
      this.currentDyingSriteStep++;
      if (this.currentDyingSriteStep >= this.dieSpriteDuration) {
        this.currentDyingSriteStep = 0;
        this.dieSpriteIndex++;
      }
      if (this.dieSpriteIndex >= this.dieSpriteNumber) {
        this.dieSpriteIndex = this.dieSpriteNumber - 1;
        // IMPORTANT /!\ -> isDead = true for the player's despawning ( "spectator mod" )
        this.isDead = true;
      }
    } else {
      // Else, let's play the idle animation AND play the last direction (because if is not here, the players on idle mod look on north direction by default)
      const idleRows = { 0: 0, 1: 3, 2: 2, 3: 1 };
      this.currentRow = idleRows[this.direction] ?? 0;
      this.currentColumn = 0;
    }

    // Calculate the frame dimensions at default
    this.sx = this.currentColumn * this.frameWidth;
    this.sy = this.currentRow * 64;
  }
}
