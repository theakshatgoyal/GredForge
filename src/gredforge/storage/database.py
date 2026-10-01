import sqlite3
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[3]
DATA_DIR = BASE_DIR / "data"
DATABASE_PATH = DATA_DIR / "gredforge.db"


def get_connection():
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row

    initialize_database(connection)

    return connection


def initialize_database(connection=None):
    owns_connection = connection is None

    if owns_connection:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        connection = sqlite3.connect(DATABASE_PATH)

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            status TEXT NOT NULL,
            created_at TEXT NOT NULL,
            workspace_path TEXT NOT NULL
        )
        """
    )

    connection.commit()

    if owns_connection:
        connection.close()
