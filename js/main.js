document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#main-nav a');
    const sections = document.querySelectorAll('.section');
    const connectContent = document.querySelector('.connect-content');

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
