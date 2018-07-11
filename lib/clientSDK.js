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

const checkClient = function () {
    // console.log(process.env.NODE_ENV=='development')
    if (utils.getCookie('code') && utils.getCookie('_jwt') && utils.getCookie('appid')) {
        return true;
    } else {
        return false;
    }
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
export default {
    showToast: showToast,
    checkClient: checkClient,
    hideLoading: hideLoading,
    showLoading: showLoading,
    sdk_fn: sdk_fn,
}