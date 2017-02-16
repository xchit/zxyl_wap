var zxdoc = {
    /*************会员资料start***************/
    //主页
    CenterUserInfo: "#CenterUserInfo",//
    CenterTransfer: "#CenterTransfer",//
    CenterBalance: "#CenterBalance",//
    CenterFanshui: "#CenterFanshui",//
    //个人中心
    JoinPassword: "#JoinPassword",
    JoinTel: "#JoinTel",
    JoinEmail: "#JoinEmail",
    JoinAddress: "#JoinAddress",
    JoinSafety: "#JoinSafety",
    UserCompleteSave: "#UserCompleteSave",
    //余额
    RefreshZXC:"#RefreshZXC",
    RefreshZXINT: "#RefreshZXINT",
    RefreshPTINT: "#RefreshPTINT",
    BalanceZXC: "#BalanceZXC",
    BalanceEA: "#BalanceEA",
    BalanceAG: "#BalanceAG",
    BalanceEBET: "#BalanceEBET",
    BalanceSP: "#BalanceSP",
    BalanceLB: "#BalanceLB",
    BalanceKG: "#BalanceKG",
    BalancePT: "#BalancePT",
    BalanceTAB: "#BalanceTAB",
    /*************会员资料start***************/
    PageTurn: ".PageTurn",
    touchend : "touchend mousedown",
    current : "current",
    SignOut : ".SignOut",
    MenuBtn : ".MenuBtn",
    service : "Service",
    PreventPage: "#PreventPage",
    ServiceBtn :".ServiceBtn",
    Prevent : "#Prevent",
    page : ".page",
    pageTwo : "#PageTwo",
    pageThree : "#PageThree",
    pageFour : "#PageFour",
    pageFive : "#PageFive",
    pageSix : "#PageSix",
    PageMain : "#PageMain",
    LeftMenu : ".LeftMenu",
    FooterMenu: "#FooterMenu li.nav",
    FooterHome: "#FooterMenu li.HomeMain",
    FooterServer: "#FooterMenu li.HomeServer",
    FooterTransfer: "#FooterMenu li.HomeTransfer",
    FooterCenter: "#FooterMenu li.HomeCenter",
    LoginBtn : ".LoginBtn",
    OutLogin : "#OutLogin",
    LoginPage: "#LoginPage",
    LoginPageScript: "#LoginPageScript",//
    Slide : "Slide",
    PageSlide : ".SlidePage",
    pagebk: ".bk",
    pageback: ".back",
    SlideRestore : "SlideRestore",
    datapage : "data-page",
    dataurl : "data-url",
    dataselect : "data-select",
    datatit : "data-title",
    loading : "#loading",
    speed : 400,
    SureBtn : "#SureBtn",
    personal : "#personal li",
    TransferSwitch : "#TransferSwitch",
    TransferMenu1: "#TransferMenu1 li",
    TransferMenu: "#TransferMenu li",
    TransferOut : "#TransferOut",
    TransferIn : "#TransferIn",
    chips : "#chips i",
    SlideMenu : ".SlideMenu li",
    trAmount : "#transferAmount",
    MgeMenu : "#MessageMenu li",
    MgeMain : "#MessageMain",
    MgeMainLi : "#MessageMain li",
    button : "input[type:'button']",
    Tel : /^(13[0-9]\d{8}|15[0-9]\d{8}|18[0-9]\d{8}|14[57]\d{8})$/,
    Email : /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
    Account : /^[\da-z]+$/,
    Name : /^[\u2E80-\u9FFF]+$/,
    url : "home.html",
    pagebox: "#PageMain"
}
var event = {
    click:"click"
};
window.zxconfig = zxdoc || {};
window.zxevent = event || {};

