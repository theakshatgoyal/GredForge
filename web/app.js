// ============================================================
// GredForge frontend
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // Research state
    // ========================================================

    const researchState = {
        question: "",
        field: null,
        objective: null,
        rigor: null
    };


    // ========================================================
    // Main elements
    // ========================================================

    const typedHeading =
        document.getElementById("typed-heading");

    const brainDumpPanel =
        document.getElementById("brain-dump-panel");

    const brainDumpToggle =
        document.getElementById("brain-dump-toggle");

    const researchQuestion =
        document.getElementById("research-question");

    const continueButton =
        document.getElementById("continue-button");

    const fieldStage =
        document.getElementById("field-stage");


    // ========================================================
    // Typing animation
    // ========================================================

    const headingText =
        "What question do you wish to solve?";

    let characterIndex = 0;

    function typeHeading() {

        if (!typedHeading) {
            return;
        }

        if (characterIndex >= headingText.length) {
            return;
        }

        typedHeading.textContent +=
            headingText[characterIndex];

        characterIndex += 1;

        setTimeout(typeHeading, 55);
    }

    typeHeading();


    // ========================================================
    // Brain dump
    // ========================================================

    if (brainDumpToggle && brainDumpPanel) {

        brainDumpToggle.addEventListener("click", () => {

            const closed =
                brainDumpPanel.classList.toggle("closed");

            brainDumpToggle.setAttribute(
                "aria-expanded",
                String(!closed)
            );

            brainDumpToggle.setAttribute(
                "aria-label",
                closed
                    ? "Open brain dump"
                    : "Close brain dump"
            );

            const arrow =
                brainDumpToggle.querySelector("span");

            if (arrow) {
                arrow.textContent =
                    closed ? "‹" : "›";
            }
        });
    }


    // ========================================================
    // Intake step controller
    // ========================================================

    const steps = {
        field: document.getElementById("field-step"),
        objective: document.getElementById("objective-step"),
        rigor: document.getElementById("rigor-step"),
        created: document.getElementById("created-step")
    };


    function showStep(name) {

        Object.values(steps).forEach(step => {

            if (step) {
                step.classList.remove("active");
            }

        });

        if (steps[name]) {
            steps[name].classList.add("active");
        }
    }


    // ========================================================
    // Question -> Field
    // ========================================================

    if (continueButton) {

        continueButton.addEventListener("click", () => {

            const question =
                researchQuestion.value.trim();

            if (!question) {

                researchQuestion.focus();

                researchQuestion.animate(
                    [
                        { transform: "translateX(0)" },
                        { transform: "translateX(-5px)" },
                        { transform: "translateX(5px)" },
                        { transform: "translateX(-5px)" },
                        { transform: "translateX(0)" }
                    ],
                    {
                        duration: 220
                    }
                );

                return;
            }

            researchState.question = question;

            showStep("field");

            fieldStage.classList.add("open");

            console.log(
                "Question:",
                researchState.question
            );
        });
    }


    // ========================================================
    // Field selection
    // ========================================================

    const fieldOptions =
        document.querySelectorAll(".field-option");

    fieldOptions.forEach(button => {

        button.addEventListener("click", () => {

            fieldOptions.forEach(option => {
                option.classList.remove("selected");
            });

            button.classList.add("selected");

            researchState.field =
                button.dataset.field;

            console.log(
                "Field:",
                researchState.field
            );
        });
    });


    // ========================================================
    // Field back
    // ========================================================

    const fieldBackButton =
        document.getElementById("field-back-button");

    if (fieldBackButton) {

        fieldBackButton.addEventListener("click", () => {

            fieldStage.classList.remove("open");

            showStep("field");
        });
    }


    // ========================================================
    // Field -> Objective
    // ========================================================

    const fieldContinueButton =
        document.getElementById("field-continue-button");

    if (fieldContinueButton) {

        fieldContinueButton.addEventListener("click", () => {

            if (!researchState.field) {

                alert("Please select a research field.");

                return;
            }

            showStep("objective");

        });
    }


    // ========================================================
    // Objective selection
    // ========================================================

    const objectiveOptions =
        document.querySelectorAll(".choice-option[data-objective]");

    objectiveOptions.forEach(button => {

        button.addEventListener("click", () => {

            objectiveOptions.forEach(option => {
                option.classList.remove("selected");
            });

            button.classList.add("selected");

            researchState.objective =
                button.dataset.objective;

            console.log(
                "Objective:",
                researchState.objective
            );
        });
    });


    // ========================================================
    // Objective back
    // ========================================================

    const objectiveBackButton =
        document.getElementById("objective-back-button");

    if (objectiveBackButton) {

        objectiveBackButton.addEventListener("click", () => {
            showStep("field");
        });
    }


    // ========================================================
    // Objective -> Rigor
    // ========================================================

    const objectiveContinueButton =
        document.getElementById("objective-continue-button");

    if (objectiveContinueButton) {

        objectiveContinueButton.addEventListener("click", () => {

            if (!researchState.objective) {

                alert("Please select a research objective.");

                return;
            }

            showStep("rigor");
        });
    }


    // ========================================================
    // Rigor selection
    // ========================================================

    const rigorOptions =
        document.querySelectorAll(".choice-option[data-rigor]");

    rigorOptions.forEach(button => {

        button.addEventListener("click", () => {

            rigorOptions.forEach(option => {
                option.classList.remove("selected");
            });

            button.classList.add("selected");

            researchState.rigor =
                button.dataset.rigor;

            console.log(
                "Rigor:",
                researchState.rigor
            );
        });
    });


    // ========================================================
    // Rigor back
    // ========================================================

    const rigorBackButton =
        document.getElementById("rigor-back-button");

    if (rigorBackButton) {

        rigorBackButton.addEventListener("click", () => {
            showStep("objective");
        });
    }


    // ========================================================
    // Start research
    // ========================================================

    const startResearchButton =
        document.getElementById("start-research-button");

    if (startResearchButton) {

        startResearchButton.addEventListener("click", async () => {

            if (!researchState.rigor) {

                alert("Please select a research rigor.");

                return;
            }

            console.log(
                "Submitting research:",
                researchState
            );

            startResearchButton.disabled = true;

            startResearchButton.textContent =
                "Creating...";

            try {

                const response =
                    await fetch("/api/research/intake", {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(
                            researchState
                        )
                    });


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.detail ||
                        "Research creation failed."
                    );
                }


                console.log(
                    "Research created:",
                    data
                );


                document.getElementById(
                    "summary-field"
                ).textContent =
                    researchState.field;


                document.getElementById(
                    "summary-objective"
                ).textContent =
                    researchState.objective;


                document.getElementById(
                    "summary-rigor"
                ).textContent =
                    researchState.rigor;


                document.getElementById(
                    "created-message"
                ).textContent =
                    `Workspace "${data.name}" has been created.`;


                showStep("created");


            } catch (error) {

                console.error(error);

                alert(
                    "Could not create the research workspace.\n\n" +
                    error.message
                );

            } finally {

                startResearchButton.disabled = false;

                startResearchButton.textContent =
                    "Start Research →";
            }
        });
    }


    // ========================================================
    // Open workspace
    // ========================================================

    const openWorkspaceButton =
        document.getElementById(
            "open-workspace-button"
        );

    if (openWorkspaceButton) {

        openWorkspaceButton.addEventListener("click", async () => {
   		fieldStage.classList.remove("open");

    		showPage("workspaces");

    		await loadWorkspaces();
});
    }


    // ========================================================
    // Sidebar navigation
    // ========================================================

    const navItems =
        document.querySelectorAll(".nav-item");

    const pages = {
        research: document.querySelector(".intake"),
        workspaces: document.getElementById("workspaces-page"),
        runs: document.getElementById("runs-page"),
        knowledge: document.getElementById("knowledge-page")
    };


    function showPage(pageName) {

        if (pages.research) {
            pages.research.classList.remove(
                "page-hidden"
            );
        }

        if (pages.workspaces) {
            pages.workspaces.classList.remove("active");
        }

        if (pages.runs) {
            pages.runs.classList.remove("active");
        }

        if (pages.knowledge) {
            pages.knowledge.classList.remove("active");
        }


        if (pageName === "research") {

            if (pages.research) {
                pages.research.classList.remove(
                    "page-hidden"
                );
            }

        } else {

            if (pages.research) {
                pages.research.classList.add(
                    "page-hidden"
                );
            }

            if (pages[pageName]) {
                pages[pageName].classList.add("active");
            }
        }
    }


    navItems.forEach(button => {

        button.addEventListener("click", () => {

            const pageName =
                button.dataset.page;

            navItems.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            showPage(pageName);
        });
    });

