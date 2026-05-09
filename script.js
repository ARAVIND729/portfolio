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

      typing.textContent += roles[roleIndex].charAt(charIndex);
      charIndex++;

      setTimeout(type, 100);

    } else {

      setTimeout(erase, 1500);

    }
  }

  function erase() {

    if (!typing) return;

    if (charIndex > 0) {

      typing.textContent =
        roles[roleIndex].substring(0, charIndex - 1);

      charIndex--;

      setTimeout(erase, 50);

    } else {

      roleIndex = (roleIndex + 1) % roles.length;

      setTimeout(type, 300);

    }
  }

  if (typing) {
    type();
  }

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

    }, {
      threshold: 0.15
    });

    reveals.forEach(el => observer.observe(el));
  }

  /* =========================
     PROJECT MODAL
  ========================= */

  const modal = document.getElementById("projectModal");

  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalYear = document.getElementById("modalYear");
  const modalDesc = document.getElementById("modalDescription");
  const modalTags = document.getElementById("modalTags");

  const modalGithub = document.getElementById("modalGithub");
  const modalLive = document.getElementById("modalLive");

  const modalClose = document.querySelector(".modal-close");

  /* =========================
     OPEN MODAL
  ========================= */

  document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("click", () => {

      modalImage.src = card.dataset.image;

      modalTitle.textContent = card.dataset.title;

      modalYear.textContent = card.dataset.year;

      /* IMPORTANT FIX */
      modalDesc.innerHTML = card.dataset.description;

      /* TAGS */

      modalTags.innerHTML = "";

      card.dataset.tags.split(",").forEach(tag => {

        const span = document.createElement("span");

        span.textContent = tag.trim();

        modalTags.appendChild(span);

      });

      /* LINKS */

      modalGithub.href = card.dataset.github;
      modalLive.href = card.dataset.live;

      /* SHOW MODAL */

      modal.style.display = "flex";

      /* STOP BACKGROUND SCROLL */

      document.body.style.overflow = "hidden";

    });

  });

  /* =========================
     CLOSE MODAL
  ========================= */

  function closeModal() {

    modal.style.display = "none";

    /* ENABLE BACKGROUND SCROLL AGAIN */

    document.body.style.overflow = "auto";

  }

  /* CLOSE BUTTON */

  modalClose.addEventListener("click", closeModal);

  /* CLICK OUTSIDE */

  modal.addEventListener("click", e => {

    if (e.target === modal) {
      closeModal();
    }

  });

  /* ESC KEY */

  window.addEventListener("keydown", e => {

    if (e.key === "Escape") {
      closeModal();
    }

  });

  /* =========================
     FIX SCROLL INSIDE MODAL
  ========================= */

  const modalContent = document.querySelector(".modal-content");

  if (modalContent) {

    modalContent.addEventListener("wheel", e => {

      const isAtTop =
        modalContent.scrollTop === 0;

      const isAtBottom =
        modalContent.scrollHeight - modalContent.scrollTop ===
        modalContent.clientHeight;

      if (
        (isAtTop && e.deltaY < 0) ||
        (isAtBottom && e.deltaY > 0)
      ) {
        e.preventDefault();
      }

    }, { passive: false });

  }

});
