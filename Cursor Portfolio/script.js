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
  const modalTags = document.getElementById("modalTags");
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
      title: "Lead Enrichment & Qualification",
      body: "A Zapier workflow triggered when a lead comes in, then formats the company URL, enriches the record through a webhook, and splits into High Priority and Low Priority paths. High-priority leads are saved to Google Sheets, posted to Slack, drafted with AI, and emailed through Gmail.",
      tags: ["Zapier", "Typeform", "Webhooks", "Apollo", "Paths", "Google Sheets", "Slack", "AI by Zapier", "Gmail"],
      image: "assets/projects/leads-enrichment.png"
    },
    content: {
      title: "AI Content Repurposing",
      body: "An automation that pulls source files from Google Drive, uses AI for transcription and blog generation, then distributes content across Facebook Pages, LinkedIn, and Instagram for Business with Zapier Paths and looping.",
      tags: ["Google Drive", "AI", "Facebook Pages", "LinkedIn", "Instagram for Business", "Zapier Paths", "Looping"],
      image: "assets/projects/ai-content-repurposing.png"
    },
    crm: {
      title: "CRM Lead Engagement",
      body: "A Zapier workflow connected to Asana that branches with Paths and Filters based on CRM stage. It uses AI-generated messaging, Gmail, Google Drive, and Delay by Zapier. Stages covered: Ready to Start, No Response, Quoted, Approved, and Paid & Closed.",
      tags: ["Asana", "Zapier Paths", "Filters", "Gmail", "Google Drive", "AI-generated messaging", "Delay by Zapier"],
      image: "assets/projects/crm-lead-engagement.png"
    },
    files: {
      title: "Gmail Attachment & AI File Processing",
      body: "A Make.com scenario that watches Gmail for attachments, processes files with AI, stores them in Google Drive, maps data into Google Sheets, and uses conditional logic to decide next steps.",
      tags: ["Make.com", "Gmail", "AI", "Google Drive", "Google Sheets", "Data Mapping", "Conditional Logic"],
      image: "assets/projects/gmail-ai-files.png"
    },
    xero: {
      title: "Asana–Xero Integration",
      body: "A Make.com integration that moves and processes data between Asana and Xero through APIs, using routers, iterators, Google Sheets logging, and attachment handling.",
      tags: ["Make.com", "Asana", "Xero", "APIs", "Routers", "Iterators", "Google Sheets", "Attachments"],
      image: "assets/projects/asana-xero.png"
    },
    n8n: {
      title: "n8n AI Automation Training",
      body: "Full training covering AI Agents, AI workflows, APIs, MCP, workflow nodes, data handling, branching, and looping in n8n. This reflects hands-on training rather than a client engagement.",
      tags: ["n8n", "AI Agents", "AI Workflows", "APIs", "MCP", "Workflow Nodes", "Data Handling", "Branching", "Looping"]
    }
  };

  const openModal = (key) => {
    const item = projects[key];
    if (!item || !modal) return;
    modalTitle.textContent = item.title;
    modalBody.textContent = item.body;
    modalTags.innerHTML = item.tags.map((tag) => `<span>${tag}</span>`).join("");
    modal.hidden = false;
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
