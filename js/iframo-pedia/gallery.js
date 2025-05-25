document.addEventListener('DOMContentLoaded', function() {
    // Делаем переменные уникальными для каждой галереи
    const galleries = document.querySelectorAll('.gallery-container');

    galleries.forEach(galleryContainer => {
        const gallery = galleryContainer.querySelector('.gallery');
        const images = gallery.querySelectorAll('img');
        let currentIndex = 0;

        // Создаем уникальный лайтбокс для каждой галереи
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <span id="close-btn">&times;</span>
            <div id="lightbox-content">
                <img id="lightbox-img" src="" alt="lightbox image">
                <div class="lightbox-nav">
                    <button id="prev-btn">&lt; Prev</button>
                    <button id="next-btn">Next &gt;</button>
                </div>
            </div>
            <div id="thumbnail-container"></div>
        `;
        document.body.appendChild(lightbox);

        function openLightbox(event) {
            if (event.target.tagName === 'IMG') {
                currentIndex = Array.from(images).indexOf(event.target);
                updateLightboxImage();
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }

        function updateLightboxImage() {
            const lightboxImg = lightbox.querySelector('#lightbox-img');
            if (images[currentIndex]) {
                lightboxImg.src = images[currentIndex].src;
            }
        }

        gallery.addEventListener('click', openLightbox);

        lightbox.querySelector('#close-btn').addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        });

        lightbox.querySelector('#prev-btn').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        });

        lightbox.querySelector('#next-btn').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateLightboxImage();
        });

        document.addEventListener('keydown', function(e) {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                    updateLightboxImage();
                } else if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % images.length;
                    updateLightboxImage();
                } else if (e.key === 'Escape') {
                    lightbox.style.display = 'none';
                    document.body.style.overflow = '';
                }
            }
        });
    });
});
