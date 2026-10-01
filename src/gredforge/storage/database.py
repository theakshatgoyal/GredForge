import sqlite3
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[3]

DATA_DIR = BASE_DIR / "data"

DATABASE_PATH = DATA_DIR / "gredforge.db"


def get_connection():

    DATA_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    connection = sqlite3.connect(
        DATABASE_PATH
    )

    connection.row_factory = sqlite3.Row

    initialize_database(connection)

    return connection


def initialize_database(
    connection=None
):

    owns_connection = (
        connection is None
    )


    if owns_connection:

        DATA_DIR.mkdir(
            parents=True,
            exist_ok=True,
        )

        connection = sqlite3.connect(
            DATABASE_PATH
        )


    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS projects (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT NOT NULL,

            description TEXT,

            status TEXT NOT NULL,

            created_at TEXT NOT NULL,

            workspace_path TEXT NOT NULL,

            question TEXT,

            field TEXT,

            objective TEXT,

            rigor TEXT

        )
        """
    )


    # --------------------------------------------------------
    # Migration for databases created before these fields
    # existed.
    # --------------------------------------------------------

    columns = {
        row[1]
        for row in connection.execute(
            "PRAGMA table_info(projects)"
        ).fetchall()
    }


    new_columns = {
        "question": "TEXT",
        "field": "TEXT",
        "objective": "TEXT",
        "rigor": "TEXT",
    }


    for column, data_type in new_columns.items():

        if column not in columns:

            connection.execute(
                f"""
                ALTER TABLE projects
                ADD COLUMN {column} {data_type}
                """
            )


    connection.commit()


    if owns_connection:
        connection.close()
