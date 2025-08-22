// Custom Cursor
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

// Update mouse position
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate cursor
function animateCursor() {
  // Main cursor follows immediately
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";

  // Follower cursor has delayed movement
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;

  cursorFollower.style.left = followerX + "px";
  cursorFollower.style.top = followerY + "px";

  requestAnimationFrame(animateCursor);
}

// Start cursor animation
animateCursor();

// Floating Particles
function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDelay = Math.random() * 15 + "s";
  particle.style.animationDuration = Math.random() * 10 + 10 + "s";
  document.querySelector(".floating-particles").appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 25000);
}

setInterval(createParticle, 800);

// Window Management
let activeWindows = new Set();

function openWindow(windowId) {
  const window = document.getElementById(windowId + "-window");
  const taskbarItem = document.querySelector(
    `[data-tooltip="${windowId.charAt(0).toUpperCase() + windowId.slice(1)}"]`
  );

  if (activeWindows.has(windowId)) {
    closeWindow(windowId);
    return;
  }

  window.classList.add("active");
  taskbarItem.classList.add("active");
  activeWindows.add(windowId);

  makeDraggable(window);

  // Trigger typing animation for about window
  if (windowId === "about") {
    setTimeout(() => {
      const typingElement = document.querySelector(".typing-animation");
      if (typingElement) {
        typeText(
          typingElement,
          "Climate Action | Data Science | Writing | Leadership",
          100
        );
      }
    }, 500);
  }
}

function closeWindow(windowId) {
  const window = document.getElementById(windowId + "-window");
  const taskbarItem = document.querySelector(
    `[data-tooltip="${windowId.charAt(0).toUpperCase() + windowId.slice(1)}"]`
  );

  window.classList.remove("active");
  taskbarItem.classList.remove("active");
  activeWindows.delete(windowId);
}

// Make windows draggable
function makeDraggable(window) {
  const header = window.querySelector(".window-header");
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  header.addEventListener("mousedown", dragStart);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", dragEnd);

  function dragStart(e) {
    if (e.target.classList.contains("window-control")) return;

    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === header || header.contains(e.target)) {
      isDragging = true;
      header.style.cursor = "grabbing";
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      window.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }
  }

  function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
    header.style.cursor = "grab";
  }
}

// Typing Animation
function typeText(element, text, speed = 50) {
  let i = 0;
  element.textContent = "";
  element.classList.add("typing-animation");

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.classList.remove("typing-animation");
    }
  }
  type();
}

// Click ripple effect
document.addEventListener("click", function (e) {
  const ripple = document.createElement("div");
  ripple.style.position = "fixed";
  ripple.style.left = e.clientX + "px";
  ripple.style.top = e.clientY + "px";
  ripple.style.width = "10px";
  ripple.style.height = "10px";
  ripple.style.background = "rgba(102, 126, 234, 0.6)";
  ripple.style.borderRadius = "50%";
  ripple.style.transform = "scale(0)";
  ripple.style.animation = "ripple 0.6s ease-out";
  ripple.style.pointerEvents = "none";
  ripple.style.zIndex = "9999";

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
});

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  if (e.altKey) {
    switch (e.key) {
      case "1":
        e.preventDefault();
        openWindow("about");
        break;
      case "2":
        e.preventDefault();
        openWindow("experience");
        break;
      case "3":
        e.preventDefault();
        openWindow("skills");
        break;
      case "4":
        e.preventDefault();
        openWindow("achievements");
        break;
      case "5":
        e.preventDefault();
        openWindow("contact");
        break;
    }
  }

  // Close all windows with Escape
  if (e.key === "Escape") {
    activeWindows.forEach((windowId) => {
      closeWindow(windowId);
    });
  }
});

// Parallax effect for hero section
document.addEventListener("mousemove", function (e) {
  const hero = document.querySelector(".hero");
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  hero.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)`;
});

// Initialize on load
window.addEventListener("load", function () {
  // Fade in animation
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);

  // Add hover effects
  const cards = document.querySelectorAll(
    ".content-card, .experience-item, .achievement-item"
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});