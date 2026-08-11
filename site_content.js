const SITE_CONTENT = {
    brand: {
        name: "MKW Studio",
        tagline: "Architektura Wnętrz & Nadzór Autorski",
        designer: "Małgorzata Wojtysiak",
        credentials: "PW Architektura • ASP Warszawa",
        phone: "+48 600 100 100",
        email: "kontakt@mkwstudio.pl",
        instagram: "https://www.instagram.com/mkwstudio_/"
    },
    hero: {
        eyebrow: "PRACOWNIA ARCHITEKTURY WNĘTRZ — WARSZAWA",
        title: "Architektura zdefiniowana przez światło, ergonomię i formę.",
        subtitle: "Tworzymy ponadczasowe, wyciszające przestrzenie mieszkalne i komercyjne, w których szlachetne materiały spotykają się z bezkompromisową funkcjonalnością.",
        primaryCTA: "ODKRYJ REALIZACJE",
        secondaryCTA: "UMÓW KONSULTACJĘ",
        metrics: [
            { number: "10+", label: "Lat doświadczenia" },
            { number: "40+", label: "Unikalnych realizacji" },
            { number: "100%", label: "Projektów pod klucz" }
        ]
    },
    about: {
        eyebrow: "ARCHITEKT PROWADZĄCY",
        name: "Małgorzata Wojtysiak",
        headline: "Wierzę, że dobrze zaprojektowane wnętrze to nie tylko estetyka — to codzienna lekkość życia.",
        bio1: "Ukończyłam studia architektoniczne na Politechnice Warszawskiej oraz Akademię Sztuk Pięknych w Warszawie. Przez lata zdobywałam praktykę w czołowych warszawskich biurach projektowych, prowadząc wymagające realizacje premium pod klucz.",
        bio2: "W MKW Studio łączę inżynierską precyzję z wyczuciem artystycznym. Każdy projekt to indywidualny dialog z inwestorem: dobieramy naturalne surowce (kamień, szczotkowany dąb, len, stal), dbamy o akustykę, ergonomię i scenariusze świetlne.",
        pillars: [
            {
                num: "01",
                title: "Ergonomia i Intuicja",
                desc: "Przestrzeń dopasowana do Twojego rytmu dnia — zero przypadkowych rozwiązań."
            },
            {
                num: "02",
                title: "Szlachetność Materiałów",
                desc: "Naturalny kamień, drewno i spójne palety barw, które starzeją się z godnością."
            },
            {
                num: "03",
                title: "Precyzyjny Nadzór",
                desc: "Pełna kontrola wykonawcza na budowie — zdejmujemy z Ciebie cały stres realizacji."
            }
        ]
    },
    portfolio: [
        {
            id: 0,
            title: "Apartament w Wilanowie",
            category: "Apartamenty",
            filter: "apartments",
            area: "85 m²",
            location: "Warszawa, Wilanów",
            year: "2025",
            style: "Japandi & Warm Minimalism",
            image: "Zdjecia/Realizacje/realizacja 1.jpg",
            thumbnail: "Zdjecia/Realizacje/realizacja 1.jpg",
            details: {
                tagline: "Azyl spokoju w sercu tętniącej dzielnicy",
                story: "Projekt powstał jako odpowiedź na potrzebę wyciszenia po intensywnym dniu w centrum stolicy. Zastosowaliśmy surowy, naturalny kamień, szczotkowane drewno dębowe oraz ukryte systemy oświetlenia liniowego, tworząc przestrzeń o medytacyjnym, harmonijnym charakterze.",
                specs: [
                    { label: "Metraż", value: "85 m²" },
                    { label: "Lokalizacja", value: "Warszawa, Wilanów" },
                    { label: "Zakres", value: "Projekt kompleksowy + Nadzór autorski" },
                    { label: "Główne materiały", value: "Włoski spiek kwarcowy, dąb bielony, mosiądz, len" }
                ],
                gallery: [
                    "Zdjecia/Realizacje/realizacja 1.jpg",
                    "Zdjecia/Realizacje/wilanow_detale_tekstury_1777891128332.png",
                    "Zdjecia/Realizacje/wilanow_swiatlo_mood_1777891144795.png",
                    "Zdjecia/Realizacje/wilanow_detal_naro_nik_1777891163467.png",
                    "Zdjecia/Realizacje/wilanow_lazienka_detal_1777891328428.png",
                    "Zdjecia/Realizacje/wilanow_taras_natura_1777891346580.png"
                ]
            }
        },
        {
            id: 1,
            title: "Dom w Konstancinie",
            category: "Domy & Rezydencje",
            filter: "houses",
            area: "240 m²",
            location: "Konstancin-Jeziorna",
            year: "2025",
            style: "Modern Scandinavian Luxury",
            image: "Zdjecia/Realizacje/realizacja 2.jpg",
            thumbnail: "Zdjecia/Realizacje/realizacja 2.jpg",
            details: {
                tagline: "Harmonia architektury z otaczającym ogrodem sosnowym",
                story: "Rezydencja zaprojektowana z myślą o czteroosobowej rodzinie. Otwarta strefa dzienna z panoramicznymi przeszkleniami łączy wnętrze z krajobrazem starodrzewu. Zastosowano naturalne tynki gliniane, wielkoformatowe kafle oraz meble na indywidualne zamówienie stolarskie.",
                specs: [
                    { label: "Metraż", value: "240 m²" },
                    { label: "Lokalizacja", value: "Konstancin-Jeziorna" },
                    { label: "Zakres", value: "Architektura wnętrz + Dobór sztuki" },
                    { label: "Główne materiały", value: "Dąb wędzony, trawertyn, tkaniny boucle" }
                ],
                gallery: [
                    "Zdjecia/Realizacje/realizacja 2.jpg",
                    "Zdjecia/Realizacje/wilanow_swiatlo_mood_1777891144795.png",
                    "Zdjecia/Realizacje/wilanow_taras_natura_1777891346580.png"
                ]
            }
        },
        {
            id: 2,
            title: "Studio na Mokotowie",
            category: "Apartamenty",
            filter: "apartments",
            area: "48 m²",
            location: "Warszawa, Mokotów",
            year: "2024",
            style: "Compact Architectural Living",
            image: "Zdjecia/Realizacje/realizacja.jfif",
            thumbnail: "Zdjecia/Realizacje/realizacja.jfif",
            details: {
                tagline: "Maksymalizacja ergonomii na kompaktowej powierzchni",
                story: "Projekt udowadniający, że nawet niewielka przestrzeń może oferować luksus i przestronność. Zastosowaliśmy wielofunkcyjną zabudowę stolarską z ukrytą strefą biurową i sypialnianą, dzięki czemu salon zachowuje czystość formy w ciągu dnia.",
                specs: [
                    { label: "Metraż", value: "48 m²" },
                    { label: "Lokalizacja", value: "Warszawa, Mokotów" },
                    { label: "Zakres", value: "Projekt wykonawczy + Zabudowy" },
                    { label: "Główne materiały", value: "Fornir jesionowy, mikrocement, matowa czerń" }
                ],
                gallery: [
                    "Zdjecia/Realizacje/realizacja.jfif",
                    "Zdjecia/Realizacje/wilanow_detale_tekstury_1777891128332.png"
                ]
            }
        },
        {
            id: 3,
            title: "Loft na Pradze",
            category: "Lofty & Komercyjne",
            filter: "commercial",
            area: "115 m²",
            location: "Warszawa, Praga Koneser",
            year: "2024",
            style: "Industrial Elegance",
            image: "Zdjecia/Realizacje/realizacja_4.png",
            thumbnail: "Zdjecia/Realizacje/realizacja_4.png",
            details: {
                tagline: "Postindustrialny duch w wyrafinowanym wydaniu",
                story: "Przestrzeń w zrewitalizowanej fabryce połączona z nowoczesnymi akcentami soft-loftu. Odsłonięta oryginalna cegła została zbalansowana ciepłym światłem, welurem w odcieniach szałwii oraz autorskimi przeszkleniami w czarnej stali.",
                specs: [
                    { label: "Metraż", value: "115 m²" },
                    { label: "Lokalizacja", value: "Centrum Praskie Koneser" },
                    { label: "Zakres", value: "Projekt kompleksowy z nadzorem" },
                    { label: "Główne materiały", value: "Cegła historyczna, stal, szkło ryflowane, beton" }
                ],
                gallery: [
                    "Zdjecia/Realizacje/realizacja_4.png",
                    "Zdjecia/Realizacje/wilanow_detal_naro_nik_1777891163467.png"
                ]
            }
        },
        {
            id: 4,
            title: "Rezydencja Konstancin",
            category: "Domy & Rezydencje",
            filter: "houses",
            area: "380 m²",
            location: "Konstancin-Jeziorna",
            year: "2025",
            style: "Ultra Contemporary Luxury",
            image: "Zdjecia/Realizacje/realizacja_5.png",
            thumbnail: "Zdjecia/Realizacje/realizacja_5.png",
            details: {
                tagline: "Prestiżowa skala, wysublimowana prostota detalu",
                story: "Monolityczna architektura wnętrz o podwójnej wysokości kondygnacji w salonie. Projekt opiera się na kompozycji marmuru Nero Marquina, ciepłego orzecha amerykańskiego i zintegrowanych systemów Smart Home.",
                specs: [
                    { label: "Metraż", value: "380 m²" },
                    { label: "Lokalizacja", value: "Strefa A, Konstancin" },
                    { label: "Zakres", value: "Projekt wykonawczy, nadzór, stylizacja" },
                    { label: "Główne materiały", value: "Marmur Nero Marquina, orzech, szczotkowane złoto" }
                ],
                gallery: [
                    "Zdjecia/Realizacje/realizacja_5.png",
                    "Zdjecia/Realizacje/realizacja 2.jpg",
                    "Zdjecia/Realizacje/wilanow_taras_natura_1777891346580.png"
                ]
            }
        },
        {
            id: 5,
            title: "Penthouse Saska Kępa",
            category: "Apartamenty",
            filter: "apartments",
            area: "160 m²",
            location: "Warszawa, Saska Kępa",
            year: "2024",
            style: "Modern Art Scandi",
            image: "Zdjecia/Realizacje/realizacja_6.png",
            thumbnail: "Zdjecia/Realizacje/realizacja_6.png",
            details: {
                tagline: "Światło, sztuka i taras z widokiem na koronę drzew",
                story: "Wyjątkowy penthouse z panoramicznym tarasem. Wnętrza stworzone jako tło dla kolekcji sztuki współczesnej właścicieli — jasne, organiczne płaszczyzny, zaokrąglone narożniki ścian i autorskie oświetlenie rzeźbiarskie.",
                specs: [
                    { label: "Metraż", value: "160 m²" },
                    { label: "Lokalizacja", value: "Warszawa, Saska Kępa" },
                    { label: "Zakres", value: "Projekt kompleksowy pod klucz" },
                    { label: "Główne materiały", value: "Dąb naturalny, spiek Calacatta, len, brąz" }
                ],
                gallery: [
                    "Zdjecia/Realizacje/realizacja_6.png",
                    "Zdjecia/Realizacje/wilanow_lazienka_detal_1777891328428.png"
                ]
            }
        },
        {
            id: 6,
            title: "Minimalistyczne Studio",
            category: "Apartamenty",
            filter: "apartments",
            area: "42 m²",
            location: "Warszawa, Powiśle",
            year: "2024",
            style: "Nordic Pure Minimal",
            image: "Zdjecia/Realizacje/realizacja_7.png",
            thumbnail: "Zdjecia/Realizacje/realizacja_7.png",
            details: {
                tagline: "Czystość formy i światło nadwiślańskiego Powiśla",
                story: "Projekt skupiony na redukcji zbędnych bodźców. Każdy mebel został zaprojektowany zlicowany ze ścianą, tworząc płynne, monolityczne bryły i wrażenie niczym niezakłóconej przestrzeni.",
                specs: [
                    { label: "Metraż", value: "42 m²" },
                    { label: "Lokalizacja", value: "Warszawa, Powiśle" },
                    { label: "Zakres", value: "Projekt koncepcyjny + stolarka" },
                    { label: "Główne materiały", value: "Bielony jesion, spiek kwarcowy, tkaniny lniane" }
                ],
                gallery: [
                    "Zdjecia/Realizacje/realizacja_7.png",
                    "Zdjecia/Realizacje/wilanow_swiatlo_mood_1777891144795.png"
                ]
            }
        },
        {
            id: 7,
            title: "Willa pod Warszawą",
            category: "Domy & Rezydencje",
            filter: "houses",
            area: "290 m²",
            location: "Podkowa Leśna",
            year: "2025",
            style: "Organic Minimal Architecture",
            image: "Zdjecia/Realizacje/realizacja_8.png",
            thumbnail: "Zdjecia/Realizacje/realizacja_8.png",
            details: {
                tagline: "Ciepło natury połączone z nowoczesną geometrią",
                story: "Nowoczesna willa wkomponowana w leśną działkę Podkowy Leśnej. Projekt bazuje na dialogu wielkich przeszkleń z ciepłym dębem szczotkowanym, kamieniem piaskowym i minimalistycznym kominkiem zintegrowanym ze ścianą medialną.",
                specs: [
                    { label: "Metraż", value: "290 m²" },
                    { label: "Lokalizacja", value: "Podkowa Leśna" },
                    { label: "Zakres", value: "Projekt kompleksowy z pełnym nadzorem" },
                    { label: "Główne materiały", value: "Piaskowiec, dąb rustykalny, stal, len" }
                ],
                gallery: [
                    "Zdjecia/Realizacje/realizacja_8.png",
                    "Zdjecia/Realizacje/wilanow_taras_natura_1777891346580.png",
                    "Zdjecia/Realizacje/realizacja 1.jpg"
                ]
            }
        }
    ],
    offer: [
        {
            id: 1,
            num: "01",
            title: "Projekt Funkcjonalny",
            tag: "Baza Inwestycji",
            desc: "Idealne rozwiązanie na start, gdy chcesz optymalnie zaplanować układ ścian, ergonomię i strefy funkcjonalne przed rozpoczęciem prac.",
            deliverables: [
                "2-3 warianty aranżacji przestrzeni 2D z wymiarami",
                "Optymalizacja ciągów komunikacyjnych i ergonomii",
                "Koncepcja układu mebli i sprzętów AGD",
                "Indywidualna konsultacja online / na żywo"
            ]
        },
        {
            id: 2,
            num: "02",
            title: "Projekt Deweloperski (Zmiany Lokatorskie)",
            tag: "Dla Rynku Pierwotnego",
            desc: "Kompletna dokumentacja wymagana przez dewelopera w celu wprowadzenia zmian lokatorskich przed odbiorem kluczy.",
            deliverables: [
                "Projekt nowego układu ścian działowych",
                "Wytyczne instalacji wodno-kanalizacyjnych",
                "Punkty elektryczne, oświetlenie i gniazda",
                "Zgodność ze sztuką budowlaną i normami"
            ]
        },
        {
            id: 3,
            num: "03",
            title: "Projekt Koncepcyjny z Wizualizacjami 3D",
            tag: "Koncepcja Wizualna",
            desc: "Zobacz swoje przyszłe wnętrze w fotorealistycznej jakości zanim kupisz pierwszy mebel.",
            deliverables: [
                "Wszystko z Projektu Funkcjonalnego",
                "Fotorealistyczne wizualizacje 3D każdego pomieszczenia",
                "Dedykowany moodboard materiałowy i paleta kolorów",
                "Zestawienie polecanych mebli, lamp i dodatków"
            ]
        },
        {
            id: 4,
            num: "04",
            title: "Projekt Kompleksowy (Wykonawczy)",
            tag: "Najczęściej Wybierany",
            featured: true,
            desc: "Pełny pakiet architektoniczny z kompletem rysunków dla wszystkich ekip wykonawczych, stolarki i kosztorysem.",
            deliverables: [
                "Fotorealistyczne wizualizacje 3D (2 tury poprawek)",
                "Pełna dokumentacja wykonawcza dla ekip budowlanych",
                "Rysunki techniczne mebli na wymiar dla stolarza",
                "Rozwinięcia ścian łazienek, kuchni i detali",
                "Kompletna lista zakupowa z linkami, kodami i cenami",
                "Wizyta w salonach wnętrzarskich w Warszawie"
            ]
        },
        {
            id: 5,
            num: "05",
            title: "Nadzór Autorski i Realizacja Pod Klucz",
            tag: "Bezstresowa Realizacja",
            desc: "Przejmujemy pełną koordynację budowy, współpracę z wykonawcami i kontrolę jakości każdego detalu.",
            deliverables: [
                "Regularne wizyty architekta na budowie w kluczowych etapach",
                "Bieżąca weryfikacja zgodności prac z projektem",
                "Rozwiązywanie nieprzewidzianych problemów wykonawczych",
                "Odbiory prac wykończeniowych i stolarskich"
            ]
        }
    ],
    contact: {
        title: "Stwórzmy Twoją przestrzeń",
        subtitle: "Opowiedz nam o swoich planach lub skorzystaj z inteligentnego kreatora briefu AI.",
        email: "kontakt@mkwstudio.pl",
        phone: "+48 600 100 100",
        address: "Warszawa, Mokotów / Wilanów",
        instagram: "https://www.instagram.com/mkwstudio_/"
    }
};
