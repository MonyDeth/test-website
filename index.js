document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.page-transition-overlay');
    // -- PREVENT FLASH: Keep overlay covering until content is ready --
    gsap.set(overlay, { y: 0 });

    // --- Animate overlay out (bottom to top) ---
    gsap.to(overlay, {
        duration: 1,
        y: "100%", // move up and reveal content
        ease: "power2.inOut",
        delay: 0.1, // slight delay for a cleaner effect
        onComplete: () => {
            overlay.style.pointerEvents = 'none';
        }
    });

    // --- Handle link clicks and wipe-in before leaving ---
    const links = document.querySelectorAll(
        'a[href]:not([href^="#"]):not([href^="mailto:"]):not([href^="http"])'
    );

    links.forEach(link => {
        const linkHref = new URL(link.href, location.origin).pathname;
        const currentPath = window.location.pathname;
        if (linkHref === currentPath) return;

        link.addEventListener('click', e => {
            e.preventDefault();
            const targetUrl = link.href;

            overlay.style.pointerEvents = 'auto';
            gsap.set(overlay, { y: "100%" }); // start below view

            gsap.to(overlay, {
                duration: 1,
                y: "0%", // slide up to cover content
                ease: "power2.inOut",
                onComplete: () => {
                    window.location.href = targetUrl;
                }
            });
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const scrollToProjectsButton = document.getElementById('scroll-to-projects');
    const scrollToProjectsButton2 = document.getElementById('scroll-to-projects2');
    const scrollToContactButton = document.getElementById('scroll-to-contact');
    const projectsSection = document.getElementById('projects');
    const contactSection = document.getElementById('contact');

    if (scrollToProjectsButton && projectsSection) {
        scrollToProjectsButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default anchor link behavior

            projectsSection.scrollIntoView({
                behavior: 'smooth' // Makes the scroll animation smooth
            });
        });
    }
    if (scrollToProjectsButton2 && projectsSection) {
        scrollToProjectsButton2.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default anchor link behavior

            projectsSection.scrollIntoView({
                behavior: 'smooth' // Makes the scroll animation smooth
            });
        });
    }
    if (scrollToContactButton && contactSection) {
        scrollToContactButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default anchor link behavior

            contactSection.scrollIntoView({
                behavior: 'smooth' // Makes the scroll animation smooth
            });
        });
    }
});