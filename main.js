/**
 * MKW Studio — Enhanced Architectural Interface (Rewizja 11)
 * Includes: Chatbot AI, Calculator, Stats Counter, Custom Cursor, Booking Modal
 */

document.addEventListener('DOMContentLoaded', () => {
    initPasswordGate();
    initHeaderScroll();
    initMobileNav();
    initPortfolioGrid();
    initBeforeAfterSlider();
    initOfferGrid();
    initCaseStudyModal();
    initAIBriefWizard();
    // New features
    initStatsCounter();
    initCalculator();
    initCustomCursor();
    initChatbot();
    initBookingModal();
    initScrollReveal();
});

/* --------------------------------------------------------------------------
   0. Password Gate (Hasło: mkw2026)
   -------------------------------------------------------------------------- */
function initPasswordGate() {
    const gate = document.getElementById('password-gate');
    const form = document.getElementById('password-form');
    const input = document.getElementById('gate-password-input');
    const errorMsg = document.getElementById('gate-error');

    if (!gate || !form || !input) return;

    if (sessionStorage.getItem('mkw_auth') === 'true') {
        gate.style.display = 'none';
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const entered = input.value.trim();
        if (entered === 'mkw2026') {
            sessionStorage.setItem('mkw_auth', 'true');
            gate.style.opacity = '0';
            setTimeout(() => {
                gate.style.display = 'none';
            }, 300);
        } else {
            if (errorMsg) errorMsg.style.display = 'block';
            input.value = '';
            input.focus();
        }
    });
}

/* --------------------------------------------------------------------------
   1. Header Scroll
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const toggle = document.getElementById('mobile-toggle');
    const drawer = document.getElementById('mobile-drawer');
    if (!toggle || !drawer) return;

    toggle.addEventListener('click', () => {
        drawer.classList.toggle('active');
    });

    const links = drawer.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            drawer.classList.remove('active');
        });
    });
}

/* --------------------------------------------------------------------------
   3. Realizacje / Portfolio Grid (Gaja Design 2-Column Look)
   -------------------------------------------------------------------------- */
function initPortfolioGrid() {
    const container = document.getElementById('realizacje-container');
    const filterTabs = document.querySelectorAll('.filter-tab');
    if (!container || typeof SITE_CONTENT === 'undefined' || !SITE_CONTENT.portfolio) return;

    function renderProjects(filter = 'all') {
        container.innerHTML = '';
        const filtered = filter === 'all' 
            ? SITE_CONTENT.portfolio 
            : SITE_CONTENT.portfolio.filter(p => p.filter === filter);

        filtered.forEach(project => {
            const card = document.createElement('div');
            card.className = 'realizacja-card';
            card.setAttribute('data-id', project.id);
            card.innerHTML = `
                <div class="realizacja-image-frame">
                    <img src="${project.image}" alt="${project.title}" class="realizacja-img" loading="lazy">
                </div>
                <div class="realizacja-info">
                    <h3 class="realizacja-title">${project.title}</h3>
                    <span class="realizacja-meta">${project.area} • ${project.location}</span>
                </div>
            `;
            
            card.addEventListener('click', () => {
                openProjectModal(project.id);
            });

            container.appendChild(card);
        });
    }

    // Initial render
    renderProjects('all');

    // Filter clicks
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const targetFilter = tab.getAttribute('data-filter');
            renderProjects(targetFilter);
        });
    });
}

/* --------------------------------------------------------------------------
   4. Metamorfoza Przed / Po (Interactive Slider)
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
    const slider = document.getElementById('before-after-slider');
    const afterLayer = document.getElementById('after-layer');
    const handle = document.getElementById('slider-handle');

    if (!slider || !afterLayer || !handle) return;

    let isDragging = false;

    function updateSlider(xPos) {
        const rect = slider.getBoundingClientRect();
        let x = xPos - rect.left;
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;

        const percent = (x / rect.width) * 100;
        afterLayer.style.width = `${percent}%`;
        handle.style.left = `${percent}%`;
    }

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateSlider(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch support
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });
}

/* --------------------------------------------------------------------------
   5. Oferta / Pakiety Grid
   -------------------------------------------------------------------------- */
