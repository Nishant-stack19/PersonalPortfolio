// Main JavaScript file for portfolio website
(function() {
    'use strict';

    // DOM elements
    const navToggle = document.getElementById('navToggle');
    const sideNav = document.getElementById('sideNav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const skillBars = document.querySelectorAll('.skill-progress');

    // State management
    let isNavOpen = false;
    let currentSection = 'home';
    let isScrolling = false;

    // Initialize the application
    function init() {
        setupEventListeners();
        setupSmoothScrolling();
        setupIntersectionObserver();
        setupSkillBarsAnimation();
        setupNavigation();
        
        // Reserved for cursor-reactive 2D animated object
        // setupCursorReactiveAnimation();
        
        console.log('Portfolio website initialized successfully');
    }

    // Event listeners setup
    function setupEventListeners() {
        // Navigation toggle
        navToggle.addEventListener('click', toggleNavigation);
        
        // Close navigation when clicking outside
        document.addEventListener('click', function(e) {
            if (isNavOpen && !sideNav.contains(e.target) && !navToggle.contains(e.target)) {
                closeNavigation();
            }
        });

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = this.getAttribute('data-section');
                navigateToSection(targetSection);
                closeNavigation();
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isNavOpen) {
                closeNavigation();
            }
        });

        // Window resize handler
        window.addEventListener('resize', debounce(handleResize, 250));

        // Scroll handler for additional effects
        window.addEventListener('scroll', debounce(handleScroll, 10));
    }

    // Navigation functions
    function toggleNavigation() {
        if (isNavOpen) {
            closeNavigation();
        } else {
            openNavigation();
        }
    }

    function openNavigation() {
        sideNav.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        isNavOpen = true;
        
        // Prevent body scrolling when nav is open on mobile
        if (window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden';
        }
    }

    function closeNavigation() {
        sideNav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        isNavOpen = false;
        document.body.style.overflow = '';
    }

    function navigateToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            updateActiveNavLink(sectionId);
        }
    }

    function updateActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
        currentSection = sectionId;
    }

    // Smooth scrolling setup
    function setupSmoothScrolling() {
        // Enhanced smooth scrolling for better user experience
        const scrollLinks = document.querySelectorAll('a[href^="#"]');
        
        scrollLinks.forEach(link => {
            if (!link.hasAttribute('data-section')) {
                link.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        e.preventDefault();
                        const offsetTop = targetElement.offsetTop - 80;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
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

    // Skills animation
    function setupSkillBarsAnimation() {
        const skillsSection = document.getElementById('skills');
        let skillsAnimated = false;

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
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, Math.random() * 500); // Stagger animation
        });
    }

    // Navigation enhancement
    function setupNavigation() {
        // Add keyboard navigation support
        navLinks.forEach((link, index) => {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown' && index < navLinks.length - 1) {
                    e.preventDefault();
                    navLinks[index + 1].focus();
                } else if (e.key === 'ArrowUp' && index > 0) {
                    e.preventDefault();
                    navLinks[index - 1].focus();
                }
            });
        });
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
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        // Mouse tracking
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw reactive elements here
            // Example: circles that follow cursor
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, 50, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(37, 99, 235, 0.3)';
            ctx.fill();
            
            animationId = requestAnimationFrame(animate);
        }
        
        resizeCanvas();
        animate();
        
        window.addEventListener('resize', resizeCanvas);
    }
    */

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

    function handleResize() {
        // Close navigation on resize to prevent layout issues
        if (isNavOpen && window.innerWidth > 768) {
            closeNavigation();
        }
        
        // Recalculate skill bars if needed
        if (document.querySelector('.skill-progress[style*="width"]')) {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        }
    }

    function handleScroll() {
        // Add scroll-based effects here
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / documentHeight;

        // Update navigation toggle appearance based on scroll
        if (scrollTop > 100) {
            navToggle.style.backgroundColor = 'rgba(37, 99, 235, 0.9)';
            navToggle.style.backdropFilter = 'blur(10px)';
        } else {
            navToggle.style.backgroundColor = '';
            navToggle.style.backdropFilter = '';
        }

        // Parallax effect for hero section
        const heroSection = document.getElementById('home');
        if (heroSection && scrollTop < window.innerHeight) {
            const parallaxSpeed = scrollTop * 0.5;
            heroSection.style.transform = `translateY(${parallaxSpeed}px)`;
        }
    }

    // Enhanced animations for interactive elements
    function setupInteractiveAnimations() {
        // Project cards hover effect
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Skill category hover effects
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach(category => {
            category.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.6)';
            });
            
            category.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });

        // Button animations
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
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
    }

    // Error handling
    function setupErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('Portfolio Error:', e.error);
            // Could implement error reporting here
        });

        // Handle promise rejections
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

    // Public API for external access if needed
    window.PortfolioApp = {
        navigateToSection,
        openNavigation,
        closeNavigation,
        getCurrentSection: () => currentSection
    };

})();

// Additional utility functions for future enhancements

// Reserved space for background video controls
/*
function setupBackgroundVideo() {
    const video = document.querySelector('.video-background video');
    if (video) {
        // Pause video on mobile to save bandwidth
        if (window.innerWidth <= 768) {
            video.pause();
            video.style.display = 'none';
        }
        
        // Play/pause based on visibility
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        });
        
        videoObserver.observe(video);
    }
}
*/

// Theme switching functionality (if needed in future)
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.documentElement.classList.toggle('light-theme');
            const isLight = document.documentElement.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light-theme');
        }
    }
}

// Contact form handling (if form is added)
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle form submission
            console.log('Contact form submitted');
        });
    }
}

// Console welcome message
console.log('%c👋 Welcome to my portfolio!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to explore the code and reach out if you have any questions!', 'color: #60a5fa; font-size: 14px;');
