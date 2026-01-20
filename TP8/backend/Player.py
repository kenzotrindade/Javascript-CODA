import uuid
import random

# Players stats
BASE_SPEED = 0.2
BASE_HP_REGEN_RATE = 10
BASE_ATTACK_DAMAGE = 30
BASE_ATTACK_COOLDOWN = 1.0
BASE_ATTACK_RANGE = 0.15     # distance devant le joueur
BASE_ATTACK_WIDTH = 0.10     # largeur du slash
BASE_MAX_HP = 100

class Player:
    def __init__(self, name, skin_path):
        self.id = str(uuid.uuid4())
        self.name = name
        self.skin_path = skin_path

        # Define random starting coordinates
        self.x = random.randint(0, 100) / 100.0
        self.y = random.randint(0, 100) / 100.0

        # Define starting stats
        self.lvl = 1
        self.hp = BASE_MAX_HP
        self.max_hp = BASE_MAX_HP
        self.hp_regen_rate = BASE_HP_REGEN_RATE
        self.speed = BASE_SPEED
        self.direction = 0
        self.is_attacking = False
        self.is_walking = False
        self.is_dying = False
        self.attack_cooldown = BASE_ATTACK_COOLDOWN
        self.current_attack_cooldown = 0.0
        self.attack_damage = BASE_ATTACK_DAMAGE
        self.is_dead = False


    def get_attack_hitbox(self):
        px, py = self.x, self.y

        if self.direction == 2:
            return (
                px - BASE_ATTACK_WIDTH / 2,
                py,
                BASE_ATTACK_WIDTH,
                BASE_ATTACK_RANGE
            )

        if self.direction == 0:
            return (
                px - BASE_ATTACK_WIDTH / 2,
                py - BASE_ATTACK_RANGE,
                BASE_ATTACK_WIDTH,
                BASE_ATTACK_RANGE
            )

        if self.direction == 1:
            return (
                px,
                py - BASE_ATTACK_WIDTH / 2,
                BASE_ATTACK_RANGE,
                BASE_ATTACK_WIDTH
            )

        if self.direction == 3:
            return (
                px - BASE_ATTACK_RANGE,
                py - BASE_ATTACK_WIDTH / 2,
                BASE_ATTACK_RANGE,
                BASE_ATTACK_WIDTH
            )


    def point_in_rect(self, rx, ry, rw, rh):
        return (
            rx <= self.x <= rx + rw and
            ry <= self.y <= ry + rh
        )


    def to_dict(self):
        # Destined to be used for data sync
        return {
            "name": self.name,
            "skinPath": self.skin_path,
            "position": [self.x, self.y],
            "lvl": self.lvl,
            "hp": self.hp,
            "maxHp": self.max_hp,
            "hpRegenRate": self.hp_regen_rate,
            "speed": self.speed,
            "direction": self.direction,
            "isAttacking": self.is_attacking,
            "isWalking": self.is_walking,
            "isDying": self.is_dying,
            "attackCooldown": self.attack_cooldown,
            "currentAttackCooldown": self.current_attack_cooldown
        }