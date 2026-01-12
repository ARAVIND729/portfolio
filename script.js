document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     TYPING EFFECT
  ========================= */

  const roles = [
    "Embedded Engineer",
    "PCB Designer",
    "IoT Developer",
    "Electronics Engineer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  const typing = document.getElementById("typing");

  function type() {
    if (!typing) return;

    if (charIndex < roles[roleIndex].length) {
      typing.textContent += roles[roleIndex].charAt(charIndex++);
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 1500);
    }
  }

  function erase() {
    if (!typing) return;

    if (charIndex > 0) {
      typing.textContent = roles[roleIndex].substring(0, --charIndex);
      setTimeout(erase, 50);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 300);
    }
  }

  if (typing) type();

  /* =========================
     SCROLL REVEAL
  ========================= */

  const reveals = document.querySelectorAll(".reveal");

  if (reveals.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
  }

});

const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalYear = document.getElementById("modalYear");
const modalDesc = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");
const modalGithub = document.getElementById("modalGithub");
const modalLive = document.getElementById("modalLive");
const modalClose = document.querySelector(".modal-close");

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    modalImage.src = card.dataset.image;
    modalTitle.textContent = card.dataset.title;
    modalYear.textContent = card.dataset.year;
    modalDesc.textContent = card.dataset.description;

    modalTags.innerHTML = "";
    card.dataset.tags.split(",").forEach(tag => {
      const span = document.createElement("span");
      span.textContent = tag.trim();
      modalTags.appendChild(span);
    });

    modalGithub.href = card.dataset.github;
    modalLive.href = card.dataset.live;

    modal.style.display = "flex";
    document.body.classList.add("modal-open");

  });
});

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");

});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }
});


window.addEventListener("keydown", e => {
  if (e.key === "Escape") {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
}

});


