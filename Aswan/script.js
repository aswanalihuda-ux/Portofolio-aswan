document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Controls
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // Modal photo close event on backdrop click
    const photoModal = document.getElementById('modalPhoto');
    if (photoModal) {
        photoModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closePhotoModal();
            }
        });
    }

    // Close cert modal on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            closeCertModal();
        }
    });
});

// Filter Skills
function filterSkills(category) {
    const cards = document.querySelectorAll('.skill-card');
    const buttons = document.querySelectorAll('.skill-tab-btn');

    buttons.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.className = "skill-tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-cyan-500 text-slate-950 active-tab";
        } else {
            btn.className = "skill-tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-slate-800 text-slate-300 hover:bg-slate-700";
        }
    });

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter Projects
function filterProjects(category) {
    const cards = document.querySelectorAll('.proj-card');
    const buttons = document.querySelectorAll('.proj-filter-btn');

    buttons.forEach(btn => {
        if (btn.getAttribute('data-proj') === category) {
            btn.classList.add('bg-cyan-500', 'text-slate-950');
            btn.classList.remove('bg-slate-800', 'text-slate-300');
        } else {
            btn.classList.remove('bg-cyan-500', 'text-slate-950');
            btn.classList.add('bg-slate-800', 'text-slate-300');
        }
    });

    cards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        if (category === 'all' || cardType === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal Controls (General)
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Certificate Modal Controls
function openCertModal(title, imgSrc) {
    const modal = document.getElementById('certModal');
    const modalContent = document.getElementById('certModalContent');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');

    modalTitle.textContent = title;
    modalImage.src = imgSrc;

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);

    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    const modalContent = document.getElementById('certModalContent');

    if (!modal) return;

    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Photo Documentation Modal Controls
function openPhotoModal(imageSrc, title) {
    document.getElementById('photoModalTitle').innerText = title;
    document.getElementById('photoModalImg').src = imageSrc;
    document.getElementById('modalPhoto').classList.remove('hidden');
}

function closePhotoModal() {
    const modal = document.getElementById('modalPhoto');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function openMultiCertModal(title, imageArray) {
    document.getElementById('multiModalTitle').innerText = title;
    
    const container = document.getElementById('multiImageContainer');
    container.innerHTML = ''; // Bersihkan isi sebelumnya
    
    // Looping untuk menampilkan setiap foto
    imageArray.forEach(imgUrl => {
        const imgElement = document.createElement('img');
        imgElement.src = imgUrl;
        imgElement.className = 'w-full h-auto rounded-xl border border-slate-800 object-cover shadow-md hover:scale-105 transition-transform';
        container.appendChild(imgElement);
    });
    
    document.getElementById('multiCertModal').classList.remove('hidden');
}

function closeMultiCertModal() {
    document.getElementById('multiCertModal').classList.add('hidden');
}