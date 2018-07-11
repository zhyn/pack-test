/**
*Insight相关基础组件与接口
*/
import router from '../../router'
import utils from './utils.js'

const sdk_fn = function(func, ...args) {
    if (insight.isBridgeReady()){
        return func(...args);
    } else {
        return new Promise((resolve, reject) => {
            insight.bootstrap(function(){
                resolve(func(...args));
            })
        })
    }
}

const sdk_event = function (event, type, cb) {

    if (insight.isBridgeReady()) {
        event(type, function(response){
            cb && cb(response);
        })
    } else {
        insight.bootstrap(function(){
            event(type, function(response){
                cb && cb(response);
            })
        })
    }

    // return new Promise((resolve, reject) => {
    //     if (insight.isBridgeReady()) {
    //         event(type, function(response){
    //             resolve(response)
    //         })
    //     } else {
    //         insight.bootstrap(function(){
    //             event(type, function(response){
    //                 resolve(response)
    //             })
    //         })
    //     }
    // })
}
/*jump 已替换*/
const jump = function(url) { // 路由压栈跳转
    if (!checkClient()) {
        // router.push(url)
        return;
    }
    var bean = {
        "url": (url.indexOf('?') > 0) ? (url + '&light=index.html') : (url + '?light=index.html'),
    }

    sdk_fn(insight.window.pushWindow, bean.url)
    .then( data => {
        // balabala
    })
    .catch( error => {
        alert(error);
    })
}
/*popWindow 已替换*/
const popWindow = function(params) { // 后退

    let bean = params;
    sdk_fn(insight.window.popWindow, bean)
    .then( data => {
        // balabala
    })
    .catch( error => {
        alert(error);
    })
}
/*goto 已替换*/
const goto = function(url) { // 路由压栈跳转
    var bean = {
        "url": url,
        "orientation": 1,
        "type": 0
    }
    sdk_fn(insight.window.open, bean.url, bean.type, bean.orientation)
    .then( data => {
        // balabala
    })
    .catch( error => {
        alert(error);
    })

    langScape();
}
/*jump1 没有其他页面引用*/
const jump1 = function(url) { // 路由压栈跳转
    var bean = {
        "url": url,
        "orientation": 1
    }

    sdk_fn(insight.window.pushWindow, bean.url, bean.orientation)
    .then( data => {
        // balabala
    })
    .catch( error => {
        alert(error);
    })
}
/*alert 已替换*/
const alert = function(title, content, buttonText) {
    sdk_fn(insight.ui.alert, title, content, buttonText)
    .then( data => {
        // balabala
    })
    .catch( error => {
        alert(error);
    })
}
/*jumpFullScreenTable 已替换*/
const jumpFullScreenTable = function(type, tableData, showColumns, title,paramsObject) { // 跳转全屏表格

    localStorage.removeItem('title');
    localStorage.removeItem('tableData');
    localStorage.removeItem('showColumns');
    localStorage.removeItem('showDM');
    localStorage.removeItem('mergeColumn');
    localStorage.removeItem('activityInfo');
    localStorage.removeItem('isHeadTwo');
    localStorage.removeItem('isBlockArea');
    localStorage.removeItem('storeRank');
    localStorage.removeItem('nobdshow');
    localStorage.removeItem('fixedNumber');

    localStorage.setItem('title', title);
    localStorage.setItem('tableData', JSON.stringify(tableData));
    localStorage.setItem('showColumns', JSON.stringify(showColumns));
    if(type=='newtable' && paramsObject){
        if(paramsObject['showDM']){
            localStorage.setItem('showDM', JSON.stringify(paramsObject['showDM']));
        }
        if(paramsObject['mergeColumn']){
            localStorage.setItem('mergeColumn', JSON.stringify(paramsObject['mergeColumn']));
        }
        if(paramsObject['activityInfo']){
            localStorage.setItem('activityInfo', JSON.stringify(paramsObject['activityInfo']));
        }
        if(paramsObject['isHeadTwo']){
            localStorage.setItem('isHeadTwo', JSON.stringify(paramsObject['isHeadTwo']));
        }
        if(paramsObject['isBlockArea']){
            localStorage.setItem('isBlockArea', JSON.stringify(paramsObject['isBlockArea']));
        }
        if(paramsObject['storeRank']){
            localStorage.setItem('storeRank', JSON.stringify(paramsObject['storeRank']));
        }
        if(paramsObject['nobdshow']){
            localStorage.setItem('nobdshow', JSON.stringify(paramsObject['nobdshow']));
        }
        if(paramsObject['fixedNumber']){
            localStorage.setItem('fixedNumber', JSON.stringify(paramsObject['fixedNumber']));
        }
    }
    var bean = {
        type: 1,
    };
    let host = location.origin;
    let url = `/h_screen_page?type=${type}`;
    jump1(url);
    // langScape();
    console.log(url);
}
/*jumpFullScreenCharts 已替换*/
const jumpFullScreenCharts = function(type, chartsOptions, title, chartDataAll) { // 跳转全屏图表
    localStorage.removeItem('title');
    localStorage.removeItem('chartsOptions');
    localStorage.removeItem('chartDataAll');

    localStorage.setItem('title', title);
    localStorage.setItem('chartsOptions', JSON.stringify(chartsOptions));
    if (chartDataAll) {
        localStorage.setItem('chartDataAll', JSON.stringify(chartDataAll));
    }
    let host = location.origin;
    let url = `/h_screen_page?type=${type}`;
    console.log(url);
    jump1(url);
    // langScape();
}
/*langScape 没有其他页面引用*/
const langScape = function() { // 横屏
    var bean = {
        type: 1,
    };
    sdk_fn(insight.device.landScapeLeft, bean.type)
    .then( data => {
        // 横屏之后balabala
    })
    .catch( error => {
        alert(error);
    })
}
/*confirm 已替换*/
const confirm = function(title, content, confirmButtonText, cancelButtonText, cb) { // 待确认取消弹窗
    sdk_fn(insight.ui.confirm, title, content, confirmButtonText, cancelButtonText)
    .then( data => {
        cb && cb(data.data);
    })
    .catch( error => {
        alert(error);
    })
}
/*showToastNormal 已替换*/
const showToastNormal = function(content,cb) {

    sdk_fn(insight.ui.showToast, content, 'none')
    .then( data => {
        cb && cb();
    })
    .catch( error => {
        alert(error);
    })
}
/*showToast 已替换*/
const showToast = function(content, type=0, duration=1000) { // show toast消息框
    if (!checkClient()) {
        alert(content)
    }
    return new Promise(function(resolve,reject) {
        sdk_fn(insight.ui.showToast, content, type, duration)
        .then( data => {
            console.log(data);
            setTimeout(function(){
                sdk_fn(insight.ui.hideToast)
                .then( data => {
                    // balabala
                    return resolve()
                })
                .catch( error => {
                    alert(error);
                })
              },duration)
        })
        .catch( error => {
            alert(error);
        })

    })
}
// showToast 显示隐藏，没有回调
const showToastNoBack = function(content, type=0, duration=1000) {
    if (!checkClient()) {
        alert(content)
    }
    sdk_fn(insight.ui.showToast, content, type, duration)
    .then( data => {
        setTimeout(function(){
           sdk_fn(insight.ui.hideToast)
           .then( data => {
               // balabala
           })
           .catch( error => {
               alert(error);
           })
         },duration)
    })
    .catch( error => {
        alert(JSON.stringify(error));
    })
}
/*hideToast 没有其他页面引用*/
const hideToast = function() { // hide toast消息框

    sdk_fn(insight.ui.hideToast)
    .then( data => {
        // balabala
    })
    .catch( error => {
        alert(error);
    })
}
/*showLoading 已替换*/
const showLoading = function() { // showloading.
    sdk_fn(insight.ui.showLoading)
    .then( data => {

    })
    .catch( error => {
        alert(error);
    })
}
/*hideLoading 已替换*/
const hideLoading = function(cb) { // hideloading
    sdk_fn(insight.ui.hideLoading)
    .then( data => {
        cb && cb();
    })
    .catch( error => {
        alert(error);
    })
}
/*getCurrentStore 已替换*/
const getCurrentStore = function(queryParam=null,key='store_info',id='store_id',name='store_name') {
    return new Promise((resolve, reject) => {

        if (!checkClient()) {
            return resolve({
                store_id: 'NKBJAP', //B1493_AD ; ADBJ37
                store_name: '1212',
                store_flag: '1', //大店
            });
        } else {
          if(queryParam && queryParam.store_id && queryParam.store_name){
            console.log('b获取id步骤,推送链接参数跳转获取id',queryParam)
              return resolve({
                  store_id: queryParam.store_id,
                  store_name: queryParam.store_name,
                  store_flag: queryParam.store_flag || 0
              });
          }
          else if(router.history.current.query.store_id && router.history.current.query.store_name){
                console.log('b获取id步骤,正常连接获取id',router.history.current)
              return resolve({
                  store_id: router.history.current.query.store_id,
                  store_name: router.history.current.query.store_name,
                  store_flag: router.history.current.query.store_flag || 0
              });
          }
          else {
            console.log(key)
            sdk_fn(insight.storage.get, key)
            .then(responseData => {
              let result = JSON.parse(responseData);
              console.log('b获取id步骤,app获取id',result)
              let storeInfo = {
                  store_name: result[name],
                  store_id: result[id],
                  store_flag: result.store_flag,
                  show_all_in_store_ranking:result.show_all_in_store_ranking

              }
              return resolve(storeInfo)
            })
            .catch(result => {
            return reject('get_storeinfo_failed')
            })
          }


        };
    })
}

const checkClient = function () {
    // console.log(process.env.NODE_ENV=='development')
    if (utils.getCookie('code') && utils.getCookie('_jwt') && utils.getCookie('appid')) {
        return true;
    } else {
        return false;
    }
}
//安卓注入问题
const sdkBridge = function (cb) {
    if (insight.isBridgeReady()) {
            cb && cb()
    } else {
        insight.bootstrap(function(){
            cb && cb();
        })
    }
}

export default {
    jump: jump,
    popWindow: popWindow,
    goto: goto,
    jump1: jump1,
    alert: alert,
    jumpFullScreenTable: jumpFullScreenTable,
    jumpFullScreenCharts: jumpFullScreenCharts,
    langScape: langScape,
    confirm: confirm,
    showToast: showToast,
    showToastNoBack: showToastNoBack,
    showToastNormal : showToastNormal,
    hideToast: hideToast,
    showLoading: showLoading,
    hideLoading: hideLoading,
    sdk_fn: sdk_fn,
    sdk_event: sdk_event,
    getCurrentStore: getCurrentStore,
    checkClient: checkClient,
    sdkBridge: sdkBridge
}
