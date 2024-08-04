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

    for (const el of tabs) {
        el.style.gridTemplateColumns = `repeat(${el.querySelectorAll('.tab').length}, minmax(0, 1fr))`
    }

    // 


    // SLIDERS

    
    
    // SELECTS

    (() => {
        var x, i, j, l, ll, selElmnt, a, b, c, spanText, bCont;
        /* Look for any elements with the class "custom-select": */
        x = document.getElementsByClassName("custom-select");
        l = x.length;
        for (i = 0; i < l; i++) {
          selElmnt = x[i].getElementsByTagName("select")[0];
          ll = selElmnt.length;
          /* For each element, create a new DIV that will act as the selected item: */
          a = document.createElement("DIV");
          a.setAttribute("class", "select-selected");
          spanText = document.createElement("SPAN");
          spanText.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
          x[i].appendChild(a);
          a.appendChild(spanText)
          spanText.outerHTML += `<svg width='24px' height="24px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.96967 8.96967C4.26256 8.67678 4.73744 8.67678 5.03033 8.96967L12 15.9393L18.9697 8.96967C19.2626 8.67678 19.7374 8.67678 20.0303 8.96967C20.3232 9.26256 20.3232 9.73744 20.0303 10.0303L12.5303 17.5303C12.2374 17.8232 11.7626 17.8232 11.4697 17.5303L3.96967 10.0303C3.67678 9.73744 3.67678 9.26256 3.96967 8.96967Z"/></svg>`
          /* For each element, create a new DIV that will contain the option list: */
          b = document.createElement("DIV");
          bCont = document.createElement("DIV");
          b.setAttribute("class", "select-items select-hide");
          bCont.setAttribute("class", "select-items__items");
          for (j = 1; j < ll; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.parentNode.previousSibling.querySelector('span');
                for (i = 0; i < sl; i++) {
                  if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                      y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                  }
                }
                h.click();
            });
            bCont.appendChild(c);
          }
          x[i].appendChild(b);
          b.appendChild(bCont)
          a.addEventListener("click", function(e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");

          });
        }

        function closeAllSelect(elmnt) {
          /* A function that will close all select boxes in the document,
          except the current select box: */
          var x, y, i, xl, yl, arrNo = [];
          console.log(elmnt)
          x = document.getElementsByClassName("select-items");
          y = document.getElementsByClassName("select-selected");
          xl = x.length;
          yl = y.length;
          for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
              arrNo.push(i)
            } else {
              y[i].classList.remove("select-arrow-active");
            }
          }
          for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
              x[i].classList.add("select-hide");
            }
          }
        }

        /* If the user clicks anywhere outside the select box,
        then close all select boxes: */
        // document.addEventListener("click", closeAllSelect);
    })()

    // SELECTS END
    

    // scrollsanchors

    const scrollItems = document.querySelectorAll('[data-scrollto]')
    const header = document.querySelector('.header')


    scrollItems.forEach((el) => {
        let target = el.dataset.scrollto

        if(target){
            el.addEventListener('click', (e) => {
                e.preventDefault()
                const yOffset = -header.clientHeight; 
                const element = document.getElementById(target);
                const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

                window.scrollTo({top: y, behavior: 'smooth'});
            })
        }
    })

    // 
})