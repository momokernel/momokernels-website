const navbar = document.querySelector('.floating-nav');
const body = document.body;

let lastScrollTop = 0;
const offset = 50; 

// --- New Feature: Dynamic Admin Link Visibility ---


// --- Scroll Logic for Floating Nav ---
window.addEventListener('scroll', function() {
    if (!navbar) return;
    
    // Disable floating nav hiding on mobile screens (<= 1024px) or when the mobile menu is open
    if (window.innerWidth <= 1024 || body.classList.contains('mobile-menu-open')) {
        navbar.classList.remove('nav-hidden');
        return;
    }

    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > offset) {
        navbar.classList.add('nav-hidden');
    } 
    else {
        navbar.classList.remove('nav-hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

document.addEventListener('DOMContentLoaded', function() {
    


    // --- PDF Modal Logic ---
    const pdfModal = document.getElementById('pdf-modal');
    const pdfIframe = document.getElementById('pdf-iframe');
    const pdfCloseButton = document.querySelector('.pdf-modal-close');
    const osCards = document.querySelectorAll('.os-card');
    const modalTitle = document.getElementById('modal-title');

    function closeModal() {
        if (pdfModal && pdfIframe) {
            pdfModal.style.display = 'none';
            pdfIframe.src = ''; 
            document.body.style.overflow = 'visible'; 
        }
    }

    if (osCards.length > 0 && pdfModal && pdfCloseButton && pdfIframe && modalTitle) {
        
        osCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault(); 
                
                const pdfPath = card.getAttribute('data-pdf');
                const pdfTitle = card.getAttribute('data-title') || card.querySelector('h3').textContent;

                if (pdfPath) {
                    modalTitle.textContent = pdfTitle; 
                    pdfIframe.src = pdfPath; 
                    pdfModal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; 
                } else {
                    alert(`Fehler: Keine PDF-Datei für ${pdfTitle} definiert.`);
                }
            });
        });

        pdfCloseButton.addEventListener('click', closeModal);

        window.addEventListener('click', (event) => {
            if (event.target === pdfModal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && pdfModal.style.display === 'block') {
                closeModal();
            }
        });
    }
    
    // --- Mobile Menu Toggle Logic ---
    const menuToggle = document.getElementById('menuToggle');
    const startItem = document.getElementById('menu-toggle-item');
    const startLink = startItem ? startItem.querySelector('a') : null;
    const desktopNav = document.querySelector('.floating-nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            body.classList.toggle('mobile-menu-open');
            // Close flyout when main menu is closed
            if (!body.classList.contains('mobile-menu-open') && startItem) {
                startItem.classList.remove('flyout-open');
            }
        });
    }

    // --- Mega Menu Toggle Logic (Desktop - Click-based) ---
    if (startItem) {
        startLink.addEventListener('click', function(e) {
            
            // Handle desktop click (Mega Menu)
            if (window.innerWidth > 1024) {
                e.preventDefault(); 
                desktopNav.classList.toggle('menu-expanded');
            } 
            // Handle mobile click (Accordion)
            else {
                const wasOpen = startItem.classList.contains('flyout-open'); 
                startItem.classList.toggle('flyout-open');
                
                if (!wasOpen) {
                    e.preventDefault(); 
                } 
                
                document.querySelectorAll('.globalnav-item.flyout-open').forEach(item => {
                    if (item !== startItem) {
                        item.classList.remove('flyout-open');
                    }
                });
            }
        });
    }

    // --- Click Outside Menu Logic ---
    document.addEventListener('click', function(e) {
        const isClickOutsideNav = desktopNav && !desktopNav.contains(e.target);
        const isClickOnToggle = menuToggle && menuToggle.contains(e.target);
        
        // Close mobile menu if open and click is outside nav and not on the toggle button
        if (body.classList.contains('mobile-menu-open') && isClickOutsideNav && !isClickOnToggle) {
            body.classList.remove('mobile-menu-open');
            if (startItem) {
                startItem.classList.remove('flyout-open');
            }
        } 
        
        // Close desktop mega menu if open and click is outside the floating nav
        else if (desktopNav && desktopNav.classList.contains('menu-expanded') && window.innerWidth > 1024) {
            if (isClickOutsideNav) {
                desktopNav.classList.remove('menu-expanded');
            }
        }
    });

    // --- OS Collapse Buttons Logic ---
    const toggleButtonMac = document.getElementById('toggleOsButtonMac');
    const collapseWrapperMac = document.getElementById('osCollapseWrapperMac');
    if (toggleButtonMac && collapseWrapperMac) {
        toggleButtonMac.addEventListener('click', function() {
            collapseWrapperMac.classList.toggle('collapsed');
            toggleButtonMac.textContent = collapseWrapperMac.classList.contains('collapsed') 
                ? 'macOS Systeme anzeigen (24)' 
                : 'macOS Systeme ausblenden';
        });
    }
    const toggleButtonWin = document.getElementById('toggleOsButtonWin');
    const collapseWrapperWin = document.getElementById('osCollapseWrapperWin');
    if (toggleButtonWin && collapseWrapperWin) {
        toggleButtonWin.addEventListener('click', function() {
            collapseWrapperWin.classList.toggle('collapsed');
            toggleButtonWin.textContent = collapseWrapperWin.classList.contains('collapsed') 
                ? 'Windows Systeme anzeigen (13)' 
                : 'Windows Systeme ausblenden';
        });
    }
});
