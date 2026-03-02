document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('main-nav-list');
    const navLinks = document.querySelectorAll('#main-nav a');
    const sections = document.querySelectorAll('.section');
    const connectContent = document.querySelector('.connect-content');

    // Mobile nav toggle
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navList.classList.toggle('open');
            menuToggle.classList.toggle('open', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navList.classList.remove('open');
                    menuToggle.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navList.classList.remove('open');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Highlight the nav link for the section currently in view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, {
        rootMargin: '-40% 0px -55% 0px'
    });

    sections.forEach(section => observer.observe(section));

    // Glow effect when clicking the "connect" inline link
    document.querySelectorAll('a[href="#connect"]').forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                connectContent.classList.add('glow-effect');
                setTimeout(() => connectContent.classList.remove('glow-effect'), 2000);
            }, 400);
        });
    });
});
