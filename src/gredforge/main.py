import typer
import uvicorn


app = typer.Typer()


@app.callback(invoke_without_command=True)
def main():
    """Start GredForge."""
    uvicorn.run(
        "gredforge.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
    )


if __name__ == "__main__":
    app()