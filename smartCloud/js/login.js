/* Created by demon on 2017/12/26 0026.*/
var app = new Vue({
    el: '#vue',
    data: {
        usrname: '',
        password: '',
        submited: ''
    },
    methods:{
        submit: function(){
            this.submited = 1;
            var data = {
                'account': this.usrname,
                'pwd': this.password
            };
            if (this.usrname && this.password){
                $.ajax({
                    url:'http://113.142.35.58:8769/api-user/admin/login',
                    type:'get',
                    data: data,
                    dataType:'JSON',
                    success: function (data) {
                        if(data.code == 0){
                            window.location.href = 'backmanage.html'
                        }
                    }
                });
            }
        }
    }
});
//http://192.168.10.195:8769/api-user/admin/login