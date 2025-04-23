document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Create particles
    createParticles();
    
    // Initialize mouse parallax
    initMouseParallax();
    
    // Add interactive logo effects
    initLogoInteraction();
    
    // Add scroll indicator that fades out
    initScrollIndicator();
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.left >= 0 &&
            rect.bottom >= 0 &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
                
                // For elements with special animations
                if (element.classList.contains('blur-in')) {
                    element.classList.add('visible');
                }
                
                if (element.classList.contains('scale-in')) {
                    element.classList.add('visible');
                }
                
                // For graph bars
                if (element.classList.contains('graph-bar')) {
                    element.classList.add('visible');
                }
            }
        });
    }
    
    // Run once on load for elements already in view
    handleScrollAnimations();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Hero animations with GSAP
    gsap.from('.hero-shapes .shape', {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        stagger: 0.2,
        delay: 0.5
    });
    
    // Add floating cow animation
    if (document.querySelector('.hero-image img')) {
        const logo = document.querySelector('.hero-image img');
        logo.classList.add('cow-bounce');
    }
    
    // Stats counter animation with improved visuals
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const targetNumber = parseFloat(stat.textContent);
        const decimalPlaces = stat.textContent.includes('.') ? 
            stat.textContent.split('.')[1].length : 0;
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            onEnter: () => {
                // Add pulsing glow effect when counter starts
                stat.classList.add('pulse-glow');
                
                let counter = { value: 0 };
                gsap.to(counter, {
                    value: targetNumber,
                    duration: 2,
                    ease: 'power1.out',
                    onUpdate: () => {
                        let formattedValue = counter.value.toFixed(decimalPlaces);
                        stat.textContent = formattedValue;
                        
                        // Add back the span elements that might contain % or M
                        const span = stat.querySelector('span');
                        if (span) {
                            stat.textContent = formattedValue;
                            stat.appendChild(span);
                        }
                    },
                    onComplete: () => {
                        // Add subtle animation when counter finishes
                        gsap.to(stat, {
                            scale: 1.05,
                            duration: 0.3,
                            yoyo: true,
                            repeat: 1
                        });
                    }
                });
            },
            once: true
        });
    });
    
    // Market stat numbers animation with improved visuals
    const marketNumbers = document.querySelectorAll('.market-card h3');
    
    marketNumbers.forEach(stat => {
        const originalText = stat.textContent;
        const numericPart = parseFloat(originalText.replace(/[^\d.-]/g, ''));
        const suffix = originalText.replace(numericPart, '').trim();
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            onEnter: () => {
                // Add glow effect
                stat.classList.add('glow');
                
                let counter = { value: 0 };
                gsap.to(counter, {
                    value: numericPart,
                    duration: 2,
                    ease: 'power1.out',
                    onUpdate: () => {
                        // Format the number with appropriate decimals
                        const formatted = Number.isInteger(numericPart) ? 
                            Math.round(counter.value) : 
                            counter.value.toFixed(1);
                        
                        // Update the text content
                        stat.textContent = formatted + suffix;
                    }
                });
            },
            once: true
        });
    });
    
    // Benefit card staggered animation with hover effects
    gsap.from('.benefit-card', {
        scrollTrigger: {
            trigger: '.benefits-grid',
            start: 'top 75%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
    });
    
    // Add card shine effect to all benefit cards
    document.querySelectorAll('.benefit-card').forEach(card => {
        card.classList.add('card-shine-color');
    });
    
    // Team member staggered animation with enhanced effects
    gsap.from('.team-member', {
        scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 75%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        onComplete: () => {
            // Add subtle continuous animation to team photos
            document.querySelectorAll('.member-photo').forEach(photo => {
                gsap.to(photo, {
                    y: -5,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            });
        }
    });
    
    // Solution flow animation with interactive hover
    gsap.from('.flow-step', {
        scrollTrigger: {
            trigger: '.solution-flow',
            start: 'top 75%'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });
    
    // Add pulse animation to flow arrows
    document.querySelectorAll('.flow-arrow').forEach(arrow => {
        gsap.to(arrow, {
            x: 5,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
    
    // Problem stats animation with enhanced effects
    gsap.from('.stat-card', {
        scrollTrigger: {
            trigger: '.problem-stats',
            start: 'top 75%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
    });
    
    // Add shine effect to cards on hover
    const cards = document.querySelectorAll('.stat-card, .benefit-card, .market-card, .problem-text');
    cards.forEach(card => {
        card.classList.add('card-shine');
    });
    
    // Initialize graph animations with enhanced effects
    const graphBars = document.querySelectorAll('.graph-bar');
    
    ScrollTrigger.create({
        trigger: '.graph-placeholder',
        start: 'top 85%',
        onEnter: () => {
            graphBars.forEach((bar, index) => {
                // Staggered animation for each bar
                setTimeout(() => {
                    bar.classList.add('visible');
                }, index * 200);
            });
        },
        once: true
    });
    
    // Hero CTA button effects
    const primaryBtn = document.querySelector('.hero-cta .primary-btn');
    if (primaryBtn) {
        primaryBtn.classList.add('btn-shine');
        
        // Add subtle pulse animation
        gsap.to(primaryBtn, {
            scale: 1.05,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
    
    // Create particles for hero section
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        
        // Create two glow effects
        const glow1 = document.createElement('div');
        glow1.className = 'glow glow-1';
        
        const glow2 = document.createElement('div');
        glow2.className = 'glow glow-2';
        
        particlesContainer.appendChild(glow1);
        particlesContainer.appendChild(glow2);
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 3 and 10px
            const size = Math.random() * 7 + 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation delay
            particle.style.animationDelay = `${Math.random() * 10}s`;
            
            // Random animation duration
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            
            particlesContainer.appendChild(particle);
        }
        
        // Add to hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.appendChild(particlesContainer);
            
            // Animate glow positions
            gsap.to(glow1, {
                x: '+=30',
                y: '+=20',
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
            
            gsap.to(glow2, {
                x: '-=30',
                y: '-=20',
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }
    
    // Initialize mouse parallax effect
    function initMouseParallax() {
        const hero = document.querySelector('.hero');
        const shapes = document.querySelectorAll('.hero-shapes .shape');
        const logo = document.querySelector('.hero-image img');
        
        if (!hero || !shapes.length) return;
        
        hero.addEventListener('mousemove', e => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            // Move shapes based on mouse position
            shapes.forEach((shape, index) => {
                const factor = (index + 1) * 15;
                gsap.to(shape, {
                    x: mouseX * factor,
                    y: mouseY * factor,
                    duration: 0.3,
                    ease: 'power1.out'
                });
            });
            
            // Move logo slightly in opposite direction for depth
            if (logo) {
                gsap.to(logo, {
                    x: mouseX * -20,
                    y: mouseY * -20,
                    duration: 0.5,
                    ease: 'power1.out'
                });
            }
            
            // Move glows
            const glows = document.querySelectorAll('.glow');
            glows.forEach((glow, index) => {
                const factor = (index + 1) * 30;
                gsap.to(glow, {
                    x: mouseX * factor,
                    y: mouseY * factor,
                    duration: 0.5,
                    ease: 'power1.out'
                });
            });
        });
    }
    
    // Add interactive effects to the logo
    function initLogoInteraction() {
        const logo = document.querySelector('.hero-image img');
        if (!logo) return;
        
        // Make logo interactive
        logo.classList.add('interactive-logo');
        
        // Add hover effect
        logo.addEventListener('mouseenter', () => {
            gsap.to(logo, {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: 'back.out'
            });
        });
        
        logo.addEventListener('mouseleave', () => {
            gsap.to(logo, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'back.out'
            });
        });
        
        // Add click effect
        logo.addEventListener('click', () => {
            gsap.to(logo, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power1.out'
            });
        });
    }
    
    // Add scroll indicator that fades on scroll
    function initScrollIndicator() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Create scroll indicator
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = `
            <span>Scroll to explore</span>
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 17.414L3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414z" fill="currentColor"/>
            </svg>
        `;
        
        hero.appendChild(scrollIndicator);
        
        // Fade out on scroll
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 50) {
                scrollIndicator.style.opacity = Math.max(0, 1 - scrollY / 300);
            }
        });
    }
    
    // Add text splitting effects to main headings for advanced animations
    function splitTextAnimation() {
        const heroH1 = document.querySelector('.hero-content h1');
        if (!heroH1) return;
        
        // Split text into spans for each word
        const spans = [];
        heroH1.childNodes.forEach(node => {
            if (node.nodeType === 3) { // Text node
                const words = node.textContent.trim().split(' ');
                words.forEach(word => {
                    const span = document.createElement('span');
                    span.textContent = word + ' ';
                    span.style.display = 'inline-block';
                    span.style.opacity = '0';
                    spans.push(span);
                    heroH1.insertBefore(span, node);
                });
                heroH1.removeChild(node);
            }
        });
        
        // Animate each word
        gsap.to(spans, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power1.out',
            delay: 0.3
        });
    }
    
    // Initialize optional text splitting effect
    // Uncomment to enable this advanced animation
    // splitTextAnimation();
    
    // Add button hover effects
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn, .nav-link.contact-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                y: -3,
                duration: 0.2,
                ease: 'power1.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                y: 0,
                duration: 0.2,
                ease: 'power1.in'
            });
        });
    });
    
    // Add hover effects to problem cards
    const problemCards = document.querySelectorAll('.problem-text');
    problemCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                duration: 0.3
            });
        });
    });
    
    // Add typing effect to subtitle if it exists
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.classList.add('tracking-in');
    }
});