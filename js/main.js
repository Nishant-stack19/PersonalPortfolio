// Enhanced Portfolio JavaScript with Modern Navigation
(function() {
    'use strict';

    // DOM elements
    const navbar = document.getElementById('mainNavbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const skillBars = document.querySelectorAll('.skill-progress');
    const backToTopBtn = document.getElementById('backToTop');

    // State management
    let currentSection = 'home';
    let isScrolling = false;
    let lastScrollTop = 0;

    // Initialize the application
    function init() {
        setupEventListeners();
        setupSmoothScrolling();
        setupIntersectionObserver();
        setupSkillBarsAnimation();
        setupNavbarScroll();
        setupBackToTop();
        setupParticleEffect();
        setupTypingEffect();
        
        // Reserved for cursor-reactive 2D animated object
        // setupCursorReactiveAnimation();
        
        console.log('Portfolio website initialized successfully');
    }

    // Event listeners setup
    function setupEventListeners() {
        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                navigateToSection(targetId);
                updateActiveNavLink(targetId);
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });

        // Window resize handler
        window.addEventListener('resize', debounce(handleResize, 250));

        // Scroll handler
        window.addEventListener('scroll', throttle(handleScroll, 10));

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    }

    // Navigation functions
    function navigateToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    function updateActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        currentSection = sectionId;
    }

    // Smooth scrolling setup
    function setupSmoothScrolling() {
        const scrollLinks = document.querySelectorAll('a[href^="#"]');
        
        scrollLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement && !this.classList.contains('nav-link')) {
                    e.preventDefault();
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Navbar scroll effects
    function setupNavbarScroll() {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Back to top button
    function setupBackToTop() {
        if (backToTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Intersection Observer for section detection
    function setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    updateActiveNavLink(sectionId);
                    
                    // Add animation class when section comes into view
                    entry.target.classList.add('section-visible');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Skills animation with percentages
    function setupSkillBarsAnimation() {
        const skillsSection = document.getElementById('skills');
        let skillsAnimated = false;

        // Add skill percentages to the HTML structure
        const skillsData = [
            { name: 'JavaScript', percentage: 90 },
            { name: 'React.js', percentage: 85 },
            { name: 'CSS3', percentage: 90 },
            { name: 'HTML5', percentage: 95 },
            { name: 'Node.js', percentage: 80 },
            { name: 'Python', percentage: 75 },
            { name: 'Express.js', percentage: 85 },
            { name: 'MongoDB', percentage: 70 },
            { name: 'Git', percentage: 90 },
            { name: 'Docker', percentage: 70 },
            { name: 'AWS', percentage: 65 },
            { name: 'Figma', percentage: 80 }
        ];

        // Update skill bars with data
        skillBars.forEach((bar, index) => {
            if (skillsData[index]) {
                bar.setAttribute('data-width', `${skillsData[index].percentage}%`);
                
                // Add percentage display
                const skillItem = bar.closest('.skill-item');
                const skillName = skillItem.querySelector('.skill-name');
                if (skillName && !skillName.querySelector('.skill-percentage')) {
                    const percentageSpan = document.createElement('span');
                    percentageSpan.className = 'skill-percentage';
                    percentageSpan.textContent = `${skillsData[index].percentage}%`;
                    skillName.appendChild(percentageSpan);
                }
            }
        });

        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    animateSkillBars();
                    skillsAnimated = true;
                }
            });
        }, {
            threshold: 0.3
        });

        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
    }

    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, index * 150); // Stagger animation
        });
    }

    // Typing effect for hero subtitle
    function setupTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = [
            'Full Stack Developer',
            'Frontend Specialist',
            'Backend Engineer',
            'UI/UX Enthusiast'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeText, typeSpeed);
        }

        typeText();
    }

    // Particle effect for hero section
    function setupParticleEffect() {
        const heroParticles = document.getElementById('heroParticles');
        if (!heroParticles) return;

        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(0, 217, 255, 0.6);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${10 + Math.random() * 20}s linear infinite;
                animation-delay: ${Math.random() * 20}s;
            `;
            heroParticles.appendChild(particle);
        }

        // Add CSS for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Reserved function for cursor-reactive 2D animated object
    /*
    function setupCursorReactiveAnimation() {
        const canvas = document.getElementById('cursorReactiveCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let mouseX = 0;
        let mouseY = 0;
        let animationId;
        const particles = [];
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        // Particle class
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.color = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`;
                this.life = 1;
                this.decay = 0.02;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= this.decay;
                this.size *= 0.99;
            }
            
            draw() {
                ctx.save();
                ctx.globalAlpha = this.life;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }
        }
        
        // Mouse tracking
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Add particles on mouse move
            for (let i = 0; i < 2; i++) {
                particles.push(new Particle(mouseX, mouseY));
            }
        });
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();
                
                if (particles[i].life <= 0) {
                    particles.splice(i, 1);
                }
            }
            
            animationId = requestAnimationFrame(animate);
        }
        
        resizeCanvas();
        animate();
        
        window.addEventListener('resize', resizeCanvas);
    }
    */

    // Enhanced animations for interactive elements
    function setupInteractiveAnimations() {
        // Project cards enhanced hover effect
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-12px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Enhanced button animations
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Contact items animation
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Utility functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    function handleResize() {
        // Recalculate skill bars if needed
        if (document.querySelector('.skill-progress[style*="width"]')) {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        }
    }

    function handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // Parallax effect for hero section
        const heroSection = document.getElementById('home');
        if (heroSection && scrollTop < window.innerHeight) {
            const parallaxSpeed = scrollTop * 0.3;
            heroSection.style.transform = `translateY(${parallaxSpeed}px)`;
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    }

    // Performance optimization
    function optimizePerformance() {
        // Lazy load images when they come into view
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.scrollBehavior = 'auto';
            
            // Disable animations
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Accessibility enhancements
    function enhanceAccessibility() {
        // Add ARIA labels to interactive elements
        const interactiveElements = document.querySelectorAll('button, a, input, textarea');
        interactiveElements.forEach(element => {
            if (!element.hasAttribute('aria-label') && !element.textContent.trim()) {
                element.setAttribute('aria-label', 'Interactive element');
            }
        });

        // Manage focus for keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-nav');
        });

        // Skip link for keyboard users
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--accent-primary);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.prepend(skipLink);
    }

    // Error handling
    function setupErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('Portfolio Error:', e.error);
        });

        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled Promise Rejection:', e.reason);
        });
    }

    // Initialize everything when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            init();
            setupInteractiveAnimations();
            optimizePerformance();
            enhanceAccessibility();
            setupErrorHandling();
        });
    } else {
        init();
        setupInteractiveAnimations();
        optimizePerformance();
        enhanceAccessibility();
        setupErrorHandling();
    }

    // Public API for external access
    window.PortfolioApp = {
        navigateToSection,
        updateActiveNavLink,
        getCurrentSection: () => currentSection
    };

})();

// Additional utility functions for future enhancements

// Contact form handling
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual implementation)
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Theme switching functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.documentElement.classList.toggle('light-theme');
            const isLight = document.documentElement.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // Update toggle icon
            const icon = this.querySelector('i');
            icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light-theme');
            const icon = themeToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-moon';
        }
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setupContactForm();
    setupThemeToggle();
});