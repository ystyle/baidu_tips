/**
 * Created by YSTYLE on 2015-03-10 0010.
 */
$(document).ready(function () {
    $("#lable_add").click(function () {
        var user = $("#id_user").val();
        var times = $("#tims_teizhi").val();
        var teiba = $("#id_teiba").val();
        if (isNotNull(user)) {
            addOne("username", user);
            addTips("tips", user);
            $("#id_user").val("")
        }
        if (isNotNull(teiba)) {
            addOne("teibas", teiba);
            addTips("teiba", teiba);
            $("#id_teiba").val("");
        }
        if (isNotNull(times)) {
            save("times", times);
        }
    });
    loadSetting();
});

/**
 * 加载设置
 */
function loadSetting() {
    var userlist = readJSON("username");
    var times = readJSON("times");
    var teibas = readJSON("teibas");
    for (var name in userlist) {
        if (userlist[name]) {
            addTips("tips", userlist[name]);
        }
    }
    for (var teiba in teibas) {
        if (teibas[teiba]) {
            addTips("teiba", teibas[teiba]);
        }
    }
    $("#tims_teizhi").val(times);
}

/**
 * 删除一个标签
 * @param id
 */
function tips_del(id) {
    removeOne("username", $(id).text());
    $(id).remove();
}

/**
 * 删除一个贴吧
 * @param id
 */
function teiba_del(id) {
    removeOne("teibas", $(id).text());
    $(id).remove();
}

/**
 * 添加一个标签
 * @param type 类型:tips,teiba
 * @param text 显示名称
 */
function addTips(type, text) {
    var lable = "<span class='label label-primary' onclick='" + type + "_del(this)' style='cursor: hand;margin: 5px;display: inline-block'>" + text + "</span>";
    $("#" + type).append(lable);
}