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

// GSAP Observer to capture wheel/touch/pointer inputs
Observer.create({
    type: "wheel,touch,pointer", // Handle wheel, touch, and pointer events
    tolerance: 10,  // Adjust sensitivity for detecting scroll
    preventDefault: true,  // Prevent default scrolling behavior to make custom smooth scrolling
    onUp: () => scrollToSection(currentIndex - 1),  // Scroll up behavior
    onDown: () => scrollToSection(currentIndex + 1),  // Scroll down behavior
    trigger: ".projects",  // Trigger effect when "projects" section is in view
    start: "top bottom",  // Start trigger when section is at the bottom of viewport
    end: "bottom top",  // End trigger when section reaches top of viewport
    markers: false, // Remove for production, used for debugging
    scrub: 1,  // Ensures smooth and synced scroll animation
    invalidateOnRefresh: true,  // Recalculate on window resize or refresh

    // Mobile touch behavior: You may want to adjust these for better user experience
    onTouchStart: () => {
        // Optional: Prevent touch to scroll issues or ensure smoother behavior
    }
});

// Optional: jump to section on load (scroll to top)
window.addEventListener("load", () => {
    gsap.set(window, { scrollTo: sections[0] });
});
