document.addEventListener('DOMContentLoaded', function() {

  // === Mobile Navigation Toggle ===
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Close mobile menu on resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024 && mobileMenu) {
      mobileMenu.classList.remove('open');
      if (hamburger) hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // === Book Now Dropdown (desktop) ===
  var bookBtn = document.querySelector('.nav-book-btn');
  if (bookBtn) {
    bookBtn.addEventListener('click', function(e) {
      var dropdown = this.querySelector('.book-dropdown');
      if (dropdown) {
        // Toggle visibility on click for accessibility
        var isVisible = dropdown.style.display === 'block';
        dropdown.style.display = isVisible ? 'none' : 'block';
      }
    });
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (bookBtn && !bookBtn.contains(e.target)) {
        var dropdown = bookBtn.querySelector('.book-dropdown');
        if (dropdown) dropdown.style.display = '';
      }
    });
  }

  // === Testimonial Carousel ===
  var testimonials = document.querySelectorAll('.testimonial-slide');
  var dots = document.querySelectorAll('.testimonial-dot');
  var currentIndex = 0;
  var autoTimer;

  function showTestimonial(index) {
    testimonials.forEach(function(t) { t.style.display = 'none'; });
    dots.forEach(function(d) { d.classList.remove('active'); });
    if (testimonials[index]) testimonials[index].style.display = 'flex';
    if (dots[index]) dots[index].classList.add('active');
    currentIndex = index;
  }

  function nextTestimonial() {
    showTestimonial((currentIndex + 1) % testimonials.length);
  }

  function prevTestimonial() {
    showTestimonial((currentIndex - 1 + testimonials.length) % testimonials.length);
  }

  function startAutoRotate() {
    autoTimer = setInterval(nextTestimonial, 8000);
  }

  function resetAutoRotate() {
    clearInterval(autoTimer);
    startAutoRotate();
  }

  if (testimonials.length > 0) {
    showTestimonial(0);
    startAutoRotate();

    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() {
        showTestimonial(i);
        resetAutoRotate();
      });
    });

    var prevBtn = document.getElementById('testimonial-prev');
    var nextBtn = document.getElementById('testimonial-next');
    if (prevBtn) prevBtn.addEventListener('click', function() { prevTestimonial(); resetAutoRotate(); });
    if (nextBtn) nextBtn.addEventListener('click', function() { nextTestimonial(); resetAutoRotate(); });
  }

  // === FAQ Accordion ===
  document.querySelectorAll('.accordion-trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      var item = this.closest('.accordion-item');
      // Close all others
      document.querySelectorAll('.accordion-item').forEach(function(other) {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });

  // === Smooth scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
