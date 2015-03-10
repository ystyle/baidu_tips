console.info("贴吧特别关注[消息提示模块]:正在加载...");
console.info("读取配置......\n");
var setting = loadSetting();
var fav = setting.userlsit;
console.info(setting);
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
		var instance = webkitNotifications.createNotification(imgurl,"["+username+"] 有新的帖子!",msg);
		instance.ondisplay = function(event) {
			setTimeout(function() {
				event.currentTarget.cancel();
			}, 7 * 1000);
        };
		instance.onclick = function () {
			window.open(link, "_blank");
			instance.cancel();
		};
		instance.show();
	});
}

/**
 * 加载设置
 * @returns {{userlsit: (Array|*), times: *}}
 */
function loadSetting() {
    // 读取
    var rt = window.external.mxGetRuntime();
    var usernamestr = rt.storage.getConfig("username");
    var timesstr = rt.storage.getConfig("times");
	var teibastr = rt.storage.getConfig("teibas");
    // 反序列化
    var userlsit = JSON.parse(usernamestr);
    var times = JSON.parse(timesstr);
    var teibas = JSON.parse(teibastr);
    if(!isNotNull(userlsit)){
        userlsit = [];
    }
    if(!isNotNull(teibas)){
        teibas = [];
    }
    return {"userlsit": userlsit, "times": times,"teibas":teibas};
}

/**
 * 判断非空
 * @param value
 * @returns {boolean}
 */
function isNotNull(value) {
    return value != "" && value != undefined && value != null;
}

/**
 * 显示提示
 */
function tips_Notification_show() {
	if(tips_Notification.length<=3){
		var rt = window.external.mxGetRuntime();
		var teizhistr = rt.storage.getConfig("teizhi");
		if (isNotNull(teizhistr)) {
			var favTeiZhi = JSON.parse(teizhistr);
			var oneteizhi = favTeiZhi.pop();
			rt.storage.setConfig("teizhi", JSON.stringify(favTeiZhi));
			if (isNotNull(oneteizhi)) {
				console.info(new Date().toLocaleTimeString()+":"+JSON.stringify(oneteizhi));
				show(oneteizhi.username, oneteizhi.title, oneteizhi.url);
			}
		}
	}
}

/**
 * 释放页面资源
 */
function page_timers(){
	location.reload();//释放页面资源
}

//程序入口
if (location.href.indexOf("tieba.baidu.com/f?") != -1) {
    var _tips_Notification_show = setInterval(tips_Notification_show, 1500);
    var _page_timers = setInterval(page_timers, 1000*60*30);
}

