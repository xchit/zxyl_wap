$(function () {
    ////////////////////////////系統默認START/////////////////////////////
    var slideMenu = new Swiper('#slideMenu', {//菜单滑动
        slidesPerView: 4,
        freeMode: true,
        onInit: function (slideMenu) {
            $("#slideMenu .swiper-slide").each(function (index, element) {//优惠分类
                var data = $(this).attr("data-type");
                if (data != "all" && data != "hot") {
                    $("#prMain").append("<div class='swiper-slide' id='pr_type_" + data + "' data-type='" + data + "'>");
                }
            });
            preferential();
        }
    });
    function preferential() {//优惠滑动加载
        $(document).on("click", "#slideMenu .swiper-slide", function () {//分类指向
            Preferential.slideTo($("#slideMenu .swiper-slide").index(this));
        });
        var Preferential = new Swiper('#Preferential .swiper-container', {
            autoplay: false,
            autoplayDisableOnInteraction: false,
            paginationClickable: true,
            loop: false,
            onInit: function (Preferential) {
                $("#pr_type_all .SlidePage").each(function (index, element) {//优惠分类
                    var data = $(this).attr("data-type");
                    var hot = $(this).attr("data-hot");
                    var url = $(this).attr("data-url");
                    var prhtml = "<div class='lab SlidePage' data-url=" + url + " data-page='2'>" + $(this).html() + "</div>";
                    $("#pr_type_" + data).append(prhtml);
                    if (hot == "1") {
                        $("#pr_type_hot").append(prhtml)
                    }
                });
            },
            onSlideChangeStart: function (Preferential) {
                var $this = Preferential.activeIndex,
                menu = "#slideMenu .swiper-slide",
                current = "on",
                loading = $("#loading"),
                Before = $("#prMain .swiper-slide:last").attr("id"),
                PrBefore = $("#" + Before);
                Width = $(menu).width();
                var datatype = $("#prMain .swiper-slide:last").attr("data-type");
                $(menu).removeClass(current);
                $(menu).eq($this).addClass(current);
                var Length = $('#Preferential .swiper-slide').length;
                if (Length > 4) {
                    if ($this > 2) {
                        slideMenu.slideTo($this - 2, 500, false);
                    } else if ($this <= 2) {
                        slideMenu.slideTo(0, 500, false);
                    }
                } else {
                    slideMenu.slideTo(0, 500, false);
                }
                if (Preferential.activeIndex == Length - 1) {
                    var PrBeforeHtml = PrBefore.html();
                    if (PrBeforeHtml != "") {
                        return false;
                    } else {
                        $.ajax({
                            type: "post",
                            url: "/Preferential/Previous/",
                            data: { TypeId: datatype },
                            beforeSend: function () {
                                loading.show();
                            },
                            success: function (data) {
                                loading.hide();
                                PrBefore.html(data);
                                PrBefore.find(".SlidePage").attr("data-page", 2);
                                //加载完绑定详情点击事件
                                $(".special").on("click", function () {
                                    TurnPage(this);
                                });
                            },
                        });
                    }
                }
            }
        });
    }
    ////////////////////////////系統默認END/////////////////////////////
    $(".SlidePage").click(function (e) {
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
});