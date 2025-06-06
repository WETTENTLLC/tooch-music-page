// Main JavaScript Controller for Tooch Magooch Music Page
class ToochMusicApp {
    constructor() {
        this.isInitialized = false;
        this.components = {};
        this.settings = {
            animations: true,
            sound: true,
            notifications: true
        };
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        if (this.isInitialized) return;

        console.log('Initializing Tooch Magooch Music App...');
        
        // Initialize core components
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupFormHandlers();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupErrorHandling();
        this.setupPerformanceOptimizations();
        
        // Initialize external components
        this.initializeExternalComponents();
        
        this.isInitialized = true;
        console.log('Tooch Magooch Music App initialized successfully');
    }

    setupNavigation() {
        // Highlight active navigation items based on scroll position
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    setupScrollEffects() {
        // Parallax effect for hero section
        const heroSection = document.querySelector('section.relative.h-screen');
        const heroImage = document.getElementById('hero-image');
        
        if (heroSection && heroImage) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;
                heroImage.style.transform = `translateY(${parallax}px)`;
            });
        }

        // Fade in sections on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            section.classList.add('fade-target');
            observer.observe(section);
        });
    }

    setupFormHandlers() {
        // Contact form handler
        const contactForm = document.querySelector('#contact form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(contactForm);
            });
        }

        // Newsletter signup handlers
        const notifyButtons = document.querySelectorAll('button:contains("Get Notified")');
        notifyButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleNewsletterSignup();
            });
        });
    }

    handleContactForm(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show success message
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            console.log('Contact form submitted:', data);
        }, 2000);
    }

    handleNewsletterSignup() {
        // Create modal for email input
        const modal = this.createModal('Get Notified', `
            <form id="newsletter-form">
                <div class="mb-4">
                    <label for="newsletter-email" class="block mb-2">Email Address</label>
                    <input type="email" id="newsletter-email" name="email" 
                           class="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 focus:outline-none focus:border-purple-500" 
                           required>
                </div>
                <button type="submit" class="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full w-full">
                    Subscribe
                </button>
            </form>
        `);

        const form = modal.querySelector('#newsletter-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('#newsletter-email').value;
            
            // Simulate newsletter signup
            setTimeout(() => {
                this.closeModal(modal);
                this.showNotification('Successfully subscribed! You\'ll be notified of updates.', 'success');
                console.log('Newsletter signup:', email);
            }, 1000);
        });
    }

    setupMobileMenu() {
        const menuButton = document.querySelector('nav button');
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-menu';
        mobileNav.innerHTML = `
            <a href="#music">Music</a>
            <a href="#videos">Videos</a>
            <a href="#merch">Merch</a>
            <a href="#tour">Tour</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <button class="close-menu text-white text-2xl mt-8">&times;</button>
        `;
        
        document.body.appendChild(mobileNav);

        if (menuButton) {
            menuButton.addEventListener('click', () => {
                mobileNav.classList.add('active');
            });
        }

        const closeButton = mobileNav.querySelector('.close-menu');
        closeButton.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });

        // Close on link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
            });
        });
    }

    setupSmoothScrolling() {
        // Smooth scroll for anchor links
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
    }

    setupIntersectionObserver() {
        // Animate elements when they come into view
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        });

        document.querySelectorAll('.playlist li, .video-thumbnails > div').forEach(el => {
            animateOnScroll.observe(el);
        });
    }

    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Application error:', e.error);
            // Don't show error to user unless it's critical
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            e.preventDefault();
        });
    }

    setupPerformanceOptimizations() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Optimize scroll listeners
        let ticking = false;
        const optimizedScrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll handling code here
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Throttle resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Resize handling code here
            }, 150);
        });
    }

    initializeExternalComponents() {
        // Wait for external components to be available
        setTimeout(() => {
            // Initialize music system
            if (typeof initializeMusicSystem === 'function') {
                initializeMusicSystem();
                this.components.music = window.musicConfig;
            }

            // Initialize bubbles
            if (window.simpleBubbles) {
                this.components.simpleBubbles = window.simpleBubbles;
            }
            
            if (window.photoBubbles) {
                this.components.photoBubbles = window.photoBubbles;
            }
        }, 1000);
    }

    // Utility methods
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} fixed top-4 right-4 z-50 px-6 py-3 rounded-md text-white`;
        notification.style.background = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.style.transform = 'translateX(0)', 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay fixed inset-0 bg-black/50 z-50 flex items-center justify-center';
        modal.innerHTML = `
            <div class="modal-content bg-gradient-to-br from-purple-900 to-purple-800 rounded-15 p-6 max-w-md w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-white">${title}</h3>
                    <button class="close-modal text-white text-2xl">&times;</button>
                </div>
                <div class="text-white">${content}</div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', () => this.closeModal(modal));
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });
        
        return modal;
    }

    closeModal(modal) {
        if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }
}

// Add CSS for animations and notifications
const mainStyles = document.createElement('style');
mainStyles.textContent = `
    .fade-target {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification {
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    
    nav a.active {
        color: #a855f7;
        position: relative;
    }
    
    nav a.active::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #a855f7;
    }
    
    .modal-overlay {
        animation: modalFadeIn 0.3s ease;
    }
    
    @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .modal-content {
        animation: modalSlideIn 0.3s ease;
    }
    
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
`;
document.head.appendChild(mainStyles);

// Initialize the main application
const toochMusicApp = new ToochMusicApp();

// Export for global access
window.ToochMusicApp = ToochMusicApp;
window.toochMusicApp = toochMusicApp;

// Expose utility functions globally
window.showNotification = (message, type) => toochMusicApp.showNotification(message, type);
window.createModal = (title, content) => toochMusicApp.createModal(title, content);
