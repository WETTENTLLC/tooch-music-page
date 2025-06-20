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

        console.log('Initializing Tooch Magooch Music App...');        // Initialize core components
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupFormHandlers();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupErrorHandling();
        this.setupPerformanceOptimizations();
        this.setupVideoPlayer();
        this.setupGalleryFunctionality();
        this.setupPreOrderForms();
        
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

        // Add form handling for pre-order forms
        this.setupPreOrderForms();
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
        });    }    setupMobileMenu() {
        const menuButton = document.getElementById('mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-menu');
        const overlay = document.getElementById('mobile-menu-overlay');
        const closeButton = document.getElementById('close-mobile-menu');
        
        if (!menuButton) {
            console.warn('Mobile menu button not found');
            return;
        }
        
        if (!mobileNav) {
            console.warn('Mobile menu not found');
            return;
        }
        
        if (!overlay) {
            console.warn('Mobile menu overlay not found');
            return;
        }

        // Debug: Log all elements found
        console.log('Mobile menu elements found:');
        console.log('Menu button:', menuButton);
        console.log('Mobile nav:', mobileNav);
        console.log('Overlay:', overlay);
        console.log('Close button:', closeButton);

        // Mobile menu functionality
        const toggleMenu = () => {
            const isActive = mobileNav.classList.contains('active');
            
            if (isActive) {
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
                console.log('Mobile menu closed');
            } else {
                mobileNav.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('Mobile menu opened');
            }
        };
        
        // Menu button click with debugging
        menuButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu button clicked');
            toggleMenu();
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Overlay clicked');
            toggleMenu();
        });
        
        // Close menu when clicking close button
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked');
                toggleMenu();
            });
        }
        
        // Close menu when clicking nav links
        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Nav link clicked');
                toggleMenu();
                // Smooth scroll to section
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
    
    setupSmoothScrolling() {
        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    setupIntersectionObserver() {
        // Enhanced intersection observer for animations
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        document.querySelectorAll('.artist-card, .media-item, .merch-item').forEach(el => {
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
    }    initializeExternalComponents() {
        // Initialize music system
        if (typeof initializeMusicSystem === 'function') {
            initializeMusicSystem();
        }
        
        // Initialize music player
        if (typeof MusicPlayer !== 'undefined') {
            this.components.musicPlayer = new MusicPlayer();
        }
        
        // Initialize photo bubbles
        if (typeof PhotoBubbles !== 'undefined') {
            this.components.photoBubbles = new PhotoBubbles();
        }
        
        // Initialize section lock
        if (typeof SectionLock !== 'undefined') {
            this.components.sectionLock = new SectionLock();
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }
    
    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close handlers
        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = 'auto';
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        return modal;
    }
    
    closeModal(modal) {
        if (modal && modal.parentNode) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    }

    setupVideoPlayer() {
        // Handle video thumbnail clicks
        const videoItems = document.querySelectorAll('.video-item');
        const mainVideoFrame = document.querySelector('#videos iframe');
        
        videoItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoSrc = item.getAttribute('data-video');
                const videoTitle = item.getAttribute('data-title');
                
                // Note: MOV files won't work directly in browsers
                // This is a placeholder for when videos are converted to web-compatible formats
                console.log('Video selected:', videoTitle, videoSrc);
                
                // For now, show an alert since MOV files don't work in browsers
                alert(`${videoTitle} - Video files need to be converted to web-compatible format (MP4) for playback.`);
            });
        });
    }

    setupGalleryFunctionality() {
        // Handle "See More" button for gallery
        const seeMoreBtn = document.getElementById('seeMoreGalleryBtnMain');
        const hiddenImages = document.querySelectorAll('.hidden-gallery-image');
        
        if (seeMoreBtn) {
            seeMoreBtn.addEventListener('click', () => {
                hiddenImages.forEach(img => {
                    img.style.display = 'block';
                });
                seeMoreBtn.style.display = 'none';
            });
        }

        // Handle gallery image clicks for lightbox
        const galleryImages = document.querySelectorAll('.clickable-gallery-img');
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                this.openImageLightbox(img.src, img.alt);
            });
        });
    }

    openImageLightbox(imageSrc, imageAlt) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="${imageSrc}" alt="${imageAlt}" class="lightbox-image">
                <p class="lightbox-caption">${imageAlt}</p>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox functionality
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const closeLightbox = () => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    setupPreOrderForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = form.querySelector('input[type="email"]').value;
                const select = form.querySelector('select');
                const selection = select ? select.value : '';
                
                if (email && selection && selection !== 'Select Size' && selection !== 'Select Color' && selection !== 'Select Bundle') {
                    alert(`Thank you for your pre-order! We'll contact you at ${email} when your ${selection} is available.`);
                    form.reset();
                } else {
                    alert('Please fill in all fields to pre-order.');
                }
            });
        });
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

    .bio-text {
        max-height: 4.5rem; /* Adjust based on your design */
        overflow: hidden;
        transition: max-height 0.6s ease, padding 0.6s ease;
    }
    
    .bio-text.expanded {
        max-height: 20rem; /* Or any large value to accommodate expanded content */
    }
    
    .gallery-item {
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .hidden-gallery-image {
        display: none !important;
    }

    .lightbox-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        overflow: hidden;
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: scale(0.7);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .lightbox-image {
        width: 100%;
        height: auto;
        border-radius: 8px;
    }
    
    .lightbox-caption {
        color: #fff;
        text-align: center;
        margin-top: 10px;
        font-size: 0.9rem;
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

// Read More Bio for About Section (Main Site)
const readMoreBioButtonMain = document.getElementById('readMoreBioAbout');
if (readMoreBioButtonMain) {
    const bioTextElementsMain = document.querySelectorAll('#about .bio-text');
    // Initially, only the first bio-text should be fully visible, others partially or hidden by max-height
    // The button toggles all of them.
    readMoreBioButtonMain.addEventListener('click', function() {
        const btn = this;
        const isExpanded = btn.textContent === 'Read Less...';

        bioTextElementsMain.forEach(function(bioText) {
            bioText.classList.toggle('expanded', !isExpanded);
        });

        btn.textContent = isExpanded ? 'Read More...' : 'Read Less...';
    });
}

// See More for Gallery (Main Site)
const seeMoreGalleryButtonMain = document.getElementById('seeMoreGalleryBtnMain');
if (seeMoreGalleryButtonMain) {
    const hiddenImagesMain = document.querySelectorAll('#media .gallery-item.hidden-gallery-image');
    
    seeMoreGalleryButtonMain.addEventListener('click', function() {
        let allWereRevealedThisClick = true;
        hiddenImagesMain.forEach(function(imgContainer) {
            // Check if it's currently hidden by the class
            if (imgContainer.classList.contains('hidden-gallery-image')) {
                imgContainer.classList.remove('hidden-gallery-image');
                // If we want to reveal one by one, we'd break here after one reveal.
                // For revealing all remaining, we continue.
            } else {
                // If an image was already visible (class removed previously), it doesn't count for this click's reveal action.
                allWereRevealedThisClick = false;
            }
        });

        // After attempting to reveal, check if any are *still* hidden by the class
        let anyStillHidden = false;
        hiddenImagesMain.forEach(item => {
            if(item.classList.contains('hidden-gallery-image')) {
                anyStillHidden = true;
            }
        });

        if (!anyStillHidden) {
            this.textContent = 'Showing All Images';
            this.disabled = true;
        } else {
            this.textContent = 'See More ---->'; // Or update based on how many are left, if desired
            this.disabled = false; // Ensure it's enabled if there are more to show
        }
    });
}
