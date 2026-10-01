// ============================================================
// GredForge frontend
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------------------------
    // Research state
    // --------------------------------------------------------

    const researchState = {
        question: "",
        field: null,
        objective: null,
        rigor: null
    };


    // --------------------------------------------------------
    // Elements
    // --------------------------------------------------------

    const typedHeading = document.getElementById("typed-heading");

    const brainDumpPanel = document.getElementById("brain-dump-panel");
    const brainDumpToggle = document.getElementById("brain-dump-toggle");

    const continueButton = document.getElementById("continue-button");
    const researchQuestion = document.getElementById("research-question");

    const fieldStage = document.getElementById("field-stage");
    const backButton = document.getElementById("back-button");

    const navItems = document.querySelectorAll(".nav-item");

    const app = document.querySelector(".app");
    const sidebarToggle = document.getElementById("sidebar-toggle");

    const workspacesPage = document.getElementById("workspaces-page");
    const runsPage = document.getElementById("runs-page");
    const knowledgePage = document.getElementById("knowledge-page");

    const intakePage = document.querySelector(".intake");


    // --------------------------------------------------------
    // 1. Typing animation
    // --------------------------------------------------------

    const headingText = "What question do you wish to solve?";
    let characterIndex = 0;

    function typeHeading() {
        if (!typedHeading) return;

        if (characterIndex < headingText.length) {
            typedHeading.textContent += headingText[characterIndex];
            characterIndex += 1;

            setTimeout(typeHeading, 55);
        }
    }

    typeHeading();


    // --------------------------------------------------------
    // 2. Brain dump toggle
    // --------------------------------------------------------

    if (brainDumpToggle && brainDumpPanel) {

        brainDumpToggle.addEventListener("click", () => {

            const isClosed =
                brainDumpPanel.classList.toggle("closed");

            brainDumpToggle.setAttribute(
                "aria-expanded",
                String(!isClosed)
            );

            brainDumpToggle.setAttribute(
                "aria-label",
                isClosed
                    ? "Open brain dump"
                    : "Close brain dump"
            );

            const arrow =
                brainDumpToggle.querySelector("span");

            if (arrow) {
                arrow.textContent =
                    isClosed ? "‹" : "›";
            }
        });
    }


    // --------------------------------------------------------
    // 3. Research question -> field selection
    // --------------------------------------------------------

    if (continueButton && researchQuestion && fieldStage) {

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

            fieldStage.classList.add("open");

            console.log(
                "Research question:",
                researchState.question
            );
        });
    }


    // --------------------------------------------------------
    // 4. Back from field selection
    // --------------------------------------------------------

    if (backButton && fieldStage) {

        backButton.addEventListener("click", () => {
            fieldStage.classList.remove("open");
        });
    }


    // --------------------------------------------------------
    // 5. Field selection
    // --------------------------------------------------------

    const fieldOptions =
        document.querySelectorAll(".field-option");

    fieldOptions.forEach(button => {

        button.addEventListener("click", () => {

            fieldOptions.forEach(option => {
                option.classList.remove("selected");
            });

            button.classList.add("selected");

            researchState.field =
                button.textContent.trim();

            console.log(
                "Selected field:",
                researchState.field
            );
        });
    });


    // --------------------------------------------------------
    // 6. Sidebar navigation
    // --------------------------------------------------------

    function showPage(pageName) {

        // Hide everything first
        if (intakePage) {
            intakePage.classList.remove("page-hidden");
        }

        if (workspacesPage) {
            workspacesPage.classList.remove("active");
        }

        if (runsPage) {
            runsPage.classList.remove("active");
        }

        if (knowledgePage) {
            knowledgePage.classList.remove("active");
        }


        // Show requested page
        if (pageName === "research") {

            // Research is the original intake layout.
            if (intakePage) {
                intakePage.classList.remove("page-hidden");
            }

        } else if (pageName === "workspaces") {

            if (intakePage) {
                intakePage.classList.add("page-hidden");
            }

            if (workspacesPage) {
                workspacesPage.classList.add("active");
            }

        } else if (pageName === "runs") {

            if (intakePage) {
                intakePage.classList.add("page-hidden");
            }

            if (runsPage) {
                runsPage.classList.add("active");
            }

        } else if (pageName === "knowledge") {

            if (intakePage) {
                intakePage.classList.add("page-hidden");
            }

            if (knowledgePage) {
                knowledgePage.classList.add("active");
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

            console.log(
                "Navigation:",
                pageName
            );
        });
    });

// --------------------------------------------------------
// Sidebar minimize
// --------------------------------------------------------

if (sidebarToggle && app) {

    sidebarToggle.addEventListener("click", () => {

        const collapsed =
            app.classList.toggle("sidebar-collapsed");

        sidebarToggle.setAttribute(
            "aria-expanded",
            String(!collapsed)
        );

        sidebarToggle.setAttribute(
            "aria-label",
            collapsed
                ? "Expand sidebar"
                : "Minimize sidebar"
        );
    });
}


    // --------------------------------------------------------
    // 7. Debug confirmation
    // --------------------------------------------------------

    console.log("GredForge frontend loaded successfully.");

});
