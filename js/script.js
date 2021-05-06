import galleryItems from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  closeModal: document.querySelector('[data-action="close-lightbox"]'),
  largeImage: document.querySelector('.lightbox__image'),
  closeOverModal: document.querySelector('.lightbox__overlay')
};

const createGallery = galleryItems.map(createGallerys => {
    createGallerys = `<li class = "gallery__item">
                            <a class = "gallery__link" href = "${createGallerys.original}">
                                <img class = "gallery__image"
                                    src = "${createGallerys.preview}" 
                                    data-source = "${createGallerys.original}" 
                                    alt = "${createGallerys.description}">
                            </a>
                        </li>`;
    return createGallerys;
});

refs.galleryList.insertAdjacentHTML('afterbegin', createGallery.join(' '));

refs.galleryList.addEventListener('click', handleGalleryClick)
refs.closeModal.addEventListener('click', closeModalRef)
refs.closeOverModal.addEventListener('click', closeModalRef)

function handleGalleryClick(event) {
    event.preventDefault();
    const target = event.target;
    if (target.nodeName !== 'IMG') {
        return
    }
    modalRef(event.target);
}

const setImage = (src = "", alt = "") => {
    refs.largeImage.src = src;
    refs.largeImage.alt = alt;
}
const onKeyDown = event => {
    if (event.code === 'Escape') {
        closeModalRef();
    };
}

function modalRef(openModal) {
    window.addEventListener('keydown', onKeyDown);
    refs.modal.classList.add('is-open');
    setImage(openModal.dataset.source, openModal.dataset.alt);
}

function closeModalRef() {
    window.removeEventListener('keydown', onKeyDown);
    refs.modal.classList.remove('is-open');
    setImage();
}





