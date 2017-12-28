;(function () {

    // 全局变量开始-----------------------------------------------
    // var _url2 = 'http://192.168.10.195:8769/api-product'; //本地
    var _url2 = 'http://113.142.35.58:8769/api-product'; //线上

    var _totalAmountChartLeft; //总交易金额 左侧图表
    var _totalAmountChartRight = echarts.init(document.getElementById('total-amount-chart-bingtu')); //总交易金额 右侧图表
    var _totalAmountDateType = 1; //总交易金额 日期类型
    var _totalAmountFilterType = 1; //总交易金额 过滤类型
    var _totalAmountDataAll; //总交易金额  数据

    var _payBoxChartLeft; //支付通道 左侧图表
    var _payBoxChartRight = echarts.init(document.getElementById('pay-box-chart-bing')); //支付通道 右侧图表
    var _payBoxDateType = 1; //支付通道 日期类型
    var _payBoxFilterType = 1; //支付通道 过滤类型
    var _payBoxDataAll; //支付通道 数据

    var _userBoxChart = echarts.init(document.getElementById('user-box-Chart')); //用户分析 图表
    var _userBoxAddDataAll; //用户分析 新增用户数据
    var _userBoxTotalDataAll; //用户分析 累计用户数据

    var _hotProductDateType = '1'; //热销产品 日期类型
    var _sellerIncomeDateType = '1'; //商户收入排行 日期类型

    var _postChartLeft = echarts.init(document.getElementById('post-chart-left'));//订单邮寄 左侧地图
    var _postChartRight = echarts.init(document.getElementById('post-chart-right-zhu')); //订单邮寄 右侧图表
    var _postChartRightType = '1'; //订单邮寄 右侧图表类型

    // 全局变量结束-----------------------------------------------

    // 初始化函数 开始-----------------------------------------------
    $(function () {
        showOpenTime(); //显示 打开网页时间
        showSummaryData(); //显示顶部 概述的数据
        showTotalAmountData(); //获取 总交易金额的数据
        getPayBoxData(); //获取 支付通道的数据
        getUserChartData(); //获取 用户分析的数据
        gethotProductData(); //获取 热销产品的数据
        getSellerIncomeData(); //获取 商户收入的数据
        showMapRightChart(); //邮寄 右边柱状图
        showMapLeftChart(); //订单邮寄 左侧地图
    });
    // 初始化函数 结束-----------------------------------------------

    //显示 打开网页时间
    function showOpenTime() {
        var nowDate = new Date();
        $('.open-time span').html(nowDate.toLocaleDateString() + '  ' + nowDate.toLocaleTimeString());
    }

    //显示顶部 概述的数据
    function showSummaryData() {
        $.ajax({
            url: _url2 + "/testLoginCtr/testData",
            type: "get",
            data: {},
            success: function (data) {
                console.log(data);
                $('.summary-box .userCount').html(data.data.userCount);
                $('.summary-box .proCount').html(data.data.proCount);
                $('.summary-box .orderCount').html(data.data.orderCount);
                $('.summary-box .dealCount').html(data.data.dealCount);
                $('.summary-box .commerCount').html(data.data.commerCount);
                $('.summary-box .checkCount').html(data.data.checkCount);
            },

        });
    }

    /**
     * 总交易金额 开始
     */
    //总交易金额 切换日期 改变表格
    $('.total-amount-box .filter-date button').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        _totalAmountDateType = $(this).attr('type');
        showTotalAmountData(); //总交易金额 获取数据
    });

    //总交易金额 获取数据
    function showTotalAmountData() {
        $.ajax({
            url: _url2 + "/tradeMoney/getTradeMoneyList",
            type: "get",
            data: {
                type: _totalAmountDateType
            },
            success: function (data) {
                console.log(data);

                if (data.code == '0') {
                    _totalAmountDataAll = data.data;

                    //今天
                    if (_totalAmountDateType == '1') {
                        //柱状图
                        var opt = initTotalAmountchartZhu(_totalAmountDataAll, _totalAmountFilterType);
                        if (_totalAmountChartLeft) {
                            echarts.dispose(_totalAmountChartLeft);
                        }
                        _totalAmountChartLeft = echarts.init(document.getElementById('total-amount-chart')); //总交易金额 第一天 柱状图
                        _totalAmountChartLeft.setOption(opt);

                        //饼图
                        var opt2 = initTotalAmountchartBing(_totalAmountDataAll, _totalAmountFilterType);
                        _totalAmountChartRight.setOption(opt2);
                    }

                    //星期
                    if (_totalAmountDateType == '2') {
                        //折线图
                        var opt = initTotalAmountchartZheXian(_totalAmountDataAll, _totalAmountFilterType);
                        if (_totalAmountChartLeft) {
                            echarts.dispose(_totalAmountChartLeft);
                        }
                        _totalAmountChartLeft = echarts.init(document.getElementById('total-amount-chart')); //总交易金额 第一天 柱状图
                        _totalAmountChartLeft.setOption(opt);

                        //饼图
                        var opt2 = initTotalAmountchartBing(_totalAmountDataAll, _totalAmountFilterType);
                        _totalAmountChartRight.setOption(opt2);
                    }

                    //月
                    if (_totalAmountDateType == '3') {
                        //折线图
                        var opt = initTotalAmountchartZheXian(_totalAmountDataAll, _totalAmountFilterType);
                        if (_totalAmountChartLeft) {
                            echarts.dispose(_totalAmountChartLeft);
                        }
                        _totalAmountChartLeft = echarts.init(document.getElementById('total-amount-chart')); //总交易金额 左侧图表
                        _totalAmountChartLeft.setOption(opt);

                        //饼图
                        var opt2 = initTotalAmountchartBing(_totalAmountDataAll, _totalAmountFilterType);
                        _totalAmountChartRight.setOption(opt2);
                    }
                }
            },
        });
    }

    //总交易金额 折线图
    function initTotalAmountchartZheXian(obj, type) {

        // 金额
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['在线商城订单', '扫码支付订单']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: obj.dateList
            },
            yAxis: {
                type: 'value',
                name: '元(单位)'
            },
            series: [{
                name: '在线商城订单',
                type: 'line',

                data: obj.shopMoneyList
            },
                {
                    name: '扫码支付订单',
                    type: 'line',

                    data: obj.payMoneyList
                }
            ]
        };

        // 订单数
        var option2 = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['在线商城订单', '扫码支付订单']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: obj.dateList
            },
            yAxis: {
                type: 'value',
                name: '笔(单位)'
            },
            series: [{
                name: '在线商城订单',
                type: 'line',

                data: obj.shopNumList
            },
                {
                    name: '扫码支付订单',
                    type: 'line',

                    data: obj.payNumList
                }
            ]
        };

        if (type == '1') {
            return option;
        }
        if (type == '2') {
            return option2;
        }

    }

    //总交易金额 今日 柱状图
    function initTotalAmountchartZhu(obj, type) {

        // 金额 柱状图的配置项
        var optionMoneyZhu = {
            /*title: {
                text: obj.dateList[0]
            },*/
            tooltip: {},
            legend: {
                data: ["在线商城订单", "扫码支付订单"]
            },
            xAxis: {
                data: [obj.dateList[0]]
            },
            yAxis: {
                name: '元(单位)'
            },
            series: [{
                name: '在线商城订单',
                type: 'bar',
                data: [obj.shopCountmoney]
            }, {
                name: '扫码支付订单',
                type: 'bar',
                data: [obj.payCountmoney]
            }]
        };

        // 订单数 柱状图的配置项
        var optionOrderZhu = {
            /*title: {
                text: obj.dateList[0]
            },*/
            tooltip: {},
            legend: {
                data: ["在线商城订单", "扫码支付订单"]
            },
            xAxis: {
                data: [obj.dateList[0]]
            },
            yAxis: {
                name: '笔(单位)'
            },
            series: [{
                name: '在线商城订单',
                type: 'bar',
                data: [obj.shopCountorder]
            }, {
                name: '扫码支付订单',
                type: 'bar',
                data: [obj.payCountorder]
            }]
        };

        if (type == '1') {
            return optionMoneyZhu;
        }
        if (type == '2') {
            return optionOrderZhu;
        }
    }

    //总交易金额 饼图
    function initTotalAmountchartBing(obj, type) {
        // 金额 饼图的配置项
        var optionMoneyBing = {
            title: {
                text: '各收入渠道占比',
                subtext: '金额',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}元 ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: '25%',
                data: ['在线商城订单', '扫码支付订单']
            },
            series: [{
                name: '收入渠道',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [{
                    value: obj.shopCountmoney,
                    name: '在线商城订单'
                }, {
                    value: obj.payCountmoney,
                    name: '扫码支付订单'
                }],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };

        // 订单数 饼图的配置项
        var optionOrderBing = {
            title: {
                text: '各收入渠道占比',
                subtext: '订单数',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}笔 ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: '25%',
                data: ['在线商城订单', '扫码支付订单']
            },
            series: [{
                name: '收入渠道',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [{
                    value: obj.shopCountorder,
                    name: '在线商城订单'
                },
                    {
                        value: obj.payCountorder,
                        name: '扫码支付订单'
                    }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };

        if (type == '1') {
            return optionMoneyBing;
        }
        if (type == '2') {
            return optionOrderBing;
        }
    }

    //改变总交易金额 筛选类型
    $('.total-amount-box select').change(function () {
        _totalAmountFilterType = $(this).val();

        if (_totalAmountDateType == '1') {
            //柱状图
            var opt = initTotalAmountchartZhu(_totalAmountDataAll, _totalAmountFilterType);
            _totalAmountChartLeft.setOption(opt);
        }
        if (_totalAmountDateType == '2') {
            //折线图
            var opt = initTotalAmountchartZheXian(_totalAmountDataAll, _totalAmountFilterType);
            _totalAmountChartLeft.setOption(opt);
        }
        if (_totalAmountDateType == '3') {
            //折线图
            var opt = initTotalAmountchartZheXian(_totalAmountDataAll, _totalAmountFilterType);
            _totalAmountChartLeft.setOption(opt);
        }

        //饼图
        var opt2 = initTotalAmountchartBing(_totalAmountDataAll, _totalAmountFilterType);
        _totalAmountChartRight.setOption(opt2);
    });

    /**
     * 支付通道 开始
     */

    //支付通道 切换日期 改变表格
    $('.pay-box .filter-date button').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        _payBoxDateType = $(this).attr('type');
        getPayBoxData(); //总交易金额 获取数据
    });

    //支付通道 获取数据
    function getPayBoxData() {
        $.ajax({
            url: _url2 + "/tradeMoney/getPaySelect",
            type: "get",
            data: {
                type: _payBoxDateType
            },
            success: function (data) {
                console.log(data);

                if (data.code == '0') {
                    _payBoxDataAll = data.data;

                    //今天
                    if (_payBoxDateType == '1') {
                        //柱状图
                        var opt = initPayBoxChartZhu(_payBoxDataAll, _payBoxFilterType);
                        if (_payBoxChartLeft) {
                            echarts.dispose(_payBoxChartLeft);
                        }
                        _payBoxChartLeft = echarts.init(document.getElementById('pay-box-chart-left')); //支付通道 左侧图表
                        _payBoxChartLeft.setOption(opt);

                        //饼图
                        var opt2 = initPayBoxChartBing(_payBoxDataAll, _payBoxFilterType);
                        _payBoxChartRight.setOption(opt2);
                    }

                    //星期
                    if (_payBoxDateType == '2') {
                        //折线图
                        var opt = initPayBoxChartZheXian(_payBoxDataAll, _payBoxFilterType);
                        if (_payBoxChartLeft) {
                            echarts.dispose(_payBoxChartLeft);
                        }
                        _payBoxChartLeft = echarts.init(document.getElementById('pay-box-chart-left')); //总交易金额 第一天 柱状图
                        _payBoxChartLeft.setOption(opt);

                        //饼图
                        var opt2 = initPayBoxChartBing(_payBoxDataAll, _payBoxFilterType);
                        _payBoxChartRight.setOption(opt2);
                    }

                    //月
                    if (_payBoxDateType == '3') {
                        //折线图
                        var opt = initPayBoxChartZheXian(_payBoxDataAll, _payBoxFilterType);
                        if (_payBoxChartLeft) {
                            echarts.dispose(_payBoxChartLeft);
                        }
                        _payBoxChartLeft = echarts.init(document.getElementById('pay-box-chart-left')); //总交易金额 左侧图表
                        _payBoxChartLeft.setOption(opt);

                        //饼图
                        var opt2 = initPayBoxChartBing(_payBoxDataAll, _payBoxFilterType);
                        _payBoxChartRight.setOption(opt2);
                    }
                }
            },
        });
    }

    //支付通道 折线图
    function initPayBoxChartZheXian(obj, type) {

        // 金额
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['微信', '支付宝', '银联', '翼支付', '京东钱包', '百度钱包']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: obj.dateList
            },
            yAxis: {
                type: 'value',
                name: '元(单位)'
            },
            series: [{
                name: '微信',
                type: 'line',

                data: obj.weixinmoney
            }, {
                name: '支付宝',
                type: 'line',

                data: obj.zhifubaomoney
            }, {
                name: '银联',
                type: 'line',

                data: obj.yinlianmoney
            }, {
                name: '翼支付',
                type: 'line',

                data: obj.yizhifumoney
            }, {
                name: '京东钱包',
                type: 'line',

                data: obj.jingdongqianbaomoney
            }, {
                name: '百度钱包',
                type: 'line',

                data: obj.baiduqianbaomoney
            }]
        };

        // 订单数
        var option2 = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['微信', '支付宝', '银联', '翼支付', '京东钱包', '百度钱包']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: obj.dateList
            },
            yAxis: {
                type: 'value',
                name: '笔(单位)'
            },
            series: [{
                name: '微信',
                type: 'line',

                data: obj.weixincount
            }, {
                name: '支付宝',
                type: 'line',

                data: obj.zhifubaocount
            }, {
                name: '银联',
                type: 'line',

                data: obj.yinliancount
            }, {
                name: '翼支付',
                type: 'line',

                data: obj.yizhifucount
            }, {
                name: '京东钱包',
                type: 'line',

                data: obj.jingdongqianbaocount
            }, {
                name: '百度钱包',
                type: 'line',

                data: obj.baiduqianbaocount
            }]
        };

        if (type == '1') {
            return option;
        }
        if (type == '2') {
            return option2;
        }

    }

    //支付通道 今日 柱状图
    function initPayBoxChartZhu(obj, type) {

        // 金额 柱状图的配置项
        var optionMoneyZhu = {
            /*title: {
                text: obj.dateList[0]
            },*/
            tooltip: {},
            legend: {
                data: ['微信', '支付宝', '银联', '翼支付', '京东钱包', '百度钱包']
            },
            xAxis: {
                data: [obj.dateList[0]]
            },
            yAxis: {
                name: '元(单位)'
            },
            series: [{
                name: '微信',
                type: 'bar',
                data: [obj.weixin_money]
            }, {
                name: '支付宝',
                type: 'bar',
                data: [obj.zhifubao_money]
            }, {
                name: '银联',
                type: 'bar',
                data: [obj.yinlian_money]
            }, {
                name: '翼支付',
                type: 'bar',
                data: [obj.yizhifu_money]
            }, {
                name: '京东钱包',
                type: 'bar',
                data: [obj.jingdongqianbao_money]
            }, {
                name: '百度钱包',
                type: 'bar',
                data: [obj.baiduqianbao_money]
            }]
        };

        // 订单数 柱状图的配置项
        var optionOrderZhu = {
            /*title: {
                text: obj.dateList[0]
            },*/
            tooltip: {},
            legend: {
                data: ['微信', '支付宝', '银联', '翼支付', '京东钱包', '百度钱包']
            },
            xAxis: {
                data: [obj.dateList[0]]
            },
            yAxis: {
                name: '笔(单位)'
            },
            series: [{
                name: '微信',
                type: 'bar',
                data: [obj.weixin_count]
            }, {
                name: '支付宝',
                type: 'bar',
                data: [obj.zhifubao_count]
            }, {
                name: '银联',
                type: 'bar',
                data: [obj.yinlian_count]
            }, {
                name: '翼支付',
                type: 'bar',
                data: [obj.yizhifu_count]
            }, {
                name: '京东钱包',
                type: 'bar',
                data: [obj.jingdongqianbao_count]
            }, {
                name: '百度钱包',
                type: 'bar',
                data: [obj.baiduqianbao_count]
            }]
        };

        if (type == '1') {
            return optionMoneyZhu;
        }
        if (type == '2') {
            return optionOrderZhu;
        }
    }

    //支付通道 饼图
    function initPayBoxChartBing(obj, type) {
        // 金额 饼图的配置项
        var optionMoneyBing = {
            title: {
                text: '各支付通道占比',
                subtext: '金额',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}元 ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: '5%',
                data: ['微信', '支付宝', '银联', '翼支付', '京东钱包', '百度钱包']
            },
            series: [{
                name: '支付通道',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [{
                    value: obj.weixin_money,
                    name: '微信'
                }, {
                    value: obj.zhifubao_money,
                    name: '支付宝'
                }, {
                    value: obj.yinlian_money,
                    name: '银联'
                }, {
                    value: obj.yizhifu_money,
                    name: '翼支付'
                }, {
                    value: obj.jingdongqianbao_money,
                    name: '京东钱包'
                }, {
                    value: obj.baiduqianbao_money,
                    name: '百度钱包'
                }],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };

        // 订单数 饼图的配置项
        var optionOrderBing = {
            title: {
                text: '各支付通道占比',
                subtext: '订单数',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}笔 ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: '5%',
                data: ['微信', '支付宝', '银联', '翼支付', '京东钱包', '百度钱包']
            },
            series: [{
                name: '支付通道',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [{
                    value: obj.weixin_count,
                    name: '微信'
                }, {
                    value: obj.zhifubao_count,
                    name: '支付宝'
                }, {
                    value: obj.yinlian_count,
                    name: '银联'
                }, {
                    value: obj.yizhifu_count,
                    name: '翼支付'
                }, {
                    value: obj.jingdongqianbao_count,
                    name: '京东钱包'
                }, {
                    value: obj.baiduqianbao_count,
                    name: '百度钱包'
                }],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };

        if (type == '1') {
            return optionMoneyBing;
        }
        if (type == '2') {
            return optionOrderBing;
        }
    }

    //支付通道 筛选类型
    $('.pay-box select').change(function () {
        _payBoxFilterType = $(this).val();

        if (_payBoxDateType == '1') {
            //柱状图
            var opt = initPayBoxChartZhu(_payBoxDataAll, _payBoxFilterType);
            _payBoxChartLeft.setOption(opt);
        }
        if (_payBoxDateType == '2') {
            //折线图
            var opt = initPayBoxChartZheXian(_payBoxDataAll, _payBoxFilterType);
            _payBoxChartLeft.setOption(opt);
        }
        if (_payBoxDateType == '3') {
            //折线图
            var opt = initPayBoxChartZheXian(_payBoxDataAll, _payBoxFilterType);
            _payBoxChartLeft.setOption(opt);
        }

        //饼图
        var opt2 = initPayBoxChartBing(_payBoxDataAll, _payBoxFilterType);
        _payBoxChartRight.setOption(opt2);
    });

    /**
     * 用户分析  开始
     */

    //获取用户分析的 新增 和累计的数据
    function getUserChartData() {
        //获取新增用户数据
        $.ajax({
            async: false,
            url: _url2 + "/testLoginCtr/addUserData",
            type: "get",
            data: {
                typeId: 2
            },
            success: function (data) {
                console.log(data);

                if (data.code == '0') {
                    _userBoxAddDataAll = data.data;


                }
            },
        });

        //获取累计用户数据
        $.ajax({
            async: false,
            url: _url2 + "/testLoginCtr/totalUserData",
            type: "get",
            data: {
                typeId: 2
            },
            success: function (data) {
                console.log(data);

                if (data.code == '0') {
                    _userBoxTotalDataAll = data.data;


                }
            },
        });

        showUserChart();

    }

    //生成用户分析 图表
    function showUserChart() {
        var timeData = _userBoxAddDataAll.dateList;//x轴 日期数据

        var option = {
            /*title: {
                text: '新增用户和累计用户关系图',
                x: 'center'
            },*/
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['新增用户', '累计用户'],
                x: 'left'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            axisPointer: {
                link: {xAxisIndex: 'all'}
            },
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100,
                    xAxisIndex: [0, 1]
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 100,
                    xAxisIndex: [0, 1]
                }
            ],
            grid: [{
                left: 50,
                right: 50,
                height: '35%'
            }, {
                left: 50,
                right: 50,
                top: '55%',
                height: '35%'
            }],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {onZero: true},
                    data: timeData
                },
                {
                    gridIndex: 1,
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {onZero: true},
                    data: timeData,
                    position: 'top'
                }
            ],
            yAxis: [
                {
                    name: '单位:人(新增用户)',
                    type: 'value'
                    // max : 500
                },
                {
                    gridIndex: 1,
                    name: '单位:人(累计用户)',
                    type: 'value',
                    inverse: true
                }
            ],
            series: [
                {
                    name: '新增用户',
                    type: 'line',
                    symbolSize: 8,
                    hoverAnimation: false,
                    data: _userBoxAddDataAll.userList
                },
                {
                    name: '累计用户',
                    type: 'line',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    symbolSize: 8,
                    hoverAnimation: false,
                    data: _userBoxTotalDataAll.userList
                }
            ]
        };

        _userBoxChart.setOption(option);
    }

    /**
     * 热销产品 开始
     */
    //获取 热销产品 的数据
    function gethotProductData() {
        //获取新增用户数据
        $.ajax({
            url: _url2 + "/testLoginCtr/hotProductData",
            type: "get",
            data: {
                typeId: _hotProductDateType
            },
            success: function (data) {
                console.log(data);

                if (data.code == '0') {
                    showhotProductTable(data.data.objList);
                }
            },
        });

    }

    //生成 热销产品表格
    function showhotProductTable(arr) {
        var html = '';
        if (arr[0].name) {
            $.each(arr, function (key, val) {
                html += '<tr>' +
                    '<td>' + val.name + '</td>' +
                    '<td>' + val.saleCount + '</td>' +
                    '<td>' + val.orderCount + '</td>' +
                    '<td>' + val.dealMoney + '</td>' +
                    '<td>' + val.profit + '</td>' +
                    '</tr>';
            });
        }

        $('.hot-product-box .chart-box table tbody').empty().append(html);
    }

    //选择日期 切换表格内容
    $('.hot-product-box .filter-date button').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        _hotProductDateType = $(this).attr('type');
        gethotProductData();
    });

    /**
     * 商户收入排行 开始
     */
    //获取 商户收入排行 的数据
    function getSellerIncomeData() {
        //获取新增用户数据
        $.ajax({
            url: _url2 + "/testLoginCtr/commerData",
            type: "get",
            data: {
                typeId: _sellerIncomeDateType
            },
            success: function (data) {
                console.log(data);
                if (data.code == '0') {
                    showSellerIncomeTable(data.data.objList);
                }
            },
        });

    }

    //生成 商户收入排行表格
    function showSellerIncomeTable(arr) {
        var html = '';
        $.each(arr, function (key, val) {
            html += '<tr>' +
                '<td>' + val.name + '</td>' +
                '<td>' + val.incomeMoney + '</td>' +
                '<td>' + val.orderCount + '</td>' +
                '<td>' + val.orderMoney + '</td>' +
                '<td>' + val.dealTotal + '</td>' +
                '<td>' + val.dealTotalMoney + '</td>' +
                '</tr>';
        });
        $('.seller-income-box .chart-box table tbody').empty().append(html);
    }

    //选择日期 切换表格内容
    $('.seller-income-box .filter-date button').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        _sellerIncomeDateType = $(this).attr('type');
        getSellerIncomeData();
    });

    /**
     * 邮寄发往地域分布 图表 开始
     */
    //邮寄 右侧 柱状图 开始
    function showMapRightChart() {
        var option;
        if (_postChartRightType == '1') {
            option = {
                /*title: {
                    text: '世界人口总量',
                    subtext: '数据来自网络'
                },*/
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                /*legend: {
                    data: ['2011年', '2012年']
                },*/
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    inverse: true,
                    type: 'category',
                    data: ['陕西', '广东', '北京', '上海', '山东', '江苏', '山西', '浙江', '辽宁', '黑龙江']
                },
                series: [
                    {
                        name: '省份',
                        type: 'bar',
                        data: [1791, 151, 96, 63, 58, 43, 39, 36, 34, 29]
                    }
                ]
            };
        } else {
            option = {
                /*title: {
                    text: '世界人口总量',
                    subtext: '数据来自网络'
                },*/
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                /*legend: {
                    data: ['2011年', '2012年']
                },*/
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    inverse: true,
                    type: 'category',
                    data: ['西安', '宝鸡', '渭南', '延安', '铜川', '商洛', '安康', '榆林', '汉中']
                },
                series: [
                    {
                        name: '省份',
                        type: 'bar',
                        data: [482, 300, 280, 250, 210, 110, 87, 45, 30]
                    }
                ]
            };
        }

        _postChartRight.setOption(option);
    }

    //邮寄 切换省份和城市 改变图表
    $('.map-box .post-chart-right .filter-date button').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        _postChartRightType = $(this).attr('type');
        showMapRightChart(); //邮寄 右侧 柱状图
    });

    //中国地图 开始
    function showMapLeftChart() {
        var data = [
            {
                name: '陕西',
                value: 1791
            },
            {
                name: '安徽',
                value: 12
            },
            {
                name: '北京',
                value: 96
            },
            {
                name: '福建',
                value: 20
            },

            {
                name: '甘肃',
                value: 23
            },

            {
                name: '广东',
                value: 151
            },
            {
                name: '广西',
                value: 12
            },
            {
                name: '贵州',
                value: 11
            },

            {
                name: '海南',
                value: 5
            },

            {
                name: '河北',
                value: 27
            },
            {
                name: '河南',
                value: 43
            },
            {
                name: '黑龙江',
                value: 29
            },
            {
                name: '湖北',
                value: 19
            },
            {
                name: '湖南',
                value: 17
            },
            {
                name: '吉林',
                value: 3
            },
            {
                name: '江苏',
                value: 43
            },
            {
                name: '江西',
                value: 7
            },
            {
                name: '辽宁',
                value: 34
            },
            {
                name: '内蒙古',
                value: 9
            },
            {
                name: '宁夏',
                value: 6
            },
            {
                name: '青海',
                value: 6
            },
            {
                name: '山东',
                value: 58
            },
            {
                name: '山西',
                value: 39
            },
            {
                name: '上海',
                value: 63
            },

            {
                name: '四川',
                value: 23
            },
            {
                name: '天津',
                value: 10
            },
            {
                name: '拉萨',
                value: 2
            },
            {
                name: '新疆',
                value: 14
            },
            {
                name: '云南',
                value: 19
            },
            {
                name: '浙江',
                value: 36
            },
            {
                name: '重庆',
                value: 10
            }
        ];
        var geoCoordMap = {
            '海门': [121.15, 31.89],
            '鄂尔多斯': [109.781327, 39.608266],
            '招远': [120.38, 37.35],
            '舟山': [122.207216, 29.985295],
            '齐齐哈尔': [123.97, 47.33],
            '盐城': [120.13, 33.38],
            '赤峰': [118.87, 42.28],
            '山东': [120.33, 36.07],
            '乳山': [121.52, 36.89],
            '金昌': [102.188043, 38.520089],
            '泉州': [118.58, 24.93],
            '莱西': [120.53, 36.86],
            '日照': [119.46, 35.42],
            '胶南': [119.97, 35.88],
            '南通': [121.05, 32.08],
            '拉萨': [91.11, 29.97],
            '云浮': [112.02, 22.93],
            '梅州': [116.1, 24.55],
            '文登': [122.05, 37.2],
            '上海': [121.48, 31.22],
            '攀枝花': [101.718637, 26.582347],
            '威海': [122.1, 37.5],
            '承德': [117.93, 40.97],
            '福建': [117.535128, 26.456115],
            '汕尾': [115.375279, 22.786211],
            '潮州': [116.63, 23.68],
            '丹东': [124.37, 40.13],
            '太仓': [121.1, 31.45],
            '曲靖': [103.79, 25.51],
            '烟台': [121.39, 37.52],
            '福州': [119.3, 26.08],
            '瓦房店': [121.979603, 39.627114],
            '即墨': [120.45, 36.38],
            '抚顺': [123.97, 41.97],
            '玉溪': [102.52, 24.35],
            '张家口': [114.87, 40.82],
            '阳泉': [113.57, 37.85],
            '莱州': [119.942327, 37.177017],
            '湖州': [120.1, 30.86],
            '汕头': [116.69, 23.39],
            '昆山': [120.95, 31.39],
            '宁波': [121.56, 29.86],
            '湛江': [110.359377, 21.270708],
            '揭阳': [116.35, 23.55],
            '荣成': [122.41, 37.16],
            '连云港': [119.16, 34.59],
            '葫芦岛': [120.836932, 40.711052],
            '常熟': [120.74, 31.64],
            '东莞': [113.75, 23.04],
            '河源': [114.68, 23.73],
            '淮安': [119.15, 33.5],
            '泰州': [119.9, 32.49],
            '广西': [108.33, 22.84],
            '营口': [122.18, 40.65],
            '惠州': [114.4, 23.09],
            '江阴': [120.26, 31.91],
            '蓬莱': [120.75, 37.8],
            '韶关': [113.62, 24.84],
            '嘉峪关': [98.289152, 39.77313],
            '广州': [113.23, 23.16],
            '延安': [109.47, 36.6],
            '山西': [111.942349, 36.701238],
            '清远': [113.01, 23.7],
            '中山': [113.38, 22.52],
            '云南': [102.73, 25.04],
            '寿光': [118.73, 36.86],
            '盘锦': [122.070714, 41.119997],
            '长治': [113.08, 36.18],
            '广东': [113.046187, 23.369325],
            '珠海': [113.52, 22.3],
            '宿迁': [118.3, 33.96],
            '咸阳': [108.72, 34.36],
            '铜川': [109.11, 35.09],
            '平度': [119.97, 36.77],
            '佛山': [113.11, 23.05],
            '海南': [109.661085, 19.232455],
            '江门': [113.06, 22.61],
            '章丘': [117.53, 36.72],
            '肇庆': [112.44, 23.05],
            '大连': [121.62, 38.92],
            '临汾': [111.5, 36.08],
            '吴江': [120.63, 31.16],
            '石嘴山': [106.39, 39.04],
            '辽宁': [123.38, 41.8],
            '苏州': [120.62, 31.32],
            '茂名': [110.88, 21.68],
            '嘉兴': [120.76, 30.77],
            '吉林': [125.35, 43.88],
            '胶州': [120.03336, 36.264622],
            '宁夏': [106.27, 38.47],
            '张家港': [120.555821, 31.875428],
            '三门峡': [111.19, 34.76],
            '锦州': [121.15, 41.13],
            '江西': [115.89, 28.68],
            '柳州': [109.4, 24.33],
            '三亚': [109.511909, 18.252847],
            '自贡': [104.778442, 29.33903],
            '吉林': [126.57, 43.87],
            '阳江': [111.95, 21.85],
            '泸州': [105.39, 28.91],
            '青海': [95.311193, 36.046602],
            '宜宾': [104.56, 29.77],
            '内蒙古': [111.65, 40.82],
            '四川': [104.06, 30.67],
            '大同': [113.3, 40.12],
            '镇江': [119.44, 32.2],
            '桂林': [110.28, 25.29],
            '张家界': [110.479191, 29.117096],
            '宜兴': [119.82, 31.36],
            '北海': [109.12, 21.49],
            '陕西': [108.95, 34.27],
            '金坛': [119.56, 31.74],
            '东营': [118.49, 37.46],
            '牡丹江': [129.58, 44.6],
            '遵义': [106.9, 27.7],
            '绍兴': [120.58, 30.01],
            '扬州': [119.42, 32.39],
            '常州': [119.95, 31.79],
            '潍坊': [119.1, 36.62],
            '重庆': [106.54, 29.59],
            '台州': [121.420757, 28.656386],
            '江苏': [119.889982, 33.249517],
            '滨州': [118.03, 37.36],
            '贵州': [106.71, 26.57],
            '无锡': [120.29, 31.59],
            '本溪': [123.73, 41.3],
            '克拉玛依': [84.77, 45.59],
            '渭南': [109.5, 34.52],
            '马鞍山': [118.48, 31.56],
            '宝鸡': [107.15, 34.38],
            '焦作': [113.21, 35.24],
            '句容': [119.16, 31.95],
            '北京': [116.46, 39.92],
            '徐州': [117.2, 34.26],
            '衡水': [115.72, 37.72],
            '包头': [110, 40.58],
            '绵阳': [104.73, 31.48],
            '新疆': [87.68, 43.77],
            '枣庄': [117.57, 34.86],
            '浙江': [120.331517, 29.332589],
            '淄博': [118.05, 36.78],
            '鞍山': [122.85, 41.12],
            '溧阳': [119.48, 31.43],
            '库尔勒': [86.06, 41.68],
            '安阳': [114.35, 36.1],
            '开封': [114.35, 34.79],
            '济南': [117, 36.65],
            '德阳': [104.37, 31.13],
            '温州': [120.65, 28.01],
            '九江': [115.97, 29.71],
            '邯郸': [114.47, 36.6],
            '临安': [119.72, 30.23],
            '甘肃': [103.73, 36.03],
            '沧州': [116.83, 38.33],
            '临沂': [118.35, 35.05],
            '南充': [106.110698, 30.837793],
            '天津': [117.2, 39.13],
            '富阳': [119.95, 30.07],
            '泰安': [117.13, 36.18],
            '诸暨': [120.23, 29.71],
            '河南': [113.65, 34.76],
            '黑龙江': [126.63, 45.75],
            '聊城': [115.97, 36.45],
            '芜湖': [118.38, 31.33],
            '唐山': [118.02, 39.63],
            '平顶山': [113.29, 33.75],
            '邢台': [114.48, 37.05],
            '德州': [116.29, 37.45],
            '济宁': [116.59, 35.38],
            '荆州': [112.239741, 30.335165],
            '宜昌': [111.3, 30.7],
            '义乌': [120.06, 29.32],
            '丽水': [119.92, 28.45],
            '洛阳': [112.44, 34.7],
            '秦皇岛': [119.57, 39.95],
            '株洲': [113.16, 27.83],
            '河北': [114.48, 38.03],
            '莱芜': [117.67, 36.19],
            '常德': [111.69, 29.05],
            '保定': [115.48, 38.85],
            '湘潭': [112.91, 27.87],
            '金华': [119.64, 29.12],
            '岳阳': [113.09, 29.37],
            '湖南': [113, 28.21],
            '衢州': [118.88, 28.97],
            '廊坊': [116.7, 39.53],
            '菏泽': [115.480656, 35.23375],
            '安徽': [117.27, 31.86],
            '湖北': [114.31, 30.52],
            '大庆': [125.03, 46.58]
        };

        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)

                    });
                }
            }
            return res;
        };

        var option1 = {
            backgroundColor: '#FFF',
            /*title: {
                text: '掌上回坊订单分布图',
                subtext: '云创科技',
                left: 'center',
                textStyle: {
                    color: '#000000',
                    fontSize: 24
                }
            },*/
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x: 'right',
                data: ['订单量'],
                textStyle: {
                    color: '#111'
                }
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#0a3e4b',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            series: [{
                name: '订单量',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function (val) {
                    var tmp = val[2] / 5;
                    tmp += 5;
                    if (tmp > 40) {
                        tmp = 40;
                    }
                    return tmp;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#d9dc00',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                tooltip: {
                    formatter: function (params) {
                        var res = params.name + '</br>' + '订单量：' + params.value[2];
                        return res;
                    },
                },
                zlevel: 1
            }]
        };

        _postChartLeft.setOption(option1);
    }

}())