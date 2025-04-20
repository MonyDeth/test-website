// index.js
gsap.registerPlugin(Observer, ScrollToPlugin);

const sections = gsap.utils.toArray(".section");
let currentIndex = 0;
let isAnimating = false;

// Ensure each section is 100vh height already in CSS
function scrollToSection(index) {
    if (isAnimating || index === currentIndex || index < 0 || index >= sections.length) return;
    isAnimating = true;

    const targetSection = sections[index];
    gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetSection, autoKill: false },
        ease: "power2.inOut",
        onComplete: () => {
            currentIndex = index;
            isAnimating = false;
        }
    });
}

// GSAP Observer to capture wheel/touch inputs
Observer.create({
    type: "wheel,touch,pointer",
    tolerance: 10,
    preventDefault: true,
    onUp: () => scrollToSection(currentIndex - 1),
    onDown: () => scrollToSection(currentIndex + 1),
});

// Optional: jump to section on load (scroll to top)
window.addEventListener("load", () => {
    gsap.set(window, { scrollTo: sections[0] });
});


