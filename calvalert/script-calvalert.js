// CalvAlert Landing Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Remove page transition after load
    setTimeout(() => {
        const transition = document.querySelector('.page-transition');
        if (transition) {
            transition.style.display = 'none';
        }
    }, 3000);
    
    // Scroll Progress Bar
    const scrollProgress = () => {
        const scrollBar = document.querySelector('.scroll-progress-bar');
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollBar.style.width = `${progress}%`;
    };
    
    window.addEventListener('scroll', scrollProgress);
    
    // Navigation scroll effect
    const nav = document.querySelector('.calvalert-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Animate hero stats
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Animate the new hero statement number
    const statementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bigNumber = entry.target.querySelector('.big-number');
                if (bigNumber) {
                    const value = parseInt(bigNumber.getAttribute('data-value'));
                    animateValue(bigNumber, 0, value, 2000);
                    statementObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });

    const heroStatement = document.querySelector('.hero-statement');
    if (heroStatement) {
        statementObserver.observe(heroStatement);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stats
                if (entry.target.classList.contains('hero-stats')) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const value = parseInt(stat.getAttribute('data-value'));
                        animateValue(stat, 0, value, 2000);
                    });
                    observer.unobserve(entry.target);
                }
                
                // Add visible class for fade-in animations
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.hero-stats, .crisis-card, .feature-card, .timeline-item').forEach(el => {
        observer.observe(el);
    });
    
    // Smooth scroll for anchor links
    document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
        document.querySelector('.how-it-works').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Demo navigation
    const demoSteps = document.querySelectorAll('.demo-step');
    const demoNavs = document.querySelectorAll('.demo-nav');
    let currentStep = 1;
    let demoInterval;
    
    const showStep = (step) => {
        demoSteps.forEach(s => s.classList.remove('active'));
        demoNavs.forEach(n => n.classList.remove('active'));
        
        document.querySelector(`.demo-step[data-step="${step}"]`).classList.add('active');
        document.querySelector(`.demo-nav[data-target="${step}"]`).classList.add('active');
        
        currentStep = step;
    };
    
    // Auto-advance demo with custom timing
    const startDemoLoop = () => {
        const advanceStep = () => {
            // Clear existing interval
            clearInterval(demoInterval);
            
            // Move to next step
            currentStep = currentStep >= 3 ? 1 : currentStep + 1;
            showStep(currentStep);
            
            // Set different duration based on current step
            let duration;
            if (currentStep === 2) {
                duration = 5000; // 5 seconds for AI Analysis step
            } else {
                duration = 3000; // 3 seconds for other steps
            }
            
            // Set new interval with appropriate duration
            demoInterval = setInterval(advanceStep, duration);
        };
        
        // Start with initial delay
        demoInterval = setInterval(advanceStep, 3000);
    };
    
    // Manual demo navigation
    demoNavs.forEach(nav => {
        nav.addEventListener('click', () => {
            clearInterval(demoInterval);
            showStep(parseInt(nav.getAttribute('data-target')));
            startDemoLoop();
        });
    });
    
    // Start demo when visible
    const demoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startDemoLoop();
                demoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const demoContainer = document.querySelector('.demo-container');
    if (demoContainer) {
        demoObserver.observe(demoContainer);
    }
    
    // Animate counters when in view
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    };

    // Update the expandable button functionality
    const setupExpandable = (buttonId, contentId) => {
        const button = document.getElementById(buttonId);
        const content = document.getElementById(contentId);
        
        if (button && content) {
            button.addEventListener('click', () => {
                button.classList.toggle('active');
                content.classList.toggle('active');
                
                const btnText = button.querySelector('.btn-text');
                if (btnText) {
                    if (button.classList.contains('active')) {
                        btnText.textContent = 'Show less';
                    } else {
                        btnText.textContent = 'Discover why current solutions fail';
                    }
                } else {
                    // Fallback for solution section
                    const span = button.querySelector('span');
                    if (button.classList.contains('active')) {
                        span.textContent = 'Show Less Features';
                    } else {
                        span.textContent = 'Explore All Features';
                    }
                }
            });
        }
    };
    
    setupExpandable('problemExpand', 'problemContent');

    const setupSolutionSection = () => {
        // Preview cards hover interaction
        const previewCards = document.querySelectorAll('.preview-card');
        
        previewCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                previewCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });
        
        // Expandable content
        const expandBtn = document.getElementById('solutionExpand');
        const expandContent = document.getElementById('solutionContent');
        
        if (expandBtn && expandContent) {
            expandBtn.addEventListener('click', () => {
                expandBtn.classList.toggle('active');
                expandContent.classList.toggle('active');
                
                const btnText = expandBtn.querySelector('.btn-text');
                if (expandBtn.classList.contains('active')) {
                    btnText.textContent = 'Show less';
                } else {
                    btnText.textContent = 'Discover Key Features & Advantages';
                }
            });
        }
        
        // Animate advantages on reveal
        const advantagesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.advantage-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        card.style.transition = 'all 0.6s ease';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    
                    advantagesObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        const advantagesGrid = document.querySelector('.advantages-grid');
        if (advantagesGrid) {
            advantagesObserver.observe(advantagesGrid);
        }
        
        // Add floating animation to orbit items on scroll
        const orbitItems = document.querySelectorAll('.orbit-item');
        let scrollY = window.scrollY;
        
        const floatOrbitItems = () => {
            const newScrollY = window.scrollY;
            const diff = newScrollY - scrollY;
            
            orbitItems.forEach((item, index) => {
                const speed = 0.1 + (index * 0.05);
                const yOffset = diff * speed;
                item.style.transform = `translateY(${yOffset}px) translateX(var(--translate-x, 0))`;
            });
            
            scrollY = newScrollY;
        };
        
        // Throttle scroll events
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    floatOrbitItems();
                    ticking = false;
                });
                ticking = true;
            }
        });
    };

    // Call this function in your DOMContentLoaded
    setupSolutionSection();
    
    // Initialize Interactive Map with Satellite View
    const initInteractiveMap = () => {
        const mapElement = document.getElementById('pilotMap');
        if (!mapElement) return;
        
        // Cyprus coordinates (Orounta, Nicosia)
        const cyprusCoords = [35.0334, 33.2743];
        // Netherlands coordinates (Dairy Campus Wageningen)
        const netherlandsCoords = [51.9851, 5.6654];
        
        // Calculate center between both points
        const centerLat = (cyprusCoords[0] + netherlandsCoords[0]) / 2;
        const centerLng = (cyprusCoords[1] + netherlandsCoords[1]) / 2;
        
        // Create map with satellite view
        const map = L.map('pilotMap', {
            center: [centerLat, centerLng],
            zoom: 5,
            scrollWheelZoom: false,
            zoomControl: true
        });
        
        // Add Satellite tile layer
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri',
            maxZoom: 18
        }).addTo(map);
        
        // Add street labels overlay
        L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png', {
            attribution: '',
            subdomains: 'abcd',
            opacity: 0.8
        }).addTo(map);
        
        // Custom HTML markers
        const createCustomMarker = (color, icon, className) => {
            return L.divIcon({
                className: 'custom-map-marker',
                html: `
                    <div class="marker-inner ${className}">
                        <i class="${icon} marker-icon"></i>
                    </div>
                    <div class="marker-pulse ${className}"></div>
                `,
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                popupAnchor: [0, -25]
            });
        };
        
        // Add Cyprus marker
        const cyprusMarker = L.marker(cyprusCoords, {
            icon: createCustomMarker('#b349e7', 'fas fa-cow', 'cyprus')
        }).addTo(map);
        
        cyprusMarker.bindPopup(`
            <div style="text-align: center; padding: 10px;">
                <strong style="color: #b349e7; font-size: 16px;">Cyprus Pilot Farm</strong><br>
                <span style="color: #666;">Nicosia, Cyprus</span><br>
                <p style="margin: 10px 0 0 0; color: #333;">Active installation in a farm with 200+ dairy cows</p>
            </div>
        `, { maxWidth: 250 });
        
        // Add Netherlands marker
        const netherlandsMarker = L.marker(netherlandsCoords, {
            icon: createCustomMarker('#b349e7', 'fas fa-microscope', 'netherlands')
        }).addTo(map);
        
        netherlandsMarker.bindPopup(`
            <div style="text-align: center; padding: 10px;">
                <strong style="color: #b349e7; font-size: 16px;">Dairy Campus Farm</strong><br>
                <span style="color: #666;">Wageningen, Netherlands</span><br>
                <p style="margin: 10px 0 0 0; color: #333;">Collaborating with one of Europe's leading dairy research facilities for technology validation</p>
            </div>
        `, { maxWidth: 250 });
        
        // Draw animated connection line
        const drawConnectionLine = () => {
            const svg = document.getElementById('connectionSvg');
            if (!svg) return;
            
            // Convert coordinates to pixel positions
            const point1 = map.latLngToContainerPoint(cyprusCoords);
            const point2 = map.latLngToContainerPoint(netherlandsCoords);
            
            // Create curved path
            const midX = (point1.x + point2.x) / 2;
            const midY = (point1.y + point2.y) / 2 - 100; // Curve upward
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M ${point1.x} ${point1.y} Q ${midX} ${midY} ${point2.x} ${point2.y}`);
            path.setAttribute('class', 'connection-line');
            
            // Clear previous paths and add new one
            while (svg.lastChild && svg.lastChild.tagName !== 'defs') {
                svg.removeChild(svg.lastChild);
            }
            svg.appendChild(path);
            
            // Animate dots along the path
            for (let i = 0; i < 3; i++) {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('r', '4');
                circle.setAttribute('fill', '#b349e7');
                circle.style.opacity = '0.8';
                
                const animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
                animateMotion.setAttribute('dur', '5s');
                animateMotion.setAttribute('repeatCount', 'indefinite');
                animateMotion.setAttribute('begin', `${i * 1.67}s`);
                
                const mpath = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
                mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#connectionPath');
                
                path.setAttribute('id', 'connectionPath');
                animateMotion.appendChild(mpath);
                circle.appendChild(animateMotion);
                svg.appendChild(circle);
            }
        };
        
        // Initial draw
        setTimeout(drawConnectionLine, 500);
        
        // Redraw on map move
        map.on('move zoom', drawConnectionLine);
        
        // Fit map to show both markers
        const group = new L.featureGroup([cyprusMarker, netherlandsMarker]);
        map.fitBounds(group.getBounds().pad(0.3));
        
        // Open popups on hover
        cyprusMarker.on('mouseover', function() { this.openPopup(); });
        cyprusMarker.on('mouseout', function() { this.closePopup(); });
        netherlandsMarker.on('mouseover', function() { this.openPopup(); });
        netherlandsMarker.on('mouseout', function() { this.closePopup(); });
        
        // Add custom CSS for map markers
        const style = document.createElement('style');
        style.textContent = `
            .custom-map-marker {
                background: transparent !important;
                border: none !important;
            }
            
            .marker-pulse {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                animation: mapMarkerPulse 2s ease-out infinite;
            }
            
            .marker-pulse.cyprus {
                border: 2px solid #b349e7;
            }
            
            .marker-pulse.netherlands {
                border: 2px solid #b349e7;
            }
            
            @keyframes mapMarkerPulse {
                0% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(2.5);
                    opacity: 0;
                }
            }
            
            .leaflet-popup-content-wrapper {
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            }
            
            .leaflet-popup-tip {
                box-shadow: none;
            }
        `;
        document.head.appendChild(style);
    };

    // Animate validation metrics
    const animateMetrics = () => {
        const metrics = document.querySelectorAll('.metric-card .counter');
        
        const metricObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    metricObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        metrics.forEach(metric => metricObserver.observe(metric));
    };

    // Initialize gallery interactions
    const initGallery = () => {
        // Add hover effects for journey cards
        const journeyCards = document.querySelectorAll('.journey-card');
        
        journeyCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1)';
            });
        });
        
        // Smooth scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease';
            scrollObserver.observe(el);
        });
    };

    const validationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(initInteractiveMap, 100);
                animateMetrics();
                initGallery();
                validationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const validationSection = document.querySelector('.validation-journey');
    if (validationSection) {
        validationObserver.observe(validationSection);
    }
    
    // Form handling
    const form = document.getElementById('contactForm');
    if (form) {
        // Remove the preventDefault since we're using FormSubmit
        // Just add validation
        form.addEventListener('submit', (e) => {
            // Get form data
            const formData = new FormData(form);
            
            // Check if at least one interest is selected
            const checkboxes = form.querySelectorAll('input[name="interest"]:checked');
            if (checkboxes.length === 0) {
                e.preventDefault();
                alert('Please select at least one area of interest.');
                return false;
            }
            
            // Show loading state
            const button = form.querySelector('.submit-btn');
            const originalContent = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
            button.disabled = true;
        });
        
        // Add input animations
        const inputs = form.querySelectorAll('input:not([type="checkbox"]), textarea');
        inputs.forEach(input => {
            // Add focus animations
            input.addEventListener('focus', () => {
                const wrapper = input.closest('.input-wrapper');
                if (wrapper) {
                    wrapper.classList.add('focused');
                }
            });
            
            input.addEventListener('blur', () => {
                const wrapper = input.closest('.input-wrapper');
                if (wrapper && !input.value) {
                    wrapper.classList.remove('focused');
                }
            });
        });
        
        // Animate form elements on scroll
        const formObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const formGroups = entry.target.querySelectorAll('.form-group');
                    formGroups.forEach((group, index) => {
                        setTimeout(() => {
                            group.style.opacity = '1';
                            group.style.transform = 'translateX(0)';
                        }, index * 100);
                    });
                    formObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        const formWrapper = document.querySelector('.form-wrapper');
        if (formWrapper) {
            formObserver.observe(formWrapper);
        }
    }
    
    // Parallax effect for background elements
    let ticking = false;
    const parallaxElements = document.querySelectorAll('.animated-cow, .animated-camera, .signal-waves');
    
    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    };
    
    const requestTick = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', requestTick);
    
    // Add entrance animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-title, .crisis-card, .feature-card, .timeline-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial setup for animated elements
    document.querySelectorAll('.section-title, .crisis-card, .feature-card, .timeline-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Mobile menu functionality (if needed)
    const handleMobileNav = () => {
        if (window.innerWidth <= 768) {
            // Add mobile-specific functionality here if needed
        }
    };
    
    window.addEventListener('resize', handleMobileNav);
    handleMobileNav();

    // Inside the existing DOMContentLoaded event listener, add:
    animateCounters();

    // Animate timeline points on scroll
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.approach-point, .impact-category').forEach(el => {
        timelineObserver.observe(el);
    });
});