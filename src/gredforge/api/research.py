from fastapi import APIRouter
from pydantic import BaseModel

from gredforge.core.services.research_service import (
    create_research_project,
)


router = APIRouter(
    prefix="/api/research",
    tags=["research"],
)


class ResearchIntake(BaseModel):
    question: str
    field: str
    objective: str
    rigor: str


@router.post("/intake")
def post_research_intake(
    intake: ResearchIntake,
):
    return create_research_project(
        question=intake.question,
        field=intake.field,
        objective=intake.objective,
        rigor=intake.rigor,
    )
