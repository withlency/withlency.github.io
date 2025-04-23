document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
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
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const targetNumber = parseFloat(stat.textContent);
        const decimalPlaces = stat.textContent.includes('.') ? 
            stat.textContent.split('.')[1].length : 0;
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            onEnter: () => {
                let counter = { value: 0 };
                gsap.to(counter, {
                    value: targetNumber,
                    duration: 2,
                    ease: 'power1.out',
                    onUpdate: () => {
                        stat.textContent = counter.value.toFixed(decimalPlaces);
                        
                        // Add back the span elements that might contain % or M
                        const span = stat.querySelector('span');
                        if (span) {
                            stat.textContent = counter.value.toFixed(decimalPlaces);
                            stat.appendChild(span);
                        }
                    }
                });
            },
            once: true
        });
    });
    
    // Market stat numbers animation
    const marketNumbers = document.querySelectorAll('.market-card h3');
    
    marketNumbers.forEach(stat => {
        const originalText = stat.textContent;
        const numericPart = parseFloat(originalText.replace(/[^\d.-]/g, ''));
        const suffix = originalText.replace(numericPart, '').trim();
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            onEnter: () => {
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
    
    // Benefit card staggered animation
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
    
    // Team member staggered animation
    gsap.from('.team-member', {
        scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 75%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
    });
    
    // Solution flow animation
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
    
    // Problem stats animation
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
    
    // Initialize graph animations
    const graphBars = document.querySelectorAll('.graph-bar');
    
    ScrollTrigger.create({
        trigger: '.graph-placeholder',
        start: 'top 85%',
        onEnter: () => {
            graphBars.forEach(bar => {
                bar.classList.add('visible');
            });
        },
        once: true
    });
    
    // Hero CTA button pulse animation
    gsap.to('.hero-cta .primary-btn', {
        scale: 1.05,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });
});