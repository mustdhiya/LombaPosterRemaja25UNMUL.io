// ========== ENHANCED JAVASCRIPT FOR GENHEALTH 7.0 ========== //

class GenHealthAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupCountingAnimations();
    this.setupInnovationCards();
    this.setupParticleAnimations();
    this.setupSmoothScrolling();
    this.setupIntersectionObserver();
    this.setupAdvancedAnimations();
  }

  // ========== SCROLL-TRIGGERED ANIMATIONS ========== //
  setupScrollAnimations() {
    const animateOnScroll = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Special handling for stat cards
          if (entry.target.classList.contains('stat-card')) {
            this.animateStatCard(entry.target);
          }
        }
      });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Add fade-in-up class to elements
    const elementsToAnimate = [
      '.stat-card',
      '.innovation-card',
      '.timeline-item',
      '.tech-image-card'
    ];

    elementsToAnimate.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        element.classList.add('fade-in-up');
        observer.observe(element);
      });
    });
  }

  // ========== COUNTING ANIMATIONS FOR STATISTICS ========== //
  setupCountingAnimations() {
    const countUp = (element, target, suffix = '', duration = 2000) => {
      const startTime = performance.now();
      const startValue = 0;

      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * target);
        
        element.querySelector('.stat-number').textContent = currentValue + suffix;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Add final pulse animation
          element.querySelector('.stat-number').style.animation = 'pulseScale 0.5s ease-in-out';
        }
      };

      requestAnimationFrame(animate);
    };

    // Observe stat cards for counting animation
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAnimated) {
          const target = parseInt(entry.target.dataset.target);
          const suffix = entry.target.dataset.suffix || '';
          
          setTimeout(() => {
            countUp(entry.target, target, suffix);
          }, 200);
          
          entry.target.hasAnimated = true;
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => {
      statObserver.observe(card);
    });
  }

  // ========== INNOVATION CARDS INTERACTIONS ========== //
  setupInnovationCards() {
    const modal = document.getElementById('innovation-modal');
    const modalClose = document.querySelector('.modal-close');
    const innovationData = {
      'ai-diagnostics': {
        icon: '🤖',
        title: 'AI-Powered Health Diagnostics',
        description: 'Memanfaatkan kecerdasan buatan untuk analisis medis yang lebih akurat dan cepat.',
        impact: 'Meningkatkan akurasi diagnosis hingga 95% dan mengurangi waktu diagnosis dari jam menjadi menit.'
      },
      'telemedicine': {
        icon: '📱',
        title: 'Telemedicine Revolution',
        description: 'Platform konsultasi digital yang menghubungkan pasien dengan dokter di seluruh Indonesia.',
        impact: 'Menjangkau 17.000+ pulau di Indonesia dengan layanan kesehatan berkualitas tinggi.'
      },
      'wearable-tech': {
        icon: '⌚',
        title: 'Wearable Health Technology',
        description: 'Teknologi yang dapat dipakai untuk monitoring kesehatan real-time 24/7.',
        impact: 'Deteksi dini masalah kesehatan dan pencegahan penyakit dengan monitoring kontinyu.'
      },
      'mental-health': {
        icon: '🧠',
        title: 'Mental Health Support Apps',
        description: 'Aplikasi dukungan kesehatan mental yang mudah diakses dan stigma-free.',
        impact: 'Mengurangi stigma kesehatan mental dan meningkatkan aksesibilitas layanan psikologis.'
      },
      'global-networks': {
        icon: '🌐',
        title: 'Global Health Networks',
        description: 'Jaringan kesehatan global untuk kolaborasi dan pertukaran data medis.',
        impact: 'Kolaborasi internasional untuk mengatasi tantangan kesehatan global bersama-sama.'
      },
      'precision-medicine': {
        icon: '🧬',
        title: 'Precision Medicine',
        description: 'Pengobatan personal berdasarkan profil genetik dan data medis individual.',
        impact: 'Efektivitas pengobatan meningkat 2-3x dengan efek samping yang minimal.'
      }
    };

    // Add click handlers to innovation cards
    document.querySelectorAll('.innovation-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const innovationType = card.dataset.innovation;
        const data = innovationData[innovationType];
        
        if (data) {
          this.showModal(modal, data);
        }
      });

      // Enhanced hover effects
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) rotateX(5deg) scale(1.02)';
        this.createRippleEffect(card, event);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) scale(1)';
      });
    });

    // Modal close handlers
    modalClose.addEventListener('click', () => this.hideModal(modal));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.hideModal(modal);
    });

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        this.hideModal(modal);
      }
    });
  }

  // ========== MODAL FUNCTIONS ========== //
  showModal(modal, data) {
    modal.querySelector('.modal-icon').textContent = data.icon;
    modal.querySelector('.modal-title').textContent = data.title;
    modal.querySelector('.modal-description').textContent = data.description;
    modal.querySelector('.modal-impact-text').textContent = data.impact;
    
    modal.classList.remove('hidden');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Animate modal entrance
    setTimeout(() => {
      modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
  }

  hideModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }

  // ========== ADVANCED PARTICLE ANIMATIONS ========== //
  setupParticleAnimations() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
      // Random initial positions
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Add mouse interaction
      document.addEventListener('mousemove', (e) => {
        const rect = particle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.style.transform = `translate(${deltaX * force * 0.5}px, ${deltaY * force * 0.5}px)`;
        } else {
          particle.style.transform = 'translate(0, 0)';
        }
      });
    });
  }

  // ========== SMOOTH SCROLLING ========== //
  setupSmoothScrolling() {
    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ========== INTERSECTION OBSERVER FOR ANIMATIONS ========== //
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Add staggered animation delays for grid items
          if (entry.target.parentElement.classList.contains('stats-grid') ||
              entry.target.parentElement.classList.contains('innovation-grid')) {
            const siblings = Array.from(entry.target.parentElement.children);
            const index = siblings.indexOf(entry.target);
            entry.target.style.animationDelay = `${index * 0.1}s`;
          }
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.stat-card, .innovation-card, .timeline-item, .tech-image-card').forEach(el => {
      observer.observe(el);
    });
  }

  // ========== ADVANCED VISUAL EFFECTS ========== //
  setupAdvancedAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.hero-image, .floating-icons');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });

    // Add CSS animations keyframes dynamically
    this.addCustomAnimations();
  }

  // ========== RIPPLE EFFECT ========== //
  createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      z-index: 1;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // ========== CUSTOM ANIMATIONS ========== //
  addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
      
      @keyframes pulseScale {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      @keyframes glowPulse {
        0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
        50% { box-shadow: 0 0 40px rgba(102, 126, 234, 0.6), 0 0 60px rgba(102, 126, 234, 0.4); }
      }
    `;
    document.head.appendChild(style);
  }

  // ========== STAT CARD SPECIAL ANIMATION ========== //
  animateStatCard(card) {
    // Add special entrance animation
    card.style.animation = 'slideInScale 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
    
    // Add glow effect
    setTimeout(() => {
      card.style.animation += ', glowPulse 3s ease-in-out infinite';
    }, 800);
  }

  // ========== PERFORMANCE OPTIMIZATION ========== //
  optimizeAnimations() {
    // Use requestAnimationFrame for smooth animations
    let ticking = false;
    
    const updateAnimations = () => {
      // Update particle positions
      // Update parallax elements
      // Update any other animations
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
    window.addEventListener('mousemove', requestTick);
  }
}

// ========== INITIALIZE EVERYTHING ========== //
document.addEventListener('DOMContentLoaded', () => {
  const app = new GenHealthAnimations();
  
  // Add loading animation
  const loadingScreen = document.createElement('div');
  loadingScreen.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.5s ease;
  `;
  
  
  
  // Hide loading screen after content loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 1000);
  });
});

// ========== ERROR HANDLING ========== //
window.addEventListener('error', (e) => {
  console.warn('GenHealth 7.0: Non-critical error handled:', e.error);
});

// ========== ACCESSIBILITY IMPROVEMENTS ========== //
document.addEventListener('keydown', (e) => {
  // Tab navigation improvements
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});
