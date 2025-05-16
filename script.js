// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, .checkbox-container, .play-button, .control, .dot');
    
    // Navigation and header
    const header = document.querySelector('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Animation elements
    const fadeElements = document.querySelectorAll('.fade-in');
    const counters = document.querySelectorAll('.counter');
    const logoContainer = document.querySelector('.logo-container');
    const body = document.body;
    
    // Carousel elements
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.control.prev');
    const nextBtn = document.querySelector('.control.next');
    const dots = document.querySelectorAll('.dot');
    
    // Form elements
    const contactForm = document.getElementById('signup-form');
    
    // Create overlay for mobile menu
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    body.appendChild(overlay);
    
    // Initialize
    initCursor();
    initScrollEvents();
    initAnimations();
    initCarousel();
    initMobileMenu();
    initFormValidation();
    initHeroCounter();
    initButtonEffects();
    
    // Functions
    function initCursor() {
        // Only initialize custom cursor on non-touch devices
        if (!isTouchDevice()) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
                
                // Add some delay to follower for smooth effect
                setTimeout(() => {
                    cursorFollower.style.left = `${e.clientX}px`;
                    cursorFollower.style.top = `${e.clientY}px`;
                }, 70);
            });
            
            // Add hover effect to interactive elements
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    cursor.classList.add('hover');
                    cursorFollower.classList.add('hover');
                });
                
                element.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hover');
                    cursorFollower.classList.remove('hover');
                });
            });
            
            // Hide cursor when leaving window
            document.addEventListener('mouseout', (e) => {
                if (e.relatedTarget === null) {
                    cursor.style.opacity = '0';
                    cursorFollower.style.opacity = '0';
                }
            });
            
            document.addEventListener('mouseover', () => {
                cursor.style.opacity = '1';
                cursorFollower.style.opacity = '1';
            });
        } else {
            // Hide cursor elements on touch devices
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
            body.style.cursor = 'auto';
        }
    }
    
    function initScrollEvents() {
        checkScrollPosition(); // Check on load
        
        window.addEventListener('scroll', () => {
            checkScrollPosition();
            
            // Parallax scroll effect for hero elements
            const heroSection = document.querySelector('.hero');
            const scrollPosition = window.scrollY;
            
            if (heroSection && scrollPosition <= heroSection.offsetHeight) {
                const parallaxElements = document.querySelectorAll('.floating-element');
                parallaxElements.forEach(element => {
                    const speed = 0.2;
                    element.style.transform = `translateY(${scrollPosition * speed}px)`;
                });
            }
            
            // Check for elements to animate on scroll
            fadeElements.forEach(element => {
                if (isElementInViewport(element)) {
                    element.classList.add('show');
                    
                    // Animate counters when visible
                    const counter = element.querySelector('.counter');
                    if (counter && !counter.classList.contains('counted')) {
                        animateCounter(counter);
                        counter.classList.add('counted');
                    }
                }
            });
        });
    }
    
    function checkScrollPosition() {
        const scrollPosition = window.scrollY;
        
        // Header scroll effect
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    function initAnimations() {
        // Add observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    
                    // Animate counters when visible
                    const counter = entry.target.querySelector('.counter');
                    if (counter && !counter.classList.contains('counted')) {
                        animateCounter(counter);
                        counter.classList.add('counted');
                    }
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    function animateCounter(counterElement) {
        const target = parseInt(counterElement.dataset.count);
        const duration = 2000; // 2 seconds
        const increment = target / 100;
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            
            counterElement.textContent = Math.floor(current);
        }, 20);
    }
    
    function initHeroCounter() {
        const statLine = document.querySelector('.stat-line');
        if (statLine) {
            const finalValue = parseInt(statLine.getAttribute('data-value'));
            const duration = 2000; // 2 seconds
            const interval = 20; // Update every 20ms
            const increment = finalValue / 100;
            
            let currentValue = 0;
            
            const timer = setInterval(() => {
                currentValue += increment;
                
                if (currentValue >= finalValue) {
                    clearInterval(timer);
                    currentValue = finalValue;
                }
                
                statLine.textContent = `${Math.floor(currentValue)}%`;
            }, interval);
        }
    }
    
    function initCarousel() {
        if (!testimonialSlides.length) return;
        
        let currentSlide = 0;
        
        // Auto play carousel
        const autoPlay = setInterval(() => {
            goToNextSlide();
        }, 5000);
        
        // Controls
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(autoPlay);
                goToPrevSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(autoPlay);
                goToNextSlide();
            });
        }
        
        // Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(autoPlay);
                goToSlide(index);
            });
        });
        
        function goToSlide(index) {
            testimonialSlides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            testimonialSlides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        function goToNextSlide() {
            const nextSlide = (currentSlide + 1) % testimonialSlides.length;
            goToSlide(nextSlide);
        }
        
        function goToPrevSlide() {
            const prevSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            goToSlide(prevSlide);
        }
    }
    
    function initMobileMenu() {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
        
        overlay.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('no-scroll');
        });
        
        // Close menu when nav link is clicked
        const navLinkItems = document.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
        
        // Close menu on window resize if open
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    }
    
    function initFormValidation() {
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Simple validation
                let isValid = true;
                const requiredInputs = contactForm.querySelectorAll('[required]');
                
                requiredInputs.forEach(input => {
                    if (!input.value.trim()) {
                        input.classList.add('error');
                        isValid = false;
                    } else {
                        input.classList.remove('error');
                    }
                });
                
                // Check at least one checkbox is selected
                const checkboxes = contactForm.querySelectorAll('input[type="checkbox"]');
                const checkedOne = Array.from(checkboxes).some(checkbox => checkbox.checked);
                
                if (!checkedOne) {
                    isValid = false;
                    checkboxes.forEach(checkbox => {
                        checkbox.parentElement.classList.add('error');
                    });
                } else {
                    checkboxes.forEach(checkbox => {
                        checkbox.parentElement.classList.remove('error');
                    });
                }
                
                if (isValid) {
                    // Here you would normally submit the form data
                    // For demo purposes, we'll just show a success message
                    
                    const formContainer = contactForm.parentElement;
                    formContainer.innerHTML = `
                        <div class="success-message">
                            <div class="success-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3>Thank You!</h3>
                            <p>We've received your request and will be in touch soon.</p>
                        </div>
                    `;
                }
            });
            
            // Clear error state on input
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    input.classList.remove('error');
                });
            });
            
            // Clear error state on checkbox change
            const checkboxes = contactForm.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    checkboxes.forEach(cb => {
                        cb.parentElement.classList.remove('error');
                    });
                });
            });
        }
    }
    
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.primary-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 10;
                const angleY = (centerX - x) / 10;
                
                button.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-2px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
        
        // Parallax effect for logo
        if (logoContainer && !isTouchDevice()) {
            document.addEventListener('mousemove', (e) => {
                if (window.innerWidth > 768) {
                    const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
                    const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
                    
                    logoContainer.style.transform = `translateY(-10px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
                }
            });
            
            // Reset transform when mouse leaves
            document.addEventListener('mouseleave', () => {
                logoContainer.style.transform = 'translateY(0) rotateY(0) rotateX(0)';
            });
        }
    }
    
    // Simple scroll for navigation links - MODIFIED SECTION
    // Allow default browser behavior for hash links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Let the browser handle the click naturally
            // No preventDefault() means it will jump to the section immediately
            
            // Just close mobile menu if open
            if (navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    });
    
    // Utility functions
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
    
    // Play button interaction for demo video
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', () => {
            // In a real implementation, this would trigger the video to play
            playButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            setTimeout(() => {
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
            }, 1000);
        });
    }
});