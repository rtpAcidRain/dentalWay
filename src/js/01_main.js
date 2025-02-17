const html = document.querySelector('html')
let modals,
    modalOpenButs,
    handleModalOpen,
    handleModalClose,
    MODAL_TIME = 400,
    modalSetTimeout,
    openedModal,
    header,
    reviewImagesSliderConfig,
    openVideo,
    changeCurrentSlideFromClick = {};

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

function loadScript( url, callback ) {
    var script = document.createElement( "script" )
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;
    
    if(script.readyState) {  // only required for IE <9
      script.onreadystatechange = function() {
        if ( script.readyState === "loaded" || script.readyState === "complete" ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {  //Others
      script.onload = function() {
        callback();
      };
    }
  
    script.src = url;
    document.getElementsByTagName( "head" )[0].appendChild( script );
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
        modals.forEach((el) => {
            if(el.id === modalId){
                el.classList.add('mounted')
                el.classList.add('opened')
            }
        })
        html.classList.add('something-opened')
        
        if(button){
            if(button.dataset.modalEnablescroll !== undefined){
                html.classList.remove('something-opened')
            }
            button.classList.add('modal-opened')
            if(modalId === 'mobileNav') {
                document.querySelectorAll('[data-modal="mobileNav"]').forEach(el => el.classList.add('modal-opened'))
            }
            if(button.dataset.modalName){
                if(openedModal.querySelector('.modal-form-title')){
                    openedModal.querySelector('.modal-form-title').innerHTML = button.dataset.modalName
                }
            }
        }
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

    [...modalCloseButs].forEach((el) => {
        el.addEventListener('click', function (e) {
            e.preventDefault()
            handleModalClose()
        })
    })

    modals.forEach((el) => {
        el.addEventListener('click', function () {
            handleModalClose()
        })

        if(el.querySelector('.modal__container')){
            el.querySelector('.modal__container').addEventListener('click', function (e) {
                e.stopPropagation()
            })
        }

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

    const accs = document.querySelectorAll('.accardeon');
    const accsScope =  [...accs];
    
    accsScope.forEach((acc) => {
        const accItems = acc.querySelectorAll(':scope > .accardeon-item');
        [...accItems].forEach((accItem) => {
            const accItemBut = accItem.querySelector('.accardeon-item__but')

            
            accItemBut.addEventListener('click', (e) => {
                e.stopPropagation()
                acc.classList.add('sm-opened')
                if(accItem.classList.contains('opened')){
                    accItem.classList.remove('opened')
                    acc.classList.remove('sm-opened')
                } else {
                    accItems.forEach((accItem2) => {
                        accItem2.classList.remove('opened')
                    })
                    accItem.classList.add('opened')
                }
            })
    
        })

        // test
        acc.addEventListener('click', function(e) {
            e.stopPropagation()
        })
    })

    
    // test
    document.addEventListener('click', function () {
        accsScope.forEach((acc) => {
            if(!acc.classList.contains('static-list')){
                const accItems = acc.querySelectorAll(':scope > .accardeon-item');
                [...accItems].forEach((accItem) => {
                    accItem.classList.remove('opened')
                })
                acc.classList.remove('sm-opened')
            }
        })
    })



    // Accordeon END ------------------------>

    // Header

    const headerTop = document.querySelector('.header__top')
    let scrolled = window.scrollY

   function doSomethingWithHeader() {
        if(scrolled >= headerTop.clientHeight) {
            if(!html.classList.contains('header-close')){
                html.classList.add('header-close')
            }
        } else {
            if(html.classList.contains('header-close')){
                html.classList.remove('header-close')
            }
        }
   }
   doSomethingWithHeader()

    document.addEventListener('scroll', function() {
        scrolled = window.scrollY;

        doSomethingWithHeader()
    })

    // Header END ------------------------>

    // SLIDERS

    // REVIEW IMAGES SLIDER

    reviewImagesSliderConfig = (el) => {
        return new Swiper(el.querySelector('.swiper'), {
            slidesPerView: 'auto',
            spaceBetween: 12,
            touchMoveStopPropagation: true,
            navigation: {
                nextEl: el.querySelector('.review-slider__button.next'),
                prevEl: el.querySelector('.review-slider__button.before'),
            }
        }
    )
    };

    const reviewImagesSlider = document.querySelectorAll('.review-slider');

    reviewImagesSlider.forEach((el) => {
        const slider = reviewImagesSliderConfig(el)
    });


    const defaultSliders = document.querySelectorAll('.swiper-container');

    [...defaultSliders].forEach((el) => {
        const sliderDataset = el.querySelector('.swiper').dataset;
        const slider = new Swiper(el.querySelector('.swiper'), {
            spaceBetween: sliderDataset.sliderSb ?? 16,
            slidesPerView: sliderDataset.sliderSpv ?? 'auto',
            pagination: defaultFractionPag(el.querySelector('.swiper-controls .pagination')),
            autoHeight: sliderDataset.sliderAh === 'false' ? false : true,
            effect: sliderDataset.sliderEffect ?? undefined,
            onAny(eventName, ...args) {
                if(eventName === "paginationUpdate" || eventName === "afterInit"){
                    if(this.pagination.el){
                        if(this.pagination.el.classList.contains('swiper-pagination-lock')){
                            this.el.closest('.swiper-container').classList.add('remove-pagination')
                        } else {
                            this.el.closest('.swiper-container').classList.remove('remove-pagination')
                        }
                    }
                }                
            },
            navigation:{
                prevEl: el.querySelector('.swiper-controls .prev'),
                nextEl: el.querySelector('.swiper-controls .next'),
            },
            breakpoints: {
                768: {
                    slidesPerView: sliderDataset.sliderMdSpv ?? 2,
                    spaceBetween: sliderDataset.sliderMdSb ?? 16,
                },
                1294: {
                    slidesPerView: sliderDataset.sliderXlSpv ?? 3,
                    spaceBetween: sliderDataset.sliderXlSb ?? 30,
                }
            }
        })

        if(el.classList.contains('swiper-with-count')) {
            const slides = el.querySelectorAll('.swiper-slide')

            slides.forEach((el, i) => {
                el.innerHTML += `<span class="absolute right-5 top-5 text-bg-white" style='font-size: 38px; font-weight: 700; line-height: 42px; letter-spacing: 0.02em;' >${i > 9 ? (i + 1) : ('0' + i + 1)}</span>`;
            })
        
        }
        if(sliderDataset.sliderCanChangeFromDoc){
            changeCurrentSlideFromClick[el.getAttribute('id')] = function(ind) {
                slider.slideTo(ind)
            }
        }

    })

    // SIMPLE SLIDE TOGGLER 

    const sst = document.querySelectorAll('.sst');

    [...sst].forEach((el) => {
        const tabs = el.querySelectorAll('.sst-tabs > *');
        const slides = el.querySelectorAll('.sst-slides > *');
        tabs[0].classList.add('selected');
        slides[0].classList.add('selected');

        [...tabs].forEach((el, i) => {
            el.addEventListener('click', function(e) { 
                e.preventDefault()
                for(let j = 0; j < tabs.length; j++){
                    tabs[j].classList.remove('selected')
                    slides[j].classList.remove('selected')
                }
                this.classList.add('selected')
                slides[i].classList.add('selected')
            })
        })
    })


    // SITENAVIGATION

    const navigationOnSite = document.querySelectorAll('.navigation-on-site');

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
    });

    // SITENAVIGATION ------------------------->

    // HEADERSERVICESSEARCH
    (function(){
        const searchInputsModal = document.querySelectorAll('.local-header-services-search');

        [...searchInputsModal].forEach((el) => {
            const form = el.querySelector('.local-header-services-search__form')
            const input = el.querySelector('.local-header-services-search__input')
            const list = [...el.querySelectorAll('.navigation-on-site__body__list a')]
            const result = el.querySelector('.local-header-services-search__result')

            form.addEventListener('submit', function(e) {
                e.preventDefault()
                const resultFilter = list.filter((res) => res.innerText.toLowerCase().includes(input.value.toLowerCase()))
                const resultList = [...resultFilter]

                if(resultList.length > 0){
                    result.innerHTML = '';
                    resultList.forEach((el) => {
                        result.appendChild(el.cloneNode(true))
                    })
                } else {
                    result.innerHTML = `<span class="text-body1 text-el-it">Ничего не найдено</span>`
                }
            })
        })
    })()

    // HEADERSERVICESSEARCH ------------------------->

    // TABS

    const tabs = document.querySelectorAll('.tabs');

    for (const el of tabs) {
        el.style.gridTemplateColumns = `repeat(${el.querySelectorAll('.tab').length}, minmax(0, 1fr))`
    };

    // 



    // SELECTS

    (() => {
        var x, i, j, l, ll, a, b, c, spanText, bCont;
        /* Look for any elements with the class "custom-select": */
        x = document.getElementsByClassName("custom-select");
        l = x.length;
        for (i = 0; i < l; i++) {
          let selElmnt = x[i].getElementsByTagName("select")[0];
          const multipleCheck = selElmnt.hasAttribute('multiple');

          ll = selElmnt.length;
          /* For each element, create a new DIV that will act as the selected item: */
          a = document.createElement("DIV");
          a.setAttribute("class", "select-selected");
          spanText = document.createElement("SPAN");
          spanText.innerHTML = selElmnt.options[selElmnt.selectedIndex] ? selElmnt.options[selElmnt.selectedIndex].innerHTML : 'Выбрать...';
          x[i].appendChild(a);
          a.appendChild(spanText)
          spanText.outerHTML += `<svg width='24px' height="24px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.96967 8.96967C4.26256 8.67678 4.73744 8.67678 5.03033 8.96967L12 15.9393L18.9697 8.96967C19.2626 8.67678 19.7374 8.67678 20.0303 8.96967C20.3232 9.26256 20.3232 9.73744 20.0303 10.0303L12.5303 17.5303C12.2374 17.8232 11.7626 17.8232 11.4697 17.5303L3.96967 10.0303C3.67678 9.73744 3.67678 9.26256 3.96967 8.96967Z"/></svg>`
          /* For each element, create a new DIV that will contain the option list: */
          b = document.createElement("DIV");
          bCont = document.createElement("DIV");
          b.setAttribute("class", "select-items select-hide");
          bCont.setAttribute("class", "select-items__items");
          for (j = 0; j < ll; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            if(j === selElmnt.selectedIndex){
                c.setAttribute("class", "same-as-selected");
            }
            c.addEventListener("click", function(e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                e.stopPropagation()
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.parentNode.previousSibling.querySelector('span');
                
                for (i = 0; i < sl; i++) {
                  if (s.options[i].innerHTML == this.innerHTML) {
                    if(multipleCheck) {

                        if(s.options[i].selected){
                            s.options[i].selected = false;
                            this.removeAttribute("class", "same-as-selected");
                        } else {
                            s.options[i].selected = true;
                            this.setAttribute("class", "same-as-selected");
                        }

                        h.innerHTML = ''

                        for (y = 0; y < sl; y++) {
                            if(s.options[y].selected){
                                if(h.innerHTML.length > 0) {
                                    h.innerHTML = h.innerHTML + `, ${s.options[y].innerHTML}`
                                } else {
                                    h.innerHTML = `${s.options[y].innerHTML}`
                                }
                            }
                        }

                        if(h.innerHTML.length < 1) {
                            h.innerHTML = 'Выбрать...'
                        }
                        
                        break;
                    }
                    else {
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
                }
                if(!this.closest('.off-submit') && !multipleCheck) {
                    this.closest('form').submit();
                }

                if(!multipleCheck){
                    h.click();
                }
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

          x[i].addEventListener("click", function(e) {
            e.stopPropagation()
          })
        }

        function closeAllSelect(elmnt) {
          /* A function that will close all select boxes in the document,
          except the current select box: */
          var x, y, i, xl, yl, arrNo = [];
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
        document.addEventListener("click", closeAllSelect);
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

    // MASKS

    const inputPhone = document.querySelectorAll('.phone');

    [...inputPhone].forEach((el) => {
      IMask(el,  {
        mask: '+{7}(000)000-00-00'
      });
    })



    // FANCYBOX

    openVideo = (link) => {
        let finallink = link;
        if(finallink.includes('/video/')){
            finallink = finallink.replace('/video/', '/play/embed/')
        }
        const videoFrame = document.getElementById('videoIframe')
        videoFrame.setAttribute('src', finallink)
        Fancybox.show([{
            src: '#videoIframe',
        }])
    }


    Fancybox.bind("[data-fancybox]", {
        contentClick: "toggleCover",
        Images: {
          Panzoom: {
            panMode: "mousemove",
            mouseMoveFactor: 1.1,
            mouseMoveFriction: 0.12,
          },
        },
    });




    // Search
    // searchOnSiteHeader
    const searchOnSite = document.querySelectorAll('.search-on-site-header');
    const searchOnSiteInputs = document.querySelectorAll('.search-on-site-header input');
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) ?? [];
    const searchOnSiteInputHeader = document.getElementById('searchOnSiteInputHeader');
    const headerClearHistorySearch = document.getElementById('headerClearHistorySearch');
    const historySearch = document.getElementById('historySearch');


    for(let i = searchHistory.length - 1; i > searchHistory.length - 6; i--) {
        if(i >= 0 ){
            const but = document.createElement('button')
            but.innerText = searchHistory[i]
            historySearch.appendChild(but)
        }
    }

    [...searchOnSite].forEach((el, i) => {
        el.addEventListener('submit', function() {
            if(searchOnSiteInputs[i].value){
                searchHistory.push(searchOnSiteInputs[i].value)
                localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
            }
        })
    })

    if(headerClearHistorySearch){
        headerClearHistorySearch.addEventListener('click', function() {
            searchHistory.splice(0, searchHistory.length)
            localStorage.removeItem("searchHistory");
            historySearch.innerHTML = ''
        })
    }

    const insertInSearch = document.querySelectorAll('.insert-in-search > *');

    [...insertInSearch].forEach((el) => {
        el.addEventListener('click', function() {
            searchOnSiteInputHeader.value = el.innerHTML
        })
    })


    // SHAREBUTTON


    const btnShare = document.querySelectorAll('.btn-share'),
                    thisUrl = window.location.href,
                    thisTitle = document.title;


    [...btnShare].forEach((el) => {
        if (navigator.share) {
            el.addEventListener('click', function(){
                navigator.share({
                  title: thisTitle,
                  url: thisUrl
                }).then(() => {
                  console.log('Thanks for sharing!');
                })
                .catch(console.error);
            })
        } else {
            el.remove()
            console.log('Web Share API не поддерживается');
        }
    })



    const clinicInput = document.querySelectorAll('.CLINIC_NAME');

    [...clinicInput].forEach((el) => {
        if(thisUrl.includes('/solncevo/')){
            el.value = 'Солнцево';
        } else if (thisUrl.includes('/podolsk/')) {
            el.value = 'Подольск';
        } else if (thisUrl.includes('/mytishchi/')){
            el.value = 'Мытищи';
        }
    })

})




function ajaxForm(obForm, link) {
    if(obForm){
        
        obForm.addEventListener('submit', function(e) {
            e.preventDefault()
            
            const inputs = obForm.querySelectorAll('.input')
            
            function setValidationFormsBot() {
                if(!obForm.querySelector('.checkbox').checked){
                    return false
                }

                // const EMAIL_REGEXP =
                //   /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

                // const PHONE_REGEXP = /\+\d{1}\(\d{3}\)\d{3}-\d{2}-\d{2}/g;

                function createErrorElement(target, text){
                    const error = document.createElement('div')
                    const textError = document.createTextNode(text);
                    error.classList.add('input__errortext')
                    error.appendChild(textError)

                    target.appendChild(error)
                }
            
                [...inputs].forEach((inp) => {
                    if(inp.querySelector('input') && inp.querySelector('input').type !== 'file'){
                        let inputTarget = inp.querySelector('input')
                        inp.classList.remove('error')
                        if(inp.querySelector('.input__errortext')){
                            inp.querySelector('.input__errortext').remove()
                        }
                    
                        if(inputTarget.value.length > 0 ){
                            if(inputTarget.classList.contains('phone')){
                                if(inputTarget.value.length !== 16){
                                    inp.classList.add('error')
                                    createErrorElement(inp, 'Телефон введен неверно')
                                }
                            }
                        } else {
                            inp.classList.add('error')
                            createErrorElement(inp, 'Поле должно быть заполнено')
                        }
                    }
                })
            
                if(obForm.querySelector('.error')){
                  return false
                } else {
                  return true
                }
            
            }
        
            if(!setValidationFormsBot()){
              return false
            }



            obForm.getElementsByClassName('error-msg')[0].innerHTML = '';
        
            let xhr = new XMLHttpRequest();
            xhr.open('POST', link);
        
            xhr.onload = function() {
                if (xhr.status != 200) {
                    alert(`������ ${xhr.status}: ${xhr.statusText}`);
                } else {
                    var json = JSON.parse(xhr.responseText)
                
                    if (! json.success) {
                        let errorStr = '';
                        for (let fieldKey in json.errors) {
                            errorStr += json.errors[fieldKey] + '<br>';
                        }

                        // ������ ������� � ������� � ������� error-msg
                        obForm.getElementsByClassName('error-msg')[0].innerHTML = errorStr;
                    } else {
                        // ���������� ��������� �� �������� ��������

                        if(obForm.closest('.modal')) {
                            obForm.closest('.modal').classList.add('success')
                        } else {
                            handleModalOpen('formSuccess');
                            [...inputs].forEach((inp) => {
                                let inputTarget = inp.querySelector('input')

                                inputTarget.value = ''
                            })
                        }
                    }
                }
            };
        
            xhr.onerror = function() {
                alert("������ �� ������");
            };
        
            // �������� ��� ������ �� �����
            xhr.send(new FormData(obForm));
        });
    }
}



function ChangeDoc(a1)
{
  var cusid_ele = document.getElementsByClassName('DOCTOR_NAME');
for (var i = 0; i < cusid_ele.length; ++i) {
  var item = cusid_ele[i];  
  item.value = a1;
}
}


  function ChangeService(a1)
{
  var cusid_ele = document.getElementsByClassName('SERVICE_NAME');
for (var i = 0; i < cusid_ele.length; ++i) {
  var item = cusid_ele[i];  
  item.value = a1;
}
}

function ChangeClinic(a1)
{
  var cusid_ele = document.getElementsByClassName('CLINIC_NAME');
for (var i = 0; i < cusid_ele.length; ++i) {
  var item = cusid_ele[i];  
  item.value = a1;
}
}