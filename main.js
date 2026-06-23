// Initialize Lenis Smooth Scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


document.addEventListener("DOMContentLoaded", () => {
    // 1. Custom Cursor Follower with Inertia using gsap.quickTo
    const cursor = document.getElementById('custom-cursor');
    if(cursor) {
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        let xTo = gsap.quickTo(cursor, "x", {duration: 0.15, ease: "power2.out"});
        let yTo = gsap.quickTo(cursor, "y", {duration: 0.15, ease: "power2.out"});

        window.addEventListener('mousemove', e => {
            xTo(e.clientX);
            yTo(e.clientY);
        });
    }

    // 2. Hero Glitch Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Quick glitching sequence for the logo
    tl.to(".gl-1", { opacity: 1, clipPath: "inset(10% 0 80% 0)", x: -10, duration: 0.1 })
      .to(".gl-2", { opacity: 1, clipPath: "inset(80% 0 10% 0)", x: 10, duration: 0.1 }, "<")
      .to(".gl-1", { clipPath: "inset(40% 0 20% 0)", x: 20, duration: 0.1 })
      .to(".gl-2", { clipPath: "inset(20% 0 40% 0)", x: -20, duration: 0.1 }, "<")
      .to(".gl-1, .gl-2", { opacity: 0, x: 0, duration: 0.1 })
      // Scale up main logo
      .from(".logo-glitch-container > img:first-child", { scale: 0.8, opacity: 0, filter: "brightness(500%)", duration: 1.5, ease: "expo.out" }, "-=0.2")
      // Fade in text
      .from(".glitch-text", { y: 20, opacity: 0, duration: 1, stagger: 0.2 }, "-=1")
      .from("h2.text-matrix\\/80", { y: 20, opacity: 0, duration: 1 }, "-=0.8");


    // 3. Kinetic Typography Parallax
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

    // 4. Animate content panels on scroll
    gsap.utils.toArray('.panel').forEach((panel, i) => {
        gsap.from(panel, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: panel,
                start: "top 85%", // trigger when top of panel hits 85% of viewport
                toggleActions: "play none none reverse"
            }
        });
    });

    // 5. Smooth scroll to nav links
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
});
