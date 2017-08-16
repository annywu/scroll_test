var html = document.querySelector('html');
var rem = html.offsetWidth / 6.4;
if (html.offsetWidth > 640)
    rem = 100;
html.style.fontSize = rem + "px";

function cutstring(str, len) {
    if (str.length >= len) {
        return str.substring(0, len) + "";
    }
    return str;
}
$(function () {
    if ($("#f_carts_num").length > 0) {
        get_carts_count();
    }
})
function get_carts_count() {
    $.ajax({
        url: "/tools/submit_ajax.ashx?action=get_cart_goods_num",
        type: "post",
        data: {},
        dataType: "text",
        success: function (data) {
            if (!isNaN(data)) {
                var num = parseInt(data);
                if (num > 0) {
                    $("#f_carts_num").html(num).show();
                }
            }
        }
    })
}
function show_sub_menu() {
    var html='';
    html+='<div class="sub_menu" id="tip_sub_menu">';
    html+='<ul>';
    html+='<li><a href="/index.aspx"><i><img src="/images/icon/home_ico.png" width="100%" /></i>首页</a></li>';
    //html+='<li><i>';
    //html+='<img src="images/icon/share_ico.png" width="100%" /></i>分享</li>';
    //html+='<li><i>';
    //html+='<img src="images/icon/message_ico.png" width="100%" /></i>消息</li>';
    //html+='<li><i>';
    //html+='<img src="images/icon/help_ico.png" width="100%" /></i>帮助</li>';
    html += '<li><a href="/usercenter/index.aspx"><i>';
    html+='<img src="/images/icon/person_ico.png" width="100%" /></i>个人中心</a></li>';
    html+='</ul>';
    html+='<span class="angel_up"></span>';
    html += '</div>';
    if ($("#tip_sub_menu").length > 0) {
        $("#tip_sub_menu").remove();
        
    } else {
        $("body").append(html);
        $("#tip_sub_menu").show();
    }
}
$(function () {
    if ($('#loading').length>0){
        $('#loading').hide();
    }
})
//function alert(msg) {
//   // layer.open({ skin: 'msg', content: msg, time: 2 });
//}