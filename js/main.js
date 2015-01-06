console.info("插件加载");
console.info("解析帖子信息......");
var teilist = document.getElementsByClassName("j_thread_list clearfix");
console.info("设置特别关注用户......\n");
var setting = loadSetting();
var fav = setting.userlsit;
console.info(setting.times);
console.info(fav);
window.Notification.requestPermission();
var tips_Notification = [];

/**
 * 弹出提示有特别关注用户并打开帖子地址
 * @param title
 * @param msg
 * @param link
 */
function show(username, msg, link) {
	var url = "http://tieba.baidu.com/home/get/panel?ie=utf-8&un="+encodeURIComponent(username);
	$.get(url, function (data) {
		var code = data.data.portrait;
		var imgurl = "http://tb.himg.baidu.com/sys/portrait/item/"+code;
		var instance = webkitNotifications.createNotification(
			imgurl,
			"["+username+"] 有新的帖子!",
			msg
		);
		instance.show();
		tips_Notification.push(instance);
		instance.onclick = function () {
			window.open(link, "_blank");
			instance.cancel();
		};
	});
}

/**
 * 加载设置
 * @returns {{userlsit: (Array|*), times: *}}
 */
function loadSetting() {
    var rt = window.external.mxGetRuntime();
    var str = rt.storage.getConfig("username");
    var times = rt.storage.getConfig("times");
    userlsit = str.split(',');
    return {"userlsit": userlsit, "times": times};
}


/**
 * 关闭提示窗
 */
function canel_tips_Notification() {
    var oneNotification = tips_Notification.pop();
    if (oneNotification != "" && oneNotification != undefined && oneNotification != null) {
        oneNotification.cancel();
    }
}

function isNotNull(value) {
    return value != "" && value != undefined && value != null;
}

function tips_Notification_show() {
    var rt = window.external.mxGetRuntime();
    var teizhistr = rt.storage.getConfig("teizhi");
    if (isNotNull(teizhistr)) {
        var favTeiZhi = JSON.parse(teizhistr);
        var oneteizhi = favTeiZhi.pop();
        rt.storage.setConfig("teizhi", JSON.stringify(favTeiZhi));
        if (isNotNull(oneteizhi)) {
            show(oneteizhi.username, oneteizhi.title, oneteizhi.url);
        }
    }
}

function page_timers(){
	location.reload();//释放页面资源
}

//程序入口
if (location.href.indexOf("tieba.baidu.com") != -1) {
    var _tips_Notification_show = setInterval(tips_Notification_show, 1500);
    var _page_timers = setInterval(page_timers, 1000*60*30);
    var _times_tips_Notification = setInterval(canel_tips_Notification, 10 * 1000);
}

