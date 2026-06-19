/* ============================================
   DAHAN KOPI — Main JavaScript
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // --- Preloader ---
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 800);
  });

  // --- Elements ---
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navClose = document.getElementById('nav-close');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('back-to-top');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const contactForm = document.getElementById('contact-form');
  const newsletterForm = document.getElementById('newsletter-form');

  let currentImageIndex = 0;
  const galleryImages = [];

  // --- Header Scroll ---
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top visibility
    if (currentScroll > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    lastScroll = currentScroll;
  });

  // --- Mobile Nav ---
  function openNav() {
    hamburger.classList.add('active');
    nav.classList.add('active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openNav);
  navClose.addEventListener('click', closeNav);
  navOverlay.addEventListener('click', closeNav);

  navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // --- Back to Top ---
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Menu Filter ---
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      menuItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'flex';
          item.style.opacity = '0';
          setTimeout(() => { item.style.opacity = '1'; }, 10);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- Gallery Lightbox ---
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    galleryImages.push(img.src);

    item.addEventListener('click', () => {
      currentImageIndex = index;
      openLightbox(img.src);
    });
  });

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
      currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
      currentImageIndex = 0;
    }

    lightboxImg.src = galleryImages[currentImageIndex];
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  lightboxNext.addEventListener('click', () => navigateLightbox(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // --- Contact Form via WhatsApp ---
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const whatsapp = document.getElementById('form-whatsapp').value.trim();
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value.trim();

    if (!name || !whatsapp || !message) {
      alert('Mohon isi nama, nomor WhatsApp, dan pesan Anda.');
      return;
    }

    let text = `Halo Dahan Kopi! Saya *${name}*`;
    if (email) text += `\nEmail: ${email}`;
    text += `\nNo. WA: ${whatsapp}`;
    if (subject) text += `\nTopik: ${subject}`;
    text += `\n\nPesan:\n${message}`;

    const waUrl = `https://wa.me/6282121651788?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  });

  // --- Newsletter Form ---
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value.trim();

    if (!email) {
      alert('Mohon masukkan email Anda.');
      return;
    }

    alert('Terima kasih! Anda telah berlangganan newsletter Dahan Kopi.');
    newsletterForm.reset();
  });

  // --- Testimonial Auto-scroll (optional enhancement) ---
  // Simple: just show all cards in grid layout already handled by CSS

});
