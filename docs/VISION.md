# Vision for the Chess Web GUI

The Chess Web GUI should be a user-friendly Chess UI running in the browser. It should focus on a smooth UI/UX and should support the following modes:

1. Human vs. Human
2. Human vs. Computer
3. Computer vs. Computer

The Computer will be a chess engine, which will be accessed

1. by API calls
or
2. (optional) plugged in locally via UCI protocol.

## API Calls (for now from localhost:8000)

| Method | Path | Description | Request Body | Success Response |
|--------|------|-------------|--------------|------------------|
| GET | `/healthz` | Liveness probe confirming the service is reachable. | _None_ | `{ "status": "ok" }` |
| POST | `/api/games` | Creates a new in-memory game session and returns its identifier. | _None_ | `{ "game_id": str, "fen": str }` |
| GET | `/api/games/{game_id}/state` | Fetches the current game state, including legal moves and history. | _None_ | `GameState` payload with FEN, legal moves, and status flags. |
| POST | `/api/games/{game_id}/position` | Replaces the game state with a provided FEN position. | `{ "fen": str }` | Updated `GameState`. |
| POST | `/api/games/{game_id}/move` | Applies a UCI move string to the game. | `{ "move": str }` | Updated `GameState`. |
| POST | `/api/games/{game_id}/undo` | Reverts the most recent move in the session. | _None_ | Updated `GameState`. |
| POST | `/api/games/{game_id}/search` | Runs a search from the current position. | `{ "depth"?: int, "movetime_ms"?: int, "tt_max_entries"?: int, "enable_profiling"?: bool }` | Search statistics, principal variation, and best move. |
| POST | `/api/perft` | Executes a perft calculation for the supplied FEN at a depth. | `{ "fen": str, "depth"?: int }` | `{ "nodes": int }` |

`GameState` responses contain:

- `game_id`: Session identifier.
- `fen`: Current board position in FEN notation.
- `legal_moves`: List of legal moves as UCI strings.
- `in_check`, `checkmate`, `stalemate`, `draw`: Status flags for the side to move.
- `last_move`: The most recent move in UCI format, if any.
- `move_history`: Chronological list of moves applied to the game.

### Profiling (HTTP)
- Request: set `enable_profiling: true` in `/api/games/{game_id}/search` to collect basic internal timing.
- Response includes two additional fields when enabled:
  - `gen_time_main_ms`: time spent generating legal moves at main (non-quiescence) nodes (accumulated milliseconds).
  - `gen_time_q_ms`: time spent generating captures/evasions inside quiescence (accumulated milliseconds).

## UCI Input Guide

The engine speaks the [Universal Chess Interface (UCI)](https://en.wikipedia.org/wiki/Universal_Chess_Interface) protocol, which
lets you drive it from any UCI-compatible GUI or from the command line. The snippets below demonstrate a simple, manual
interaction using `python -m chess_engine.cli.uci` (replace this command with the appropriate entry point for your build).

### 1. Start the Engine

```bash
python -m chess_engine.cli.uci
```

When the engine is ready it prints `uciok`, indicating that it understands the protocol.

### 2. Configure Options (Optional)

Use `setoption` commands to configure the engine. For example, to limit the search depth to 10 plies:

```
setoption name Depth value 10
```

Available option names depend on the current build; the engine will list them in response to the `uci` command. Notable options:
- `Hash` (spin): approximate transposition table size in MiB.
- `MultiPV` (spin): number of principal variations to report.
- `Profiling` (check): when `true`, enables lightweight internal timing of move generation; intended for diagnostics. It does not change `info` output fields, only internal stats used by the HTTP interface or future diagnostics.

### 3. Initialize a New Game

Before starting play, reset the internal state:

```
ucinewgame
isready
```

Wait for the engine to reply `readyok` before sending moves or search commands.

### 4. Provide the Position

Load a starting position using `position`. You can begin from the standard initial layout or a specific FEN string.

```
position startpos moves e2e4 e7e5 g1f3
```

The example above plays 1.e4 e5 2.Nf3, setting the engine to move on behalf of Black. Replace `startpos` with
`fen <FEN_STRING>` to continue from an arbitrary board state.

### 5. Ask the Engine to Search

The `go` command starts the search. Common parameters are `movetime` (milliseconds to think) and `depth` (maximum search depth).

```
go movetime 2000
```

The engine will analyze the position and eventually emit a `bestmove`, e.g. `bestmove b8c6`.

### 6. Iterate

After each `bestmove`, apply it to your GUI or continue the command-line session by appending it to the next `position ... moves`
sequence. Repeat the `go` command as needed.

### 7. Exit Cleanly

Send `quit` to terminate the session:

```
quit
```

This ensures the process shuts down gracefully.
