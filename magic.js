import gallery from './gallery-items.js'

const createGalleryCards = (gallery, index) => {

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
    imgRef.setAttribute('data-index', `${ index }`)
    containerLiRef.append(linkRef)
    linkRef.append(imgRef)

    return containerLiRef
}


const gallaryCard = gallery.map((element, index) => createGalleryCards(element, index));
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

    lightboxImageRef.src = tagBtn.dataset.source
    onOpenModal();
}

// ulListOfGallary.addEventListener('keydown', onClickLeftRight)


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

    // КаРуСеЛь

    let index =  Number(event.target.dataset.index);
 
    const imageArrayRef = document.querySelectorAll('.gallery__image');


    window.addEventListener('keydown', event => {
        if (event.code === 'ArrowLeft') {
            index -= 1;
            
            if (index < 0) {
               index = imageArrayRef.length - 1;
            };
            
            lightboxImageRef.src = imageArrayRef[index].dataset.source;

        };

        if (event.code === 'ArrowRight') {
            index += 1;

            if (index > imageArrayRef.length -1) {
                index = 0;
            }
            
            lightboxImageRef.src = imageArrayRef[index].dataset.source;
        };
    });
    
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

// function onClickLeftRight(event) {
//     console.log(event.target);
//     const activeIndex = Number(event.target.firstElementChild.dataset.index);
//     let index = activeIndex
//     console.log(activeIndex);
//     if (event.code === 'ArrowRight') {
//         lightboxImageRef.src = gallery[`${index + 1}`].original;

//     } else if (event.code === 'ArrowLeft') {
//         lightboxImageRef.src = gallery[`${index - 1}`].original;
//     }
// }
