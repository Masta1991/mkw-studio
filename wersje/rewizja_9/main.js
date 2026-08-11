document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initialize Content from site_content.js
    function initContent() {
        // Portfolio Grid
        const portfolioTrack = document.getElementById('portfolio-track');
        if (portfolioTrack) {
            const spanClasses = ['span-4', 'span-2', 'span-2', 'span-2', 'span-2', 'span-3', 'span-3', 'span-6'];
            portfolioTrack.innerHTML = SITE_CONTENT.portfolio.map((project, i) => {
                const spanClass = spanClasses[i % spanClasses.length];
                return `
                    <div class="portfolio-item reveal ${spanClass}">
                        <img src="${project.image}" alt="${project.title}" loading="lazy">
                        <div class="portfolio-item-overlay">
                            <div class="portfolio-info">
                                <h3>${project.title}</h3>
                            </div>
                            <button class="portfolio-more-btn" data-project-id="${i}">Więcej</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Offer / Process
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
        if (!spotlight) return;
        
        window.addEventListener('mousemove', (e) => {
            gsap.to(spotlight, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        });

        const hoverables = document.querySelectorAll('a, button, .accordion-header, .portfolio-item');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(spotlight, { width: 400, height: 400, duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(spotlight, { width: 300, height: 300, duration: 0.3 });
            });
        });
    }

    // 3. GSAP ScrollTrigger Animations
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
                delay: (i % 10) * 0.15
            });
        });

        // Dynamic asynchronous slide-up for Portfolio Items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((el, i) => {
            const offset = (i % 3) * 40; 
            const triggerStart = 95 - (i % 3) * 5;

            gsap.fromTo(el, 
                { y: 100 + offset, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: el,
                        start: `top ${triggerStart}%`,
                        end: "top 60%",
                        scrub: 1.5,
                    },
                    y: 0,
                    opacity: 1,
                    ease: "power1.out"
                }
            );
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

    // 4. Hero Entrance Animation - Restored Premium Cascade
    function initHeroEntrance() {
        const primaryBtn = document.querySelector('#hero-primary-cta');
        const secondaryBtn = document.querySelector('#hero-secondary-cta');
        const instaBtn = document.querySelector('.btn-insta-hero');
        const heroSection = document.getElementById('hero');

        const animItems = [primaryBtn, secondaryBtn, instaBtn].filter(el => el !== null);

        // Reset to initial state
        gsap.set(animItems, { opacity: 0, y: 20 });

        if (heroSection) {
            setTimeout(() => {
                heroSection.classList.add('hero-revealed');
                
                gsap.to(animItems, { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.2, 
                    stagger: 0.3,
                    delay: 0.5, 
                    ease: 'power3.out' 
                });

                // Uniwersalna interakcja dla wszystkich przycisków typu PILL (poza menu)
                const pillButtons = document.querySelectorAll('.btn:not(.navbar .btn), .btn-ghost:not(.navbar .btn-ghost)');
                
                pillButtons.forEach(btn => {
                    gsap.set(btn, { transformOrigin: "center center" });
                    
                    btn.addEventListener('mouseenter', () => {
                        gsap.to(btn, { 
                            rotation: -12, 
                            scale: 1.05, 
                            duration: 0.4, 
                            ease: "back.out(1.7)",
                            overwrite: true 
                        });
                    });
                    
                    btn.addEventListener('mouseleave', () => {
                        gsap.to(btn, { 
                            rotation: 0, 
                            scale: 1, 
                            duration: 0.4, 
                            ease: "power2.out",
                            overwrite: true 
                        });
                    });
                });
            }, 300);
        }
    }

    // 5. Accordion Logic
    function initAccordion() {
        const items = document.querySelectorAll('.accordion-item');
        
        items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                items.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
        
        if (items.length > 0) items[0].classList.add('active');
    }

    // 6. Navbar Scroll Effect
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

    // 7. Scroll Reveal Logic (Observer for non-GSAP triggers if any)
    function initReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // Final Initialization
    initContent();
    initCursorSpotlight();
    initHeroEntrance();
    initAnimations();
    initAccordion();
    initNavbar();
    initReveal();
    initProjectModal();
    initAIAssistant();
    initDynamicTextarea();

    // 12. Dynamic Textarea Logic
    function initDynamicTextarea() {
        const textarea = document.getElementById('message');
        if (!textarea) return;

        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 10. Project Modal Logic
    function initProjectModal() {
        const modal = document.getElementById('project-modal');
        const closeBtn = document.querySelector('.modal-close');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = lightbox.querySelector('img');
        
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('portfolio-more-btn')) {
                const projectId = e.target.getAttribute('data-project-id');
                const project = SITE_CONTENT.portfolio[projectId];
                
                if (project) {
                    openModal(project);
                }
            }

            // Lightbox trigger
            if (e.target.closest('.project-gallery img')) {
                lightboxImg.src = e.target.src;
                lightbox.style.display = 'flex';
                gsap.from(lightboxImg, { scale: 0.8, opacity: 0, duration: 0.4, ease: 'back.out(1.7)' });
            }
        });

        // Close Lightbox
        lightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (lightbox.style.display === 'flex') {
                    lightbox.style.display = 'none';
                } else if (modal.classList.contains('active')) {
                    closeModal();
                }
            }
        });

        function openModal(project) {
            const titleEl = document.getElementById('modal-project-title');
            const storyEl = document.getElementById('modal-project-story');
            const galleryEl = document.getElementById('modal-project-gallery');

            titleEl.textContent = project.title;
            
            if (project.details) {
                storyEl.innerHTML = `<p>${project.details.story}</p>`;
                galleryEl.innerHTML = '';
                project.details.gallery.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = project.title;
                    img.classList.add('reveal'); // Back to reveal
                    galleryEl.appendChild(img);
                });
            } else {
                storyEl.innerHTML = `<p class="reveal">Wkrótce opublikujemy pełną historię i galerię tego projektu. Zapraszamy do śledzenia naszych aktualności.</p>`;
                galleryEl.innerHTML = '';
            }

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Immediate state setup to prevent flicker
            const textReveals = modal.querySelectorAll('.project-info-side .reveal');
            const imageReveals = modal.querySelectorAll('.project-gallery img');
            const wordHighlights = modal.querySelectorAll('.highlight-reveal');
            
            // Force hidden state before animation starts
            gsap.set([textReveals, imageReveals, wordHighlights], { opacity: 0 });

            setTimeout(() => {
                modal.classList.add('active');
                
                const tl = gsap.timeline({ delay: 0 });

                // 1. Text animation (Tighter Cascade)
                tl.fromTo(textReveals, 
                    { opacity: 0, y: 30 }, 
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 1.5, 
                        stagger: 0.3, // Tighter stagger for cascade effect
                        ease: 'power2.out'
                    }, 0);

                // 2. Highlighted Words
                tl.fromTo(wordHighlights,
                    { opacity: 0, y: 15 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: 'back.out(1.7)'
                    }, 1.2); // Starts as text progresses

                // 3. Image animation
                tl.fromTo(imageReveals, 
                    { opacity: 0, y: 30 }, 
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 1.4, 
                        stagger: 1.45, 
                        ease: 'power3.out'
                    }, 0);
                
                tl.eventCallback("onComplete", () => {
                    modal.querySelectorAll('.reveal, .highlight-reveal').forEach(el => el.classList.add('active'));
                    imageReveals.forEach(el => el.classList.add('active'));
                });
            }, 50);
        }

        function closeModal() {
            modal.classList.remove('active');
            
            // Clean up reveal states for next entry
            setTimeout(() => {
                modal.querySelectorAll('.reveal, .highlight-reveal, .active').forEach(el => {
                    el.classList.remove('active');
                    gsap.set(el, { opacity: 0, y: 30, clearProps: "all" });
                });
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        }
    }

    // 11. AI Wizard Logic (Multi-step + Voice Memo)
    function initAIAssistant() {
        const startBtn = document.getElementById('start-ai-wizard');
        const wizardInterface = document.getElementById('ai-wizard-interface');
        const wizardSteps = document.getElementById('ai-wizard-steps');
        const voiceMemo = document.getElementById('ai-voice-memo');
        const questionText = document.getElementById('ai-question-text');
        const stepInput = document.getElementById('ai-step-input');
        const nextBtn = document.getElementById('ai-next-step');
        const progressFill = document.getElementById('ai-progress-fill');
        const voiceBtn = document.getElementById('ai-voice-btn');
        const voiceStatus = document.getElementById('ai-voice-status');
        const messageArea = document.getElementById('message');

        if (!startBtn) return;

        const questions = [
            { id: 'size', q: 'Jak duża jest Twoja przestrzeń (metraż w m2)?', placeholder: 'np. 65 m2' },
            { id: 'rooms', q: 'Ile pokoi planujemy zaaranżować?', placeholder: 'np. 3 pokoje + salon' },
            { id: 'kitchen', q: 'Czy kuchnia ma być aneksem, czy osobnym pomieszczeniem?', placeholder: 'np. aneks z wyspą' },
            { id: 'budget', q: 'Jaki budżet (orientacyjny) przewidujesz na realizację?', placeholder: 'np. 150-200 tys. zł' },
            { id: 'location', q: 'W jakiej lokalizacji znajduje się inwestycja?', placeholder: 'np. Warszawa, Mokotów' }
        ];

        let currentStep = 0;
        let answers = {};
        let isVoiceMode = false;

        // Start Wizard
        startBtn.addEventListener('click', () => {
            startBtn.style.display = 'none';
            wizardInterface.style.display = 'block';
            setTimeout(() => wizardInterface.style.opacity = '1', 10);
            updateStep();
        });

        // Next Step (Text Mode)
        nextBtn.addEventListener('click', () => {
            const val = stepInput.value.trim();
            if (!val) return;

            answers[questions[currentStep].id] = val;
            currentStep++;

            if (currentStep < questions.length) {
                updateStep();
            } else {
                finishWizard();
            }
        });

        stepInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') nextBtn.click();
        });

        function updateStep() {
            const step = questions[currentStep];
            gsap.to(questionText, { opacity: 0, y: -10, duration: 0.3, onComplete: () => {
                questionText.textContent = step.q;
                stepInput.placeholder = step.placeholder;
                stepInput.value = '';
                gsap.to(questionText, { opacity: 1, y: 0, duration: 0.3 });
                stepInput.focus();
            }});
            
            const progress = ((currentStep + 1) / questions.length) * 100;
            progressFill.style.width = `${progress}%`;
        }

        // Voice Recognition (Speech to Text - Full Manual Control)
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.lang = 'pl-PL';
            recognition.interimResults = false;
            recognition.continuous = true;

            let fullTranscript = '';
            let manualStop = false;
            const stopVoiceBtn = document.getElementById('ai-stop-voice');

            voiceBtn.addEventListener('click', () => {
                isVoiceMode = true;
                manualStop = false;
                fullTranscript = '';
                wizardSteps.style.display = 'none';
                voiceMemo.style.display = 'block';
                voiceBtn.classList.add('recording');
                recognition.start();
            });

            stopVoiceBtn.addEventListener('click', () => {
                manualStop = true;
                recognition.stop();
            });

            recognition.onresult = (event) => {
                let currentTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    currentTranscript += event.results[i][0].transcript;
                }
                fullTranscript += (fullTranscript ? ' ' : '') + currentTranscript;
            };

            recognition.onerror = (e) => {
                console.error("Błąd nagrywania:", e.error);
                if (e.error === 'network') {
                    alert('Błąd sieci. Sprawdź połączenie.');
                    resetWizard();
                }
            };

            recognition.onend = () => {
                if (!manualStop && isVoiceMode && voiceBtn.classList.contains('recording')) {
                    // Browser stopped it prematurely, but we want to continue
                    recognition.start();
                } else if (manualStop) {
                    voiceBtn.classList.remove('recording');
                    if (fullTranscript.trim()) {
                        processVoiceBrief(fullTranscript);
                    } else {
                        alert("Nie usłyszeliśmy nic. Spróbuj ponownie lub wpisz tekst.");
                        resetWizard();
                    }
                }
            };
        }

        function processVoiceBrief(transcript) {
            wizardInterface.style.opacity = '0';
            setTimeout(() => {
                wizardInterface.style.display = 'none';
                
                const cleanTranscript = censorText(transcript);
                const structuredData = smartParseVoice(cleanTranscript);
                
                const finalBrief = `Dzień dobry,\n\nPrzesyłam zapytanie o projekt wygenerowane na podstawie notatki głosowej.\n\n` +
                                   `PODSUMOWANIE KLUCZOWYCH DANYCH:\n` +
                                   `• METRAŻ: ${structuredData.size}\n` +
                                   `• STYL: ${structuredData.style}\n` +
                                   `• BUDŻET: ${structuredData.budget}\n` +
                                   `• LOKALIZACJA: ${structuredData.location}\n\n` +
                                   `PEŁNA TREŚĆ NOTATKI:\n"${cleanTranscript}"\n\n` +
                                   `Zależy mi na profesjonalnej aranżacji i kontakcie w celu omówienia szczegółów.\n\nZ poważaniem,`;
                
                typeWriter(finalBrief, messageArea);
            }, 500);
        }

        function censorText(text) {
            const forbidden = ['kurw', 'chuj', 'pizd', 'jeba', 'pierdol']; // Podstawowy filtr
            let censored = text;
            forbidden.forEach(word => {
                const regex = new RegExp(word, 'gi');
                censored = censored.replace(regex, '***');
            });
            return censored;
        }

        function smartParseVoice(text) {
            const lowText = text.toLowerCase();
            const data = {
                size: 'Nie określono',
                style: 'Nie określono',
                budget: 'Nie określono',
                location: 'Nie określono'
            };

            // Prosta logika słów kluczowych
            if (lowText.match(/\d+\s*(m2|metr|kwadrat)/)) data.size = lowText.match(/\d+\s*(m2|metr|kwadrat)/)[0];
            if (lowText.includes('loft')) data.style = 'Loft / Industrial';
            if (lowText.includes('nowoczesn')) data.style = 'Nowoczesny';
            if (lowText.includes('skandynawsk') || lowText.includes('scandi')) data.style = 'Skandynawski';
            if (lowText.match(/\d+\s*(tys|pln|zł|tysięcy)/)) data.budget = lowText.match(/\d+\s*(tys|pln|zł|tysięcy)/)[0];
            if (lowText.includes('warszaw')) data.location = 'Warszawa';

            return data;
        }

        function finishWizard() {
            wizardInterface.style.opacity = '0';
            setTimeout(() => {
                wizardInterface.style.display = 'none';
                const finalBrief = generateFinalBrief(answers);
                typeWriter(finalBrief, messageArea);
            }, 500);
        }

        function generateFinalBrief(data) {
            return `Dzień dobry,\n\nChciałbym zapytać o projekt wnętrza mojego mieszkania.\n\nOto kluczowe informacje:\n` +
                   `• Metraż: ${data.size}\n` +
                   `• Liczba pokoi: ${data.rooms}\n` +
                   `• Rodzaj kuchni: ${data.kitchen}\n` +
                   `• Budżet: ${data.budget}\n` +
                   `• Lokalizacja: ${data.location}\n\n` +
                   `Zależy mi na profesjonalnym podejściu i estetyce zgodnej z portfolio MKW Studio. Proszę o kontakt w celu umówienia konsultacji.\n\nZ poważaniem,`;
        }

        function resetWizard() {
            wizardSteps.style.display = 'block';
            voiceMemo.style.display = 'none';
            voiceBtn.classList.remove('recording');
        }

        function typeWriter(text, element) {
            element.value = '';
            let i = 0;
            const speed = 10;
            function type() {
                if (i < text.length) {
                    element.value += text.charAt(i);
                    i++;
                    // Trigger expansion while typing
                    element.style.height = 'auto';
                    element.style.height = (element.scrollHeight) + 'px';
                    setTimeout(type, speed);
                } else {
                    element.dispatchEvent(new Event('input', { bubbles: true }));
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
            type();
        }
    }
});
