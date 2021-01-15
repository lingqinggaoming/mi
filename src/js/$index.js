import './library/jquery.js';
import './library/jquery.lazyload.js';
import {swiper} from './swiper.js';
////////////////////////////
(function() {
    $("img.lazy").lazyload({effect: "fadeIn"});
})();
///////////////////////////
swiper();
///////////////////////////
$.ajax({
    type: "get",
    url: "../../mi/interface/library/$index.php",
    dataType: "json",
    success: function (res) {
        console.log(res);
        let temp = '';
        res.forEach((elm, i) => {
            let pic = JSON.parse(elm.picture);
            temp += `
                <li>
                    <a href="./html/details.html?id=${elm.id}">
                        <img src="${pic[0].src}"
                            alt="">
                        <h3>${elm.title}</h3>
                        <p>${elm.intro}</p>
                        <div class="price"><span>${elm.peice}元</span><span>起</span></div>
                    </a>
                </li>      
                `;
        });       
        $('.cphone-r-item').append(temp);
    }
});
///////////////////////////////////////
