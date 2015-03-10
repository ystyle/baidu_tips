/**
 * Created by YSTYLE on 2015-03-10 0010.
 */
var base_teibaurl = "http://tieba.baidu.com/mo/sz/m?kw=";
var base_teizhiurl = "http://tieba.baidu.com/mo/m?kz=";
var base_pc_teizhiurl = "http://tieba.baidu.com/p/";
var teizhilist = [];
var setting = loadSetting();
var fav = setting.userlsit;
var teibas = setting.teibas;

/**
 * 拿到关注贴吧的前2页的地址
 */
function getTeiBaUrlList() {
    for (var i = 0, ilen = teibas.length; i < ilen; i++) {
        var teibaurls = [base_teibaurl + teibas[i], base_teibaurl + teibas[i] + "&pn=30"];
        for (var j = 0, jlen = teibaurls.length; j < jlen; j++) {
            getAllURL(teibaurls[j]);
        }
    }
}

/**
 * 获取每一个帖子的地址
 * @param url
 */
function getAllURL(url) {
    $.get(url, function (data) {
        var teibalist = $(data).find("div.i");
        teibalist.each(function (i, v) {
            var teizhi = $(v).find("a").attr("href");
            var teizhiurl = base_teizhiurl + teizhi.substr(teizhi.indexOf("?") + 4, 10);
            teizhilist.push(teizhiurl);
        });
    }, "xml");
}

/**
 * 帖子的人名
 */
function getAllUserName() {
    var url = teizhilist.pop();
    if (url != "" && url != undefined && url != null) {
        $.get(url, function (data) {
            var title = $(data).find("strong").text();
            var lous = $(data).find("td.l");
            lous.each(function (i, v) {
                var cdate = $(v).find("span.b").text();
                if (cdate.length == 5) {
                    var name = $(v).find("span.g>a").text();
                    if (fav.indexOf(name) != -1) {
                        var alink = base_pc_teizhiurl + url.split("=")[1];
                        var one = {"url": alink, "username": name, "title": title};
                        console.info(one);
                        saveFavUserTeizhi(one);
                    }
                }
            });
        }, "xml");
    }
}

/**
 * 加载设置
 * @returns {{userlsit: (Array|*), times: *}}
 */
function loadSetting() {
    var userlist = readJSON("username");
    var times = readJSON("times");
    var teibas = readJSON("teibas");
    return {"userlsit": userlist, "times": times, "teibas": teibas};
}

/**
 * 添加一个帖子
 * @param one
 */
function saveFavUserTeizhi(one) {
    addOne("teizhi", one);
}

getTeiBaUrlList();
var getUserName_timer = setInterval(getTeiBaUrlList, setting.times * 1000);
var getUserName_timer = setInterval(getAllUserName, 16);