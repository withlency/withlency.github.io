// Lency Landing Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Remove page transition after load
    setTimeout(() => {
    const transition = document.querySelector('.page-transition');
    if (transition) {
        transition.style.display = 'none';
    }
    }, 2500);

    // // Add transition when clicking CalvAlert link
    // const calvAlertLink = document.querySelector('a[href="/calvalert/"]');
    // if (calvAlertLink) {
    //     calvAlertLink.addEventListener('click', (e) => {
    //         e.preventDefault();
            
    //         // Create transition for exiting
    //         const exitTransition = document.createElement('div');
    //         exitTransition.className = 'page-transition';
    //         exitTransition.style.animation = 'fadeIn 0.6s ease forwards';
    //         exitTransition.innerHTML = `
    //             <div class="transition-logo">
    //                 <img src="calvalert/assets/logos/CalvAlert-by-Lency.png" alt="CalvAlert Logo">
    //             </div>
    //         `;
            
    //         document.body.appendChild(exitTransition);
            
    //         // Navigate after transition
    //         setTimeout(() => {
    //             window.location.href = '/calvalert/';
    //         }, 600);
    //     });
    // }

    // Add fadeIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Create overlay for mobile menu
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s ease;
    `;
    body.appendChild(overlay);
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
            body.style.overflow = 'hidden';
        } else {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            body.style.overflow = '';
        }
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        body.style.overflow = '';
    });
    
    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
                body.style.overflow = '';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
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
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // About section expand/collapse
    const expandBtn = document.getElementById('expandAbout');
    const aboutExpanded = document.getElementById('aboutExpanded');
    
    if (expandBtn && aboutExpanded) {
        expandBtn.addEventListener('click', () => {
            expandBtn.classList.toggle('active');
            aboutExpanded.classList.toggle('active');
            
            // Change button text
            const expandText = expandBtn.querySelector('.expand-text');
            if (expandBtn.classList.contains('active')) {
                expandText.textContent = 'Show Less';
                // Smooth scroll to show expanded content
                setTimeout(() => {
                    aboutExpanded.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } else {
                expandText.textContent = 'Explore Our Story';
            }
        });
    }
    
    // Add stagger delay to team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.transitionDelay = `${index * 100}ms`;
    });
    
    // Add stagger delay to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 200}ms`;
    });
    
    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Add hover effect to promo card
    const promoCard = document.querySelector('.calvalert-promo');
    if (promoCard) {
        // Only enable 3D effect on desktop
        if (window.innerWidth > 768) {
            promoCard.addEventListener('mousemove', (e) => {
                const rect = promoCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 30;
                const angleY = (centerX - x) / 30;
                
                promoCard.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
            });
            
            promoCard.addEventListener('mouseleave', () => {
                promoCard.style.transform = '';
            });
        }
        
        // Animate stats number on scroll
        const statBig = promoCard.querySelector('.stat-big');
        if (statBig) {
            const observerOptions = {
                threshold: 0.5,
                rootMargin: '0px'
            };
            
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateValue(statBig, 0, 57, 2000);
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            statsObserver.observe(statBig);
        }
    }
    
    // Animate value function
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Parallax effect for shapes
    const shapes = document.querySelectorAll('.shape, .contact-shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Add entrance animation to hero content
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.transitionDelay = `${index * 200}ms`;
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300);
    });
    
    // Window resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Close mobile menu if window is resized to desktop
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
                body.style.overflow = '';
            }
        }, 250);
    });

    // Team Carousel
    const initTeamCarousel = () => {
        const carousel = document.getElementById('teamCarousel');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = document.getElementById('teamPrev');
        const nextBtn = document.getElementById('teamNext');
        const indicators = document.querySelectorAll('.indicator');
        
        let currentIndex = 0;
        let isAnimating = false;
        let autoRotateInterval;
        const totalItems = items.length;
        
        // Calculate positions for carousel items
        const updateCarousel = () => {
            items.forEach((item, index) => {
                const offset = index - currentIndex;
                const absOffset = Math.abs(offset);
                const sign = offset < 0 ? -1 : 1;
                
                // Calculate rotation angle
                const rotateY = offset * 60; // 60 degrees per item
                
                // Calculate z position (depth)
                const translateZ = absOffset > 2 ? -300 : -absOffset * 100;
                
                // Calculate x position
                const translateX = offset * 100;
                
                // Calculate opacity
                const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.3;
                
                // Calculate scale
                const scale = absOffset > 2 ? 0.5 : 1 - absOffset * 0.2;
                
                // Apply transforms
                item.style.transform = `
                    translate(-50%, -50%)
                    translateX(${translateX}px)
                    translateZ(${translateZ}px)
                    rotateY(${rotateY}deg)
                    scale(${scale})
                `;
                
                item.style.opacity = opacity;
                item.style.zIndex = totalItems - absOffset;
                
                // Add/remove active class
                if (offset === 0) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
                
                // Make only visible items clickable
                item.style.pointerEvents = absOffset > 2 ? 'none' : 'auto';
            });
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        };
        
        // Navigate to next item
        const nextItem = () => {
            if (!isAnimating) {
                isAnimating = true;
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
                setTimeout(() => {
                    isAnimating = false;
                }, 300);
            }
        };
        
        // Navigate to previous item
        const prevItem = () => {
            if (!isAnimating) {
                isAnimating = true;
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                updateCarousel();
                setTimeout(() => {
                    isAnimating = false;
                }, 300);
            }
        };
        
        // Go to specific item
        const goToItem = (index) => {
            if (!isAnimating && index !== currentIndex) {
                isAnimating = true;
                currentIndex = index;
                updateCarousel();
                setTimeout(() => {
                    isAnimating = false;
                }, 300);
            }
        };
        
        // Auto-rotate carousel
        const startAutoRotate = () => {
            autoRotateInterval = setInterval(nextItem, 4000); // Rotate every 4 seconds
        };
        
        const stopAutoRotate = () => {
            clearInterval(autoRotateInterval);
        };
        
        // Event listeners
        nextBtn.addEventListener('click', () => {
            stopAutoRotate();
            nextItem();
            startAutoRotate();
        });
        
        prevBtn.addEventListener('click', () => {
            stopAutoRotate();
            prevItem();
            startAutoRotate();
        });
        
        // Click on indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoRotate();
                goToItem(index);
                startAutoRotate();
            });
        });
        
        // Click on carousel items
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                const offset = index - currentIndex;
                if (offset !== 0 && Math.abs(offset) <= 2) {
                    stopAutoRotate();
                    goToItem(index);
                    startAutoRotate();
                }
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                stopAutoRotate();
                prevItem();
                startAutoRotate();
            } else if (e.key === 'ArrowRight') {
                stopAutoRotate();
                nextItem();
                startAutoRotate();
            }
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                stopAutoRotate();
                if (diff > 0) {
                    nextItem();
                } else {
                    prevItem();
                }
                startAutoRotate();
            }
        };
        
        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoRotate);
        carousel.addEventListener('mouseleave', startAutoRotate);
        
        // Initialize
        updateCarousel();
        startAutoRotate();
        
        // Handle visibility change (pause when tab is not visible)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoRotate();
            } else {
                startAutoRotate();
            }
        });
    };

    // Initialize team carousel if it exists
    if (document.getElementById('teamCarousel')) {
        initTeamCarousel();
    }
});