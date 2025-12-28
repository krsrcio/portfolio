import { getProjects } from "./firestore.js";

/* 🔽 SKILLS TOGGLE - UPDATED WITH SMOOTH CLOSING */
window.toggleSkills = function (category) {
  const skillsSection = document.getElementById(`${category}-skills`);
  const arrow = skillsSection.previousElementSibling.querySelector(".category-arrow");

  // Check if we're opening or closing
  const isOpening = !skillsSection.classList.contains("active");

  if (isOpening) {
    // Opening: add active class immediately for smooth opening
    skillsSection.classList.add("active");
    arrow.classList.add("rotate");
    
    // Close other open sections with smooth animation
    document.querySelectorAll(".category-skills").forEach((section) => {
      if (section.id !== `${category}-skills` && section.classList.contains("active")) {
        // Smoothly close other sections
        section.style.transition = "max-height 0.5s ease-in-out, opacity 0.3s ease-in-out";
        section.style.maxHeight = "0";
        section.style.opacity = "0";
        
        setTimeout(() => {
          section.classList.remove("active");
          section.style.transition = "";
          section.style.maxHeight = "";
          section.style.opacity = "";
          section.previousElementSibling.querySelector(".category-arrow").classList.remove("rotate");
        }, 500); // Match this with CSS transition time
      }
    });
  } else {
    // Closing: smoothly close the current section
    skillsSection.style.transition = "max-height 0.5s ease-in-out, opacity 0.3s ease-in-out";
    skillsSection.style.maxHeight = skillsSection.scrollHeight + "px";
    
    // Force reflow
    skillsSection.offsetHeight;
    
    // Start closing animation
    skillsSection.style.maxHeight = "0";
    skillsSection.style.opacity = "0";
    arrow.classList.remove("rotate");
    
    // Remove active class after animation completes
    setTimeout(() => {
      skillsSection.classList.remove("active");
      skillsSection.style.transition = "";
      skillsSection.style.maxHeight = "";
      skillsSection.style.opacity = "";
    }, 500); // Match this with CSS transition time
  }
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

// Main DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function() {
  // Load projects
  loadProjects();

  // Back to top button
  const backToTop = document.createElement('a');
  backToTop.href = '#top';
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
  backToTop.title = 'Back to top';
  document.body.appendChild(backToTop);

  // Show/hide back to top button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate offset for fixed elements if any
        const offset = 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without page jump
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // Fix for footer links
  const footerLinks = document.querySelectorAll('.footer-section a[href^="#"]');
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offset = 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL
        history.pushState(null, null, targetId);
      }
    });
  });

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission
      setTimeout(() => {
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        console.log('Form data:', data);
        
        // Show success message
        formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Clear status message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }, 5000);
      }, 1500);
    });
  }
});