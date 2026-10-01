from fastapi import APIRouter
from pydantic import BaseModel

from gredforge.core.services.project_service import (
    create_project,
    list_projects,
)


router = APIRouter(prefix="/api/projects", tags=["projects"])


class ProjectCreate(BaseModel):
    name: str
    description: str = ""


@router.get("")
def get_projects():
    return list_projects()


@router.post("")
def post_project(project: ProjectCreate):
    return create_project(
        name=project.name,
        description=project.description,
    )
