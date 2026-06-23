/* ==========================================================================
   Monochrome Portfolio Script - Jishnu Suresh
   Interactions: Navigation highlights, scroll reveals, custom console features
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            // Toggle hamburger icon between list and close state
            if (navLinks.classList.contains('open')) {
                mobileMenuBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
            } else {
                mobileMenuBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
            }
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                mobileMenuBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
            });
        });
    }

    // 2. Sticky Navbar Scroll State
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // 3. Scroll Reveal System using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Active Section Highlighting in Navbar
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // Offset for navbar

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    // 5. Contact Form Simulation
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Form Values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation check
            if (!name || !email || !message) {
                formFeedback.className = 'form-feedback error';
                formFeedback.innerText = '[ERROR] Field constraints validation failed.';
                return;
            }

            // Set sending feedback
            formFeedback.className = 'form-feedback';
            formFeedback.innerText = '[CONNECTING...] Dispatching message package...';

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerText = 'DISPATCHING...';

            // Simulate Network Request / Buffer queue
            setTimeout(() => {
                formFeedback.className = 'form-feedback success';
                formFeedback.innerText = '[SUCCESS] Message buffered. Response mapped to ' + email;
                
                // Clear fields
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = 'Send Message';

                // Fade feedback after a few seconds
                setTimeout(() => {
                    formFeedback.innerText = '';
                }, 5000);
            }, 1200);
        });
    }

    // 6. Interactive Developer Console Easter Egg
    console.clear();
    console.log(
        '%c// JISHNU SURESH // SYSTEM ONLINE',
        'font-family: monospace; font-size: 16px; font-weight: bold; color: #ffffff; background-color: #000000; padding: 8px 12px; border: 1px solid #333;'
    );
    console.log(
        '%cRole: BTech Data Science / Computer Science Student\nFocus: Backend Engineering, Databases, AI/ML Pipelines\nGitHub: https://github.com/Jishnu-JSK',
        'font-family: monospace; color: #a1a1aa; line-height: 1.5;'
    );
    console.log(
        '%cRun downloadResume() to request copy of current curriculum vitae.',
        'font-family: monospace; font-style: italic; color: #71717a; margin-top: 5px;'
    );

    // Global developer helper function
    window.downloadResume = () => {
        console.log('%c[FETCH] Accessing resume_placeholder.pdf file source...', 'font-family: monospace; color: #ffffff;');
        const link = document.createElement('a');
        link.href = 'resume_placeholder.pdf';
        link.download = 'Jishnu_Suresh_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return '[PROCESS] File stream triggered. Check downloads folder.';
    };
});
