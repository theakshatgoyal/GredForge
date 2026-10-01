from datetime import datetime, timezone
from pathlib import Path
import re

from gredforge.storage.database import get_connection


BASE_DIR = Path(__file__).resolve().parents[4]
PROJECTS_DIR = BASE_DIR / "projects"


def slugify(value: str) -> str:

    slug = value.lower().strip()

    slug = re.sub(
        r"[^a-z0-9]+",
        "-",
        slug,
    )

    slug = slug.strip("-")

    return slug[:80]


def create_research_workspace(
    question: str,
) -> Path:

    PROJECTS_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    slug = slugify(question)

    if not slug:
        slug = "research-project"

    workspace = PROJECTS_DIR / slug

    workspace.mkdir(
        parents=True,
        exist_ok=True,
    )


    directories = [
        "questions",
        "literature",
        "sources",
        "concepts",
        "data",
        "experiments",
        "findings",
        "plans",
        "runs",
        "datasets/raw",
        "datasets/processed",
        "env",
    ]


    for directory in directories:

        (
            workspace / directory
        ).mkdir(
            parents=True,
            exist_ok=True,
        )


    return workspace


def create_research_project(
    question: str,
    field: str,
    objective: str,
    rigor: str,
):

    workspace = create_research_workspace(
        question
    )


    created_at = (
        datetime.now(timezone.utc)
        .isoformat()
    )


    project_name = (
        question.strip()
    )


    # --------------------------------------------------------
    # gredforge.yaml
    # --------------------------------------------------------

    config = f"""name: {project_name}
status: draft
field: {field}
objective: {objective}
rigor: {rigor}
created_at: {created_at}
"""


    (
        workspace / "gredforge.yaml"
    ).write_text(
        config,
        encoding="utf-8",
    )


    # --------------------------------------------------------
    # Research question
    # --------------------------------------------------------

    question_document = f"""# Research Question

{question}

## Field

{field}

## Objective

{objective}

## Rigor

{rigor}

## Status

Draft
"""


    (
        workspace
        / "questions"
        / "question.md"
    ).write_text(
        question_document,
        encoding="utf-8",
    )


    # --------------------------------------------------------
    # SQLite
    # --------------------------------------------------------

    connection = get_connection()


    cursor = connection.execute(
        """
        INSERT INTO projects
        (
            name,
            description,
            status,
            created_at,
            workspace_path,
            question,
            field,
            objective,
            rigor
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            project_name,
            question,
            "draft",
            created_at,
            str(workspace),
            question,
            field,
            objective,
            rigor,
        ),
    )


    connection.commit()


    project_id = cursor.lastrowid


    project = connection.execute(
        """
        SELECT *
        FROM projects
        WHERE id = ?
        """,
        (project_id,),
    ).fetchone()


    connection.close()


    return dict(project)
