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
    
    // Function definitions - defined BEFORE they're called in initialization
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
        const contactForm = document.getElementById('signup-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
            // Only prevent default if validation fails
            
            // Simple validation
            let isValid = true;
            const requiredInputs = contactForm.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    e.preventDefault(); // Prevent form submission if validation fails
                    input.classList.add('error');
                    input.parentElement.classList.add('error-container');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                    input.parentElement.classList.remove('error-container');
                }
            });
            
            // Check at least one checkbox is selected
            const checkboxes = contactForm.querySelectorAll('input[type="checkbox"]');
            const checkedOne = Array.from(checkboxes).some(checkbox => checkbox.checked);
            
            if (!checkedOne) {
                e.preventDefault(); // Prevent form submission if validation fails
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
                // Show loading state - the form will submit naturally
                const submitBtn = contactForm.querySelector('.submit-btn');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
                    submitBtn.querySelector('.btn-icon i').className = 'fas fa-spinner fa-spin';
                }
            }
        });
            
            // Clear error state on input
            const inputs = contactForm.querySelectorAll('input[type="text"], input[type="email"], textarea');
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    input.classList.remove('error');
                    input.parentElement.classList.remove('error-container');
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
                if (logoContainer) logoContainer.style.transform = 'translateY(0) rotateY(0) rotateX(0)';
            });
        }

        if (isTouchDevice()) {
            // Force remove any transforms from logo elements on touch devices
            const logoElements = document.querySelectorAll('.logo-container, .logo img, .calvalert-logo');
            logoElements.forEach(el => {
                if (el) el.style.transform = 'none';
            });
        }
    }
    
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
    
    // Run the system demo animation
    const runSystemDemo = () => {
        const steps = document.querySelectorAll('.step-item');
        const modules = document.querySelectorAll('.workflow-module');
        const feedContainer = document.querySelector('.feed-container');
        const alertNotification = document.querySelector('.alert-notification');
        const detectionDot = document.querySelector('.cow-3 .detection-dot');
        
        if (!steps.length || !modules.length) return;
        
        // Reset all elements
        steps.forEach(step => step.classList.remove('active'));
        modules.forEach(module => module.classList.remove('active'));
        if (feedContainer) feedContainer.classList.remove('active');
        if (alertNotification) alertNotification.classList.remove('active');
        if (detectionDot) detectionDot.classList.remove('active');
        
        // Animation timeline
        setTimeout(() => {
            // Step 1: Camera captures the calving pen
            if (steps[0]) steps[0].classList.add('active');
            if (modules[0]) modules[0].classList.add('active');
        }, 300);
        
        setTimeout(() => {
            // Step 2: Video streams are processed locally
            if (steps[0]) steps[0].classList.remove('active');
            if (modules[0]) modules[0].classList.remove('active');
            if (steps[1]) steps[1].classList.add('active');
            if (modules[1]) modules[1].classList.add('active');
        }, 2000);
        
        setTimeout(() => {
            // Step 3: AI analyzes for calving signs
            if (steps[1]) steps[1].classList.remove('active');
            if (modules[1]) modules[1].classList.remove('active');
            if (steps[2]) steps[2].classList.add('active');
            if (modules[2]) modules[2].classList.add('active');
            if (feedContainer) feedContainer.classList.add('active');
        }, 4000);
        
        setTimeout(() => {
            // Step 4: Alerts are sent when issues detected
            if (steps[2]) steps[2].classList.remove('active');
            if (modules[2]) modules[2].classList.remove('active');
            if (steps[3]) steps[3].classList.add('active');
            if (modules[3]) modules[3].classList.add('active');
            if (detectionDot) detectionDot.classList.add('active');
        }, 6000);
        
        setTimeout(() => {
            // Show alert notification with current time
            if (alertNotification) {
                // Get current time
                const now = new Date();
                let hours = now.getHours();
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const seconds = now.getSeconds().toString().padStart(2, '0');
                const ampm = hours >= 12 ? 'PM' : 'AM';
                
                hours = hours % 12;
                hours = hours ? hours : 12; // Convert 0 to 12 for 12 AM
                const hoursStr = hours.toString().padStart(2, '0');
                
                // Format time as HH:MM:SS AM/PM
                const timeString = `${hoursStr}:${minutes}:${seconds} ${ampm}`;
                
                // Update time in the notification
                const timeElement = alertNotification.querySelector('.current-time');
                if (timeElement) {
                    timeElement.textContent = timeString;
                }
                
                // Show the notification
                alertNotification.classList.add('active');
            }
        }, 7500);
        
        // Reset after completing
        setTimeout(() => {
            if (steps[3]) steps[3].classList.remove('active');
            if (modules[3]) modules[3].classList.remove('active');
            if (feedContainer) feedContainer.classList.remove('active');
            if (alertNotification) alertNotification.classList.remove('active');
            if (detectionDot) detectionDot.classList.remove('active');
        }, 15000);
    };
    
    // Solution Section Interactivity
    const initSolutionTabs = () => {
        const tabItems = document.querySelectorAll('.tab-item');
        const tabContents = document.querySelectorAll('.tab-content');
        
        // Set up tab switching if tabs exist
        if (tabItems.length) {
            tabItems.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remove active class from all tabs
                    tabItems.forEach(t => t.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    tab.classList.add('active');
                    
                    // Show corresponding content
                    const tabId = tab.getAttribute('data-tab');
                    const tabContent = document.getElementById(`${tabId}-tab`);
                    if (tabContent) tabContent.classList.add('active');
                    
                    // Run demo animation if system tab is selected
                    if (tabId === 'system') {
                        setTimeout(() => {
                            runSystemDemo();
                        }, 300);
                    }
                });
            });
        }
        
        // Initialize the replay button - this should run regardless of tabs
        const replayButton = document.getElementById('replayDemo');
        if (replayButton) {
            replayButton.addEventListener('click', runSystemDemo);
        }
        
        // Auto-run the demo when in view - this should run regardless of tabs
        const systemInteractive = document.querySelector('.system-interactive');
        if (systemInteractive) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        console.log("System interactive in view, running demo...");
                        setTimeout(() => {
                            runSystemDemo();
                        }, 500);
                        observer.unobserve(entry.target); // Only run once when first scrolled to
                    }
                });
            }, { threshold: 0.3 }); // Lower threshold to trigger earlier
            
            observer.observe(systemInteractive);
        }
    };
    
    // Feature hover animation
    const initFeatureHover = () => {
        const features = document.querySelectorAll('.feature-block');
        features.forEach(feature => {
            feature.addEventListener('mouseenter', () => {
                const icon = feature.querySelector('.feature-icon i');
                if (icon) {
                    icon.classList.add('fa-beat');
                    setTimeout(() => {
                        icon.classList.remove('fa-beat');
                    }, 500);
                }
            });
        });
    };
    
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
    
    // Simple scroll for navigation links
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
    
    // Initialize everything
    initCursor();
    initScrollEvents();
    initAnimations();
    initCarousel();
    initMobileMenu();
    initFormValidation();
    initHeroCounter();
    initButtonEffects();
    initFeatureHover();
    initSolutionTabs();
    initPilotMap();
    
    // Flip cards on touch for mobile devices
    const statsCards = document.querySelectorAll('.stats-card');
    if (isTouchDevice()) {
        // For mobile devices, don't add flip behavior
        // The cards will display in static format per our CSS media queries
        console.log("Mobile device detected - disabling card flip behavior");
    } else {
        // Only add hover behavior for desktop
        statsCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const cardInner = card.querySelector('.stats-card-inner');
                cardInner.style.transform = 'rotateY(180deg)';
            });
            
            card.addEventListener('mouseleave', () => {
                const cardInner = card.querySelector('.stats-card-inner');
                cardInner.style.transform = 'rotateY(0deg)';
            });
        });
    }

    // Initialize the map with pilot locations
    function initPilotMap() {
        const mapElement = document.getElementById('pilot-map');
        
        if (!mapElement) return;
        
        // Cyprus coordinates
        const cyprusLocation = [35.1264, 33.4299];
        
        // Initialize map centered on Cyprus
        const map = L.map('pilot-map').setView(cyprusLocation, 6);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Create a custom pulsing dot icon
        const pulsingDotIcon = L.divIcon({
            className: 'pulsing-dot-icon',
            html: '<div class="pulsing-dot"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        // Add marker for Cyprus with custom icon
        const cyprusMarker = L.marker(cyprusLocation, {
            icon: pulsingDotIcon
        }).addTo(map);
        
        // Add popup for Cyprus marker
        const popupContent = `
            <div class="popup-content">
                <h4>Active Pilot Site</h4>
                <p>Cyprus - Testing since January 2025</p>
            </div>
        `;
        
        cyprusMarker.bindPopup(popupContent, {
            className: 'map-popup'
        }).openPopup();
        
        // Add marker for Netherlands (future site)
        const netherlandsLocation = [52.1326, 5.2913];
        
        const futureIcon = L.divIcon({
            className: 'future-location-icon',
            html: '<div class="future-dot"></div>',
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        });
        
        const netherlandsMarker = L.marker(netherlandsLocation, {
            icon: futureIcon
        }).addTo(map);
        
        const futurePopupContent = `
            <div class="popup-content">
                <h4>Upcoming Pilot Site</h4>
                <p>Netherlands - Scheduled for Q3 2025</p>
            </div>
        `;
        
        netherlandsMarker.bindPopup(futurePopupContent, {
            className: 'map-popup'
        });
    }

    // Partnership Section Interactions
    const journeyMilestones = document.querySelectorAll('.journey-milestone');
    const partnershipCards = document.querySelectorAll('.partnership-card');
    const navButtons = document.querySelectorAll('.nav-button');

    // Function to activate a partnership card
    function activatePartnershipCard(cardId) {
        // Hide all cards
        partnershipCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Show the selected card
        const selectedCard = document.querySelector(`.partnership-card[data-card="${cardId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('active');
        }
        
        // Update milestone active states
        journeyMilestones.forEach(milestone => {
            if (milestone.getAttribute('data-milestone') === cardId) {
                milestone.classList.add('active');
            } else {
                milestone.classList.remove('active');
            }
        });
        
        // Update navigation active states
        navButtons.forEach(button => {
            if (button.getAttribute('data-target') === cardId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Add click events to milestones
    journeyMilestones.forEach(milestone => {
        milestone.addEventListener('click', () => {
            const cardId = milestone.getAttribute('data-milestone');
            activatePartnershipCard(cardId);
        });
    });

    // Add click events to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cardId = button.getAttribute('data-target');
            activatePartnershipCard(cardId);
        });
    });

    // Animate funding bar on scroll
    const fundingBar = document.querySelector('.funding-bar');
    if (fundingBar) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ensure the width is set after the element is visible
                    setTimeout(() => {
                        fundingBar.style.width = fundingBar.style.width || '15%';
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(fundingBar);
    }
});

// Team Section Accordion
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    // Initialize first item as active
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
    }
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Close all items
            accordionItems.forEach(accItem => {
                if (accItem !== item) {
                    accItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});