document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.page-transition-overlay');

    // --- Ensure overlay is fully covering on load ---
    gsap.set(overlay, { y: 0 });
    overlay.style.pointerEvents = 'auto';

    // --- Wait 1s before animating overlay away ---
    gsap.to(overlay, {
        delay: .5, // ⏱️ hold the overlay visible for 1 second
        duration: 1,
        y: "-100%", // move overlay upward to reveal content
        ease: "power4.in",
        onComplete: () => {
            overlay.style.pointerEvents = 'none';
        }
    });

    // --- Handle link clicks and animate overlay in before leaving ---
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
            gsap.set(overlay, { y: "100%" }); // start below screen

            gsap.to(overlay, {
                duration: 1,
                y: "0%", // move overlay up to cover content
                ease: "power4.out",
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