from fastapi import FastAPI

app = FastAPI(title="Chess Gateway", version="0.0.1")


@app.get("/healthz", summary="Liveness probe")
async def healthz() -> dict[str, str]:
    """Return a minimal health response used by CI and orchestrators."""
    return {"status": "ok"}
