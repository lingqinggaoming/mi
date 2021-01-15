import './library/jquery.js';
function swiper() {    
    let swiper = $('#swiper');
    let oImg = $('#swiper ul li');
    let oLi = $('ol li');
    let btl = $('.btl');
    let btr = $('.btr');
    let index = 0;
    let timer = null;
    let num = oLi.length-1;
    function lunbo() {
        timer = setInterval(function () {
            index++;
            index = index > num ? 0 : index;
            change();
        }, 7000);
    }
    function change() {
        oImg.eq(index).stop(true, false).fadeIn(1000).siblings().stop(true, false).fadeOut(1000);
        oLi.eq(index).addClass('active').siblings().removeClass('active');
    }
    lunbo();
    swiper.hover(function () {
        clearInterval(timer);
    }, function () {
        lunbo();
    });        
    btr.on('click', function () {
        index++;
        index = index > num ? 0 : index;
        change();
    })      
    
    btl.on('click', function () {
        index--;
        index = index < 0 ? num : index;
        change();
    })
    oLi.on('click', function () {
        index = $(this).index();
        change();
    })
};
export {swiper};
