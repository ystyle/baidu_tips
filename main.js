console.info("插件加载");
console.info("解析帖子信息......");
var teilist = document.getElementsByClassName("j_thread_list clearfix");
console.info("设置特别关注用户......\n");
var fav = loadSetting();
console.info(fav);
window.Notification.requestPermission();
var Notification = window.Notification || window.mozNotification || window.webkitNotification;

/**
 * 查找用户与当前帖子链接
 * @param links
 * @returns {{username: Array, alink: string}}
 */
function getlink(links) {
    console.info("查找当前帖子的用户与链接......");
    var teilink = "";
    var username = [];
    for (var i = 0, len = links.length; i < len; i++) {
        var alink = links[i];
        if (alink.className == "j_user_card  ") {
            username.push(alink.innerText);
        } else if (alink.className == "j_th_tit") {
            teilink = alink.href;
        }
    }
    return {username: username, alink: teilink};
}

/**
 * 检查了帖人与最后回复人是不是特别关注用户
 * @param username
 * @param teilink
 */
function checkuser(username, teilink) {
    console.info("检测用户是否特别关注......");
    for (var i = 0, len = username.length; i < len; i++) {
        var user = username[i];
        var index = fav.indexOf(user);
        if (index != -1) {
            console.info("扫描到关注用户，打开新窗口......");
            show(user + "有新帖子", teilink, teilink);
        }
    }
}

/**
 * 解析首页所有帖子
 */
for (var i = 0, len = teilist.length; i < len; i++) {
    console.info("查找当前帖子[" + (i + 1) + "]的链接......");
    var links = teilist[i].getElementsByTagName("a");
    var result = getlink(links);
    var teilink = result.alink;
    var username = result.username;
    checkuser(username, teilink);
    console.info("\n")
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
    window.open(link, "_blank");
    instance.onclick = function () {
        window.open(link, "_blank");
    };
}

function loadSetting() {
    var rt = window.external.mxGetRuntime();
    var str = rt.storage.getConfig("username");
    userlsit = str.split(',');
    return userlsit;
}