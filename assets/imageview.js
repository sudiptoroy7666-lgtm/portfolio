// Image lightbox functionality
document.querySelectorAll('.screenshot-image').forEach(image => {
    image.addEventListener('click', function () {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${this.src}" alt="${this.alt}" class="modal-image">
                <div class="close-modal">&times;</div>
            </div>
        `;
        document.body.appendChild(modal);

        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        // Close modal on click outside or close button
        modal.addEventListener('click', function (e) {
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function handler(e) {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.removeEventListener('keydown', handler);
                }, 300);
            }
        });
    });
});

// Add loading animation logic
document.querySelectorAll('.screenshot-image').forEach(img => {
    // If image is already loaded (common for local files), show it immediately
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        // Otherwise, hide and fade in
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.4s ease';

        img.addEventListener('load', function () {
            this.style.opacity = '1';
        });

        // Ensure it shows even if there's an error
        img.addEventListener('error', function () {
            this.style.opacity = '1';
        });
    }
});