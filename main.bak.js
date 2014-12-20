console.info("插件加载");
console.info("解析帖子信息。。。");
var teilist = $("li.j_thread_list.clearfix");
var baselink = "http://tieba.baidu.com/";
console.info("设置特别关注用户......");
var fav = ["w594669442"];
window.Notification.requestPermission();
var Notification = window.Notification || window.mozNotification || window.webkitNotification;

teilist.each(function () {
    console.info("解析帖子用户......");
    var adom = $(this).find("a.j_th_tit")[0];
    console.info("解析帖子链接......");
    var link = baselink + $(adom).attr("href");
    var title = $(adom).attr("title");
    console.info("获得用户信息......");
    var userlist = $(this).find("a.j_user_card");
    userlist.each(function () {
        console.info("获得用户名......");
        var name = $(this).text();
        if ($.inArray(name, fav) != -1) {
            console.info("扫描到关注用户，打开新窗口......");
            show(name + "有新帖子", title, link);
            adom.click();
        }
    });
});

/**
 * 弹出提示有特别关注用户并打开帖子地址
 * @param title
 * @param msg
 * @param link
 */
function show(title, msg, link) {
    console.info(title);
    var instance = new Notification(
        title, {
            body: msg
        }
    );
    window.open(link, "_blank");
    instance.onclick = function () {
        window.open(link, "_blank");
        instance.cancel();
    };
}