console.info("插件加载");
console.info("解析帖子信息......");
var teilist = document.getElementsByClassName("j_thread_list clearfix");
console.info("设置特别关注用户......\n");
var setting = loadSetting();
var fav = setting.userlsit;
console.info(setting.times);
console.info(fav);
window.Notification.requestPermission();
var Notification = window.Notification || window.mozNotification || window.webkitNotification;
var tips_Notification = [];
/**
 * 查找用户与当前帖子链接
 * @param links
 * @returns {{username: Array, alink: string}}
 */
function getlink(links) {
    console.info("查找当前帖子的用户与链接......");
    var teilink = "";
    var username = [];
    var title = "";
    for (var i = 0, len = links.length; i < len; i++) {
        var alink = links[i];
        if (alink.className.indexOf("j_user_card") != -1) {
            username.push(alink.innerText);
        } else if (alink.className.indexOf("j_th_tit") != -1) {
            teilink = alink.href;
            title = alink.title;
        }
    }
    return {"username": username, "alink": teilink, "title": title};
}

/**
 * 检查了帖人与最后回复人是不是特别关注用户
 * @param username
 * @param teilink
 */
function checkuser(result) {
    console.info("检测用户是否特别关注......");
    var username = result.username;
    for (var i = 0, len = username.length; i < len; i++) {
        var user = username[i];
        console.info("标题：" + result.title + "，用户：" + result.username + "，链接：" + result.alink);
        var index = fav.indexOf(user);
        if (index != -1) {
            console.info("扫描到关注用户，打开新窗口......");
            show(user + "有新帖子", result.title, result.alink);
        }
    }
}

/**
 * 解析首页所有帖子
 */
function loadTips(){
    for (var i = 0, len = teilist.length; i < len; i++) {
        console.info("查找当前帖子[" + (i + 1) + "]的链接......");
        var links = teilist[i].getElementsByTagName("a");
        var result = getlink(links);
        checkuser(result);
        console.info("\n")
    }
}


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
	tips_Notification.push(instance);
    // var urllist = tabURLList();
    // if (urllist.indexOf(link) == -1) {
        // window.open(link, "_blank");
    // }
    instance.onclick = function () {
        window.open(link, "_blank");
        instance.cancel();
    };
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
 * 刷新页面
 */
function timer() {
    location.reload();
}

/**
 * 关闭提示窗
 */
function timer() {
    tips_Notification.pop().cancel();
}

//程序入口
if (location.href.indexOf("tieba.baidu.com") != -1) {
    var times = setInterval(timer, setting.times * 1000);
	var times_tips_Notification = setInterval(timer, 5 * 1000);
    loadTips();
}


function tabURLList () {
    var rt = window.external.mxGetRuntime();
    // 获取浏览器接口
    var list = [];
    var tabs = rt.create("mx.browser.tabs");
    for (var i = 0, len = tabs.length; i < len; i++) {
        var tab = tabs.getTab(i);
        var url = tab.url;
        if (url.indexOf("http://tieba.baidu.com/p/") != -1) {
            list.push(tab.url)
        }
    }
    return list;
}