async function loadWorkspaces() {
    const workspaceList = document.getElementById("workspace-list");

    if (!workspaceList) {
        return;
    }

    workspaceList.innerHTML = `
        <div class="empty-state">
            Loading research workspaces...
        </div>
    `;

    try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
            throw new Error("Failed to load workspaces");
        }

        const projects = await response.json();

        if (projects.length === 0) {
            workspaceList.innerHTML = `
                <div class="empty-state">
                    No research workspaces yet.
                </div>
            `;
            return;
        }

        workspaceList.innerHTML = projects.map(project => `
            <article class="workspace-card">
                <div class="workspace-card-header">
                    <span class="eyebrow">
                        RESEARCH / ${project.status.toUpperCase()}
                    </span>
                    <span class="workspace-id">
                        #${project.id}
                    </span>
                </div>

                <h3>${escapeHtml(project.name)}</h3>

                <div class="workspace-meta">
                    <span>${escapeHtml(project.field || "Unspecified field")}</span>
                    <span>${escapeHtml(project.objective || "No objective")}</span>
                    <span>${escapeHtml(project.rigor || "No rigor")}</span>
                </div>
            </article>
        `).join("");

    } catch (error) {
        console.error(error);

        workspaceList.innerHTML = `
            <div class="empty-state">
                Failed to load research workspaces.
            </div>
        `;
    }
}

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}
    // ========================================================
    // Startup
    // ========================================================

    console.log(
        "GredForge frontend loaded successfully."
    );

});
