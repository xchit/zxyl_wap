$(function () {
    FastClick.attach(document.body);
    var $zx = $(document),
        touchend = "touchend mousedown",
        current = "current",
        SignOut = ".SignOut",
        MenuBtn = ".MenuBtn",
        service = "Service",
        ServiceBtn = ".ServiceBtn",
        PreventPage = "#PreventPage",
        Prevent = "#Prevent",
        page = ".page",
        pageTwo = "#PageTwo",
        pageThree = "#PageThree",
        pageFour = "#PageFour",
        pageFive = "#PageFive",
        pageSix = "#PageSix",
        PageMain = "#PageMain",
        LeftMenu = ".LeftMenu",
        FooterMenu = "#FooterMenu li",
        LoginBtn = ".LoginBtn",
        OutLogin = "#OutLogin",
        LoginPage = "#LoginPage",
        Slide = "Slide",
        PageSlide = ".SlidePage",
        pageback = ".bk",
        SlideRestore = "SlideRestore"
        datapage = "data-page",
        dataurl = "data-url",
        dataselect = "data-select",
        datatit = "data-title",
        loading = "#loading",
        speed = 400,
        SureBtn = "#SureBtn",
        personal = "#personal li",
        TransferSwitch = "#TransferSwitch";
        TransferMenu = "#TransferMenu li",
        TransferOut = "#TransferOut",
        TransferIn = "#TransferIn",
        chips = "#chips i",
        SlideMenu = ".SlideMenu li",
        trAmount = "#transferAmount",
        MgeMenu = "#MessageMenu li",
        MgeMain = "#MessageMain",
        MgeMainLi = "#MessageMain li",
        button = "input[type='button']",
        Tel = /^(13[0-9]\d{8}|15[0-9]\d{8}|18[0-9]\d{8}|14[57]\d{8})$/,
        Email = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
        Account = /^[\da-z]+$/,
        Name = /^[\u2E80-\u9FFF]+$/,
        url = "home.html",
        pagebox = PageMain;



    $zx.on("click", FooterMenu, function () {
        var url = $(this).attr(dataurl);
        var pagebox = $(PageMain);
        $(FooterMenu).removeClass(current);
        $(this).addClass(current);
        if (typeof (url) == "undefined") {
            return false;
        } else {
            DataLoad(url, pagebox);
        }
    });

    $zx.on("click", ServiceBtn, function () { //客服
        var url = "http:cs.zx2013.com/?token=b1bff3d21620e58557a8d1daf1fd0666&into=true&userId=";
        var iframeNmae = "servicePage";
        var iframeVal = "<iframe scrolling='yes' class=" + iframeNmae + " src=" + url + " marginheight='0' marginwidth='0' frameborder='0' scrolling='no'></iframe>";
        var pagedata = $(this).attr(datapage);
        var sreMain = PageMain;
        $(loading).show();
        if (pagedata == "home") {
            loadSr()
        } else if (pagedata == "Login") {
            $(LoginPage).removeClass(Slide);
            loadSr()
        }
        function loadSr() {
            $(sreMain).html("");
            $(sreMain).append(iframeVal);
            $("." + iframeNmae).on("load", function () {
                $(loading).hide();
            });
        };
    });

    $zx.on("click", LoginBtn, function () {
        $(LoginPage).addClass(Slide);
        $zx.on("click", OutLogin, function () {
            $(LoginPage).removeClass(Slide);
        });

    });


    $zx.on("click", PageSlide, function (e) {
        e.preventDefault();
        var Val = $(this).attr(datapage);
        var url = $(this).attr(dataurl);
        var datast = $(this).attr(dataselect);
        var tit = $(this).attr(datatit);


        if (typeof (Val) == "undefined") {
            var PageVal = 2;
            $(this).attr(datapage, 2);
            SlidePage(PageVal, url, datast, tit);
        } else {
            var PageVal = Val;
            SlidePage(PageVal, url, datast, tit);
        };
    });

    $zx.on("click", pageback, function () {
        var PageVal = $(this).attr(datapage);
        if (typeof (PageVal) == "undefined"){
            PageVal = 2;
        }
        BackPage(PageVal);
    });


    //站内信
    $zx.on("click", MgeMenu, function () {
        $(MgeMenu).removeClass("on");
        $(this).addClass("on");
        var $this = $(MgeMenu).index(this);
        var New = ".new";
        var newmessages = $(MgeMain).find(New).length;
        if ($this == 1) {
            $(MgeMain).find("li").show();
            $(MgeMain).find(New).hide();
            $(MgeMain).find(".ts").hide();
        } if ($this == 0) {
            $(MgeMain).find("li").hide();
            if (newmessages == 0) {
                $(MgeMain).find(".ts").show();
            } else {
                $(MgeMain).find(New).show();
            }
        }
    });

    $zx.on("click", MgeMainLi, function () {
        var PageVal = 3;
        SlidePage(PageVal);
        var tit = $(this).find("h1").text();
        var time = $(this).find("time").text();
        var m = $(this).find("p").text();
        $(pageThree).html("<div class='PageSlide'><header><div class='back bk' data-page='3'><i></i>返回</div><h1>详情</h1></header><div class='MainBox' style='background:#fff;'><div class='labMessage'><div class='hd'><h1>" + tit + "</h1><time>" + time + "</time></div><div class='bd'><p>" + m + "</p></div></div></div></div>");
    });

    $zx.on("click", TransferMenu, function () {//转账
        var Val = $(this).find("span").text();
        var num = $(this).find("em").text();
        var Select = $(this).attr(dataselect);
        var Out = TransferOut;
        var In = TransferIn;
        var Outval = $(Out).val();
        var Inval = $(In).val();
        var MainVal = $(TransferMenu).eq(0).find("span").text() + " - " + $(TransferMenu).eq(0).find("em").text();
        if (Select == 1) {
            if (Val.indexOf("众鑫账户") > -1) {
                $(In).val("");
            } else {
                $(In).val(MainVal);
            }
            $(Out).val(Val + " - " + num);
        }

        if (Select == 2) {
            if (Val.indexOf("众鑫账户") > -1) {
                $(Out).val("");
            } else {
                $(Out).val(MainVal);
            }
            $(In).val(Val + " - " + num);
        }

    });
    $zx.on("click", TransferSwitch, function () {
        var Out = TransferOut;
        var In = TransferIn;
        var Outval = $(Out).val();
        var Inval = $(In).val();

        if (Outval == "" && Inval == "") {
            return false;
        } else {
            $(Out).val(Inval);
            $(In).val(Outval);
        }
    });

    $zx.on("click", chips, function () {
        var $this = $(this).attr("Class");
        var Val = $(trAmount).val();
        if ($this == "c1") {
            $(trAmount).val(Val * 1 + 100);
        }
        if ($this == "c2") {
            $(trAmount).val(Val * 1 + 500);
        }
        if ($this == "c3") {
            $(trAmount).val(Val * 1 + 1000);
        }
        if ($this == "c4") {
            $(trAmount).val(Val * 1 + 5000);
        }
    });

    $zx.on("click", "#transferAll", function () {
        if ($(TransferOut).val().length <= 0) {
            return false;
        } else {

            var Val = $(TransferOut).val().replace(/\s+/g, "").split('-')[1].replace(/,/g, '');
            var num = parseInt(Val)
            $(trAmount).val(num);
        }
    });
    $zx.on("click", "#transferdel", function () {
        $(trAmount).val("");
    });
    //个人中心
    $zx.on("click", personal, function () {

    });
    //**************************提示*************************/
    $zx.on("click", button, function () {
        var $this = $(this).attr("id");
        var url = $(this).attr(dataurl);
        if ($this == "LoginButton") {//登录
            var name = $("#LoginName").val();
            var psd = $("#LoginPassword").val();
            if (name.length == 0) {
                swal("请输入用户名!", "请输入正确的用户名", "error");
                return false;
            } else if (name.length < 4) {
                swal("账号长度错误!", "由4至10个字母或数字组成", "error");
                return false;
            } else if (!Account.exec(account)) {
                swal("账号格式错误!", "由4至10个字母或数字组成", "error");
                return false;
            } else if (psd.length == 0) {
                swal("请输入密码!", "请输入正确的密码", "error");
                return false;
            } else if (psd.length < 6) {
                swal("密码错误!", "请重新输入密码", "error");
                return false;
            } else {
                window.location.reload();
            }
        };

        if ($this == "JoinOne") {//注册
            var account = $("#account").val(),
        		email = $("#JoinEmail").val(),
        		phone = $("#JoinPhone").val(),
        		PsdBf = $("#JoinPasswordBf").val(),
        		PsdAf = $("#JoinPasswordAf").val();
            if (account.length == 0) {
                swal("账号不能为空!", "请输入游戏帐号", "error");
                return false;
            } else if (account.length < 4) {
                swal("账号长度错误!", "由4至10个字母或数字组成", "error");
                return false;
            } else if (!Account.exec(account)) {
                swal("账号格式错误!", "由4至10个字母或数字组成", "error");
                return false;
            } else if (email.length == 0) {
                swal("邮箱不能为空!", "请输入游戏帐号", "error");
                return false;
            } else if (!Email.exec(email)) {
                swal("邮箱格式错误!", "请输入正确的邮箱帐号", "error");
                return false;
            } else if (phone.length == 0) {
                swal("手机号不能为空!", "请输入手机号码", "error");
                return false;
            } else if (!Tel.exec(phone)) {
                swal("手机号错误!", "请输入正确的手机号码", "error");
                return false;
            } else if (PsdBf.length == 0 || PsdAf.length == 0) {
                swal("密码不能为空!", "请输入密码", "error");
                return false;
            } else if (PsdBf.length < 6) {
                swal("密码格式错误!", "密码不能小于6位，请重新输入！", "error");
                return false;
            } else if (PsdBf != PsdAf) {
                swal("两次密码不一致!", "请重新输入密码", "error");
                return false;
            } else {
                var PageVal = 3,
        			url = $(this).attr(dataurl);
                SlidePage(PageVal, url)
            }
        };

        if ($this == "JoinTwo") {//注册/完善资料
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
                var PageVal = 4,
        			url = $(this).attr(dataurl);
                SlidePage(PageVal, url);

                $zx.on("click", "#JoinSure", function () {
                    window.location.reload();
                });
            }

        };


        if ($this == "Forget") {//忘记密码/游戏帐号
            var account = $("#ForgetAccount").val();
            if (account.length == 0) {
                swal("账号不能为空!", "请输入游戏帐号", "error");
                return false;
            } else if (account.length < 4) {
                swal("账号长度错误!", "由4至10个字母或数字组成", "error");
                return false;
            } else if (!Account.exec(account)) {
                swal("账号格式错误!", "由4至10个字母或数字组成", "error");
                return false;
            } else {
                var PageVal = 3,
        			url = $(this).attr(dataurl);
                SlidePage(PageVal, url);
            }
        }

        if ($this == "Forget") {//忘记密码/手机找回
            var account = $("#ForgetAccount").val();
            var PageVal = 3;
            AccountAlrent(account, PageVal, url);
        }
    });

    $zx.on("click", SignOut, function () {//退出
        swal({
            title: "确定要退出吗?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#0188fe',
            confirmButtonText: '确定',
            cancelButtonText: "取消",
            closeOnConfirm: false
        }, function () {
            swal({
                title: "退出成功",
                text: "2秒钟之后自动刷新页面",
                timer: 2000,
                type: "success"
            }, function () {
                window.location.reload();
            });
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        });
    });





    function AccountAlrent(account, PageVal, url) {//帐号验证提示
        if (account.length == 0) {
            swal("账号不能为空!", "请输入游戏帐号", "error");
            return false;
        } else if (account.length < 4) {
            swal("账号长度错误!", "由4至10个字母或数字组成", "error");
            return false;
        } else if (!Account.exec(account)) {
            swal("账号格式错误!", "由4至10个字母或数字组成", "error");
            return false;
        } else {
            SlidePage(PageVal, url);
        }
    }


    function SlidePage(PageVal, url, datast, tit) {

        if (typeof (PageVal) == "undefined") {
            var PageVal = 2,
    			pagebot = page,
    			pagetop = pageTwo;
        } else {

            if (PageVal == 2) {
                var pagebot = page,
    				pagetop = pageTwo;
            }
            if (PageVal == 3) {
                var pagebot = pageTwo,
    				pagetop = pageThree;
            }
            if (PageVal == 4) {
                var pagebot = pageThree,
    				pagetop = pageFour;
            }
            if (PageVal == 5) {
                var pagebot = pageFour,
    				pagetop = pageFive;
            }
            if (PageVal == 6) {
                var pagebot = pageFive,
    				pagetop = pageSix;
            }
        }
        $(pagetop).addClass(Slide);
        $(pagebot).addClass(SlideRestore);
        $(Prevent).show();
        setTimeout(function () {
            $(Prevent).hide();
        }, speed);
        var pagebox = pagetop;
        if (datast == "iframe") {
            var iframeVal = "<div class='PageSlide'><header><div class='back bk' data-page='" + PageVal + "'><i></i>返回</div><h1>" + tit + "</h1></header><div class='MainBox' style='background:#fff;'><iframe scrolling='yes' class='iframelucky' src=" + url + " marginheight='0' marginwidth='0' frameborder='0' scrolling='no'></iframe></div></div>";
            $(pagebox).html(iframeVal);
            $(loading).show();
            $(".iframelucky").on("load", function () {
                $(loading).hide();
            });
            return false;
        } else {
            if (typeof (url) == "undefined") {
                return false;
            } else {
                DataLoad(url, pagebox, PageVal, datast);
            }
        }
    };

    function BackPage(PageVal) {
        if (PageVal == 2) {
            var pagebot = page,
    		 	pagetop = pageTwo;
        }
        if (PageVal == 3) {
            var pagebot = pageTwo,
    		 	pagetop = pageThree;
        }
        if (PageVal == 4) {
            var pagebot = pageThree,
    		 	pagetop = pageFour;
        }
        if (PageVal == 5) {
            var pagebot = pageFour,
    		 	pagetop = pageFive;
        }
        if (PageVal == 6) {
            var pagebot = pageFive,
    		 	pagetop = pageSix;
        }
        $(pagetop).removeClass(Slide);
        $(pagebot).removeClass(SlideRestore);
        $(Prevent).show();
        setTimeout(function () {
            $(pagetop).html("");
            $(Prevent).hide();
        }, speed);
    };
    $(window).load(function () {
        DataLoad(url, pagebox);
    });
    function DataLoad(url, pagebox, PageVal, datast) {
        $.ajax({
            type: "get",
            url: url,
            beforeSend: function () {
                $(pagebox).html("");
                $(loading).show();
            },
            success: function (data) {
                $(loading).hide();
                $(pagebox).html(data);
                if (typeof (PageVal) == "undefined") {
                    $(PageMain).find(PageSlide).attr(datapage, 2);
                } else {
                    $(pagebox).find(pageback).attr(datapage, PageVal);
                    $(pagebox).find(PageSlide).attr(datapage, PageVal * 1 + 1);
                };
                if (typeof (datast) == "undefined") {
                    return false;
                } else {
                    $(pagebox).find(".st").attr(dataselect, datast);
                };

            }
        });
    };

});