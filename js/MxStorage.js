/**
 * Created by YSTYLE on 2015-03-10 0010.
 */
// 遨游浏览器API
var rt = window.external.mxGetRuntime();

/**
 * 读取数据
 * @param key
 * @returns {*}
 */
function readJSON(key) {
    var json = rt.storage.getConfig(key);
    var obj = null;
    if(isNotNull(json)){
        obj = JSON.parse(json);
    }
    return obj;
}

/**
 * 保存数据
 * @param key
 * @param obj
 */
function save(key,obj){
    var json = JSON.stringify(obj);
    rt.storage.setConfig(key,json);
}

/**
 * 添加一个元素
 * @param key
 * @param obj
 */
function addOne(key,obj){
    var data = readJSON(key);
    if(!isNotNull(data)){
        data = [];
    }
    data.push(obj);
    save(key,data);
}

/**
 * 删除一个元素
 * @param key
 * @param obj
 */
function removeOne(key,obj){
    var data = readJSON(key);
    if(!isNotNull(data)){
        data = [];
    }
    data.pop(obj);
    save(key,data);
}

/**
 *  校验非空
 * @param value
 * @returns {boolean}
 */
function isNotNull(value){
    return value != "" && value != undefined && value != null;
}