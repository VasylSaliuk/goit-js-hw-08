import arrayOfImages from '../js/gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const imageCardMarkup = createImageMarkup(arrayOfImages);
const lightboxImage = document.querySelector('.lightbox__image');
const lightbox = document.querySelector('.js-lightbox');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const lightboxCloseButton = document.querySelector('button[data-action="close-lightbox"]');

galleryContainer.insertAdjacentHTML('beforeend', imageCardMarkup);
galleryContainer.addEventListener('click', onGalleryContainerClick);
lightboxCloseButton.addEventListener('click', lightboxCloseHandler);
lightboxOverlay.addEventListener('click', onClickOverlay);

function createImageMarkup(images) {
    return images.map(({original, preview, description}, index) => {
        return `
        <li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}"
        >
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-index="${index}"
            alt="${description}"
            />
        </a>
        </li>`;
    }).join('');
};

function onGalleryContainerClick(evt) {
    evt.preventDefault();
    const isGalleryEl = evt.target.classList.contains('gallery__image')
    if(!isGalleryEl) {
        return;
    };

    const originalSizeImg = evt.target.dataset.source;
    lightboxImage.src = originalSizeImg;
    lightbox.classList.add('is-open');
    addKeydownListener();
};

function addKeydownListener() {
    document.addEventListener('keydown', onPressEscape);
}

function lightboxCloseHandler() {
    lightbox.classList.remove('is-open');
    lightboxImage.src = '';
    removeKeydownListener();
}

function removeKeydownListener() {
    document.removeEventListener('keydown', onPressEscape);
}

function onClickOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        lightboxCloseHandler()
    }
};

function onPressEscape(evt) {
    if (evt.code === 'Escape') {
        lightboxCloseHandler()
    }
}


