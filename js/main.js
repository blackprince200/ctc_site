// Global JavaScript for CTC Website
document.addEventListener('DOMContentLoaded', function() {
    // Page loading animation
    const body = document.body;
    const currentPage = body.getAttribute('data-page');
    
    // Add page-specific class for styling
    if (currentPage) {
        body.classList.add(`page-${currentPage}`);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add loading animation removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});