async function loadDesignerPortfolio() {
    const grid = document.getElementById('gallery-grid');

    try {
        const response = await fetch('./data/projects.json');
        if (!response.ok) throw new Error('Failed to load portfolio data.');

        const projects = await response.json();
        grid.innerHTML = '';

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';

            card.innerHTML = `
                <div class="image-wrapper">
                    <img src="${project.thumbnail}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <div>
                        <h3 class="project-title">${project.title}</h3>
                        <p style="color: #777; font-size: 0.85rem; margin-top: 0.2rem;">
                            ${project.client ? project.client + ' — ' : ''}${project.year || ''}
                        </p>
                    </div>
                    <span class="project-category">${project.category}</span>
                </div>
            `;

            // Open full-screen image in lightbox on click
            card.addEventListener('click', () => {
                openLightbox(project.thumbnail, `${project.title} — ${project.category}`);
            });

            grid.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading projects:', error);
        grid.innerHTML = '<p style="color: #ff5555;">Could not load portfolio projects.</p>';
    }
}

// Lightbox Handler Functions
function openLightbox(imageSrc, captionText) {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    modalImg.src = imageSrc;
    caption.textContent = captionText;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Global Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadDesignerPortfolio();

    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close');

    closeBtn.addEventListener('click', closeLightbox);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeLightbox();
    });
});