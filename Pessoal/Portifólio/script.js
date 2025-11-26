    // Cursor Trail Effect
    const cursor = document.querySelector(".cursor");
    const cursorGlow = document.querySelector(".cursor-glow");
    const trails = [];
    const trailLength = 10;

    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
      const trail = document.createElement("div");
      trail.className = "cursor-trail";
      document.body.appendChild(trail);
      trails.push({
        element: trail,
        x: 0,
        y: 0
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    // Update mouse position
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update main cursor
      cursor.style.left = mouseX - 10 + "px";
      cursor.style.top = mouseY - 10 + "px";
      
      // Update glow
      cursorGlow.style.left = mouseX + "px";
      cursorGlow.style.top = mouseY + "px";
    });

    // Animate trail
    function animateTrail() {
      let currentX = mouseX;
      let currentY = mouseY;
      
      trails.forEach((trail, index) => {
        trail.x += (currentX - trail.x) * (0.3 - index * 0.02);
        trail.y += (currentY - trail.y) * (0.3 - index * 0.02);
        
        trail.element.style.left = trail.x - 4 + "px";
        trail.element.style.top = trail.y - 4 + "px";
        trail.element.style.opacity = (1 - index / trailLength) * 0.5;
        trail.element.style.transform = `scale(${1 - index * 0.1})`;
        
        currentX = trail.x;
        currentY = trail.y;
      });
      
      requestAnimationFrame(animateTrail);
    }

    animateTrail();

    // Theme Toggle
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
    
    const currentTheme = localStorage.getItem("theme") || "dark";
    if (currentTheme === "light") {
      body.classList.add("light");
      themeToggle.innerHTML = '<i data-lucide="sun" width="18" height="18"></i>';
    }

    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light");
      const theme = body.classList.contains("light") ? "light" : "dark";
      localStorage.setItem("theme", theme);
      
      themeToggle.innerHTML = theme === "light" 
        ? '<i data-lucide="sun" width="18" height="18"></i>'
        : '<i data-lucide="moon" width="18" height="18"></i>';
      
      // Re-initialize Lucide icons
      lucide.createIcons();
    });

    // Smooth scrolling for navigation links
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

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });

    // Initialize Lucide icons
    lucide.createIcons();

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('.nav');
      if (window.scrollY > 100) {
        nav.style.background = body.classList.contains('light') 
          ? 'rgba(255, 255, 255, 0.95)' 
          : 'rgba(10, 10, 10, 0.95)';
      } else {
        nav.style.background = body.classList.contains('light') 
          ? 'rgba(255, 255, 255, 0.9)' 
          : 'rgba(10, 10, 10, 0.8)';
      }
    });

    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill, .stat, .about-card, .timeline-item, .chip');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.background = 'rgba(59, 130, 246, 0.6)';
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'rgba(59, 130, 246, 0.4)';
      });
    });

