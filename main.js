// Initialize Lenis Smooth Scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update);

// Use GSAP ticker to update Lenis
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable GSAP lag smoothing to avoid conflicts with Lenis
gsap.ticker.lagSmoothing(0);

// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
    // We will initialize animations here
});

// Kinetic Typography Parallax
document.addEventListener("DOMContentLoaded", () => {
    // Parallax scrolling for the background text
    gsap.to("#kinetic-tagline", {
        xPercent: -50, // Move it to the left
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1 // Smooth scrubbing
        }
    });
});

    // Animate panels on scroll
    gsap.utils.toArray('.panel').forEach((panel, i) => {
        gsap.from(panel, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: panel,
                start: "top 80%", // trigger when top of panel hits 80% of viewport
                toggleActions: "play none none reverse"
            }
        });
    });

    // Add smooth scroll to nav links
    document.querySelectorAll('.nav-btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                lenis.scrollTo(targetElement, {
                    offset: -100, // adjust for header height
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });
