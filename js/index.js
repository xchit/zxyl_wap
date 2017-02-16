$(function () {
    //登陆按钮事件绑定
    $(zxconfig.LoginBtn).click(function () {
        Link2Login();
    });
    //底部菜单事件绑定
    $(zxconfig.FooterMenu).click(function () {
        FooterMenuChannel(this);
    });
    //客服事件绑定
    $(zxconfig.FooterServer).click(function () { //客服
        sliaonow();
    });
    //转账事件绑定
    $(zxconfig.FooterTransfer).click(function () {
        var $this = $(this);
        FooterMenuChannel($this);
    });
    //会员中心事件绑定
    $(zxconfig.FooterCenter).click(function () {
        var $this = $(this);
        FooterMenuChannel($this);
    });
  
});