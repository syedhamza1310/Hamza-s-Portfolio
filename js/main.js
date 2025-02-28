/* ===================================================================
 * Zohaib - Main JS
 *
 * ------------------------------------------------------------------- */

(function (html) {
  "use strict";

  html.className = html.className.replace(/\bno-js\b/g, "") + " js ";

  /* Animations
   * -------------------------------------------------- */
  const tl = anime
    .timeline({
      easing: "easeInOutCubic",
      duration: 800,
      autoplay: false,
    })
    .add({
      targets: "#loader",
      opacity: 0,
      duration: 200,
      begin: function (anim) {
        window.scrollTo(0, 0);
      },
    })
    .add({
      targets: "#preloader",
      opacity: 0,
      complete: function (anim) {
        document.querySelector("#preloader").style.visibility = "hidden";
        document.querySelector("#preloader").style.display = "none";
      },
    })
    .add(
      {
        targets: ".s-header",
        translateY: [-100, 0],
        opacity: [0, 1],
      },
      "-=200"
    )
    .add({
      targets: [".s-intro .text-pretitle", ".s-intro .text-huge-title"],
      translateX: [100, 0],
      opacity: [0, 1],
      delay: anime.stagger(400),
    })
    .add({
      targets: ".circles span",
      keyframes: [
        { opacity: [0, 0.3] },
        {
          opacity: [0.3, 0.1],
          delay: anime.stagger(100, { direction: "reverse" }),
        },
      ],
      delay: anime.stagger(100, { direction: "reverse" }),
    })
    .add({
      targets: ".intro-social li",
      translateX: [-50, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, { direction: "reverse" }),
    })
    .add(
      {
        targets: ".intro-scrolldown",
        translateY: [100, 0],
        opacity: [0, 1],
      },
      "-=800"
    );

  /* Preloader
   * -------------------------------------------------- */
  const ssPreloader = function () {
    const preloader = document.querySelector("#preloader");
    if (!preloader) return;

    window.addEventListener("load", function () {
      document.querySelector("html").classList.remove("ss-preload");
      document.querySelector("html").classList.add("ss-loaded");

      document.querySelectorAll(".ss-animated").forEach(function (item) {
        item.classList.remove("ss-animated");
      });

      tl.play();
    });

    // force page scroll position to top at page refresh
    // window.addEventListener('beforeunload' , function () {
    //     // window.scrollTo(0, 0);
    // });
  }; // end ssPreloader

  /* Mobile Menu
   * ---------------------------------------------------- */
  const ssMobileMenu = function () {
    const toggleButton = document.querySelector(".mobile-menu-toggle");
    const mainNavWrap = document.querySelector(".main-nav-wrap");
    const siteBody = document.querySelector("body");

    if (!(toggleButton && mainNavWrap)) return;

    toggleButton.addEventListener("click", function (event) {
      event.preventDefault();
      toggleButton.classList.toggle("is-clicked");
      siteBody.classList.toggle("menu-is-open");
    });

    mainNavWrap.querySelectorAll(".main-nav a").forEach(function (link) {
      link.addEventListener("click", function (event) {
        // at 800px and below
        if (window.matchMedia("(max-width: 800px)").matches) {
          toggleButton.classList.toggle("is-clicked");
          siteBody.classList.toggle("menu-is-open");
        }
      });
    });

    window.addEventListener("resize", function () {
      // above 800px
      if (window.matchMedia("(min-width: 801px)").matches) {
        if (siteBody.classList.contains("menu-is-open"))
          siteBody.classList.remove("menu-is-open");
        if (toggleButton.classList.contains("is-clicked"))
          toggleButton.classList.remove("is-clicked");
      }
    });
  }; // end ssMobileMenu

  /* Highlight active menu link on pagescroll
   * ------------------------------------------------------ */
  const ssScrollSpy = function () {
    const sections = document.querySelectorAll(".target-section");

    // Add an event listener listening for scroll
    window.addEventListener("scroll", navHighlight);

    function navHighlight() {
      // Get current scroll position
      let scrollY = window.pageYOffset;

      // Loop through sections to get height(including padding and border),
      // top and ID values for each
      sections.forEach(function (current) {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");

        try {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
              .querySelector(".main-nav a[href*='" + sectionId + "']")
              .parentNode.classList.add("current");
          } else {
            document
              .querySelector(".main-nav a[href*='" + sectionId + "']")
              .parentNode.classList.remove("current");
          }
        } catch (e) {
          console.warn(`Nav highlight error for section: ${sectionId}`, e);
        }
      });
    }
  }; // end ssScrollSpy

  /* Animate elements if in viewport
   * ------------------------------------------------------ */
  const ssViewAnimate = function () {
    const blocks = document.querySelectorAll("[data-animate-block]");

    window.addEventListener("scroll", viewportAnimation);

    function viewportAnimation() {
      let scrollY = window.pageYOffset;

      blocks.forEach(function (current) {
        const viewportHeight = window.innerHeight;
        const triggerTop =
          current.offsetTop + viewportHeight * 0.2 - viewportHeight;
        const blockHeight = current.offsetHeight;
        const blockSpace = triggerTop + blockHeight;
        const inView = scrollY > triggerTop && scrollY <= blockSpace;
        const isAnimated = current.classList.contains("ss-animated");

        if (inView && !isAnimated) {
          anime({
            targets: current.querySelectorAll("[data-animate-el]"),
            opacity: [0, 1],
            translateY: [100, 0],
            delay: anime.stagger(400, { start: 200 }),
            duration: 800,
            easing: "easeInOutCubic",
            begin: function (anim) {
              current.classList.add("ss-animated");
            },
          });
        }
      });
    }
  }; // end ssViewAnimate

  /* Swiper
   * ------------------------------------------------------ */
  const ssSwiper = function () {
    const mySwiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        // when window width is > 400px
        401: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // when window width is > 800px
        801: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
        // when window width is > 1200px
        1201: {
          slidesPerView: 2,
          spaceBetween: 80,
        },
      },
    });
  }; // end ssSwiper

  
  /* Alert boxes
   * ------------------------------------------------------ */
  const ssAlertBoxes = function () {
    const boxes = document.querySelectorAll(".alert-box");

    boxes.forEach(function (box) {
      box.addEventListener("click", function (event) {
        if (event.target.matches(".alert-box__close")) {
          event.stopPropagation();
          event.target.parentElement.classList.add("hideit");

          setTimeout(function () {
            box.style.display = "none";
          }, 500);
        }
      });
    });
  }; // end ssAlertBoxes

  /* Smoothscroll
   * ------------------------------------------------------ */
  const ssMoveTo = function () {
    const easeFunctions = {
      easeInQuad: function (t, b, c, d) {
        t /= d;
        return c * t * t + b;
      },
      easeOutQuad: function (t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
      },
      easeInOutQuad: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      },
      easeInOutCubic: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
      },
    };

    const triggers = document.querySelectorAll(".smoothscroll");

    const moveTo = new MoveTo(
      {
        tolerance: 0,
        duration: 1200,
        easing: "easeInOutCubic",
        container: window,
      },
      easeFunctions
    );

    triggers.forEach(function (trigger) {
      moveTo.registerTrigger(trigger);
    });
  }; // end ssMoveTo

  /* Initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssMobileMenu();
    ssScrollSpy();
    ssViewAnimate();
    ssSwiper();
    ssAlertBoxes();
    ssMoveTo();
  })();
})(document.documentElement);


// Get necessary elements
const contactBtn = document.querySelector(".contact-btn");
const formCard = document.querySelector(".form-card1");
const closeBtn = document.querySelector(".close-btn");
const overlay = document.querySelector(".overlay");
const body = document.body;

// Show form and overlay
contactBtn.addEventListener("click", () => {
  formCard.style.display = "block";
  overlay.style.display = "block";
  // Trigger reflow to enable transitions
  formCard.offsetHeight;
  overlay.offsetHeight;

  // Add active classes to trigger transitions
  formCard.classList.add("active");
  overlay.classList.add("active");
  body.classList.add("form-open");
});

// Hide form and overlay
function hideForm() {
  formCard.classList.remove("active");
  overlay.classList.remove("active");
  body.classList.remove("form-open");

  // Wait for transitions to finish before hiding elements
  setTimeout(() => {
    formCard.style.display = "none";
    overlay.style.display = "none";
  }, 300); // Match this with your CSS transition duration
}

// Close form when clicking close button
closeBtn.addEventListener("click", hideForm);

// Close form when clicking overlay
overlay.addEventListener("click", hideForm);

// Optional: Close form when pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && formCard.classList.contains("active")) {
    hideForm();
  }
});

// ... existing code ...
//Submission of form

document
  .getElementById("contact-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);
    const submitButton = document.querySelector("#submit-btn");

    // Change button text to "Submitting..."
    submitButton.innerHTML = "Sending...";
    submitButton.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        submitButton.innerHTML = "✔"; // Change button to tick icon
        submitButton.style.backgroundColor = "#eabe7b"; // Optional: Change button color to green
        form.reset(); // Clear form fields after submission

        // Revert button text after 2 seconds
        setTimeout(() => {
          submitButton.innerHTML = "Send Message";
          submitButton.style.backgroundColor = ""; // Reset button color
          submitButton.disabled = false;
        }, 2000);
      } else {
        submitButton.innerHTML = "❌"; // Change button to error icon
        submitButton.style.backgroundColor = "#eabe7b"; // Optional: Change button color to red

        setTimeout(() => {
          submitButton.innerHTML = "Send Message";
          submitButton.style.backgroundColor = "";
          submitButton.disabled = false;
        }, 2000);
      }
    } catch (error) {
      submitButton.innerHTML = "❌";
      submitButton.style.backgroundColor = "#eabe7b";

      setTimeout(() => {
        submitButton.innerHTML = "Send Message";
        submitButton.style.backgroundColor = "";
        submitButton.disabled = false;
      }, 2000);

      console.error(error);
    }
  });




  //DOwnload CV

  document.getElementById("downloadCV").addEventListener("click", function () {
    const link = document.createElement("a");
    link.href = "Hamza's resume.pdf";  // Replace with your actual CV file path
    link.download = "Hamza's resume.pdf"; // Set the filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});