/* Created by demon on 2017/12/20 0020.*/
/* Created by demon on 2017/9/29 0029.*/
;(function () {
    'use strict';
    var oldsrc = '';

    $(function () {
        //initswiper();
    });

    //function initswiper(){

        var mySwiper = new Swiper('.swiper1', {
            loop: true,
            // 如果需要分页器
            pagination: '.swiper-pagination',
            autoplay: 5000,
            speed: 1000,
            paginationClickable: true,
            autoplayDisableOnInteraction: false
        });

        var certifySwiper = new Swiper('#certify .swiper-container', {
            watchSlidesProgress: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            loopedSlides: 5,
            autoplay: 3000,
            speed: 2000,
            direction: 'vertical',
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplayDisableOnInteraction : false,    //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
            onProgress: function (swiper, progress) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slide = swiper.slides.eq(i);
                    var slideProgress = swiper.slides[i].progress;
                    var modify = 1;
                    if (Math.abs(slideProgress) > 1) {
                        modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                    }
                    var translate = slideProgress * modify * 260 + 'px';
                    var scale = 1 - Math.abs(slideProgress) / 5;
                    var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                    slide.transform('translateY(' + translate + ') scale(' + scale + ')');
                    slide.css('zIndex', zIndex);
                    slide.css('opacity', 1);
                    if (Math.abs(slideProgress) > 3) {
                        slide.css('opacity', 0);
                    }
                }
            },
            onSetTransition: function (swiper, transition) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slide = swiper.slides.eq(i);
                    slide.transition(transition);
                }
            },
            //处理分页器bug
            onSlideChangeStart: function (swiper) {
                if (swiper.activeIndex == 4) {
                    swiper.bullets.eq(9).addClass('swiper-pagination-bullet-active');
                }
            }
        });
    //}

    $(".company img").hover(function(){
        oldsrc = $(this).attr('src');
        var a = oldsrc.charAt(oldsrc.length - 5);
        var newsrc = '../img/index/companyactive' + a + '.png';
        $(this).attr('src',newsrc);
    },function(){
        $(this).attr('src',oldsrc);
    });

    //咨询服务弹窗
    $(".infowin .right").hover(function(){
        $('.infowin .left').css('opacity','1');
    });
    $(".infowin").mouseleave(function(){
        $('.infowin .left').css('opacity','0');
    });

    //主营业务
    $(".dl>div, .dr>div").hover(function(){
        var index = $(this).attr('data-id');
        var html = '<img class="animation-fadeIn" src="../img/index/ywbac'+ index + '.png" alt="主营业务">';
        $('.dmid').html(html);
    },function(){});

    //头部导航
    $(".head li").hover(function(){
        var index = $(this).attr('data-id');
        var w = $(this).width() + 30;
        var l = $(this).offset().left -  $(".head ul").offset().left;
        pullnavmenu(index);
        $(".head .line").css({
            width: w,
            left: l
        });
    },function(){});

    function pullnavmenu(index){
        $(".navmenu-wrapper").fadeOut();
        $(".navmenu" + index).slideDown();
    }

    $(".navmenu-wrapper").mouseleave(function(){
        $(".head .line").css('width','0');
        $(".navmenu-wrapper").fadeOut();
    });
}());







