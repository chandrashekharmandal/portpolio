/* ============================================
   CHANDRASHEKHAR MANDAL - PORTFOLIO SCRIPTS
   Futuristic Backend & AI/Data Engineer Portfolio
   ============================================ */

// ==========================================
// PARTICLE SYSTEM
// ==========================================
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const density = Math.min(80, Math.floor((this.canvas.width * this.canvas.height) / 15000));
        for (let i = 0; i < density; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.5 ? '0, 240, 255' : '123, 47, 247'
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((p, i) => {
            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Bounce
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Mouse interaction
            if (this.mouse.x !== null) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < this.mouse.radius) {
                    const force = (this.mouse.radius - dist) / this.mouse.radius;
                    p.x -= dx * force * 0.02;
                    p.y -= dy * force * 0.02;
                }
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
            this.ctx.fill();

            // Connect nearby particles
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - dist / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================
// TYPING EFFECT
// ==========================================
class TypeWriter {
    constructor(element, words, wait = 2000) {
        this.element = element;
        this.words = words;
        this.wait = wait;
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.textContent = this.txt;

        let typeSpeed = 80;

        if (this.isDeleting) {
            typeSpeed = 40;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ==========================================
// CUSTOM CURSOR
// ==========================================
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor-glow');
        if (!this.cursor) return;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
        });

        // Grow cursor on hover of interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .glass-card, .project-card, .skill-category');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(2)';
                this.cursor.style.borderColor = 'rgba(0, 240, 255, 0.5)';
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.borderColor = 'var(--primary)';
            });
        });
    }
}

// ==========================================
// NAVBAR
// ==========================================
class Navbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.getElementById('navLinks');
        this.links = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });

        // Hamburger toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.hamburger.classList.toggle('active');
                this.navLinks.classList.toggle('active');
            });
        }

        // Close menu on link click
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navLinks.classList.remove('active');
            });
        });

        // Active link on scroll
        window.addEventListener('scroll', () => this.highlightActiveLink());
    }

    highlightActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                this.links.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = '#00f0ff';
                    }
                });
            }
        });
    }
}

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================
class ScrollReveal {
    constructor() {
        this.init();
    }

    init() {
        const revealElements = document.querySelectorAll(
            '.about-grid, .timeline-item, .project-card, .skill-category, .education-card, .contact-wrapper, .section-title'
        );

        revealElements.forEach(el => {
            el.classList.add('reveal');
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }
}

// ==========================================
// SKILL BAR ANIMATION
// ==========================================
class SkillBars {
    constructor() {
        this.init();
    }

    init() {
        const skillBars = document.querySelectorAll('.skill-progress');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');
                    bar.style.setProperty('--target-width', width + '%');
                    bar.classList.add('animate');
                }
            });
        }, { threshold: 0.3 });

        skillBars.forEach(bar => observer.observe(bar));
    }
}

// ==========================================
// COUNTER ANIMATION
// ==========================================
class CounterAnimation {
    constructor() {
        this.init();
    }

    init() {
        const counters = document.querySelectorAll('.stat-number');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    this.animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 30);
    }
}

// ==========================================
// TERMINAL TYPING ANIMATION
// ==========================================
class TerminalAnimation {
    constructor() {
        this.terminal = document.getElementById('terminal-body');
        if (!this.terminal) return;
        this.init();
    }

    init() {
        // Terminal is already rendered in HTML.
        // Add a blinking cursor at end
        const cursor = document.createElement('span');
        cursor.className = 'terminal-prompt';
        cursor.innerHTML = '<br><br>$ <span class="blink">_</span>';
        this.terminal.appendChild(cursor);
    }
}

// ==========================================
// CONTACT FORM (Web3Forms API)
// ==========================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;
        this.init();
    }

    init() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = this.form.querySelector('button[type="submit"]');
            const statusEl = document.getElementById('form-status');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';
            btn.disabled = true;
            statusEl.textContent = '';
            statusEl.className = 'form-status';

            try {
                const formData = new FormData(this.form);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    btn.innerHTML = '<span class="btn-text">Message Sent! ✅</span><span class="btn-icon"><i class="fas fa-check"></i></span>';
                    btn.style.background = 'linear-gradient(135deg, #28ca41, #00f0ff)';
                    statusEl.textContent = '🎉 Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
                    statusEl.classList.add('success');
                    this.form.reset();
                } else {
                    throw new Error(result.message || 'Something went wrong');
                }
            } catch (error) {
                btn.innerHTML = '<span class="btn-text">Failed to Send ❌</span><span class="btn-icon"><i class="fas fa-times"></i></span>';
                btn.style.background = 'linear-gradient(135deg, #ff006e, #ff5555)';
                statusEl.textContent = '⚠️ Oops! Could not send your message. Please email me directly at csramdev@gmail.com';
                statusEl.classList.add('error');
                console.error('Form error:', error);
            }

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 4000);
        });
    }
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const position = target.offsetTop - offset;
                    window.scrollTo({
                        top: position,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ==========================================
// BACKGROUND GRID EFFECT (Subtle)
// ==========================================
class HexGrid {
    constructor() {
        // Add a subtle grid overlay to the body
        const grid = document.createElement('div');
        grid.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            background-image: 
                linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
            background-size: 60px 60px;
        `;
        document.body.prepend(grid);
    }
}

// ==========================================
// TILT EFFECT ON CARDS
// ==========================================
class TiltEffect {
    constructor() {
        this.cards = document.querySelectorAll('.project-card, .skill-category');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
}

// ==========================================
// INITIALIZE EVERYTHING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ParticleSystem();
    new CustomCursor();
    new Navbar();
    new ScrollReveal();
    new SkillBars();
    new CounterAnimation();
    new TerminalAnimation();
    new ContactForm();
    new SmoothScroll();
    new HexGrid();
    new TiltEffect();

    // Initialize Typing Effect
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new TypeWriter(typedElement, [
            'BACKEND ENGINEER',
            'DATA ENGINEER',
            'AI/ML ENGINEER',
            'CLOUD ARCHITECT',
            'PIPELINE BUILDER'
        ], 2000);
    }

    // Hide loader after content loads
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => loader.classList.add('hidden'), 1000);
    }

    console.log('%c🚀 Portfolio loaded successfully!', 'color: #00f0ff; font-size: 16px; font-weight: bold;');
    console.log('%cDesigned & Built by Chandrashekhar Mandal', 'color: #7b2ff7; font-size: 12px;');
});
