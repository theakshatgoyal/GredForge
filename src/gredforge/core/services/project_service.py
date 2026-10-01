from datetime import datetime, timezone
from pathlib import Path
import re

from gredforge.storage.database import get_connection


BASE_DIR = Path(__file__).resolve().parents[4]
PROJECTS_DIR = BASE_DIR / "projects"


def slugify(name: str) -> str:
    slug = name.lower().strip()
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    return slug.strip("-")


def create_workspace(name: str) -> Path:
    PROJECTS_DIR.mkdir(parents=True, exist_ok=True)

    slug = slugify(name)
    workspace = PROJECTS_DIR / slug

    workspace.mkdir(parents=True, exist_ok=True)

    for directory in [
        "questions",
        "sources",
        "data",
        "experiments",
        "findings",
        "notes",
    ]:
        (workspace / directory).mkdir(exist_ok=True)

    (workspace / "README.md").write_text(
        f"# {name}\n\nResearch workspace created by GredForge.\n"
    )

    (workspace / "project.yaml").write_text(
        f"name: {name}\n"
        f"status: draft\n"
    )

    return workspace


def create_project(name: str, description: str = ""):
    workspace = create_workspace(name)

    created_at = datetime.now(timezone.utc).isoformat()

    connection = get_connection()

    cursor = connection.execute(
        """
        INSERT INTO projects
        (name, description, status, created_at, workspace_path)
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            name,
            description,
            "draft",
            created_at,
            str(workspace),
        ),
    )

    connection.commit()

    project_id = cursor.lastrowid

    project = connection.execute(
        "SELECT * FROM projects WHERE id = ?",
        (project_id,),
    ).fetchone()

    connection.close()

    return dict(project)


def list_projects():
    connection = get_connection()

    projects = connection.execute(
        """
        SELECT *
        FROM projects
        ORDER BY id DESC
        """
    ).fetchall()

    connection.close()

    return [dict(project) for project in projects]
