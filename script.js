// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle');
const mobileNav = document.getElementById('mobile-nav');
const navbar = document.getElementById('navbar');

mobileToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    mobileToggle.classList.toggle('open');
    navbar.classList.toggle('active');
});
// Close menu when click outside
document.addEventListener('click', (event) => {
    const isClickInsideToggle = mobileToggle.contains(event.target);
    const isClickInsideMenu = mobileNav.contains(event.target);
  
    if (!isClickInsideToggle && !isClickInsideMenu) {
        mobileNav.classList.remove('active');
        mobileToggle.classList.remove('open');
    }
});

// FAQ script
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        faqItems.forEach(i => {
            if (i !== item) i.classList.remove('active');
        });
        item.classList.toggle('active');
    });
});

// for Customer review slider
const cards = document.querySelectorAll(".review-card");
const prevBtn = document.querySelector(".prev-arrow");
const nextBtn = document.querySelector(".next-arrow");
let current = 0;
let autoSlide;

function showSlide(index) {
  cards.forEach((card, i) => {
    card.classList.remove("active");
    if (i === index) card.classList.add("active");
  });
}

function nextSlide() {
  current = (current + 1) % cards.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + cards.length) % cards.length;
  showSlide(current);
}

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 2000); // 5 sec delay
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Event listeners
nextBtn.addEventListener("click", () => {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

prevBtn.addEventListener("click", () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

// Initialize
showSlide(current);
startAutoSlide();


//  For shop by category ends here 
const slider = document.querySelector(".category-slider");
const leftBtn = document.querySelector(".scroll-btn.left");
const rightBtn = document.querySelector(".scroll-btn.right");

leftBtn.onclick = () => slider.scrollBy({ left: -300, behavior: "smooth" });
rightBtn.onclick = () => slider.scrollBy({ left: 300, behavior: "smooth" });


document.addEventListener("DOMContentLoaded", () => {
    // For Submenu
    const submenuToggle = document.querySelector(".mobile-submenu-toggle");
    const mobileSubmenu = document.querySelector(".mobile-submenu");
  
    submenuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      submenuToggle.classList.toggle("active");
      if (mobileSubmenu.style.display === "flex") {
        mobileSubmenu.style.display = "none";
      } else {
        mobileSubmenu.style.display = "flex";
      }
    });
});


document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".slider-track");
  const cards = document.querySelectorAll(".slider-card");
  let index = 0;
  let sliderInterval;

  function getCardWidth() {
    const card = document.querySelector(".slider-card");
    const style = window.getComputedStyle(card);
    const marginRight = window.innerWidth > 480 ? parseFloat(style.marginRight) : 0;
    return card.offsetWidth + marginRight;
  }

  function slide() {
    const cardWidth = getCardWidth();
    index++;

    track.style.transition = "transform 0.7s ease";
    track.style.transform = `translateX(-${cardWidth * index}px)`;

    if (index >= cards.length - 1) {
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        index = 0;
      }, 700);
    }
  }

  function startSlider() {
    sliderInterval = setInterval(slide, 2000);
  }

  function stopSlider() {
    clearInterval(sliderInterval);
  }

  // Start initially
  startSlider();

  // Pause on hover over any card
  cards.forEach(card => {
    card.addEventListener("mouseenter", stopSlider);
    card.addEventListener("mouseleave", startSlider);
  });

  // Reset on resize
  window.addEventListener("resize", () => {
    stopSlider();
    index = 0;
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
    startSlider();
  });
});


// For animation
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target); // Animate only once
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});



// for stats
function animateCounter(element, target, duration, suffix) {
  let start = 0;
  const increment = target / (duration / 16);
  const isDecimal = target % 1 !== 0;

  const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
          element.textContent = (isDecimal ? target.toFixed(1) : Math.ceil(target)) + suffix;
          clearInterval(timer);
      } else {
          element.textContent = (isDecimal ? start.toFixed(1) : Math.ceil(start)) + suffix;
      }
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const target = parseFloat(entry.target.dataset.target);
              const suffix = entry.target.dataset.suffix || '';
              animateCounter(entry.target, target, 2000, suffix);
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

window.addEventListener('load', initCounters);