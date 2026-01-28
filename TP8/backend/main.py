import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from contextlib import asynccontextmanager
from Game import Game

game = Game(needed_players=1)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    asyncio.create_task(game.game_loop())
    yield
    # Shutdown (optionnel)
    print("Server shutting down")

app = FastAPI(lifespan=lifespan)


@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()

    join_data = await ws.receive_json()
    name = join_data.get("name")
    skin_path = join_data.get("skinPath")

    print(name, skin_path)

    skin_path = skin_path[1:]

    player = game.add_player(ws, name, skin_path)
    player_id = player.id

    try:
        while True:
            data = await ws.receive_json()
            game.handle_input(player_id, data)

    except WebSocketDisconnect:
        game.remove_player(player_id)