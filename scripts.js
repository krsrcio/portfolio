function toggleSkills(category) {
  const skillsSection = document.getElementById(`${category}-skills`);
  const arrow = skillsSection.previousElementSibling.querySelector(".category-arrow");

  const isActive = skillsSection.classList.toggle("active");
  arrow.classList.toggle("rotate", isActive);

  document.querySelectorAll(".category-skills").forEach((section) => {
    if (section.id !== `${category}-skills`) {
      section.classList.remove("active");
      section.previousElementSibling.querySelector(".category-arrow").classList.remove("rotate");
    }
  });
}
