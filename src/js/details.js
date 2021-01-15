import './library/jquery.js';
import { cookie } from './library/cookie.js';
import { swiper } from './swiper.js';
/////////////////////////////////////
swiper();///////////////////////调用轮播图
////////////详情页渲染//////////////////////
let id = location.search.split('=')[1];
$.ajax({
    type: "get",
    url: "../../interface/library/details.php",
    data: {
        id,
    },
    dataType: "json",
    success: function (res) {
        let pic = JSON.parse(res.picture);
        let img1 = `<img src="${pic[1].src}" alt="">`;
        let img2 = `<img src="${pic[2].src}" alt="">`;
        let img3 = `<img src="${pic[3].src}" alt="">`;
        let img4 = `<img src="${pic[4].src}" alt="">`;
        let img5 = `<img src="${pic[5].src}" alt="">`;
        let goods = `
            <h2 class="goods-title">${res.title}</h2>
            <div class="goods-text">
                <i>${res.short}</i>
                <span>${res.slogan}</span>
            </div>
            <div class="tip">小米自营</div>
            <div class="price">
                <span>${res.price}</span>
                <span>元</span>
                <del class="origin-price">${res.originprice}元</del>
            </div>
        `;
        let result = `
            <p>
            <span>${res.title}</span>
            <em class="right">${res.price}元<del>${res.originprice}元</del></em>
            </p>
            <div class="count">
            总计：<span>${res.price}元</span>
            </div>
        `;
        let temp = `${res.details}`;
        $('#swiper a').eq(0).append(img1);
        $('#swiper a').eq(1).append(img2);
        $('#swiper a').eq(2).append(img3);
        $('#swiper a').eq(3).append(img4);
        $('#swiper a').eq(4).append(img5);
        $('.goods').append(goods);
        $('.result').append(result);
        $('.datails-box').append(temp);
        $('#addItem').on('click', function () {            
            addItem(res.id, res.price, num);
            num++;
            console.log(num);
            location.assign('cart.html');
        })
    }
});
var num = 1;
function addItem(id, price, num ) {
    let shop = cookie.get('shop');
    let product = {
        id,
        price,
        num
    };
    if (shop) {
        shop = JSON.parse(shop);
        if (shop.some(elm => elm.id == id)) {
            shop.forEach(el => {
                el.id == id ? el.num = num : null;
            })
        } else {
            shop.push(product);
        }
    } else {
        shop = [];
        shop.push(product)
    }
    cookie.set('shop', JSON.stringify(shop), 1);

}

