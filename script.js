document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Initialize AOS (Animate on Scroll)
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    // Mobile Menu Toggle Logic
    const menuBtn = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Simple toggle for mobile
    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            // Future implementation for mobile menu expansion
            console.log('Mobile menu clicked');
        });
    }

    // GSAP Animations
    // Small hover effects on feature cards using GSAP for smoothness
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: 'none',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Glass Card Floating effect with GSAP (more organic than CSS)
    const glassCard = document.querySelector('.main-glass-card');
    if (glassCard) {
        gsap.to(glassCard, {
            y: -10,
            rotation: 1,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
});
