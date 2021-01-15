import "./library/jquery.js";
import { cookie } from "./library/cookie.js";
////////////////////////////////////////////
let shop = cookie.get('shop');
if (shop) {
    shop = JSON.parse(shop);
    let idList = shop.map(elm => elm.id).join();
    $.ajax({
        type: "get",
        url: "../../interface/library/cart.php",
        data: {
            idList
        },
        dataType: "json",
        success: function (res) {
            let temp = '';
            res.forEach((elm, i) => {
                let pic = JSON.parse(elm.picture);
                let arr = shop.filter(val => val.id == elm.id);
                temp += `
                    <li class="items-${elm.id}">
                        <div>
                            <i class="iconfont iconright checked" data-checked="true"></i>
                            <span class="hidden">全选</span>
                        </div>
                        <div class="show">
                            <a href="../html/details.html?id=${elm.id}"><img src="${pic[0].src}" alt=""></a>
                        </div>
                        <div class="goodsname">
                            <a href="../html/details.html?id=${elm.id}">${elm.title}</a>
                        </div>
                        <div class="goodsprice">${elm.price}元</div>                            
                        <div class="goodsnum">
                            <div class="control">
                                <span class="iconfont iconsubtract sub"></span>
                                <em>${arr[0].num}</em>
                                <span class="iconfont iconadd add"></span>
                            </div>                        
                            <p class="textmore">
                                <span>还可买<i></i>件<strong>以上</strong></span>
                            </p>                      
                        </div>
                        <div class="goodstotal">${elm.price * arr[0].num}</div>
                        <div class="close" data-id="${elm.id}">
                            <i class="iconfont iconclose"></i>
                        </div>
                    </li>
                `;
            });

            $('.items').append(temp).find('.close').on('click', function () {
                let remain = shop.filter(elm => elm.id != $(this).attr('data-id'));
                cookie.set('shop', JSON.stringify(remain), 1);
                location.reload();
            });

            (function () {
                $('.items').on('click', '.sub', function () {                                        
                    let i = parseInt($(this).next().html());  
                    let price=parseInt($(this).parent().parent().prev().html());                  
                    $(this).next().html(--i);
                    let id=$(this).parent().parent().parent().attr('class').slice(6);
                    let num=parseInt($(this).next().html());
                    let total = i * (parseInt($('.goodsprice').html()));                    
                    $(this).parents().parents().parents().children('.goodstotal').html(total);
                    if (i < 1) {
                        alert('修改数量不能小于0');
                        i = 1;
                        $(this).next().html(i); 
                        // console.log(parseInt($(this).parent().parent().prev().html()) );
                        $(this).parents().parents().parents().children('.goodstotal').html(parseInt($(this).parents().parents().siblings('.goodspricce').html()));
                        $(this).parent().parent().next().html(parseInt($(this).parent().parent().prev().html()))
                    };
                    fn();
                    foo();
                    fz();
                    addItem(id,price,num);
                });

                $('.items').on('click', '.add', function () {
                    let i = parseInt($(this).prev().html());
                    let price=parseInt($(this).parent().parent().prev().html());
                    $(this).prev().html(++i);
                    let id=$(this).parent().parent().parent().attr('class').slice(6);
                    let num=parseInt($(this).prev().html());
                    let total = i * (parseInt($('.goodsprice').html()));
                    $(this).parents().parents().parents().children('.goodstotal').html(total);
                    if (i > 20) {
                        alert('商品加入购物车数量超过限购数');
                        i = 20;
                        $(this).prev().html(20);
                        $(this).parents().parents().parents().children('.goodstotal').html(i * parseInt($('.goodsprice').html()));
                    };
                    if($(this).parents().parents().siblings('.choice').children('i').html()==='true'){
                        $('.count b').html()
                    }
                    fn();
                    foo();
                    fz();
                    addItem(id,price,num);
                });
            })();
            function fn() {
                let arr1=Array.from( $('.items .goodsnum em'));
                let num=0;
                arr1.forEach(el=>{
                    num+=parseInt($(el).html());                    
                });                
                $('.count span').html(num);
                return num;
            };
            fn();            
            $('.items .iconright').on('click',function(){
                let count=0;
                let reduce=0;
                let arr2=Array.from($("i[data-checked='true']").parents().siblings('.goodsnum').children('.control').children('em'));
                let arr3=Array.from($("i[data-checked='true']").parents().siblings('.goodstotal'));
                arr2.forEach(el=>{
                    count+=parseInt($(el).html());                    
                }); 
                arr3.forEach(el=>{
                    reduce+=parseInt($(el).html());                    
                });
                $(this).attr('data-checked')==='true'?$(this).attr('data-checked','false'):$(this).attr('data-checked','true');
                if($(this).attr('data-checked')==='false'){
                    count-=parseInt($(this).parents().siblings('.goodsnum').children('.control').children('em').html());
                    reduce-=parseInt($(this).parents().siblings('.goodstotal').html());
                    $('.count em').html(count);
                    $('.count b').html(reduce);
                }else{
                    count+=parseInt($(this).parents().siblings('.goodsnum').children('.control').children('em').html());
                    $('.count em').html(count);
                    reduce+=parseInt($(this).parents().siblings('.goodstotal').html());
                    $('.count b').html(reduce);
                }   
            });

            function foo(){
                let count=0;
                let arr2=Array.from($("i[data-checked='true']").parents().siblings('.goodsnum').children('.control').children('em'));
                arr2.forEach(el=>{
                    count+=parseInt($(el).html());                    
                }); 
                $('.count em').html(count);      
            }
            foo();
            function fz(){
                let reduce=0;
                let arr3=Array.from($("i[data-checked='true']").parents().siblings('.goodstotal'));
                arr3.forEach(el=>{
                    reduce+=parseInt($(el).html());                    
                }); 
                $('.count b').html(reduce);
                return reduce;
            }
            fz();
            (function () {
                let other = $('.iconright').not($('.rightall'));
                $('.rightall').on('click', function () {
                    $(this).toggleClass('checked');
                    if ($(this).hasClass('checked')) {
                        !other.has('checked') || other.addClass('checked');
                    } else {
                        other.has('checked') && other.removeClass('checked');
                    }
                });
                other.on('click', function () {
                    $(this).toggleClass('checked');
                    let isAllCheck = Array.from(other).every(el => $(el).hasClass('checked'));
                    isAllCheck ? $('.rightall').addClass('checked') : $('.rightall').removeClass('checked')
                })
            })();

            function addItem(id, price, num ) {
                let shop = cookie.get('shop');
                let product = {
                    id,
                    price,
                    num
                };
                shop = JSON.parse(shop);
                if (shop.some(elm => elm.id == id)) {
                    shop.forEach(el => {
                         el.id == id ? el.num = num : null;
                    })
                } 
                cookie.set('shop', JSON.stringify(shop), 1);
            }
        }
    });
}