function initOfferGrid() {
    const grid = document.getElementById('offer-grid');
    if (!grid || typeof SITE_CONTENT === 'undefined' || !SITE_CONTENT.offer) return;

    grid.innerHTML = '';
    SITE_CONTENT.offer.forEach((pkg, index) => {
        const card = document.createElement('div');
        card.className = `offer-clean-card ${pkg.featured ? 'featured' : ''}`;
        
        let deliverablesHtml = '';
        if (pkg.deliverables && pkg.deliverables.length > 0) {
            deliverablesHtml = pkg.deliverables.slice(0, 4).map(d => `<li>${d}</li>`).join('');
        }

        card.innerHTML = `
            <div>
                ${pkg.featured ? '<span class="featured-tag">NAJCZĘŚCIEJ WYBIERANY</span>' : ''}
                <span class="o-num">0${index + 1}</span>
                <h3 class="o-title">${pkg.title}</h3>
                <p class="o-desc">${pkg.desc}</p>
                <ul class="o-list">
                    ${deliverablesHtml}
                </ul>
            </div>
            <a href="#contact" class="o-btn">Wybierz pakiet</a>
        `;
        grid.appendChild(card);
    });
}

/* --------------------------------------------------------------------------
   6. Case Study Modal & Lightbox
   -------------------------------------------------------------------------- */
function initCaseStudyModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    if (lightbox && lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }
}

function openProjectModal(projectId) {
    if (typeof SITE_CONTENT === 'undefined' || !SITE_CONTENT.portfolio) return;
    const project = SITE_CONTENT.portfolio.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('project-modal');
    document.getElementById('modal-category').innerText = project.category || 'Realizacja';
    document.getElementById('modal-title').innerText = project.title;
    document.getElementById('modal-tagline').innerText = project.details?.tagline || `${project.area} • ${project.location}`;
    document.getElementById('modal-story').innerText = project.details?.story || '';

    // Specs
    const specsGrid = document.getElementById('modal-specs-grid');
    specsGrid.innerHTML = '';
    if (project.details?.specs) {
        project.details.specs.forEach(s => {
            const item = document.createElement('div');
            item.className = 'spec-item';
            item.innerHTML = `
                <span class="spec-label">${s.label}</span>
                <span class="spec-value">${s.value}</span>
            `;
            specsGrid.appendChild(item);
        });
    }

    // Gallery
    const galleryGrid = document.getElementById('modal-gallery');
    galleryGrid.innerHTML = '';
    const images = project.details?.gallery || [project.image];

    images.forEach((imgSrc, idx) => {
        const item = document.createElement('div');
        item.className = `modal-gallery-item ${idx === 0 ? 'full-width' : ''}`;
        item.innerHTML = `<img src="${imgSrc}" alt="${project.title} zdjęcie ${idx + 1}" class="modal-gallery-img" loading="lazy">`;
        
        item.addEventListener('click', () => {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-image');
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
        });

        galleryGrid.appendChild(item);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/* --------------------------------------------------------------------------
   7. AI Brief Assistant & Voice Dictation
   -------------------------------------------------------------------------- */
function initAIBriefWizard() {
    const trigger = document.getElementById('start-ai-wizard');
    const wizardBox = document.getElementById('ai-wizard-interface');
    const closeBtn = document.getElementById('ai-wizard-close');
    const nextBtn = document.getElementById('ai-next-btn');
    const stepInput = document.getElementById('ai-step-input');
    const stepNum = document.getElementById('ai-step-num');
    const progressBar = document.getElementById('ai-progress-bar');
    const qTitle = document.getElementById('ai-question-title');
    const messageField = document.getElementById('message');

    const voiceBtn = document.getElementById('ai-voice-btn');
    const voiceStatus = document.getElementById('ai-voice-status');
    const stopVoiceBtn = document.getElementById('ai-stop-voice');

    if (!trigger || !wizardBox) return;

    const questions = [
        { q: "Jaki jest metraż i lokalizacja Twojej inwestycji?", placeholder: "np. 85 m², Warszawa Wilanów, stan deweloperski" },
        { q: "Jaki styl najbardziej Ci odpowiada?", placeholder: "np. Japandi, ciepły minimalizm, naturalne drewno i kamień" },
        { q: "Kiedy planujesz rozpoczęcie prac wykończeniowych?", placeholder: "np. Za 2 miesiące / Odbiór kluczy w Q3 2026" },
        { q: "Jaki orientacyjny budżet przewidujesz na wykończenie?", placeholder: "np. 3 000 – 4 500 zł / m²" },
        { q: "Czy potrzebujesz pełnego nadzoru pod klucz?", placeholder: "np. Tak, zależy mi na kompleksowej koordynacji na budowie" }
    ];

    let currentStep = 0;
    let answers = [];

    trigger.addEventListener('click', () => {
        wizardBox.style.display = 'block';
        currentStep = 0;
        answers = [];
        loadStep(currentStep);
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            wizardBox.style.display = 'none';
        });
    }

    function loadStep(idx) {
        if (idx >= questions.length) {
            // Finished
            wizardBox.style.display = 'none';
            if (messageField) {
                const summary = `--- WYGENEROWANY BRIEF PROJEKTOWY MKW STUDIO ---\n` +
                    `1. Metraż i Lokalizacja: ${answers[0] || 'Nie podano'}\n` +
                    `2. Preferowany Styl: ${answers[1] || 'Nie podano'}\n` +
                    `3. Termin Rozpoczęcia: ${answers[2] || 'Nie podano'}\n` +
                    `4. Budżet Szacunkowy: ${answers[3] || 'Nie podano'}\n` +
                    `5. Nadzór pod Klucz: ${answers[4] || 'Nie podano'}\n` +
                    `---------------------------------------------`;
                messageField.value = summary;
                messageField.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        stepNum.innerText = idx + 1;
        progressBar.style.width = `${((idx + 1) / questions.length) * 100}%`;
        qTitle.innerText = questions[idx].q;
        stepInput.placeholder = questions[idx].placeholder;
        stepInput.value = '';
        stepInput.focus();
    }

    if (nextBtn && stepInput) {
        nextBtn.addEventListener('click', () => {
            answers[currentStep] = stepInput.value || 'Zgodnie z ustaleniami';
            currentStep++;
            loadStep(currentStep);
        });

        stepInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                nextBtn.click();
            }
        });
    }

    // Voice Dictation (Web Speech API)
    let recognition = null;
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRec();
        recognition.lang = 'pl-PL';
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            stepInput.value = transcript;
        };

        recognition.onend = () => {
            if (voiceStatus) voiceStatus.style.display = 'none';
        };
    }

    if (voiceBtn && recognition) {
        voiceBtn.addEventListener('click', () => {
            if (voiceStatus) voiceStatus.style.display = 'flex';
            recognition.start();
        });
    }

    if (stopVoiceBtn && recognition) {
        stopVoiceBtn.addEventListener('click', () => {
            recognition.stop();
            if (voiceStatus) voiceStatus.style.display = 'none';
        });
    }
}

