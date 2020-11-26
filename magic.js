import gallery from './gallery-items.js'
console.log(gallery);

const createGalleryCards = gallery => {

    const containerLiRef = document.createElement('li')
    containerLiRef.classList.add('gallery__item')

    const linkRef = document.createElement('a');
    linkRef.classList.add('gallery__link')
    linkRef.setAttribute('href', gallery.original)

    const imgRef = document.createElement('img');
    imgRef.classList.add('gallery__image');
    imgRef.setAttribute('src', gallery.preview)
    imgRef.setAttribute('data-source', gallery.original)
    imgRef.setAttribute('alt', gallery.description)
    imgRef.setAttribute('data-index', '???')
    containerLiRef.append(linkRef)
    linkRef.append(imgRef)

    return containerLiRef
}

// gallery.forEach(element => {
//      console.log(createGalleryCards(element));
//  })

const gallaryCard = gallery.map(element => createGalleryCards(element));
const ulListOfGallary = document.querySelector('.gallery');
ulListOfGallary.append(...gallaryCard);


ulListOfGallary.addEventListener('click', onMakeBiggestPicture)
function onMakeBiggestPicture(event) {
    const tagBtn = event.target;
    event.preventDefault()
    if (event.target.nodeName !== 'IMG') {
        console.log('Клацнули не по кнопке, выходим');
        return
    }
    // const lightBoxRef = document.querySelector('.lightbox__image');
    // return console.log(tagBtn.dataset.source);
    lightboxImageRef.src = tagBtn.dataset.source
    onOpenModal()
}

const lightBoxRef = document.querySelector('.lightbox');
const closeBtnRef = document.querySelector('.lightbox__button');
const lightboxImageRef = document.querySelector('.lightbox__image');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
lightboxOverlayRef.addEventListener('click', event => {
    if (event.target === event.currentTarget) {
        onCloseModal();
    };
});
closeBtnRef.addEventListener('click', onCloseModal)
function onOpenModal() {
    lightBoxRef.classList.add('is-open');
    window.addEventListener('keydown', onClickEscape);
};
function onCloseModal() {
    lightboxImageRef.src = ''
    lightBoxRef.classList.remove('is-open');
     window.removeEventListener('keydown', onClickEscape);
};

function onClickEscape(event) {
      if (event.code === 'Escape') {
            onCloseModal();
    };
}