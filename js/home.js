$(function () {
    //判断客户端
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    //加载绑定
    var lilist = $("#Gameplat").find("li").filter(":not(.SiderIframe)");
    $.each($(lilist), function () {
        var div = $(this).find("div");
        var lis = $(this).find("i");
        var span = $(this).find("span");
        var data = $(div).attr("data");
        var platname = $(span).text();
        var weburl = $(lis).filter(".platweb").attr("url");
        var androidurl = $(lis).filter(".platandroid").attr("url");
        var iosurl = $(lis).filter(".platios").attr("url");
        var plat = $(lis).filter(".plat").attr("plat");//平台
        var dataurl = $(this).attr(zxconfig.dataurl);
        var datapage = $(this).attr(zxconfig.datapage);
        var dataselect = $(this).attr(zxconfig.dataselect);
        var ahref = $(this).find("a");
        if (isAndroid) {
            if (weburl != "" && androidurl != "") {
                $(this).attr("onclick", "PopupGamebox(" + data + ",'" + platname + "','" + weburl + "','" + androidurl + "');");
            } else if (androidurl == "" && weburl != "") {
                $(this).wrapInner("<a href='" + weburl + "' target='_blank'>");
            } else if (weburl == "" && androidurl != "") {
                $(this).wrapInner("<a href='" + androidurl + "' target='_blank'>");
            } else {
                $(this).attr("onclick", "javascript:PopupTipbox();");
            }

        } else if (isiOS) {
            if (weburl != "" && iosurl != "") {
                $(this).attr("onclick", "PopupGamebox(" + data + ",'" + platname + "','" + weburl + "','" + iosurl + "');");
            } else if (iosurl == "" && weburl != "") {
                $(this).wrapInner("<a href='" + weburl + "' target='_blank'>");
            } else if (weburl == "" && iosurl != "") {
                $(this).wrapInner("<a href='" + iosurl + "' target='_blank'>");
            } else {
                $(this).attr("onclick", "javascript:PopupTipbox();");
            }
        }
    });
    //滑动页面
    $(document).on("click", "#Gameplat .SiderIframe",function () {
        var div = $(this).find("div");
        var lis = $(this).find("i");
        var span = $(this).find("span");
        var data = $(div).attr("data");
        var platname = $(span).text();
        var weburl = $(lis).filter(".platweb").attr("url");
        var androidurl = $(lis).filter(".platandroid").attr("url");
        var iosurl = $(lis).filter(".platios").attr("url");
        //var plat = $(lis).filter(".plat").attr("plat");//平台
        var dataurl = $(this).attr(zxconfig.dataurl);
        var datapage = $(this).attr(zxconfig.datapage);
        var dataselect = $(this).attr(zxconfig.dataselect);
        var $this = $("#Gamebox");
        if (data==1) {
            GameBoxShowMaintenance($this, platname);
            return false;
        }
        if (typeof (weburl) == "undefined"
            || typeof (androidurl) == "undefined"
            || typeof (iosurl) == "undefined") {
            GameBoxShowMaintenance($this, platname);
            return false;
        }
        SlidePage(datapage, dataurl, dataselect, platname);
        return false;
    });
    $(document).on("click", "#closeGamebox", function () {
        var $Gamebox = $("#Gamebox");
        $Gamebox.html("");
        $Gamebox.hide();
    });
});
function loadtogame(obj) {
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var div = $(obj).find("div");
        var lis = $(obj).find("i");
        var span = $(obj).find("span");
        var data = $(div).attr("data");
        var platname = $(span).text();
        var weburl = $(lis).filter(".platweb").attr("url");
        var androidurl = $(lis).filter(".platandroid").attr("url");
        var iosurl = $(lis).filter(".platios").attr("url");
        var plat = $(lis).filter(".plat").attr("plat");//平台
        var dataurl = $(obj).attr(zxconfig.dataurl);
        var datapage = $(obj).attr(zxconfig.datapage);
        var dataselect = $(obj).attr(zxconfig.dataselect);
        var $this = $("#Gamebox");
        if (data == 1) {
            GameBoxShowMaintenance($this, platname);
            return false;
        }
        if (typeof (weburl) == "undefined"
            || typeof (androidurl) == "undefined"
            || typeof (iosurl) == "undefined") {
            GameBoxShowMaintenance($this, platname);
            return false;
        }
        if (isAndroid) {
            if (plat == "PT") {
                SlidePage(datapage, dataurl, dataselect, platname);
                return false;
            }
            if (plat == "MG") {
                SlidePage(datapage, dataurl, dataselect, platname);
                return false;
            }
            if (weburl != "" && androidurl != "") {
                GameBoxShow($this, platname, weburl, androidurl);
            } else if (androidurl == "" && weburl != "") {
                $(obj).attr("href", iosurl);
                $(obj).attr("target", "_blank");
                return true;
            } else if (weburl == "" && androidurl != "") {
                $(obj).attr("href", androidurl);
                $(obj).attr("target", "_blank");
                return true;
            }

        } else if (isiOS) {
            if (plat == "PT") {
                SlidePage(datapage, dataurl, dataselect, platname);
                return false;
            }
            if (plat == "MG") {
                SlidePage(datapage, dataurl, dataselect, platname);
                return false;
            }
            if (weburl != "" && iosurl != "") {
                GameBoxShow($this, platname, weburl, iosurl);
            } else if (iosurl == "" && weburl != "") {
                $(obj).attr("href", weburl);
                $(obj).attr("target", "_blank");
                return true;
            } else if (weburl == "" && iosurl != "") {
                $(obj).attr("href", iosurl);
                $(obj).attr("target", "_blank");
                return true;
            }
        }
}
//弹出登陆提示
function PopupTipbox() {
    swal({
        title: "请先登录",
        timer: 2000,
        type: "warning",
        showConfirmButton: false
    });
}
//弹出框
function PopupGamebox(status, platname, weburl, mobileurl) {
    var $this = $("#Gamebox")
    if (status == 0) {
        GameBoxShow($this, platname, weburl, mobileurl);
    } else if (status == 1) {
        GameBoxShowMaintenance($this, platname)
    }
}
//弹出选择
function GameBoxShow(obj, platname, weburl, phoneurl) {
    var maindiv = "<div class=\"main\">"
            + "<div class=\"hd\">" + platname + "</div>"
            + "<div class=\"bd\">"
            + "<ul>"
            + "<a href=\"" + weburl + "\" target=\"_blank\"><li >手机网页版</li></a>"
            + "<a href=\"" + phoneurl + "\" target=\"_blank\"><li >手机客户端</li></a>"
            + "</ul>"
            + "</div>"
            + "<div class=\"fd\" id=\"closeGamebox\">关闭</div>"
            + "</div>";
    $(maindiv).appendTo($(obj));
    $(obj).show();
}
//弹出维护
function GameBoxShowMaintenance(obj,platname) {
    var main = "<div class=\"main\">"
            + "<div class=\"hd\">" + platname + "</div>"
            + "<div class=\"bd\">"
            + "<ul>"
            + "<li class=\"no\">系统维护中</li>"
            + "</ul>"
            + "</div>"
            + "<div class=\"fd\" id=\"closeGamebox\">关闭</div>"
            + "</div>";
    $(main).appendTo($(obj));
    $(obj).show();
}
   