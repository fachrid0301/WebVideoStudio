// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Navigation scroll behavior
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
  
  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, observerOptions);
  
  // Observe all sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
  
  // Service cards hover effect
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (!this.classList.contains('featured')) {
        this.style.transform = 'translateY(0) scale(1)';
      } else {
        this.style.transform = 'translateY(0) scale(1.02)';
      }
    });
  });
  
  // Portfolio items hover effect
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-6px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Floating cards animation control
  const floatingCards = document.querySelectorAll('.floating-card');
  floatingCards.forEach((card, index) => {
    // Add random delay for more organic movement
    card.style.animationDelay = `${index * 1.5}s`;
    
    // Pause animation on hover
    card.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
    });
  });
  
  // Stats counter animation
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalNumber = target.textContent;
        let current = 0;
        const increment = 1;
        const duration = 2000;
        const steps = duration / 16; // 60fps
        const stepIncrement = parseInt(finalNumber) / steps;
        
        const counter = setInterval(() => {
          current += stepIncrement;
          if (current >= parseInt(finalNumber)) {
            target.textContent = finalNumber;
            clearInterval(counter);
          } else {
            target.textContent = Math.floor(current) + (finalNumber.includes('%') ? '%' : finalNumber.includes('+') ? '+' : '');
          }
        }, 16);
        
        statsObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });
  
  // Button hover effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Preload critical resources
  const criticalImages = [
    // Add your image URLs here when you have actual images
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
  
  // Performance optimization: Lazy load non-critical content
  const lazyElements = document.querySelectorAll('.lazy');
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        if (element.dataset.src) {
          element.src = element.dataset.src;
        }
        element.classList.remove('lazy');
        lazyObserver.unobserve(element);
      }
    });
  });
  
  lazyElements.forEach(element => {
    lazyObserver.observe(element);
  });
});

// Add custom CSS for mobile menu if needed
const style = document.createElement('style');
style.textContent = `
  .navbar.scrolled {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    box-shadow: 0 1px 20px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    .nav-menu {
      position: fixed;
      top: 70px;
      left: -100%;
      width: 100%;
      height: calc(100vh - 70px);
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding-top: 2rem;
      transition: left 0.3s ease;
      border-top: 1px solid var(--border);
    }
    
    .nav-menu.active {
      left: 0;
    }
    
    .hamburger.active span:nth-child(1) {
      transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
      transform: rotate(45deg) translate(-5px, -6px);
    }
  }
`;
document.head.appendChild(style);