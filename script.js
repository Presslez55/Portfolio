document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // Simple Animation on Scroll (Fade In)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .section-title, .about-text');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // GSAP Scroll Reveal Animation
    gsap.registerPlugin(ScrollTrigger);

    const revealContainers = document.querySelectorAll('.scroll-reveal');

    revealContainers.forEach(container => {
        const textElement = container.querySelector('.scroll-reveal-text');
        if (!textElement) return;

        // Split text into words
        const content = textElement.textContent;
        const words = content.split(/(\s+)/).filter(word => word.trim().length > 0);
        textElement.textContent = ''; // Clear original text

        words.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word + ' '; // Add space back
            span.classList.add('word');
            textElement.appendChild(span);
        });

        const wordElements = textElement.querySelectorAll('.word');

        // Container Rotation Animation
        gsap.fromTo(
            container,
            { transformOrigin: '0% 50%', rotate: 3 },
            {
                ease: 'none',
                rotate: 0,
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: true
                }
            }
        );

        // Word Opacity & Blur Animation
        gsap.fromTo(
            wordElements,
            {
                opacity: 0.1,
                filter: 'blur(4px)',
                willChange: 'opacity, filter'
            },
            {
                ease: 'none',
                opacity: 1,
                filter: 'blur(0px)',
                stagger: 0.05,
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom-=20%',
                    end: 'bottom bottom',
                    scrub: true
                }
            }
        );
    });
});
