// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navigation link click handlers
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            scrollToSection(href.substring(1));
        }
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and items for animation
document.querySelectorAll('.service-card, .pricing-card, .contact-item, .feature').forEach(el => {
    if (!el.style.opacity) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    observer.observe(el);
});

// Update nav link active state on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = 'var(--light-text)';
            });
            navLink.style.color = 'var(--primary-gold)';
        }
    });
});

// Add hover effect to pricing cards
document.querySelectorAll('.pricing-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(212, 175, 55, 0.15)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'rgba(212, 175, 55, 0.05)';
    });
});

// Contact form handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Show success message
        const originalHTML = contactForm.innerHTML;
        contactForm.innerHTML = '<p style="color: #d4af37; text-align: center; font-size: 1.2rem; font-weight: 600;">Thank you for reaching out! We will get back to you soon.</p>';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.innerHTML = originalHTML;
            inputs.forEach(input => input.value = '');
            attachFormListeners();
        }, 3000);
    });
}

// Reattach form listeners after reset
function attachFormListeners() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = contactForm.querySelectorAll('input, textarea');
            const originalHTML = contactForm.innerHTML;
            contactForm.innerHTML = '<p style="color: #d4af37; text-align: center; font-size: 1.2rem; font-weight: 600;">Thank you for reaching out! We will get back to you soon.</p>';
            
            setTimeout(() => {
                contactForm.innerHTML = originalHTML;
                inputs.forEach(input => input.value = '');
                attachFormListeners();
            }, 3000);
        });
    }
}

// Parallax effect on hero section - subtle gradient shift
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollY = window.scrollY;
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});

// Smooth scroll behavior for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add click handler to contact info
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        const link = this.querySelector('a');
        if (link) {
            link.click();
        }
    });
});

// Initialize animations on page load
window.addEventListener('load', () => {
    // Trigger initial animations
    document.querySelectorAll('.service-card, .pricing-card, .contact-item').forEach((el, index) => {
        const delay = index * 0.1;
        el.style.animationDelay = `${delay}s`;
    });
    
    // Add a subtle glow effect to gold elements on hover
    document.querySelectorAll('.pricing-item, .feature').forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 15px rgba(212, 175, 55, 0.3)';
        });
        el.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
});

// Performance optimization: throttle scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Animation frame for smooth scrolling
            ticking = false;
        });
        ticking = true;
    }
});

// Add mobile menu close on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (navLinks && hamburger) {
            navLinks.style.display = 'none';
            hamburger.classList.remove('active');
        }
    });
});
