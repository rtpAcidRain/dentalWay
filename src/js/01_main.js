const html = document.querySelector('html')
let modals,
    modalOpenButs,
    handleModalOpen,
    handleModalClose,
    MODAL_TIME = 400,
    modalSetTimeout,
    openedModal,
    header;

const defaultFractionPag = (el) => {
    return {
        el: el,
        type: 'fraction',
        formatFractionCurrent(number) {
            return (`0${number}`).slice(-2);
        },
        formatFractionTotal(number) {
            return (`0${number}`).slice(-2);
        },
        renderFraction(currentClass, totalClass) {
            return `<span class="${currentClass} text-text-d px-[4.5px]"></span>`
               + '<span>|</span>'
               + `<span class="${totalClass} text-text-at px-[4.5px]"></span>`;
        },
    }
}


const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};
  
documentHeight();
window.addEventListener("resize", documentHeight);


document.addEventListener("DOMContentLoaded", () => {
    // Modals
    modals = document.querySelectorAll('.modal')
    modalOpenButs = document.querySelectorAll('[data-modal]')
    let modalCloseButs = document.querySelectorAll('.modal-close')

    handleModalOpen = (modalId, button) => {
        clearTimeout(modalSetTimeout)
        openedModal = document.getElementById(modalId)
        if(button.dataset.modalScrollblock){
            html.classList.add('something-opened')
        }
        modals.forEach((el) => {
            if(el.id === modalId){
                el.classList.add('mounted')
                el.classList.add('opened')
            }
        })
        button.classList.add('modal-opened')
    }

    handleModalClose = (callback, attr1, attr2) => {
        let modal = openedModal
        openedModal = undefined
        modal.classList.remove('opened')

        modalOpenButs.forEach((el) => {
            if(el.dataset.modal ===  modal.id){
                el.classList.remove('modal-opened')
            }
        })
        
        modalSetTimeout = setTimeout(() => {
            html.classList.remove('something-opened')
            modal.classList.remove('mounted')
            if(callback){
                callback(attr1, attr2)
            }
        }, MODAL_TIME)
    }

    modalCloseButs.forEach((el) => {
        el.addEventListener('click', function () {
            handleModalClose()
        })
    })

    modals.forEach((el) => {
        el.addEventListener('click', function () {
            handleModalClose()
        })

        el.querySelector('.modal__container').addEventListener('click', function (e) {
            e.stopPropagation()
        })
    })


    modalOpenButs.forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault()
            if(el.classList.contains('modal-opened')){
                handleModalClose()
            } else {
                if(!openedModal){
                    handleModalOpen(el.dataset.modal, el)
                } else {
                    handleModalClose(handleModalOpen, el.dataset.modal, el)
                }
            }
        })
    })


    // Modals END ------------------------>

    // Accordeon

    const accs = document.querySelectorAll('.accardeon')
    
    accs.forEach((acc) => {
        const accItems = acc.querySelectorAll(':scope > .accardeon-item')
        accItems.forEach((accItem) => {
            const accItemBut = accItem.querySelector('.accardeon-item__but')

            accItemBut.addEventListener('click', () => {
                if(accItem.classList.contains('opened')){
                    accItem.classList.remove('opened')
                } else {
                    accItems.forEach((accItem2) => {
                        accItem2.classList.remove('opened')
                    })
                    accItem.classList.add('opened')
                }
            })
    
        })
    })


    // Accordeon END ------------------------>

    // Header

    const headerTop = document.querySelector('.header__top')
    let scrolled = window.scrollY
    
    if(window.innerWidth > 768){
        document.addEventListener('scroll', function() {
            scrolled = window.scrollY

            if(scrolled >= headerTop.clientHeight) {
                if(!html.classList.contains('header-close')){
                    html.classList.add('header-close')
                }
            } else {
                if(html.classList.contains('header-close')){
                    html.classList.remove('header-close')
                }
            }
        })
    }

    // Header END ------------------------>


    // SITENAVIGATION

    const navigationOnSite = document.querySelectorAll('.navigation-on-site')

    navigationOnSite.forEach((el) => {
        const els = el.querySelectorAll('.navigation-on-site__el')

        function closeNavig() {
            els.forEach((el) => {
                el.classList.remove('opened')
            })
        }

        els.forEach((el) => {
            const openBut = el.querySelector('.navigation-on-site__but')
            const closeBut = el.querySelector('.navigation-on-site__body__heading__close')

            openBut.addEventListener('click', function() {
                if(el.classList.contains('opened')) {
                    el.classList.remove('opened')
                } else {
                    closeNavig()
                    el.classList.add('opened')
                }
            })

            if(closeBut){
                closeBut.addEventListener('click', function() {
                    closeNavig()
                })
            }
        })
    })

    // SITENAVIGATION ------------------------->

    // TABS

    const tabs = document.querySelectorAll('.tabs')

    tabs.forEach((el) => {
        el.style.gridTemplateColumns = `repeat(${el.querySelectorAll('.tab').length}, minmax(0, 1fr))`
    })

    // 


    // SLIDERS

    
})