/* ==========================================================================
   NEW FEATURES
   ========================================================================== */

/* --------------------------------------------------------------------------
   8. Animated Stats Counter (GSAP ScrollTrigger)
   -------------------------------------------------------------------------- */
function initStatsCounter() {
    const statItems = document.querySelectorAll('.stat-item');
    if (!statItems.length || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    statItems.forEach((item, index) => {
        const numEl = item.querySelector('.stat-number');
        const target = parseInt(item.dataset.target) || 0;

        ScrollTrigger.create({
            trigger: item,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                // Animate reveal
                setTimeout(() => {
                    item.classList.add('animated');
                }, index * 150);

                // Count up
                const duration = 2;
                const startTime = performance.now();
                
                function updateCount(currentTime) {
                    const elapsed = (currentTime - startTime) / 1000;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out quad
                    const eased = 1 - (1 - progress) * (1 - progress);
                    const current = Math.round(eased * target);
                    numEl.textContent = current;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    }
                }
                
                setTimeout(() => {
                    requestAnimationFrame(updateCount);
                }, index * 150 + 200);
            }
        });
    });
}

/* --------------------------------------------------------------------------
   9. Investment Calculator
   -------------------------------------------------------------------------- */
function initCalculator() {
    const areaSlider = document.getElementById('calc-area');
    const areaValue = document.getElementById('calc-area-value');
    const resultPrice = document.getElementById('calc-result-price');
    const resultTime = document.getElementById('calc-time');
    const resultPackage = document.getElementById('calc-package');
    const typePills = document.getElementById('calc-type-pills');
    const standardPills = document.getElementById('calc-standard-pills');

    if (!areaSlider || !resultPrice) return;

    let selectedType = 'apartment';
    let selectedStandard = 'premium';

    // Type pills
    if (typePills) {
        typePills.querySelectorAll('.calc-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                typePills.querySelectorAll('.calc-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                selectedType = pill.dataset.type;
                updateCalculation();
            });
        });
    }

    // Standard pills
    if (standardPills) {
        standardPills.querySelectorAll('.calc-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                standardPills.querySelectorAll('.calc-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                selectedStandard = pill.dataset.standard;
                updateCalculation();
            });
        });
    }

    // Area slider
    areaSlider.addEventListener('input', () => {
        areaValue.textContent = areaSlider.value;
        updateSliderTrack();
        updateCalculation();
    });

    // Checkboxes
    ['calc-concept', 'calc-3d', 'calc-exec', 'calc-supervision'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', updateCalculation);
    });

    function updateSliderTrack() {
        const min = parseInt(areaSlider.min);
        const max = parseInt(areaSlider.max);
        const val = parseInt(areaSlider.value);
        const percent = ((val - min) / (max - min)) * 100;
        areaSlider.style.background = `linear-gradient(to right, var(--accent-sage) ${percent}%, var(--bg-secondary) ${percent}%)`;
    }

    function updateCalculation() {
        const area = parseInt(areaSlider.value);
        const hasConcept = document.getElementById('calc-concept')?.checked;
        const has3D = document.getElementById('calc-3d')?.checked;
        const hasExec = document.getElementById('calc-exec')?.checked;
        const hasSupervision = document.getElementById('calc-supervision')?.checked;

        // Base price per m² based on type
        let basePerM2 = { apartment: 180, house: 200, commercial: 220 }[selectedType] || 180;
        
        // Standard multiplier
        let standardMult = { standard: 0.8, premium: 1.0, luxury: 1.5 }[selectedStandard] || 1.0;

        // Scope pricing
        let scopeTotal = 0;
        if (hasConcept) scopeTotal += area * basePerM2 * 0.4 * standardMult;
        if (has3D) scopeTotal += area * basePerM2 * 0.3 * standardMult;
        if (hasExec) scopeTotal += area * basePerM2 * 0.5 * standardMult;
        if (hasSupervision) scopeTotal += area * basePerM2 * 0.35 * standardMult;

        // Minimum
        if (scopeTotal < 3000) scopeTotal = 3000;

        const low = Math.round(scopeTotal * 0.85 / 1000) * 1000;
        const high = Math.round(scopeTotal * 1.2 / 1000) * 1000;

        resultPrice.textContent = `${low.toLocaleString('pl-PL')} – ${high.toLocaleString('pl-PL')} zł`;

        // Time estimate
        let weeks = 4;
        if (area > 100) weeks += 2;
        if (area > 200) weeks += 3;
        if (hasExec) weeks += 2;
        if (hasSupervision) weeks += 4;
        if (resultTime) resultTime.textContent = `${weeks}-${weeks + 3} tygodni`;

        // Recommended package
        if (resultPackage) {
            if (hasSupervision) resultPackage.textContent = 'Nadzór Autorski pod Klucz';
            else if (hasExec) resultPackage.textContent = 'Projekt Kompleksowy';
            else if (has3D) resultPackage.textContent = 'Projekt Koncepcyjny z 3D';
            else resultPackage.textContent = 'Projekt Funkcjonalny';
        }
    }

    // Initial calculation
    updateSliderTrack();
    updateCalculation();
}

