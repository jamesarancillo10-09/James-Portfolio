(() => {
  "use strict";

  const nav = document.getElementById("nav");
  const navLinks = document.getElementById("navLinks");
  const menuBtn = document.getElementById("menuBtn");
  const themeToggle = document.getElementById("themeToggle");
  const profileImage = document.getElementById("profileImage");
  const profileFallback = document.getElementById("profileFallback");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalToolsLabel = document.getElementById("modalToolsLabel");
  const modalTags = document.getElementById("modalTags");
  const ghlProjectGallery = document.getElementById("ghlProjectGallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");

  /* --------------------------------------------------
     Theme
  -------------------------------------------------- */
  const savedTheme = localStorage.getItem("ja-theme");
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

  themeToggle?.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    if (next === "dark") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("ja-theme", next === "dark" ? "" : "light");
  });

  /* --------------------------------------------------
     Nav
  -------------------------------------------------- */
  const closeMenu = () => {
    navLinks?.classList.remove("is-open");
    menuBtn?.setAttribute("aria-expanded", "false");
  };

  menuBtn?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("scroll", () => {
    nav?.classList.toggle("is-scrolled", window.scrollY > 12);
  }, { passive: true });

  const sections = [...document.querySelectorAll("main section[id]")];
  const markActive = () => {
    const y = window.scrollY + 120;
    let current = "home";
    sections.forEach((section) => {
      if (section.offsetTop <= y) current = section.id;
    });
    navLinks?.querySelectorAll("a").forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", markActive, { passive: true });
  markActive();

  /* --------------------------------------------------
     Profile image fallback
     REPLACE: add assets/profile.jpg to hide this placeholder
  -------------------------------------------------- */
  const showProfileFallback = () => {
    if (!profileFallback) return;
    if (profileImage) profileImage.hidden = true;
    profileFallback.hidden = false;
    profileFallback.style.display = "grid";
  };

  if (profileImage) {
    profileImage.addEventListener("error", showProfileFallback);
    if (profileImage.complete && profileImage.naturalWidth === 0) showProfileFallback();
  }

  /* --------------------------------------------------
     Scroll reveal
  -------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* --------------------------------------------------
     Particles
  -------------------------------------------------- */
  const canvas = document.getElementById("particleCanvas");
  if (canvas && canvas.getContext && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = canvas.getContext("2d");
    let dots = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      dots = Array.from({ length: Math.min(70, Math.floor(canvas.width / 24)) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * 0.35 + 0.08,
        s: Math.random() * 0.25 + 0.05
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.y -= d.s;
        if (d.y < 0) d.y = canvas.height;
        ctx.beginPath();
        ctx.fillStyle = `rgba(196, 181, 253, ${d.a})`;
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(tick);
    };
    tick();
  }

  /* --------------------------------------------------
     Case studies
     REPLACE: update copy here if a project grows into a longer write-up
  -------------------------------------------------- */
  const projects = {
    lead: {
      category: "zapier",
      title: "Lead Enrichment & Qualification",
      body: "🔴 Problem — New leads require repetitive enrichment, qualification, routing, and follow-up. 🟡 Solution — Zapier formats company URLs, enriches records through a webhook and Apollo, separates high- and low-priority paths, logs high-priority leads in Google Sheets, alerts Slack, drafts with AI, and sends through Gmail. 🟢 Result — Faster lead response, more consistent routing, organized lead data, and less manual lead handling.",
      tags: ["Zapier", "Typeform", "Webhooks", "Apollo", "Paths", "Google Sheets", "Slack", "AI by Zapier", "Gmail"],
      image: "assets/projects/leads-enrichment.png"
    },
    content: {
      category: "zapier",
      title: "AI Content Repurposing",
      body: "🔴 Problem — Turning one source file into content for several channels involves repeated transcription, writing, and publishing tasks. 🟡 Solution — Zapier pulls source files from Google Drive, uses AI for transcription and blog generation, then distributes content across Facebook Pages, LinkedIn, and Instagram for Business with Paths and Looping. 🟢 Result — Less repetitive content processing and more consistent multi-channel distribution.",
      tags: ["Google Drive", "AI", "Facebook Pages", "LinkedIn", "Instagram for Business", "Zapier Paths", "Looping"],
      image: "assets/projects/ai-content-repurposing.png"
    },
    crm: {
      category: "zapier",
      title: "CRM Lead Engagement",
      body: "🔴 Problem — Leads at different CRM stages need different follow-up, making manual tracking inconsistent. 🟡 Solution — Zapier reads Asana CRM stages and uses Paths, Filters, AI-generated messaging, Gmail, Google Drive, and Delay by Zapier to trigger the appropriate communication. 🟢 Result — More consistent stage-based follow-up with less manual monitoring.",
      tags: ["Asana", "Zapier Paths", "Filters", "Gmail", "Google Drive", "AI-generated messaging", "Delay by Zapier"],
      image: "assets/projects/crm-lead-engagement.png"
    },
    files: {
      category: "make",
      title: "Gmail Attachment & AI File Processing",
      body: "🔴 Problem — Email attachments require repeated downloading, reviewing, storing, and data entry. 🟡 Solution — Make.com watches Gmail for attachments, processes files with AI, stores them in Google Drive, maps data into Google Sheets, and uses conditional logic for the next steps. 🟢 Result — Better-organized files and data with fewer repetitive handling tasks.",
      tags: ["Make.com", "Gmail", "AI", "Google Drive", "Google Sheets", "Data Mapping", "Conditional Logic"],
      image: "assets/projects/gmail-ai-files.png"
    },
    xero: {
      category: "make",
      title: "Asana–Xero Integration",
      body: "🔴 Problem — Moving task data and attachments between Asana and Xero manually creates repeated data-handling work. 🟡 Solution — Make.com moves and processes data between both platforms through APIs, using routers, iterators, Google Sheets logging, and attachment handling. 🟢 Result — Less repetitive data entry and more consistent organization across the connected tools.",
      tags: ["Make.com", "Asana", "Xero", "APIs", "Routers", "Iterators", "Google Sheets", "Attachments"],
      image: "assets/projects/asana-xero.png"
    },
    ghl: {
      category: "gohighlevel",
      title: "GoHighLevel CRM, Lead Management & AI Automation",
      overview: "Built and managed GoHighLevel automation systems for lead management, CRM pipelines, qualification, follow-ups, and AI-assisted customer communication.",
      body: "🔴 Problem — Managing incoming leads manually can make qualification, pipeline tracking, follow-ups, and customer communication inconsistent and time-consuming. 🟡 Solution — Built GoHighLevel CRM and automation workflows that organize leads through pipeline stages, detect qualified leads using conditional logic, update opportunities and tags, trigger internal notifications, and support AI-powered customer conversations. The AI setup also includes automated follow-ups and human handover when a customer requests assistance from a real person. 🟢 Result — Created a more organized lead-management system that connects CRM pipeline management, lead qualification, automated follow-up, internal notifications, AI-assisted conversations, and human escalation in one workflow environment.",
      tags: ["GoHighLevel", "CRM Automation", "AI Agents", "Workflow Automation"]
    }
  };

  const projectFilterButtons = [...document.querySelectorAll("[data-project-filter]")];
  const projectCards = [...document.querySelectorAll("[data-project-category]")];

  const getCardProject = (card) => {
    const projectKey = card.querySelector("[data-project]")?.dataset.project;
    return projectKey ? projects[projectKey] : null;
  };

  const applyProjectFilter = (selected) => {
    projectFilterButtons.forEach((filterButton) => {
      const active = filterButton.dataset.projectFilter === selected;
      filterButton.classList.toggle("is-active", active);
      filterButton.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach((card) => {
      const project = getCardProject(card);
      card.hidden = selected !== "all" && project?.category !== selected;
    });
    if (ghlProjectGallery) {
      ghlProjectGallery.hidden = selected !== "all" && selected !== "gohighlevel";
    }
  };

  projectFilterButtons.forEach((button) => {
    button.addEventListener("click", () => applyProjectFilter(button.dataset.projectFilter));
  });

  applyProjectFilter("all");

  const caseLabelClasses = {
    "🔴 Problem": "case-indicator--problem",
    "🟡 Solution": "case-indicator--solution",
    "🟢 Result": "case-indicator--result"
  };

  const renderCaseStudyBody = (body) => {
    modalBody.className = "case-summary";
    modalBody.replaceChildren();
    const sections = body.matchAll(/(🔴 Problem|🟡 Solution|🟢 Result)\s+(—\s+.*?)(?=\s+(?:🔴 Problem|🟡 Solution|🟢 Result)\s+—|$)/g);

    for (const section of sections) {
      const modifier = caseLabelClasses[section[1]];
      const row = document.createElement("div");
      row.className = "case-row";
      const label = document.createElement("span");
      label.className = `case-indicator ${modifier}`;
      label.textContent = section[1].replace(/^\S+\s/, "");
      const description = document.createElement("span");
      description.className = "case-description";
      description.textContent = section[2];
      row.append(label, description);
      modalBody.append(row);
    }
  };

  const resetModalContent = () => {
    modalTitle.textContent = "";
    modalBody.replaceChildren();
    modalTags.replaceChildren();
    if (modalToolsLabel) modalToolsLabel.hidden = true;
  };

  const openModal = (key) => {
    const item = projects[key];
    if (!item || !modal) return;
    resetModalContent();
    modalTitle.textContent = item.title;
    renderCaseStudyBody(item.body);

    if (item.overview) {
      const overview = document.createElement("div");
      overview.className = "modal-overview";
      const overviewTitle = document.createElement("h3");
      overviewTitle.textContent = "Project overview";
      const overviewText = document.createElement("p");
      overviewText.textContent = item.overview;
      overview.append(overviewTitle, overviewText);
      modalBody.prepend(overview);
    }

    if (modalToolsLabel) modalToolsLabel.hidden = false;
    modalTags.innerHTML = item.tags.map((tag) => `<span>${tag}</span>`).join("");
    modal.hidden = false;
    modal.querySelector(".modal-card")?.scrollTo({ top: 0 });
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
  };

  const openLightbox = (src, title) => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxImage.alt = title || "Workflow screenshot";
    if (lightboxCaption) lightboxCaption.textContent = title || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.hidden = true;
    if (!modal || modal.hidden) document.body.style.overflow = "";
  };

  document.querySelectorAll("[data-project]").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.project));
  });
  document.querySelectorAll("[data-lightbox]").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(btn.dataset.lightbox, btn.dataset.lightboxTitle));
  });
  modal?.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });
  lightbox?.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (lightbox && !lightbox.hidden) closeLightbox();
    else if (modal && !modal.hidden) closeModal();
  });

  const calendlyUrl = "https://calendly.com/jamesarancillo10/new-meeting";

  contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  formStatus.className = "form-status";
  formStatus.textContent = "";

  const data = {
    name: contactForm.name.value.trim(),
    email: contactForm.email.value.trim(),
    message: contactForm.message.value.trim()
  };

  if (!data.name || !data.email || !data.message) {
    formStatus.classList.add("is-err");
    formStatus.textContent = "Please complete all fields.";
    return;
  }

  formStatus.textContent = "Sending...";

  try {
    const formData = new FormData(contactForm);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      formStatus.classList.add("is-ok");
      formStatus.textContent = "Message sent! Opening Calendly...";

      setTimeout(() => {
        window.location.assign(calendlyUrl);
      }, 1000);
    } else {
      throw new Error(result.message || "Failed to send message.");
    }
  } catch (error) {
    formStatus.classList.add("is-err");
    formStatus.textContent = "Something went wrong. Please try again.";
    console.error("Web3Forms error:", error);
  }
});
})();
