document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navLinksUl = document.querySelector(".nav-links ul");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
      navLinksUl.style.animation = navLinks.classList.contains("active")
        ? "slideIn 0.3s ease forwards"
        : "slideOut 0.3s ease forwards";
    });
  }

  document.addEventListener("click", (e) => {
    if (
      !hamburger.contains(e.target) &&
      !navLinks.contains(e.target) &&
      navLinks.classList.contains("active")
    ) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });

  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  const sections = document.querySelectorAll("section");
  let navLinksa = document.querySelectorAll(".nav-links a");

  function updateActiveNavLink() {
    const headerHeight = document.querySelector("header").offsetHeight;
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = sectionId;
      }
    });

    navLinksa.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);
  updateActiveNavLink();

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const formInputs = document.querySelectorAll(
      ".form-group input, .form-group textarea"
    );

    formInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        if (input.value.trim() === "") {
          input.parentElement.classList.remove("focused");
        } else {
          validateInput(input);
        }
      });

      input.addEventListener("input", () => {
        validateInput(input);
      });
    });

    function validateInput(input) {
      const inputType = input.getAttribute("type");
      const inputId = input.getAttribute("id");
      const value = input.value.trim();

      const existingMessage = input.parentElement.querySelector(
        ".validation-message"
      );
      if (existingMessage) {
        existingMessage.remove();
      }

      const validationMessage = document.createElement("div");
      validationMessage.className = "validation-message";

      let isValid = true;

      if (value === "") {
        isValid = false;
        validationMessage.textContent = "This field is required";
        validationMessage.classList.add("invalid");
      } else if (inputType === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          validationMessage.textContent = "Please enter a valid email address";
          validationMessage.classList.add("invalid");
        }
      } else if (inputId === "message" && value.length < 10) {
        isValid = false;
        validationMessage.textContent =
          "Message should be at least 10 characters";
        validationMessage.classList.add("invalid");
      }

      if (!isValid) {
        input.parentElement.appendChild(validationMessage);
        input.classList.add("invalid-input");
        input.classList.remove("valid-input");
      } else {
        input.classList.add("valid-input");
        input.classList.remove("invalid-input");
      }

      return isValid;
    }

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const inputs = contactForm.querySelectorAll("input, textarea");
      let isFormValid = true;

      inputs.forEach((input) => {
        if (!validateInput(input)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        return;
      }

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;

      setTimeout(() => {
        const formResponse = document.createElement("div");
        formResponse.className = "form-response success";
        formResponse.innerHTML =
          '<i class="fas fa-check-circle"></i> Thank you for your message! I will get back to you soon.';

        contactForm.parentElement.insertBefore(formResponse, contactForm);

        contactForm.style.display = "none";

        contactForm.reset();

        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;

        setTimeout(() => {
          formResponse.classList.add("fade-out");
          setTimeout(() => {
            formResponse.remove();
            contactForm.style.display = "block";
          }, 500);
        }, 5000);
      }, 1500);
    });
  }

  // Skill bar animation on scroll with enhanced animation
  const skillSection = document.querySelector(".skills");
  const progressBars = document.querySelectorAll(".progress");
  let animated = false;

  function checkScroll() {
    if (skillSection) {
      const sectionPos = skillSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.2;

      if (sectionPos < screenPos && !animated) {
        animated = true;
        progressBars.forEach((bar, index) => {
          const targetWidth = bar.style.width;
          bar.style.width = "0";
          setTimeout(() => {
            bar.style.width = targetWidth;
            bar.style.transition = "width 1.5s ease-in-out";
          }, 200 * index); // Staggered animation
        });
      }
    }
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Check on initial load

  // Enhanced typing effect for hero section with cursor
  const typingElement = document.querySelector(".hero-text h2");
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.innerHTML =
      '<span class="typed-text"></span><span class="cursor">|</span>';
    const typedTextElement = typingElement.querySelector(".typed-text");

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        typedTextElement.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typingInterval);
        // Add blinking cursor animation after typing is complete
        const cursor = typingElement.querySelector(".cursor");
        cursor.classList.add("blinking");
      }
    }, 100);
  }

  // Animate skill cards on hover
  const skillCards = document.querySelectorAll(".skill-card");
  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const icon = card.querySelector("i");
      icon.classList.add("bounce");
      setTimeout(() => {
        icon.classList.remove("bounce");
      }, 1000);
    });
  });

  // Animate project cards on scroll
  const projectCards = document.querySelectorAll(".project-card");

  const animateProjectCards = () => {
    projectCards.forEach((card, index) => {
      const cardPosition = card.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (cardPosition < screenPosition) {
        setTimeout(() => {
          card.classList.add("fade-in");
        }, 200 * index); // Staggered animation
      }
    });
  };

  window.addEventListener("scroll", animateProjectCards);
  animateProjectCards(); // Check on initial load

  // Navbar scroll effect
  const header = document.querySelector("header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.classList.add("scrolled");

      if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.classList.add("nav-hidden");
      } else {
        // Scrolling up
        header.classList.remove("nav-hidden");
      }
    } else {
      header.classList.remove("scrolled");
      header.classList.remove("nav-hidden");
    }

    lastScrollTop = scrollTop;
  });

  // Back to top button with enhanced animation
  const createBackToTopButton = () => {
    const button = document.createElement("button");
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = "back-to-top";
    document.body.appendChild(button);

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: var(--primary-color);
                color: white;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
            }
            .back-to-top.visible {
                opacity: 1;
                visibility: visible;
                animation: pulse 2s infinite;
            }
            .back-to-top:hover {
                background-color: var(--primary-dark);
                transform: translateY(-3px);
                animation: none;
            }
            @keyframes pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
                }
                70% {
                    box-shadow: 0 0 0 10px rgba(52, 152, 219, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
                }
            }
            .cursor {
                display: inline-block;
                margin-left: 3px;
                opacity: 1;
            }
            .cursor.blinking {
                animation: blink 0.7s infinite;
            }
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            .bounce {
                animation: bounce 0.5s ease;
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                40% {transform: translateY(-20px);}
                60% {transform: translateY(-10px);}
            }
            .project-card {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
            .project-card.fade-in {
                opacity: 1;
                transform: translateY(0);
            }
            header.scrolled {
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                background-color: rgba(255, 255, 255, 0.95);
                padding: 10px 0;
                transition: all 0.3s ease;
            }
            header.nav-hidden {
                transform: translateY(-100%);
                transition: transform 0.3s ease;
            }
            .form-group {
                position: relative;
            }
            .validation-message {
                font-size: 0.8rem;
                color: #e74c3c;
                margin-top: 5px;
                transition: all 0.3s ease;
            }
            .valid-input {
                border-color: #2ecc71 !important;
            }
            .invalid-input {
                border-color: #e74c3c !important;
            }
            .form-response {
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                text-align: center;
                transition: opacity 0.5s ease;
            }
            .form-response.success {
                background-color: rgba(46, 204, 113, 0.2);
                color: #27ae60;
            }
            .form-response.fade-out {
                opacity: 0;
            }
            .form-response i {
                margin-right: 10px;
            }
        `;
    document.head.appendChild(style);

    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        button.classList.add("visible");
      } else {
        button.classList.remove("visible");
      }
    });

    // Scroll to top when clicked
    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  createBackToTopButton();
});
