$(function () {
    //会员注册第一步
    $("#JoinOne").click(function () {
        var account = $("#account").val(),
        	email = $("#JoinEmail").val(),
        	phone = $("#JoinPhone").val(),
        	PsdBf = $("#JoinPasswordBf").val(),
        	PsdAf = $("#JoinPasswordAf").val();
        if(account.length == 0){
        	swal("账号不能为空!", "请输入游戏帐号", "error");
        	return false;
        }else if (account.length < 4){
        	swal("账号长度错误!", "由4至10个字母或数字组成", "error");
        	return false;
        }else if (!Account.exec(account)){
        	swal("账号格式错误!", "由4至10个字母或数字组成", "error");
        	return false;
        }else if(email.length == 0){
        	swal("邮箱不能为空!", "请输入游戏帐号", "error");
        	return false;
        }else if (!Email.exec(email)){
        	swal("邮箱格式错误!", "请输入正确的邮箱帐号", "error");
        	return false;
        }else if (phone.length == 0){
        	swal("手机号不能为空!", "请输入手机号码", "error");
        	return false;
        }else if (!Tel.exec(phone)){
        	swal("手机号错误!", "请输入正确的手机号码", "error");
        	return false;
        }else if (PsdBf.length == 0 || PsdAf.length == 0){
        	swal("密码不能为空!", "请输入密码", "error");
        	return false;
        }else if (PsdBf.length < 6){
        	swal("密码格式错误!", "密码不能小于6位，请重新输入！", "error");
        	return false;
        }else if (PsdBf != PsdAf){
        	swal("两次密码不一致!", "请重新输入密码", "error");
        	return false;
        }else {
            $.ajax({
                url: "/Register/RedirectNext/",
                type: "Post",
                data: {
                    __RequestVerificationToken: $("input[type='hidden'][name='__RequestVerificationToken']").val(),
                    UserName: account,
                    Email: email,
                    MobileNo: phone,
                    Password: PsdBf,
                    ComparePassword: PsdAf
                },
                beforeSend: function () {
                    $(zxconfig.loading).show();
                },
                success: function (data) {
                    $(zxconfig.loading).hide();
                    if (data["status"] == "error") {
                        swal({
                            title: data["text"],
                            //text: data["tip"],
                            timer: 2000,
                            type: data["status"],
                            showConfirmButton: false
                        });
                        return false;
                    } else {
                        var PageVal = 3,
                        url = $("#JoinOne").attr(zxconfig.dataurl);
                        SlidePage(PageVal, url)
                    }
                },
                error: function (result) {}
            });
        }
    });
    //会员注册下一步（完善资料）
    $("#JoinTwo").click(function () {
        var name = $("#JoinName").val(),
        	sex = $("#JoinSex").val(),
        	brd = $("#JoinBrd").val(),
        	QQ = $("#JoinQQ").val();
        if (name.length == 0) {
            swal("姓名不能为空!", "请输入真实姓名", "error");
            return false;
        } else if (name.length < 2) {
            swal("姓名错误!", "请输入真实姓名", "error");
            return false;
        } else if (!Name.exec(name)) {
            swal("姓名填写错误!", "请输入真实姓名", "error");
            return false;
        } else if (brd.length == 0) {
            swal("生日不能为空!", "请输入出生日期", "error");
            return false;
        } else if (QQ.length == 0) {
            swal("QQ不能为空!", "请输入真实QQ号", "error");
            return false;
        } else {
            $.ajax({
                url: "/Register/RedirectFinish/",
                type: "Post",
                data: {
                    __RequestVerificationToken: $("input[type='hidden'][name='__RequestVerificationToken']").val(),
                    Name: name,
                    Sex: sex,
                    Birthday: brd,
                    TecentQQ: QQ
                },
                beforeSend: function () {
                    $(zxconfig.loading).show();
                },
                success: function (data) {
                    $(zxconfig.loading).hide();
                    if (data["status"] == "error") {
                        swal({
                            title: data["text"],
                            //text: data["tip"],
                            timer: 2000,
                            type: data["status"],
                            showConfirmButton: false
                        });
                        return false;
                    } else {
                        var PageVal = 4,
                        url = $("#JoinTwo").attr(zxconfig.dataurl);
                        SlidePage(PageVal, url);
                    }
                },
                error: function (result) {
                }
            });
        }
    });
    //立即登陆
    $("#JoinSure").click(function () {
        $.ajax({
            url: "/Register/RedirectIndex/",
            type: "Post",
            data: {
                __RequestVerificationToken: $("input[type='hidden'][name='__RequestVerificationToken']").val()
            },
            beforeSend: function () {
                $(zxconfig.loading).show();
            },
            success: function (data) {
                $(zxconfig.loading).hide();
                if (data["status"] == "error") {
                    swal({
                        title: data["text"],
                        //text: data["tip"],
                        timer: 2000,
                        type: data["status"],
                        showConfirmButton: false
                    });
                    return false;
                } else {
                    window.location.href = getUrl();
                }
            },
            error: function (result) {
            }
        });
    });
});
