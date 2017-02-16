$(function () {
    //会员登陆
    $("#LoginButton").click(function (e) {
        var name = $("#LoginName").val();
        var psd = $("#LoginPassword").val();
        $.ajax({
            url: "/Login/Login/",
            type: "Post",
            data: {
                __RequestVerificationToken: $("input[type='hidden'][name='__RequestVerificationToken']").val(),
                UserName: name,
                Password: psd
            },
            beforeSend: function () {
                //$(zxconfig.loading).show();
            },
            success: function (data) {
                $(zxconfig.loading).hide();
                if (data["status"] == "error") {
                    swal({
                        title: data["text"],
                        text: data["tip"],
                        timer: 1000,
                        type:data["status"],
                        showConfirmButton: false
                    });
                    return false;
                } else {
                    window.location = getUrl();
                }
            },
            error: function (result) {
            }
        });
    });
    //会员侧栏登陆
    $("#LoginSidebar").click( function (e) {
        Link2Login();
    });
    //会员登出
    $(".SignOut").click(function (e) {
        swal({
            title: "确定要退出吗?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#0188fe',
            confirmButtonText: '确定',
            cancelButtonText: "取消",
            closeOnConfirm: false
        },function(){
            swal({
                title: "退出成功",
                text: "2秒钟之后自动刷新页面",
                timer: 2000,
                type: "success"
            }, function () {
                $.ajax({
                    url: "/Login/Logout/",
                    type: "Post",
                    data: {
                        __RequestVerificationToken: $("input[type='hidden'][name='__RequestVerificationToken']").val()
                    },
                    success: function (data) {
                        if (data["status"] == "error") {
                            swal({
                                title: data["text"],
                                //text: data["tip"],
                                timer: 1000,
                                type: data["status"],
                                showConfirmButton: false
                            });
                            return false;
                        } else {
                            window.location = getUrl();
                        }
                    },
                    error: function (result) {
                    }
                });
            });
            setTimeout(function () {
                $.ajax({
                    url: "/Login/Logout/",
                    type: "Post",
                    data: {
                        __RequestVerificationToken: $("input[type='hidden'][name='__RequestVerificationToken']").val()
                    },
                    success: function (data) {
                        if (data["status"] == "error") {
                            swal({
                                title: data["text"],
                                //text: data["tip"],
                                timer: 1000,
                                type: data["status"],
                                showConfirmButton: false
                            });
                            return false;
                        } else {
                            window.location = getUrl();
                        }
                    },
                    error: function (result) {
                    }
                });
            },2000);
        });
    });

});
