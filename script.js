/**
 * Cybersecurity Explorer - Professional GSAP Orchestration
 */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initGSAPAnimations();
    initParticles();
    initCollapsibles();
    initSmoothScrolling();
    initMagneticButtons();
    initTextDecodeEffect();
});

/**
 * High-End Text Decoding Effect (Hacker Style)
 */
function initTextDecodeEffect() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const decodeElements = document.querySelectorAll('.glitch, .sub-hero h1, .intro h2');

    decodeElements.forEach(el => {
        el.addEventListener('mouseenter', event => {
            let iteration = 0;
            const originalText = event.target.dataset.text || event.target.innerText;
            
            const interval = setInterval(() => {
                event.target.innerText = originalText
                    .split("")
                    .map((letter, index) => {
                        if(index < iteration) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * 42)];
                    })
                    .join("");
                
                if(iteration >= originalText.length){ 
                    clearInterval(interval);
                }
                
                iteration += 1 / 3;
            }, 30);
        });
    });
}

/**
 * Magnetic Button Interaction
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.hero-button, .cta-button, .form-button');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            gsap.to(btn, {
                duration: 0.3,
                x: x * 0.3,
                y: y * 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.3,
                x: 0,
                y: 0,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

/**
 * Navigation & Header
 */
function initNavigation() {
    const header = document.querySelector('.site-header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.backgroundColor = 'rgba(5, 5, 5, 0.95)';
            header.style.borderBottom = '1px solid var(--accent-cyan)';
        } else {
            header.style.padding = '1rem 0';
            header.style.backgroundColor = 'rgba(5, 5, 5, 0.8)';
            header.style.borderBottom = '1px solid var(--glass-border)';
        }
    });

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                gsap.from('.nav-menu li', {
                    x: 100,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "power4.out"
                });
            }
        });
    }
}

/**
 * Core GSAP Animations
 */
function initGSAPAnimations() {
    // Hero Content
    gsap.from('.hero-content h2', {
        duration: 1.5,
        y: 100,
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        opacity: 0,
        ease: "power4.out",
        delay: 0.5
    });

    gsap.from('.hero-content p, .hero-button', {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1
    });

    // Content Reveal (All sections)
    const revealItems = document.querySelectorAll('section, .content-card, .bento-item');
    revealItems.forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: "power2.out"
        });
    });

    // Terminal Line Typing Simulation
    const terminalLines = document.querySelectorAll('.terminal-line');
    terminalLines.forEach(line => {
        gsap.from(line, {
            scrollTrigger: {
                trigger: line,
                start: "top 95%"
            },
            width: 0,
            duration: 1.5,
            ease: "steps(40)",
            overflow: "hidden",
            whiteSpace: "nowrap"
        });
    });
}

function initParticles() {
    const container = document.querySelector('.particles');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        container.appendChild(particle);
        
        const size = Math.random() * 2 + 1;
        gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            width: size,
            height: size,
            opacity: Math.random() * 0.5
        });

        animateParticle(particle);
    }
}

function animateParticle(el) {
    gsap.to(el, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        duration: Math.random() * 20 + 20,
        ease: "none",
        onComplete: () => animateParticle(el)
    });
}

function initCollapsibles() {
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.classList.contains('active')) {
                gsap.to(content, { height: 0, opacity: 0, duration: 0.3, onComplete: () => content.classList.remove('active') });
            } else {
                content.classList.add('active');
                gsap.fromTo(content, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" });
            }
        });
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: 100 }, ease: "power3.inOut" });
            }
        });
    });
}
