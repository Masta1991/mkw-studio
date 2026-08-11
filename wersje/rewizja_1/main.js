document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    initContent();
    initCursorSpotlight();
    // initHeroSlider() — disabled: hero is now a chalkboard, not photo slider
    initTypewriter();   // <-- chalk writing animation
    initAnimations();
    initAccordion();

    // 1. Initialize Content from site_content.js
    function initContent() {
        // Hero
        document.getElementById('hero-title').innerText = SITE_CONTENT.hero.title;
        document.getElementById('hero-subtitle').innerText = SITE_CONTENT.hero.subtitle;
        document.getElementById('hero-primary-cta').innerText = SITE_CONTENT.hero.primaryCTA;
        document.getElementById('hero-secondary-cta').innerText = SITE_CONTENT.hero.secondaryCTA;

        // About
        document.getElementById('about-title').innerText = SITE_CONTENT.about.title;
        document.getElementById('about-body').innerHTML = SITE_CONTENT.about.body;
        document.querySelector('.signature').innerText = SITE_CONTENT.about.signature;

        // Portfolio
        const portfolioGrid = document.getElementById('portfolio-grid');
        if (portfolioGrid) {
            portfolioGrid.innerHTML = SITE_CONTENT.portfolio.map(project => `
                <div class="portfolio-card reveal">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="card-overlay">
                        <div class="btn-more">ZOBACZ WIĘCEJ</div>
                    </div>
                    <div class="card-info">
                        <span>${project.category}</span>
                        <h3>${project.title}</h3>
                    </div>
                </div>
            `).join('');
        }

        // Process
        const accordion = document.getElementById('process-accordion');
        if (accordion) {
            accordion.innerHTML = SITE_CONTENT.process.map(step => `
                <div class="accordion-item">
                    <div class="accordion-header">
                        <span class="step-num">0${step.id}</span>
                        <h3>${step.title}</h3>
                        <span class="accordion-icon">+</span>
                    </div>
                    <div class="accordion-content">
                        <div class="content-inner">
                            <p>${step.content}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // 2. Cursor Spotlight Tracking
    function initCursorSpotlight() {
        const spotlight = document.getElementById('cursor-spotlight');
        
        window.addEventListener('mousemove', (e) => {
            gsap.to(spotlight, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        });

        // Increase size on hoverable elements
        const hoverables = document.querySelectorAll('a, button, .accordion-header, .portfolio-card');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(spotlight, { width: 400, height: 400, duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(spotlight, { width: 300, height: 300, duration: 0.3 });
            });
        });
    }

    // 3. Hero Background Crossfade
    function initHeroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        let currentSlide = 0;

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // 4. GSAP ScrollTrigger Animations
    function initAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach((el, i) => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power4.out",
                delay: i % 3 * 0.1 // Stagger effect
            });
        });

        // Special animation for About Image
        gsap.from('#about-img', {
            scrollTrigger: {
                trigger: '#about-img',
                start: "top 80%",
                scrub: 1
            },
            scale: 1.2,
            duration: 2
        });
    }

    // 5. Typewriter / Chalk Writing Effect for Hero H1
    function initTypewriter() {
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');
        const heroActions = document.querySelector('.hero-actions');

        if (!heroTitle) return;

        const fullText = SITE_CONTENT.hero.title;

        // Hide subtitle and buttons initially
        if (heroSubtitle) gsap.set(heroSubtitle, { opacity: 0, y: 20 });
        if (heroActions) gsap.set(heroActions, { opacity: 0, y: 20 });

        // Clear the element and start fresh
        heroTitle.innerHTML = '';
        heroTitle.style.opacity = '1';

        let charIndex = 0;
        const chars = fullText.split('');

        function typeNextChar() {
            if (charIndex < chars.length) {
                // Handle manual line breaks
                if (chars[charIndex] === '\n' || chars[charIndex] === '|') {
                    const br = document.createElement('br');
                    heroTitle.appendChild(br);
                    charIndex++;
                    setTimeout(typeNextChar, 200); 
                    return;
                }

                const span = document.createElement('span');
                span.innerText = chars[charIndex];
                span.style.display = 'inline-block';
                span.style.whiteSpace = 'pre'; // Preserve spaces
                heroTitle.appendChild(span);
                
                // Manual writing effect: slight fade-in and sharpening
                gsap.fromTo(span, 
                    { opacity: 0, filter: 'blur(4px)', scale: 1.1 }, 
                    { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.3, ease: 'power2.out' }
                );

                charIndex++;

                // Slower typing (base ~65ms) with high jitter for "handwriting" feel
                let delay = 65 + Math.random() * 80;
                
                // Longer pauses for punctuation
                if (['.', ',', '!', '?'].includes(chars[charIndex - 1])) {
                    delay += 250;
                }

                setTimeout(typeNextChar, delay);
            } else {
                // Typing done — animate in subtitle and buttons
                gsap.to(heroSubtitle, { opacity: 1, y: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' });
                gsap.to(heroActions, { opacity: 1, y: 0, duration: 1.2, delay: 0.9, ease: 'power3.out' });
            }
        }

        // Small initial delay before starting
        setTimeout(typeNextChar, 800);
    }

    // 6. Accordion Logic
    function initAccordion() {
        const items = document.querySelectorAll('.accordion-item');
        
        items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all
                items.forEach(i => i.classList.remove('active'));
                
                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
        
        // Open first by default
        if (items.length > 0) items[0].classList.add('active');
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
