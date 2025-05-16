// DOM Elements
const header = document.querySelector('header');
const navLinks = document.querySelector('.nav-links');
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const statNumbers = document.querySelectorAll('.stat-number');
const testimonials = document.querySelectorAll('.testimonial');
const prevButton = document.querySelector('.control.prev');
const nextButton = document.querySelector('.control.next');
const signupForm = document.getElementById('signup-form');
const mobileMenuToggle = document.createElement('div');

// Add mobile menu toggle
mobileMenuToggle.classList.add('mobile-menu-toggle');
mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav').appendChild(mobileMenuToggle);

// Create sticky CTA
const stickyCta = document.createElement('div');
stickyCta.classList.add('sticky-cta');
stickyCta.innerHTML = '<a href="#signup" class="btn primary-btn">Sign Up for Early Access</a>';
document.body.appendChild(stickyCta);

// Initialize variables
let currentTestimonial = 0;
let animationObserver;
let isScrolling = false;
let lastScrollPosition = 0;

// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleResize);
mobileMenuToggle.addEventListener('click', toggleMobileMenu);

if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => changeTestimonial(-1));
    nextButton.addEventListener('click', () => changeTestimonial(1));
}

if (signupForm) {
    signupForm.addEventListener('submit', handleFormSubmit);
}

// Functions
function initApp() {
    setupAnimationObserver();
    handleScroll();
    setupAutoTestimonialRotation();
    initParticles();
}

function handleScroll() {
    if (!isScrolling) {
        isScrolling = true;
        window.requestAnimationFrame(() => {
            const currentScrollPosition = window.scrollY;
            
            // Header scroll effect
            if (currentScrollPosition > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Sticky CTA display
            if (currentScrollPosition > 600) {
                stickyCta.classList.add('show');
            } else {
                stickyCta.classList.remove('show');
            }
            
            // Start counter animation when stats are in view
            if (!window.statsAnimated && isElementInViewport(document.querySelector('.stats-container'))) {
                animateStatNumbers();
                window.statsAnimated = true;
            }
            
            lastScrollPosition = currentScrollPosition;
            isScrolling = false;
        });
    }
}

function setupAnimationObserver() {
    animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

function animateStatNumbers() {
    statNumbers.forEach(statNumber => {
        const targetNumber = parseInt(statNumber.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / targetNumber));
        
        let current = 0;
        const timer = setInterval(() => {
            current += 1;
            statNumber.textContent = current;
            
            if (current >= targetNumber) {
                clearInterval(timer);
                statNumber.textContent = targetNumber;
            }
        }, stepTime);
    });
}

function setupAutoTestimonialRotation() {
    if (testimonials.length > 0) {
        setInterval(() => {
            changeTestimonial(1);
        }, 5000);
    }
}

function changeTestimonial(direction) {
    testimonials[currentTestimonial].classList.remove('active');
    
    currentTestimonial = (currentTestimonial + direction + testimonials.length) % testimonials.length;
    
    testimonials[currentTestimonial].classList.add('active');
}

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    
    const icon = mobileMenuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

function handleResize() {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.querySelector('i').classList.remove('fa-times');
        mobileMenuToggle.querySelector('i').classList.add('fa-bars');
    }
}

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#8511b4"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8511b4",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true,
            "config_demo": {
                "hide_card": false,
                "background_color": "#b61924",
                "background_image": "",
                "background_position": "50% 50%",
                "background_repeat": "no-repeat",
                "background_size": "cover"
            }
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Simple form validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const interestCheckboxes = document.querySelectorAll('input[name="interest"]:checked');
    
    if (!nameInput.value || !emailInput.value) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (interestCheckboxes.length === 0) {
        alert('Please select at least one area of interest.');
        return;
    }
    
    // Here you would normally send the form data to a server
    // For this demo, we'll just simulate success
    
    // Collect form data
    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        organization: document.getElementById('organization').value,
        interests: Array.from(interestCheckboxes).map(cb => cb.value),
        message: document.getElementById('message').value
    };
    
    console.log('Form submission data:', formData);
    
    // Show success message
    signupForm.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Thank You for Your Interest!</h3>
            <p>We've received your request and will be in touch soon.</p>
        </div>
    `;
}

// Utility function to check if an element is in the viewport
function isElementInViewport(el) {
    if (!el) return false;
    
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
} 