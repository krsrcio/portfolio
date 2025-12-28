import { getProjects } from "./firestore.js";

/* 🔽 SKILLS TOGGLE */
window.toggleSkills = function (category) {
  const skillsSection = document.getElementById(`${category}-skills`);
  const arrow =
    skillsSection.previousElementSibling.querySelector(".category-arrow");

  const isActive = skillsSection.classList.toggle("active");
  arrow.classList.toggle("rotate", isActive);

  document.querySelectorAll(".category-skills").forEach((section) => {
    if (section.id !== `${category}-skills`) {
      section.classList.remove("active");
      section.previousElementSibling
        .querySelector(".category-arrow")
        .classList.remove("rotate");
    }
  });
};

/* 🔽 LOAD PROJECTS */
async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";

  try {
    const projects = await getProjects();

    projects.forEach((data) => {
      const card = document.createElement("div");
      card.className = "project-card";

      card.innerHTML = `
  <div class="project-thumbnail">
    ${
      data.thumbnail
        ? `<img src="${data.thumbnail}" alt="${data.title}" />`
        : "🎯"
    }
  </div>
  <div class="project-title">${data.title || "Untitled Project"}</div>
  <div class="project-desc">
    ${data.desc || "No description yet"}
  </div>
`;

      grid.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadProjects);
