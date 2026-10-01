let projects = [];

function showPage(page) {
    document.querySelectorAll(".page").forEach(
        element => element.classList.remove("active")
    );

    document.getElementById(page).classList.add("active");

    const titles = {
        dashboard: "Dashboard",
        projects: "Projects",
        workflows: "Workflows",
        runs: "Runs"
    };

    document.getElementById("page-title").textContent = titles[page];

    if (page === "projects") {
        renderProjects();
    }
}

function openModal() {
    document.getElementById("modal").classList.add("open");
}

function closeModal() {
    document.getElementById("modal").classList.remove("open");
}

function createProject(event) {
    event.preventDefault();

    const name = document.getElementById("project-name").value;
    const description =
        document.getElementById("project-description").value;

    projects.push({
        id: Date.now(),
        name,
        description,
        status: "draft"
    });

    event.target.reset();
    closeModal();
    renderProjects();
    updateStats();
    showPage("projects");
}

function projectCard(project) {
    return `
        <article class="project-card">
            <h4>${escapeHtml(project.name)}</h4>
            <p>${escapeHtml(
                project.description || "Research workspace"
            )}</p>

            <div class="project-meta">
                <span>● ${project.status.toUpperCase()}</span>
                <span>LOCAL WORKSPACE</span>
            </div>
        </article>
    `;
}

function renderProjects() {
    const html = projects.length
        ? projects.map(projectCard).join("")
        : `
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create your first research project.</p>
            </div>
        `;

    document.getElementById("project-list").innerHTML = html;
    document.getElementById("all-projects").innerHTML = html;
}

function updateStats() {
    document.getElementById("project-count").textContent =
        projects.length;
}

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

renderProjects();
updateStats();
