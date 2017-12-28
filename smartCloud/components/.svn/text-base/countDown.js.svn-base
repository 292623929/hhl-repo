/* Created by demon on 2017/11/2 0002.*/
;(function ($) {
    var countDown = function (object) {
        this.config = {
            num : 60,
            html : '获取动态码'
        };
        var that = this;

        this.obj = object;

        this.getconfig();
        //扩展配置参数
        if(this.getconfig()){
            $.extend(this.config,this.getconfig());
        }
        console.log(this.getconfig());

        $('#countDown').on('click', function () {
            var _count = $('#countDown');
            _count.attr('disabled',"true");
            _count.html(that.config.num + '秒');
            var timer = setInterval(() => {
                    that.hello();
                    if(that.config.num == 0){
                        that.config.num = 60;
                        clearInterval(timer);
                    }
            },1000);
        });
    };
    countDown.prototype ={
        hello: function () {
            var _count = $('#countDown');
            this.config.num--;
            _count.html(this.config.num + '秒');
            if(this.config.num == 0){
                _count.html(this.config.html);
                _count.removeAttr("disabled");
            }
        },
        getconfig: function () {
            var config = this.obj.attr('data-config');
            if (config && config != ''){
                return $.parseJSON(config)
            }else{
                return null;
            }
        }
    };
    window.countDown = countDown;
})(jQuery);