/* --------------------------------------------------------------------------
   10. Custom Cursor + Magnetic Buttons
   -------------------------------------------------------------------------- */
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    // Check if touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth lag for ring
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover detection on interactive elements
    const hoverTargets = document.querySelectorAll(
        'a, button, .realizacja-card, .offer-clean-card, .filter-tab, .calc-pill, .chatbot-chip, input, select, textarea'
    );

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        target.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    // Magnetic effect on buttons
    const magneticElements = document.querySelectorAll('.btn-sage, .btn-outline-dark, .btn-cta-sage, .chatbot-toggle');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.2;
            const deltaY = (e.clientY - centerY) * 0.2;
            el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

/* --------------------------------------------------------------------------
   11. AI Chatbot (Local Intelligence + OpenAI-ready proxy)
   -------------------------------------------------------------------------- */
function initChatbot() {
    const widget = document.getElementById('chatbot-widget');
    const toggle = document.getElementById('chatbot-toggle');
    const panel = document.getElementById('chatbot-panel');
    const minimize = document.getElementById('chatbot-minimize');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const messagesContainer = document.getElementById('chatbot-messages');

    if (!widget || !toggle) return;

    // Toggle open/close
    toggle.addEventListener('click', () => {
        widget.classList.toggle('open');
        if (widget.classList.contains('open') && messagesContainer.children.length === 0) {
            showWelcomeMessage();
        }
        if (widget.classList.contains('open')) {
            setTimeout(() => input?.focus(), 300);
        }
    });

    if (minimize) {
        minimize.addEventListener('click', () => {
            widget.classList.remove('open');
        });
    }

    // Send message
    function sendMessage() {
        const text = input?.value?.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';

        // Show typing indicator
        const typingEl = addTypingIndicator();

        // Generate response (local intelligence)
        setTimeout(() => {
            typingEl.remove();
            const response = generateLocalResponse(text);
            addMessage(response.text, 'bot', response.chips);
        }, 800 + Math.random() * 700);
    }

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    function addMessage(text, sender, chips = null) {
        const msg = document.createElement('div');
        msg.className = `chatbot-msg ${sender}`;
        msg.textContent = text;

        if (chips && chips.length > 0) {
            const chipContainer = document.createElement('div');
            chipContainer.className = 'chatbot-chips';
            chips.forEach(chip => {
                const btn = document.createElement('button');
                btn.className = 'chatbot-chip';
                btn.textContent = chip;
                btn.addEventListener('click', () => {
                    input.value = chip;
                    sendMessage();
                });
                chipContainer.appendChild(btn);
            });
            msg.appendChild(chipContainer);
        }

        messagesContainer.appendChild(msg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return msg;
    }

    function addTypingIndicator() {
        const msg = document.createElement('div');
        msg.className = 'chatbot-msg bot typing';
        msg.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        messagesContainer.appendChild(msg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return msg;
    }

    function showWelcomeMessage() {
        addMessage(
            'Cześć! 👋 Jestem asystentem MKW Studio. Mogę pomóc Ci z informacjami o naszych usługach, projektach i procesie współpracy. O czym chcesz porozmawiać?',
            'bot',
            ['Oferta i ceny', 'Portfolio realizacji', 'Jak wygląda proces?', 'Umów konsultację']
        );
    }

    /**
     * Local intelligence — pattern matching for common questions.
     * When OpenAI API proxy is configured, this serves as fallback.
     */
    function generateLocalResponse(userMsg) {
        const msg = userMsg.toLowerCase();

        // Portfolio / Realizacje
        if (msg.includes('portf') || msg.includes('realiz') || msg.includes('projekt') && msg.includes('zobaczy')) {
            const projects = SITE_CONTENT?.portfolio || [];
            let examples = projects.slice(0, 4).map(p => `• ${p.title} (${p.area}, ${p.location})`).join('\n');
            return {
                text: `Mamy ponad 40 zrealizowanych projektów. Kilka przykładów:\n${examples}\n\nWszystkie realizacje znajdziesz w sekcji Portfolio na naszej stronie. Chcesz dowiedzieć się więcej o konkretnym projekcie?`,
                chips: ['Apartament Wilanów', 'Dom w Konstancinie', 'Jaki jest Wasz styl?']
            };
        }

        // Pricing / Ceny
        if (msg.includes('cen') || msg.includes('ile kosz') || msg.includes('budżet') || msg.includes('wyce') || msg.includes('kosztu')) {
            return {
                text: `Koszt projektu zależy od metrażu, zakresu i standardu wykończenia. Orientacyjne widełki:\n\n• Projekt koncepcyjny: od 150 zł/m²\n• Wizualizacje 3D: od 100 zł/m²\n• Projekt kompleksowy: od 250 zł/m²\n• Nadzór autorski: od 80 zł/m²\n\nSkorzystaj z naszego kalkulatora inwestycji w sekcji Oferta lub umów bezpłatną konsultację, żebyśmy mogli przygotować indywidualną wycenę.`,
                chips: ['Kalkulator kosztów', 'Umów konsultację', 'Jakie macie pakiety?']
            };
        }

        // Offer / Packages
        if (msg.includes('ofert') || msg.includes('pakiet') || msg.includes('zakres') || msg.includes('usług')) {
            return {
                text: `Oferujemy 5 pakietów dopasowanych do Twoich potrzeb:\n\n01. Projekt Funkcjonalny — układ, ergonomia\n02. Projekt Deweloperski — zmiany lokatorskie\n03. Projekt Koncepcyjny — wizualizacje 3D\n04. Projekt Kompleksowy — pełna dokumentacja ⭐\n05. Nadzór Autorski — koordynacja budowy pod klucz\n\nNajczęściej klienci wybierają Projekt Kompleksowy + Nadzór. Który pakiet Cię interesuje?`,
                chips: ['Projekt Kompleksowy', 'Nadzór pod klucz', 'Ile to kosztuje?']
            };
        }

        // Process / Jak wygląda współpraca
        if (msg.includes('proces') || msg.includes('jak wyglą') || msg.includes('etap') || msg.includes('współpra') || msg.includes('krok')) {
            return {
                text: `Nasz proces składa się z kilku etapów:\n\n1️⃣ Bezpłatna konsultacja (15 min) — poznajemy potrzeby\n2️⃣ Brief projektowy — metraż, styl, budżet\n3️⃣ Koncepcja — warianty aranżacji 2D\n4️⃣ Wizualizacje 3D — fotorealistyczne rendery\n5️⃣ Dokumentacja wykonawcza — rysunki dla ekip\n6️⃣ Nadzór autorski — kontrola na budowie\n\nCały proces trwa 6-12 tygodni w zależności od zakresu.`,
                chips: ['Umów konsultację', 'Ile to trwa?', 'Jakie materiały?']
            };
        }

        // Consultation / Booking
        if (msg.includes('konsult') || msg.includes('umów') || msg.includes('spotkanie') || msg.includes('kontakt') || msg.includes('termin')) {
            return {
                text: `Chętnie umówimy bezpłatną 15-minutową konsultację! Możesz:\n\n📞 Zadzwonić: +48 600 100 100 (Pn-Pt 9-18)\n📧 Napisać: kontakt@mkwstudio.pl\n📱 Instagram: @mkwstudio_\n\nAlbo po prostu kliknij przycisk „Umów konsultację" na stronie.`,
                chips: ['Napisz e-mail', 'Zadzwoń teraz']
            };
        }

        // Materials / Style
        if (msg.includes('mater') || msg.includes('styl') || msg.includes('japandi') || msg.includes('minimal') || msg.includes('drewno') || msg.includes('kamień')) {
            return {
                text: `W MKW Studio specjalizujemy się w ciepłym minimalizmie i stylu Japandi. Najczęściej używane materiały to:\n\n🪨 Naturalny kamień (spiek, trawertyn, marmur)\n🪵 Szczotkowane drewno dębowe\n🧶 Tkaniny lniane i boucle\n✨ Mosiądz i szczotkowane złoto\n\nDobieramy paletę indywidualnie — to zawsze dialog z inwestorem.`,
                chips: ['Pokaż realizacje', 'Inne style?', 'Ile kosztują materiały?']
            };
        }

        // Wilanów specific
        if (msg.includes('wilanów') || msg.includes('wilanow')) {
            return {
                text: `Wilanów to jedna z naszych głównych lokalizacji! Zrealizowaliśmy tu m.in. apartament 85m² w stylu Japandi z włoskim spiekiem kwarcowym i dębem bielonym. To był projekt kompleksowy z nadzorem autorskim. Chcesz zobaczyć szczegóły?`,
                chips: ['Pokaż projekt Wilanów', 'Inne lokalizacje', 'Podobna realizacja?']
            };
        }

        // Konstancin
        if (msg.includes('konstancin')) {
            return {
                text: `Mamy aż 2 realizacje w Konstancinie-Jeziornej! Dom 240m² w stylu Modern Scandinavian i prestiżową rezydencję 380m² z marmuru Nero Marquina. To idealne lokalizacje na projekty premium w otoczeniu natury.`,
                chips: ['Dom 240m²', 'Rezydencja 380m²', 'Ceny w Konstancinie']
            };
        }

        // Time / Duration
        if (msg.includes('ile trwa') || msg.includes('czas') || msg.includes('kiedy') || msg.includes('jak długo')) {
            return {
                text: `Czas realizacji zależy od zakresu:\n\n• Projekt koncepcyjny: 3-4 tygodnie\n• Projekt kompleksowy: 6-10 tygodni\n• Nadzór autorski: zależny od budowy (3-6 miesięcy)\n\nProjekty mniejszych mieszkań (do 60m²) realizujemy szybciej. Dokładny harmonogram ustalimy na konsultacji.`,
                chips: ['Umów konsultację', 'Mam 80m²', 'Kiedy można zacząć?']
            };
        }

        // About / Designer
        if (msg.includes('o mnie') || msg.includes('małgorzat') || msg.includes('gosia') || msg.includes('kto projekt') || msg.includes('arch')) {
            return {
                text: `MKW Studio prowadzi Małgorzata Wojtysiak — absolwentka Politechniki Warszawskiej i Akademii Sztuk Pięknych w Warszawie. Ma ponad 10 lat doświadczenia w projektowaniu wnętrz premium i ponad 40 realizacji na koncie. Specjalizuje się w łączeniu inżynierskiej precyzji z artystyczną wrażliwością.`,
                chips: ['Portfolio', 'Jakie ma doświadczenie?', 'Umów spotkanie']
            };
        }

        // Calculator
        if (msg.includes('kalkul') || msg.includes('estymator') || msg.includes('oblicz') || msg.includes('przelicz')) {
            return {
                text: `Nasz Estymator Inwestycji znajdziesz w sekcji Oferta na stronie. Możesz tam interaktywnie dobrać metraż, zakres usług i standard wykończenia, aby otrzymać orientacyjne widełki cenowe. Przewiń stronę do sekcji "Oferta" i znajdź kalkulator poniżej pakietów.`,
                chips: ['Ile kosztuje 80m²?', 'Pakiety ofertowe', 'Umów konsultację']
            };
        }

        // Greeting
        if (msg.includes('cześć') || msg.includes('hej') || msg.includes('witam') || msg.includes('dzień dobry') || msg === 'hi' || msg === 'hello') {
            return {
                text: `Cześć! 😊 Miło Cię widzieć. Jestem asystentem MKW Studio. Jak mogę Ci pomóc? Mogę opowiedzieć o naszej ofercie, pokazać realizacje lub pomóc umówić konsultację.`,
                chips: ['Oferta i ceny', 'Portfolio', 'Umów konsultację']
            };
        }

        // Thanks
        if (msg.includes('dzięk') || msg.includes('dzieki') || msg.includes('super') || msg.includes('ok ')) {
            return {
                text: `Nie ma za co! 😊 Jeśli masz jeszcze jakieś pytania, chętnie pomogę. A jeśli jesteś gotowy/a na następny krok — zachęcam do umówienia bezpłatnej konsultacji z Małgorzatą.`,
                chips: ['Umów konsultację', 'Mam jeszcze pytanie']
            };
        }

        // Default / fallback
        return {
            text: `Dziękuję za pytanie! Postaram się pomóc. Specjalizuję się w informacjach o ofercie MKW Studio, procesie projektowym, cenach i realizacjach. Jeśli potrzebujesz szczegółowej odpowiedzi, najlepiej umówić bezpłatną konsultację telefoniczną z Małgorzatą pod numerem +48 600 100 100.`,
            chips: ['Oferta i ceny', 'Portfolio', 'Proces współpracy', 'Umów konsultację']
        };
    }
}

/* --------------------------------------------------------------------------
   12. Booking Modal
   -------------------------------------------------------------------------- */
function initBookingModal() {
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.getElementById('booking-modal-close');
    if (!modal || !closeBtn) return;

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    // Hook up any "Umów konsultację" buttons to open modal
    // (For now, buttons link to #contact; booking modal opens via chatbot suggestion)
}

/* --------------------------------------------------------------------------
   13. Scroll Reveal Animations (GSAP ScrollTrigger)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Reveal sections on scroll
    const sections = document.querySelectorAll('.section-center-heading, .offer-clean-card, .about-split-layout, .calculator-section, .contact-main-grid');
    
    sections.forEach(section => {
        gsap.from(section, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                once: true
            }
        });
    });

    // Staggered reveal for portfolio cards
    ScrollTrigger.create({
        trigger: '#realizacje-container',
        start: 'top 80%',
        once: true,
        onEnter: () => {
            gsap.from('.realizacja-card', {
                y: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.12,
                ease: 'power2.out'
            });
        }
    });

    // Staggered reveal for offer cards
    ScrollTrigger.create({
        trigger: '#offer-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
            gsap.from('.offer-clean-card', {
                y: 40,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }
    });

    // Hero text entrance
    gsap.from('.hero-text-col', {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
    });

    gsap.from('.hero-visual-col', {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
    });
}
