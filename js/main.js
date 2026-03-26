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

  // === Case Study Modal ===
  var caseData = {
    'bcc-ear': {
      title: 'Basal Cell Carcinoma \u2014 Ear',
      desc: 'Surgical excision of basal cell carcinoma located on the ear with reconstruction.',
      outcome: 'Complete excision with clear margins and excellent cosmetic outcome following reconstruction.',
      images: [
        { src: '../images/case-studies/bcc-ear-1.jpg', caption: 'Pre-operative assessment' },
        { src: '../images/case-studies/bcc-ear-intraop-marking.jpg', caption: 'Intra-operative marking' },
        { src: '../images/case-studies/bcc-ear-star-excision.jpg', caption: 'Star excision' },
        { src: '../images/case-studies/bcc-ear-2.jpg', caption: 'Intra-operative view' },
        { src: '../images/case-studies/bcc-ear-3.jpg', caption: 'Reconstruction' },
        { src: '../images/case-studies/bcc-ear-4.jpg', caption: 'Post-operative result' }
      ]
    },
    'bcc-nose': {
      title: 'Basal Cell Carcinoma \u2014 Nose',
      desc: 'Basal cell carcinoma identified on the right nose. Excised on-site with complete closure and monitored healing.',
      outcome: 'Successful excision with excellent healing at one week post-op.',
      images: [
        { src: '../images/case-studies/bcc-nose-1.jpg', caption: 'BCC right nose' },
        { src: '../images/case-studies/bcc-nose-2.jpg', caption: 'Pre-op marking' },
        { src: '../images/case-studies/bcc-nose-3.jpg', caption: 'Intra-operative closing' },
        { src: '../images/case-studies/bcc-nose-4.jpg', caption: 'Healing at 1 week' }
      ]
    },
    'melanoma-forehead': {
      title: 'Melanoma \u2014 Right Forehead',
      desc: 'Melanoma on the right forehead treated with shave biopsy and advancement-to-lateral (A-L) flap reconstruction.',
      outcome: 'Excellent cosmetic result at 6 months post-op with complete excision.',
      images: [
        { src: '../images/case-studies/melanoma-forehead-1.jpg', caption: 'Melanoma right forehead' },
        { src: '../images/case-studies/melanoma-forehead-2.jpg', caption: 'Pre-operative marking' },
        { src: '../images/case-studies/melanoma-forehead-3.jpg', caption: 'Shave biopsy and A-L flap' },
        { src: '../images/case-studies/melanoma-forehead-4.jpg', caption: '6 months post-op' }
      ]
    },
    'scc-cheek': {
      title: 'SCC \u2014 Right Cheek',
      desc: 'Squamous cell carcinoma on the right cheek treated with simple elliptical excision.',
      outcome: 'Successful excision with excellent healing at 1 week and 6 months post-op.',
      images: [
        { src: '../images/case-studies/scc-cheek-1.jpg', caption: 'SCC right cheek' },
        { src: '../images/case-studies/scc-cheek-2.jpg', caption: 'Pre-operative marking' },
        { src: '../images/case-studies/scc-cheek-3.jpg', caption: 'Intra-operative ellipse' },
        { src: '../images/case-studies/scc-cheek-4.jpg', caption: 'Post-surgical healing at 1 week and 6 months' }
      ]
    }
  };

  var caseModal = document.getElementById('case-modal');
  var caseModalClose = document.getElementById('case-modal-close');

  function openCaseModal(caseId) {
    var data = caseData[caseId];
    if (!data || !caseModal) return;

    document.getElementById('case-modal-title').textContent = data.title;
    document.getElementById('case-modal-desc').textContent = data.desc;

    var gallery = document.getElementById('case-modal-gallery');
    gallery.innerHTML = '';
    data.images.forEach(function(img) {
      var figure = document.createElement('figure');
      var imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.caption;
      imgEl.loading = 'lazy';
      imgEl.addEventListener('click', function() { openLightbox(img.src, img.caption); });
      figure.appendChild(imgEl);
      if (img.caption) {
        var cap = document.createElement('figcaption');
        cap.textContent = img.caption;
        figure.appendChild(cap);
      }
      gallery.appendChild(figure);
    });

    var outcome = document.getElementById('case-modal-outcome');
    if (data.outcome) {
      outcome.innerHTML = '<strong>Treatment Outcome:</strong> ' + data.outcome;
      outcome.style.display = '';
    } else {
      outcome.style.display = 'none';
    }

    caseModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseModal() {
    if (caseModal) {
      caseModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (caseModalClose) {
    caseModalClose.addEventListener('click', closeCaseModal);
  }
  if (caseModal) {
    caseModal.addEventListener('click', function(e) {
      if (e.target === caseModal) closeCaseModal();
    });
  }

  document.querySelectorAll('.case-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var caseId = this.getAttribute('data-case');
      if (caseId) openCaseModal(caseId);
    });
  });

  // === Lightbox for full-size images ===
  var lightbox = document.createElement('div');
  lightbox.className = 'case-lightbox';
  lightbox.innerHTML = '<button class="case-lightbox-close" aria-label="Close">&times;</button><img src="" alt="">';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector('img');
  var lightboxClose = lightbox.querySelector('.case-lightbox-close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', function(e) {
    e.stopPropagation();
    closeLightbox();
  });
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Close modals on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (lightbox.classList.contains('open')) {
        closeLightbox();
      } else {
        closeCaseModal();
      }
    }
  });

  // === Doctor Carousel (infinite loop) ===
  var docTrack = document.getElementById('doc-carousel-track');
  var docRealSlides = docTrack ? Array.prototype.slice.call(docTrack.querySelectorAll('.doc-slide')) : [];
  var docNav = document.getElementById('doc-carousel-nav');
  var docPrev = document.getElementById('doc-prev');
  var docNext = document.getElementById('doc-next');
  var docCount = docRealSlides.length;
  var docPos = 1; // starts at 1 because of prepended clone
  var docAutoTimer;
  var docTransitioning = false;

  if (docTrack && docCount > 0) {
    // Clone first and last slides for seamless looping
    var firstClone = docRealSlides[0].cloneNode(true);
    var lastClone = docRealSlides[docCount - 1].cloneNode(true);
    firstClone.setAttribute('aria-hidden', 'true');
    lastClone.setAttribute('aria-hidden', 'true');
    docTrack.appendChild(firstClone);
    docTrack.insertBefore(lastClone, docTrack.firstChild);

    // Position to first real slide (index 1) without transition
    docTrack.style.transition = 'none';
    docTrack.style.transform = 'translateX(-100%)';

    // Create dots
    docRealSlides.forEach(function(_, i) {
      var dot = document.createElement('button');
      dot.className = 'doc-carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Doctor ' + (i + 1));
      dot.addEventListener('click', function() {
        if (docTransitioning) return;
        docPos = i + 1;
        slideDocTo(docPos, true);
        updateDocDots();
        resetDocAuto();
      });
      docNav.appendChild(dot);
    });

    function slideDocTo(pos, animate) {
      if (animate) {
        docTrack.style.transition = 'transform 0.4s ease';
      } else {
        docTrack.style.transition = 'none';
      }
      docTrack.style.transform = 'translateX(-' + (pos * 100) + '%)';
    }

    function updateDocDots() {
      var realIndex = ((docPos - 1) % docCount + docCount) % docCount;
      var dots = docNav.querySelectorAll('.doc-carousel-dot');
      dots.forEach(function(d, i) {
        d.classList.toggle('active', i === realIndex);
      });
    }

    docTrack.addEventListener('transitionend', function() {
      docTransitioning = false;
      // If we've slid to the first clone (after last real), jump to real first
      if (docPos > docCount) {
        docPos = 1;
        slideDocTo(docPos, false);
      }
      // If we've slid to the last clone (before first real), jump to real last
      if (docPos < 1) {
        docPos = docCount;
        slideDocTo(docPos, false);
      }
    });

    function nextDocSlide() {
      if (docTransitioning) return;
      docTransitioning = true;
      docPos++;
      slideDocTo(docPos, true);
      updateDocDots();
    }

    function prevDocSlide() {
      if (docTransitioning) return;
      docTransitioning = true;
      docPos--;
      slideDocTo(docPos, true);
      updateDocDots();
    }

    function startDocAuto() {
      docAutoTimer = setInterval(nextDocSlide, 6000);
    }

    function resetDocAuto() {
      clearInterval(docAutoTimer);
      startDocAuto();
    }

    if (docPrev) docPrev.addEventListener('click', function() { prevDocSlide(); resetDocAuto(); });
    if (docNext) docNext.addEventListener('click', function() { nextDocSlide(); resetDocAuto(); });

    startDocAuto();

    // Touch/swipe support
    var touchStartX = 0;
    docTrack.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    docTrack.addEventListener('touchend', function(e) {
      var diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextDocSlide(); else prevDocSlide();
        resetDocAuto();
      }
    }, { passive: true });
  }

});
