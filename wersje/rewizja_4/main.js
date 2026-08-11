document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    initContent();
    initCursorSpotlight();
    // initHeroSlider() — disabled: hero is now a chalkboard, not photo slider
    initTypewriter();   // <-- chalk writing animation
    initAnimations();
    initAccordion();
    initNavbar();

    // 1. Initialize Content from site_content.js
    function initContent() {
        // Hero
        document.getElementById('hero-title').innerText = SITE_CONTENT.hero.title;
        document.getElementById('hero-subtitle').innerText = SITE_CONTENT.hero.subtitle;
        document.getElementById('hero-primary-cta').innerText = SITE_CONTENT.hero.primaryCTA;
        document.getElementById('hero-secondary-cta').innerText = SITE_CONTENT.hero.secondaryCTA;

        // About - Static content in HTML now

        // Portfolio Slider
        const portfolioTrack = document.getElementById('portfolio-track');
        if (portfolioTrack) {
            portfolioTrack.innerHTML = SITE_CONTENT.portfolio.map(project => `
                <div class="portfolio-item">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="portfolio-item-overlay">
                        <div class="portfolio-item-content">
                            <div class="portfolio-info">
                                <span>${project.category}</span>
                                <h3>${project.title}</h3>
                            </div>
                            <div class="btn-ghost portfolio-item-btn">ZOBACZ REALIZACJĘ</div>
                        </div>
                    </div>
                </div>
            `).join('');
            
            initPortfolioSlider();
        }

        // Process (Offer)

        // Offer
        const accordion = document.getElementById('process-accordion');
        if (accordion) {
            accordion.innerHTML = SITE_CONTENT.offer.map(step => `
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
        
        // Clear and pre-render all characters with opacity 0 to reserve space
        heroTitle.innerHTML = '';
        heroTitle.style.opacity = '1';
        
        const chars = fullText.split('');
        const spans = [];

        chars.forEach(char => {
            if (char === '\n' || char === '|') {
                heroTitle.appendChild(document.createElement('br'));
            } else {
                const span = document.createElement('span');
                span.innerText = char;
                span.style.display = 'inline-block';
                span.style.whiteSpace = 'pre';
                span.style.opacity = '0';
                heroTitle.appendChild(span);
                spans.push(span);
            }
        });

        // Hide subtitle and buttons initially
        if (heroSubtitle) gsap.set(heroSubtitle, { opacity: 0, y: 20 });
        if (heroActions) gsap.set(heroActions, { opacity: 0, y: 20 });

        let charIndex = 0;
        function revealNextChar() {
            if (charIndex < spans.length) {
                gsap.fromTo(spans[charIndex], 
                    { opacity: 0, filter: 'blur(4px)', scale: 1.1 }, 
                    { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.3, ease: 'power2.out' }
                );
                
                charIndex++;
                
                let delay = 60 + Math.random() * 70;
                if (['.', ',', '!', '?'].includes(chars[charIndex - 1])) delay += 200;
                
                setTimeout(revealNextChar, delay);
            } else {
                // Typing done
                gsap.to(heroSubtitle, { opacity: 1, y: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' });
                gsap.to(heroActions, { opacity: 1, y: 0, duration: 1.2, delay: 0.9, ease: 'power3.out' });
                
                const heroSection = document.getElementById('hero');
                if (heroSection) heroSection.classList.add('hero-revealed');
            }
        }

        setTimeout(revealNextChar, 1000);
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
        
        if (items.length > 0) items[0].classList.add('active');
    }

    // 7. Navbar Scroll Effect
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 8. Portfolio Slider Logic
    function initPortfolioSlider() {
        const track = document.getElementById('portfolio-track');
        const prevBtn = document.getElementById('portfolio-prev');
        const nextBtn = document.getElementById('portfolio-next');
        const items = document.querySelectorAll('.portfolio-item');
        
        if (!track || items.length === 0) return;

        let currentIndex = 0;
        const totalItems = items.length;

        function updateSlider() {
            const itemWidth = items[0].offsetWidth + 40; // width + gap
            const moveAmount = currentIndex * itemWidth;
            track.style.transform = `translateX(-${moveAmount}px)`;
            
            // Disable buttons at ends
            if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
            if (nextBtn) nextBtn.style.opacity = currentIndex >= totalItems - 1 ? '0.3' : '1';
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < totalItems - 1) {
                    currentIndex++;
                    updateSlider();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            });
        }

        // Initial state
        updateSlider();
        
        // Update on resize
        window.addEventListener('resize', updateSlider);
    }

    // 9. Scroll Reveal Logic
    function initReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Once revealed, we can stop observing
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // Initialize all
    initTypewriter();
    initPortfolio();
    initAccordion();
    initNavbar();
    initPortfolioSlider();
    initReveal();

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for navbar
                    behavior: 'smooth'
                });
            }
        });
    });
});
