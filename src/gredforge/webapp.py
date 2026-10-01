from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from gredforge.api.projects import router as projects_router
from gredforge.storage.database import initialize_database


BASE_DIR = Path(__file__).resolve().parents[2]
WEB_DIR = BASE_DIR / "web"


app = FastAPI(
    title="GredForge",
    version="0.1.0",
)


app.mount(
    "/static",
    StaticFiles(directory=WEB_DIR),
    name="static",
)


app.include_router(projects_router)


@app.on_event("startup")
def startup():
    initialize_database()


@app.get("/", include_in_schema=False)
def home():
    return FileResponse(WEB_DIR / "index.html")


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }


@app.get("/api/status")
def status():
    return {
        "name": "GredForge",
        "status": "running",
        "version": "0.1.0",
    }
