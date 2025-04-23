document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navbar.classList.toggle('menu-open');
            
            // Add animation to burger icon
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach((span, index) => {
                gsap.to(span, {
                    rotate: navbar.classList.contains('menu-open') ? [0, 45, -45][index] : 0,
                    y: navbar.classList.contains('menu-open') ? 
                        [8, 0, -8][index] : 0,
                    opacity: navbar.classList.contains('menu-open') && index === 1 ? 0 : 1,
                    duration: 0.3,
                    ease: 'power1.out'
                });
            });
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('menu-open');
            
            // Animate the link
            gsap.to(this, {
                scale: 1.1,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: 'power1.out'
            });
        });
    });
    
    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Highlight the section being scrolled to
                gsap.to(targetElement, {
                    backgroundColor: 'rgba(133, 17, 180, 0.05)',
                    duration: 0.3,
                    onComplete: () => {
                        gsap.to(targetElement, {
                            backgroundColor: 'rgba(133, 17, 180, 0)',
                            duration: 1
                        });
                    }
                });
                
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Smooth scroll with GSAP
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetPosition,
                        autoKill: false
                    },
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Enhanced form submissions with animation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formValues = Object.fromEntries(formData.entries());
            
            // Animate form submission
            gsap.to(form, {
                scale: 0.98,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: 'power1.out'
            });
            
            // Here you would typically send the data to a server
            console.log('Form submitted with values:', formValues);
            
            // Show success message with animation
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.textContent = 'Thank you for your submission!';
            successMessage.style.color = '#22c55e';
            successMessage.style.marginTop = '1rem';
            successMessage.style.fontWeight = '600';
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(20px)';
            
            // Clear form and append message
            form.reset();
            form.appendChild(successMessage);
            
            // Animate success message
            gsap.to(successMessage, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power1.out'
            });
            
            // Remove message after 5 seconds with animation
            setTimeout(() => {
                gsap.to(successMessage, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    ease: 'power1.in',
                    onComplete: () => {
                        successMessage.remove();
                    }
                });
            }, 5000);
        });
    });
    
    // Add focus and blur animations to form inputs
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            gsap.to(this, {
                boxShadow: '0 0 0 3px rgba(133, 17, 180, 0.2)',
                duration: 0.3
            });
        });
        
        input.addEventListener('blur', function() {
            gsap.to(this, {
                boxShadow: 'none',
                duration: 0.3
            });
        });
    });
    
    // Enhanced navbar interaction on scroll
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            gsap.to(navbar, {
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                height: '70px',
                duration: 0.3,
                ease: 'power1.out'
            });
        } else {
            gsap.to(navbar, {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                height: '80px',
                duration: 0.3,
                ease: 'power1.out'
            });
        }
        
        // Highlight active section in navigation
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active-nav');
            }
        });
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initialize
    
    // Set graph bar heights based on data attributes with animation
    const graphBars = document.querySelectorAll('.graph-bar');
    
    // Wait for ScrollTrigger to handle this in animations.js
    
    // Add hover effects to image cards
    const imageCards = document.querySelectorAll('.image-card');
    imageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            const text = this.querySelector('p');
            
            gsap.to(img, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power1.out'
            });
            
            gsap.to(text, {
                backgroundColor: 'rgba(133, 17, 180, 0.8)',
                y: 0,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            const text = this.querySelector('p');
            
            gsap.to(img, {
                scale: 1,
                duration: 0.3,
                ease: 'power1.in'
            });
            
            gsap.to(text, {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                y: 0,
                duration: 0.3,
                ease: 'power1.in'
            });
        });
    });
    
    // Add parallax scrolling to hero section
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroSection && heroContent && heroImage) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            
            if (scrollY < heroSection.offsetHeight) {
                // Parallax effect
                gsap.set(heroContent, {
                    y: scrollY * 0.3
                });
                
                gsap.set(heroImage, {
                    y: scrollY * 0.2
                });
            }
        });
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple-effect');
            ripple.style.top = y + 'px';
            ripple.style.left = x + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // CSS for ripple effect (add to your styles.css)
    const style = document.createElement('style');
    style.textContent = `
        .primary-btn, .secondary-btn {
            position: relative;
            overflow: hidden;
        }
        
        .btn-ripple-effect {
            position: absolute;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s linear;
            transform-origin: center;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Add 3D tilt effect to the CTA section
    const ctaSection = document.querySelector('.cta');
    
    if (ctaSection) {
        ctaSection.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 40;
            const tiltY = (centerX - x) / 40;
            
            gsap.to(this, {
                rotationX: tiltX,
                rotationY: tiltY,
                duration: 0.5,
                ease: 'power1.out',
                transformPerspective: 1000,
                transformOrigin: 'center center'
            });
        });
        
        ctaSection.addEventListener('mouseleave', function() {
            gsap.to(this, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'power1.out'
            });
        });
    }
});