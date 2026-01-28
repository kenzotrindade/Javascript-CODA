import asyncio
from Player import *

TICK_RATE = 20  # 20 updates per second
TICK_DURATION = 1 / TICK_RATE


class Game:
    def __init__(self, needed_players=26):
        self.players = {}          # player_id -> Player
        self.connections = {}      # player_id -> websocket
        self.is_running = False
        self.is_over = False
        self.timer = 0.0
        self.needed_players = needed_players

    async def game_loop(self):
        self.is_running = False
        while True:
            self.start_game()
            self.end_game()
            self.update()
            await self.broadcast_state()
            await asyncio.sleep(TICK_DURATION)


    def update(self):
        self.timer += TICK_DURATION

        for player_id, player in self.players.items():
            # Attack cooldown update
            if player.current_attack_cooldown > 0:
                player.current_attack_cooldown = max(0, player.current_attack_cooldown - TICK_DURATION)

            # HP regen
            if player.hp < player.max_hp:
               player.hp += player.hp_regen_rate * TICK_DURATION
            

    def start_game(self):
        if len(self.players) >= self.needed_players:
            self.is_running = True

    
    def end_game(self):
        alive_players = 0
        if len(self.players) >= self.needed_players:
            for key in self.players.keys():
                player = self.players[key]
                if player.is_dead == False:
                    alive_players += 1

        if alive_players > 1:
            self.over = False
        else:
            self.over = True



    async def broadcast_state(self):
        state = {
            "isRunning": self.is_running,
            "isOver": self.is_over,
            "timer": self.timer,
            "players": {
                pid: player.to_dict()
                for pid, player in self.players.items()
            }
        }

        for ws in self.connections.values():
            await ws.send_json(state)

        if self.is_over:
            for player in self.players:
                self.remove_player(player.id)


    def add_player(self, websocket, name, skin_id):
        player = Player(name, skin_id)
        self.players[player.id] = player
        self.connections[player.id] = websocket
        return player


    def remove_player(self, player_id):
        self.players.pop(player_id, None)
        self.connections.pop(player_id, None)


    def handle_kill(self, killer, victim):

        if victim.lvl > killer.lvl:
            killer.lvl = victim.lvl
        else:
            killer.lvl += 1

        victim.is_dying = True

        killer.max_hp = BASE_MAX_HP * (1.2 ** killer.lvl)
        killer.hp = killer.max_hp
        killer.speed = BASE_SPEED * (1.1 ** killer.lvl)
        killer.attack_cooldown /= (1.2 ** killer.lvl)
        killer.hp_regen_rate = BASE_HP_REGEN_RATE * (1.1 ** killer.lvl)
        killer.is_attacking = False


    def handle_attack(self, attacker):
        hitbox = attacker.get_attack_hitbox()
        rx, ry, rw, rh = hitbox

        for target in self.players.values():
            if target.id == attacker.id:
                continue

            if target.point_in_rect(rx, ry, rw, rh):
                target.hp -= attacker.attack_damage

                if target.hp <= 0 and target.is_dead == False:
                    self.handle_kill(attacker, target)
                    target.is_dead = True



    def handle_input(self, player_id, data):
        player = self.players.get(player_id)
        if not player:
            return

        input = data.get("input")

        if input.get("attack") and player.current_attack_cooldown <= 0.0:
            player.current_attack_cooldown = player.attack_cooldown
            player.is_walking = False
            player.is_attacking = True
            self.handle_attack(player)
        elif player.attack_cooldown - player.current_attack_cooldown < 0.1:
            player.is_walking = False
        elif input.get("up"):
            player.y -= player.speed * TICK_DURATION
            player.direction = 0
            player.is_walking = True
            player.is_attacking = False
        elif input.get("down"):
            player.y += player.speed * TICK_DURATION
            player.direction = 2
            player.is_walking = True
            player.is_attacking = False
        elif input.get("right"):
            player.x += player.speed * TICK_DURATION
            player.direction = 1
            player.is_walking = True
            player.is_attacking = False
        elif input.get("left"):
            player.x -= player.speed * TICK_DURATION
            player.direction = 3
            player.is_walking = True
            player.is_attacking = False
        else:
            player.is_walking = False
            player.is_attacking = False