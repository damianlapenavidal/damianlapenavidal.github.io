document.addEventListener('DOMContentLoaded', () => {
    // Construction banner
    const banner = document.getElementById('construction-banner');
    const bannerClose = document.getElementById('banner-close');
    if (banner && bannerClose) {
        bannerClose.addEventListener('click', () => {
            banner.classList.add('hidden');
            banner.addEventListener('transitionend', () => banner.remove(), { once: true });
        });
    }

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

    // Education card modals
    const modal = document.getElementById('card-modal');
    if (modal) {
        const modalTitle = modal.querySelector('.modal-title');
        const modalBody = modal.querySelector('.modal-body');
        const modalClose = modal.querySelector('.modal-close');

        const openModal = (title, bodyHTML) => {
            modalTitle.textContent = title;
            modalBody.innerHTML = bodyHTML;
            modal.hidden = false;
            requestAnimationFrame(() => modal.classList.add('visible'));
        };

        const closeModal = () => {
            modal.classList.remove('visible');
            modal.addEventListener('transitionend', () => { modal.hidden = true; }, { once: true });
        };

        document.querySelectorAll('.card-expand').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.card, .circle-card');
                const title = card.querySelector('h3').textContent;
                const detail = card.querySelector('.card-detail');
                openModal(title, detail.innerHTML);
            });
        });

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
    }

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
