const swiper = new Swiper('.swiper', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 2000,
    },
});

const like = document.querySelector('.banner__like');
const paymentMethodsMore = document.querySelector('.info__block-paymentMethods-more');
const salesmanPhoneNumber = document.querySelector('.info__block-salesman-phoneNumber');
const salesmanShowNumber = document.querySelector('.info__block-salesman-showNumber');
const navbarLink2 = document.querySelectorAll('.navbar__link2');
const infoBlock = document.querySelectorAll('.info__block');
const infoShowMore = document.querySelectorAll('.info__show-more');
const showMorePaymentMethods = document.querySelectorAll('.info__show-more-paymentMethods');
const cardsItemLike = document.querySelectorAll('.cards__item-like');
const buttonsGoods = document.querySelector('.info__buttons-goods');
const confirmYourOrder = document.querySelector('.confirmYourOrder');
const confirmYourOrderModal = document.querySelector('.confirmYourOrder__modal');
const confirmYourOrderLoading = document.querySelector('.confirmYourOrder__loading');
const confirmYourOrderTopClose = document.querySelector('.confirmYourOrder__top-close');
const orderAccepted = document.querySelector('.orderAccepted');
const orderAcceptedLoading = document.querySelector('.orderAccepted__loading');
const orderAcceptedModal = document.querySelector('.orderAccepted__modal');
const timer = document.querySelector('.confirmYourOrder__counter-timer');
const counterText = document.querySelector('.confirmYourOrder__counter-text');
const buttonsConfirmOrder = document.querySelector('.confirmYourOrder__buttons-confirmOrder');
const confirmYourOrderButtonsCancel = document.querySelector('.confirmYourOrder__buttons-cancel');
const orderAcceptedTopClose = document.querySelector('.orderAccepted__top-close');
const confirmYourOrderContentInput = document.querySelector('.confirmYourOrder__content-input');
const orderAcceptedButton = document.querySelector('.orderAccepted__button');

const addActive = (arr, item)=> {
    arr.forEach(el => {
        el.classList.remove('active');
    })
    item.classList.add('active');
}

const showInfoBlock = (arr, link)=> {
    const linkInnerHTML = link.querySelector('span').innerHTML;
    
    arr.forEach(el => {
        const id = el.getAttribute('id');
        el.classList.remove('active');
        if(id === linkInnerHTML) el.classList.add('active');
    });
}

navbarLink2.forEach(item => {
    item.addEventListener('click', (e)=>{
        e.preventDefault();
        addActive(navbarLink2, item);
        showInfoBlock(infoBlock, item);
    });
});

like.addEventListener('click', function() {
    this.classList.toggle('active')
})

infoShowMore.forEach(item => {
    item.addEventListener('click', function() {
        const parent = this.closest('.info__block');
        parent.classList.toggle('showMore')
    })
})

salesmanShowNumber.addEventListener('click', function(){
    salesmanPhoneNumber.classList.toggle('show')
})

showMorePaymentMethods.forEach(item => {
    item.addEventListener('click', ()=> {
        const parent = item.closest('.info__block-paymentMethods');
        const description = parent.querySelector('.info__block-paymentMethods-more')
        description.classList.toggle('show');
    })
})

cardsItemLike.forEach(item => {
    item.addEventListener('click', function(){
        this.classList.toggle('active');
    })
})

let minutes = 1;
let seconds = 60;
let id;

const openConfirmYourOrder = ()=> {
    document.body.style.overflow = 'hidden';
    minutes = 1;
    seconds = 60;
    timer.innerHTML = '2:00'
    confirmYourOrder.classList.add('active');
    confirmYourOrderLoading.style.display = 'block';
    setTimeout(() => {
        confirmYourOrderModal.classList.add('active');
        confirmYourOrderLoading.style.display = 'none';
        counter();
    }, 2000);
}

const closeConfirmYourOrder = ()=> {
    document.body.style.overflow = 'inherit';
    minutes = 1;
    seconds = 60;
    clearTimeout(id);
    confirmYourOrderContentInput.value = '';
    confirmYourOrderModal.classList.remove('active');
    
    setTimeout(() => {
        confirmYourOrder.classList.remove('active');
    }, 500);
}

const openOrderAccepted = async ()=> {
    closeConfirmYourOrder();
    setTimeout(() => {
        document.body.style.overflow = 'hidden';
        orderAcceptedLoading.style.display = 'block';
        orderAccepted.classList.add('active')
    }, 500);
    setTimeout(() => {
        orderAcceptedLoading.style.display = 'none';
        orderAcceptedModal.classList.add('active');
    }, 2500);
}

const closeOrderAccepted = ()=> {
    document.body.style.overflow = 'inherit';
    orderAcceptedModal.classList.remove('active');
    setTimeout(() => {
        orderAccepted.classList.remove('active');
    }, 500);
}

buttonsGoods.addEventListener('click', openConfirmYourOrder)
confirmYourOrderTopClose.addEventListener('click', closeConfirmYourOrder);
confirmYourOrder.addEventListener('click', closeConfirmYourOrder);
confirmYourOrderModal.addEventListener('click', e => e.stopPropagation());

orderAcceptedTopClose.addEventListener('click', closeOrderAccepted);
orderAccepted.addEventListener('click', closeOrderAccepted);
orderAcceptedButton.addEventListener('click', closeOrderAccepted);
orderAcceptedModal.addEventListener('click', e => e.stopPropagation());

buttonsConfirmOrder.addEventListener('click', (e) => {
    e.preventDefault();
    openOrderAccepted();
});
confirmYourOrderButtonsCancel.addEventListener('click', (e) => {
    e.preventDefault();
    closeConfirmYourOrder();
});

function counter() {

    const move = ()=> {

        if(minutes == 0 && seconds == 0) {
            counterText.innerHTML = 'Вы можете получить код повторно!'
            timer.innerHTML = ''
            return
        }

        if(seconds > 0 || minutes != 0){
            id = setTimeout(() => {
                if(seconds == 0 && minutes > 0){
                    minutes = minutes - 1;
                    seconds = 60;
                    move();
                }
                else {
                    seconds = seconds -1;
                    timer.innerHTML = `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`
                    move();
                }
            }, 1000);
        }
    }

    move();
}