function SlidePage(PageVal, url, datast, tit) {

    if (typeof (PageVal) == "undefined") {
        var PageVal = 2,
            pagebot = zxconfig.page,
            pagetop = zxconfig.pageTwo;
    } else {

        if (PageVal == 2) {
            var pagebot = zxconfig.page,
                pagetop = zxconfig.pageTwo;
        }
        if (PageVal == 3) {
            var pagebot = zxconfig.pageTwo,
                pagetop = zxconfig.pageThree;
        }
        if (PageVal == 4) {
            var pagebot = zxconfig.pageThree,
                pagetop = zxconfig.pageFour;
        }
        if (PageVal == 5) {
            var pagebot = zxconfig.pageFour,
                pagetop = zxconfig.pageFive;
        }
        if (PageVal == 6) {
            var pagebot = zxconfig.pageFive,
                pagetop = zxconfig.pageSix;
        }
    }
    $(pagetop).addClass(zxconfig.Slide);
    $(pagebot).addClass(zxconfig.SlideRestore);
    $(zxconfig.Prevent).show();
    setTimeout(function () {
        $(zxconfig.Prevent).hide();
    }, zxconfig.speed);
    var pagebox = pagetop;
    if (datast == "iframe") {
        var iframeVal = "<div class='PageSlide'><header><div class='back bk' data-page='" + PageVal + "'><i></i>返回</div><h1>" + tit + "</h1></header><div class='MainBox' style='background:#fff;'><iframe scrolling='yes' class='iframelucky' src=" + url + " marginheight='0' marginwidth='0' frameborder='0' scrolling='no'></iframe></div></div>";
        $(pagebox).html(iframeVal);
        $(zxconfig.loading).show();
        $(".iframelucky").on("load", function () {
            $(zxconfig.loading).hide();
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
        var pagebot = zxconfig.page,
            pagetop = zxconfig.pageTwo;
    }
    if (PageVal == 3) {
        var pagebot = zxconfig.pageTwo,
            pagetop = zxconfig.pageThree;
    }
    if (PageVal == 4) {
        var pagebot = zxconfig.pageThree,
            pagetop = zxconfig.pageFour;
    }
    if (PageVal == 5) {
        var pagebot = zxconfig.pageFour,
            pagetop = zxconfig.pageFive;
    }
    if (PageVal == 6) {
        var pagebot = zxconfig.pageFive,
            pagetop = zxconfig.pageSix;
    }
    $(pagetop).removeClass(zxconfig.Slide);
    $(pagebot).removeClass(zxconfig.SlideRestore);
    $(zxconfig.Prevent).show();
    setTimeout(function () {
        $(pagetop).html("");
        $(zxconfig.Prevent).hide();
    }, zxconfig.speed);
};
function DataLoad(url, pagebox, PageVal, datast) {
    $.ajax({
        type: "get",
        url: url,
        beforeSend: function () {
            $(pagebox).html("");
            $(zxconfig.loading).show();
        },
        success: function (data) {
            $(zxconfig.loading).hide();
            if ($(pagebox).html() != "") {
                return false;
            } else {
                $(pagebox).html(data);
            }
            if (typeof (PageVal) == "undefined") {
                $(zxconfig.PageMain).find(zxconfig.PageSlide).attr(zxconfig.datapage, 2);
            } else {
                $(pagebox).find(zxconfig.pageback).attr(zxconfig.datapage, PageVal);
                $(pagebox).find(zxconfig.PageSlide).attr(zxconfig.datapage, PageVal * 1 + 1);
            };
            if (typeof (datast) == "undefined") {
                return false;
            } else {
                $(pagebox).find(".st").attr(zxconfig.dataselect, datast);
            };
        },
    });
};
//弹出登陆页面
function Link2Login() {
    $(zxconfig.LoginPage).addClass(zxconfig.Slide);
    $(zxconfig.OutLogin).click(function () {
        $(zxconfig.LoginPage).removeClass(zxconfig.Slide);
    });
}
//指定页面翻页
function TurnPage(obj) {
    var val = $(obj).attr(zxconfig.datapage);
    var url = $(obj).attr(zxconfig.dataurl);
    var datast = $(obj).attr(zxconfig.dataselect);
    var tit = $(obj).attr(zxconfig.datatit);
    if (typeof (val) == "undefined") {
        var PageVal = 2;
        $(obj).attr(datapage, 2);
        SlidePage(PageVal, url, datast, tit);
    } else {
        var PageVal = val;
        SlidePage(PageVal, url, datast, tit);
    };
};
//底部菜单切换
function FooterMenuChannel(obj) {
    var url = $(obj).attr(zxconfig.dataurl);
    var pagebox = $(zxconfig.PageMain);
    $(obj).siblings().removeClass(zxconfig.current);
    $(obj).addClass(zxconfig.current);
    if (typeof (url) == "undefined") {
        return false;
    } else {
        DataLoad(url, pagebox);
    }
}
//指定页面重新加载
function Reload2Page(pagenext,pagecurrent,url) {
    $(pagecurrent).removeClass(zxconfig.Slide);
    $(pagenext).removeClass(zxconfig.SlideRestore);
    $(zxconfig.Prevent).show();
    setTimeout(function () {
        $(pagecurrent).html("");
        $(zxconfig.Prevent).hide();
    }, zxconfig.speed);
    var pagebox = pagenext;
    if (typeof (url) == "undefined") {
        return false;
    } else {
        DataLoad(url, pagebox);
    }
}
//文档加载完成执行
function nologin() {
    var objparam = window.location.search.match(new RegExp("[\?\&]error", "i"));
    if (objparam!=null&&objparam.length > 0) {
        Link2Login();
    }
}
//跳转到登陆页面
function PopupLogin() {
    var query = window.location.search.substring(1);
    var pairs = query.split(",");
    var markQue = window.location.search.match(new RegExp("[\?]error", "i"));
    var markAnd = window.location.search.match(new RegExp("[\&]error", "i"));
    //情况分析
    if (pairs.length > 1) {
        if ((markQue != null && markQue.length > 0) || (markAnd != null && markAnd.length > 0)) {
            window.location.href = window.location.href;
        } else {
            window.location.href = window.location.href + "&error";
        }
    } else {
        if ((markQue != null && markQue.length > 0) || (markAnd != null && markAnd.length > 0)) {
            window.location.href = window.location.href;
        } else {
            if (pairs[0] == null || pairs[0]=="") {
                window.location.href = window.location.href + "?error";
            } else {
                window.location.href = window.location.href + "&error";
            }
        }
    }
}
//验证码定时器
function TimeDown(obj, e) {
    var i = 0
    var Timeback = setInterval(function () {
        i++
        var t = 180 - i;
        if (t == 0) {
            $(obj).removeClass("cc");
            $(obj).text("获取验证码");
            clearTimeout(Timeback);
            $(document).bind(zxevent.click, obj, e);
        } else {
            $(document).unbind(zxevent.click, obj);
            $(obj).addClass("cc");
            $(obj).text("剩余" + t + "秒");
        }
    }, 1000);
}
//获取url
function getUrl() {
    var myurl = window.location.href;
    var result = window.location.search.match(new RegExp("[\?\&]error", "i"));
    if (result != null && result.length > 0) {
        myurl = myurl.substring(0, myurl.indexOf(result));
    }
    return myurl;
}
$(function () {
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            window.history.pushState('forward', null, null);
            window.history.forward(1);
        });
    }
    window.history.pushState('forward', null, null); //在IE中必须得有这两行
    window.history.forward(1);
    //网站余额
    $(document).on("click", zxconfig.RefreshZXC, function () {
        //var span = $(this).siblings("span");
        $.ajax({
            type: "Post",
            url: "/Usercenter/RefreshBalance",
            data: {
                __RequestVerificationToken: $("input[type='hidden'][name='__RequestVerificationToken']").val(),
                game: "zxc"
            },
            beforeSend: function () {
                $(zxconfig.RefreshZXC).addClass("on");
            },
            success: function (data) {
                if (data["status"] == "success") {
                    $(zxconfig.RefreshZXC).removeClass("on");
                    //$(span).text(data["text"]);
                    $(".currentBlance").text(data["text"]);
                }
            },
            error: function (result) {
            }
        });
    });
    //客服事件绑定
    $(zxconfig.ServiceBtn).click(function () { //客服
        sliaonow();
    });
    //默认滑动翻页
    $(document).on(zxevent.click, zxconfig.PageTurn, function (e) { 
        e.preventDefault();
        var Val = $(this).attr(zxconfig.datapage);
        var url = $(this).attr(zxconfig.dataurl);
        var datast = $(this).attr(zxconfig.dataselect);
        var tit = $(this).attr(zxconfig.datatit);

        if (typeof (Val) == "undefined") {
            var PageVal = 2;
            $(this).attr(zxconfig.datapage, 2);
            SlidePage(PageVal, url, datast, tit);
        } else {
            var PageVal = Val;
            SlidePage(PageVal, url, datast, tit);
        };
    });
    //返回上一页
    $(document).on(zxevent.click,zxconfig.pagebk,function () {
        var PageVal = $(this).attr(zxconfig.datapage);
        if (typeof (PageVal) == "undefined") {
            PageVal = 2;
        }
        BackPage(PageVal);
    });
});

//客服
//js 代码 --- 
function sliaonow() {
    var cookiename = "svidname";
    var cookievalue = getCookie(cookiename);
    if (cookievalue=="") {
        cookievalue = randomString(22);
        setCookie(cookiename, cookievalue, 365);
    }
    window.open('https://lpcdn.lpsnmedia.net/le_unified_window/8.2.0.0-release_1705/index.html?lpUnifiedWindowConfig={"accountId":"22488558","env":"prod","external":true,"secureStorageType":"indexedDB","engConf":{"async":false,"scid":"1","cid":336929451,"eid":340083951,"lang":"zh-CN","svid":"'+cookievalue+'","ssid":"zq_EsSGARLOkUeXfMxuBLw.5834b38ef1d5ad2ebd013d85862b478356650c1e","lewid":340082751}}', 'newwindow', 'height=660,width=490,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
}
//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
//清除cookie  
function clearCookie(name) {
    setCookie(name, "", -1);
}
//检查cookie
function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}
function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}