/**
 * MKW Studio — Warm Minimalist Architectural Interface (Rewizja 10)
 * Gaja Design & Moovin Interiors Style
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
