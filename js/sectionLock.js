// Section Lock Enhancement
// Ensures perfect section locking behavior across all browsers

class SectionLock {
    constructor() {
        this.sections = document.querySelectorAll('.snap-section');
        this.currentSection = 0;
        this.isScrolling = false;
        this.scrollTimeout = null;
        
        this.init();
    }
    
    init() {
        // Add scroll event listener
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: false });
        
        // Add wheel event for manual scroll control
        window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
        
        // Add touch events for mobile
        let startY = 0;
        window.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        window.addEventListener('touchend', (e) => {
            const endY = e.changedTouches[0].clientY;
            const deltaY = startY - endY;
            
            if (Math.abs(deltaY) > 50) { // Minimum swipe distance
                if (deltaY > 0) {
                    this.scrollToNextSection();
                } else {
                    this.scrollToPrevSection();
                }
            }
        }, { passive: true });
        
        // Ensure proper initial positioning
        this.updateCurrentSection();
        
        // Handle navigation clicks
        this.setupNavigationLinks();
    }
    
    handleScroll() {
        if (this.isScrolling) return;
        
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.updateCurrentSection();
            this.snapToCurrentSection();
        }, 100);
    }
    
    handleWheel(e) {
        e.preventDefault();
        
        if (this.isScrolling) return;
        
        if (e.deltaY > 0) {
            this.scrollToNextSection();
        } else {
            this.scrollToPrevSection();
        }
    }
    
    updateCurrentSection() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        this.sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop - windowHeight / 2 && 
                scrollPosition < sectionBottom - windowHeight / 2) {
                this.currentSection = index;
            }
        });
    }
    
    snapToCurrentSection() {
        if (this.sections[this.currentSection]) {
            const targetSection = this.sections[this.currentSection];
            const targetTop = targetSection.offsetTop;
            
            if (Math.abs(window.scrollY - targetTop) > 10) {
                this.scrollToSection(this.currentSection);
            }
        }
    }
    
    scrollToSection(index) {
        if (index < 0 || index >= this.sections.length) return;
        
        this.isScrolling = true;
        this.currentSection = index;
        
        const targetSection = this.sections[index];
        
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            this.isScrolling = false;
        }, 1000);
    }
    
    scrollToNextSection() {
        if (this.currentSection < this.sections.length - 1) {
            this.scrollToSection(this.currentSection + 1);
        }
    }
    
    scrollToPrevSection() {
        if (this.currentSection > 0) {
            this.scrollToSection(this.currentSection - 1);
        }
    }
    
    setupNavigationLinks() {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const sectionIndex = Array.from(this.sections).indexOf(targetSection);
                    if (sectionIndex !== -1) {
                        this.scrollToSection(sectionIndex);
                    }
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure CSS is applied
    setTimeout(() => {
        new SectionLock();
    }, 100);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const sectionLock = window.sectionLock;
    if (!sectionLock) return;
    
    switch(e.key) {
        case 'ArrowDown':
        case 'PageDown':
            e.preventDefault();
            sectionLock.scrollToNextSection();
            break;
        case 'ArrowUp':
        case 'PageUp':
            e.preventDefault();
            sectionLock.scrollToPrevSection();
            break;
        case 'Home':
            e.preventDefault();
            sectionLock.scrollToSection(0);
            break;
        case 'End':
            e.preventDefault();
            sectionLock.scrollToSection(sectionLock.sections.length - 1);
            break;
    }
});
