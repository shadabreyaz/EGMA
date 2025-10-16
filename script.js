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


    // // for hero slider
    // const track = document.querySelector('.slider-track');
    // const cards = document.querySelectorAll('.slider-card');
    // const cardWidth = cards[0].offsetWidth + 32;
    
    // let index = 0;
    
    // function autoSlide() {
    //   index++;
    //   track.style.transition = 'transform 0.7s ease';
    //   track.style.transform = `translateX(-${cardWidth * index}px)`;
    
    //   if (index === cards.length - 1) {
    //     setTimeout(() => {
    //       track.style.transition = 'none'; 
    //       track.style.transform = 'translateX(0)';
    //       index = 0;
    //     }, 700); 
    //   }
    // }
    
    // setInterval(autoSlide, 2400);

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
