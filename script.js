// SMILE IN AFRICA ADVENTURES - Universal Script

// 1. Preloader Force-Clear (Must be fast)
const clearPreloader = () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transition = '0.5s';
        setTimeout(() => preloader.remove(), 500);
    }
};

// Fallback: If page takes too long, clear preloader anyway
setTimeout(clearPreloader, 3000);

window.addEventListener('load', clearPreloader);

document.addEventListener('DOMContentLoaded', () => {

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // 2. Sticky Navbar & Scroll Events
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('sticky');
        } else {
            navbar?.classList.remove('sticky');
        }

        if (window.scrollY > 500) {
            scrollTopBtn?.classList.add('visible');
        } else {
            scrollTopBtn?.classList.remove('visible');
        }
    });

    // 3. Back to Top Click
    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 4. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileToggle?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            if (navLinks?.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks?.classList.remove('active');
            const icon = mobileToggle?.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });

    // 5. Form Submission Logic
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            if (!btn) return;
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                showToast('Action Successful! We will contact you soon.');
                form.reset();
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;

                // If it's the booking form, maybe redirect or clear selected cards
                document.querySelectorAll('.choice-card').forEach(c => c.classList.remove('selected'));
            }, 2000);
        });
    });

    // 6. Mock Filtering for Packages Page
    const filterBtn = document.querySelector('.filter-bar .btn-cta');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            showToast('Filtering results based on your selection...');
            const cards = document.querySelectorAll('.destinations .card, section .card');
            cards.forEach((card, index) => {
                card.style.display = 'none';
                setTimeout(() => {
                    // Randomly show some cards to simulate filtering
                    if (Math.random() > 0.3) {
                        card.style.display = 'block';
                    }
                }, index * 100);
            });
        });
    }


    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.innerHTML = `<i class="fas fa-check-circle" style="margin-right:10px; color:var(--secondary);"></i> ${message}`;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    // 7. Itinerary Interactivity
    const itineraryDropdowns = document.querySelectorAll('.itinerary-dropdown');
    itineraryDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', () => {
            const icon = dropdown.querySelector('.dropdown-icon');
            if (icon) {
                icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
            }
            showToast('Additional trip details are being loaded...');
        });
    });

    const mapZoomIcons = document.querySelectorAll('.map-zoom-icon');
    mapZoomIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            showToast('Opening full interactive map view...');
        });
    });

    // 8. FAQ Interactivity
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Optional: Close other FAQs
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 9. Choice Card Selection (Booking)
    window.toggleSelection = function (el) {
        el.classList.toggle('selected');
        if (el.classList.contains('selected')) {
            showToast('Great choice! This has been added to your interest list.');
        }
    };

    // 10. Auto-Active Nav Links
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 11. Custom Lightbox for Gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        const lightboxImg = document.createElement('img');
        const lightboxClose = document.createElement('span');
        lightboxClose.className = 'lightbox-close';
        lightboxClose.innerHTML = '<i class="fas fa-times"></i>';
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(lightboxClose);
        document.body.appendChild(lightbox);

        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const img = item.querySelector('img');
                if(img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.add('active');
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => { lightboxImg.src = ''; }, 400); // Wait for transition
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Listen for escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

});

// 12. Package Itinerary Tab Switching
window.openTab = function(evt, tabId) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }

    // Remove 'active' class from all buttons
    const tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove("active");
    }

    // Show the specific tab and mark button as active
    document.getElementById(tabId).classList.add("active");
    evt.currentTarget.classList.add("active");
};
