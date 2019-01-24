//app.js
// var host = "http://192.168.2.12:28080/CZCB/";
// var host = "http://120.27.21.62:8888/CZCB/";
// var host = "https://lc.xinkezhi.com/CZCB/";
var host = "https://miniapp.imczjt.com/CZCB/";
// var host = "http://192.168.0.130:8888/CZCB/";
// var host = "http://192.168.0.129:8888/CZCB/";
var api = {
  news: {
    list: host + 'forum/newsList',
    home: host + 'index/indexNews',// 列表
    submitCar: host + 'index/submitCar',// 车添加
    indexCars: host + 'index/indexCars',// 车添加
    detail: host + 'forum/newDetail',// 详情 

    subTraQuestion: host + 'index/subTraQuestion',//事故上报
    VehicleAccidents: host + 'mine/mineVehicleAccidents ',//事故上报

    questionList: host + 'forum/questionList',// 问答列表 
    // questionDetail: host + 'forum/questionDeta',// 问答详情
    questionDetail: host + 'mine/questDetail',// 问答详情

    integralinfo: host + 'integral/userInfo',// 用户信息
    integral: host + 'integral/userInfo',// 用户信息
    integragoodsList: host + 'integral/goodsList',// 积分商城

    onceSubQuestion: host + 'index/onceSubQuestion',// 一键提问
    goodsDetail: host + 'integral/goodsDetail',// 积分详情goodsDeta    
    conversion: host + 'integral/conversion',// 立即兑换
    conversionList: host + 'integral/conversionList',// 立即兑换

    // 我的 
    getSessionId: host + 'mine/getSessionId',// session id //  no pass
    login: host + 'mine/login',// 登录
    mineIndex: host + 'mine/mineIndex',// 我的首页
    signScore: host + 'mine/signScore',// 签到 
    register: host + 'mine/register', //注册
    mineAQone: host + 'mine/mineAQ ',// 我的问答
    mineAQoneNew: host + 'mine/mineAnswer ',// 我的问答
    mineAQ: host + 'mine/mineFeedBackAdd  ',// 反馈提交
    saveAnswer: host + 'mine/commitAnswer',// 我的问答
    delMineAnswer: host + 'mine/delMineAnswer ',// 删除我的问答
    mineQuestion: host + 'mine/mineQuestion ',// 我的t提问
    smsCheckCode: host + 'mine/smsCheckCode ',// 发送验证码
    conversion: host + 'integral/conversionGoods',// 立即兑换 
    mineBespoke: host + 'mine/mineBespoke',// 我的预约  
    cancelMineBV: host + 'mine/cancelMineBV',// 我的预约  
    subFeedback: host + 'mine/subFeedback',// 反馈   

    
    uploadImg: host + 'attach/upload',// 立即兑换

    // 服务
    shopList: host + 'bespoke/shopList',// 4s店面 
    myCars: host + 'bespoke/myCars',// 4s店面 
    submitBes: host + 'bespoke/submitBes ',// 4s店面 

    callList: host + 'index/callList',// 电话 

    updatePassword: host + 'mine/updatePassword',// 修改密码 
    updateBindPhone: host + 'mine/updateBindPhone',// 修改密码 
    serviceList: host + 'bespoke/serviceList',// 修改密码 
    getServiceDetail: host + 'bespoke/getServiceDetail',// 修改密码 

    tracking: host + 'carApi/tracking',//  当前位置
    carApihistory: host + 'carApi/history',//  历史记录
    geofenceList: host + 'carApi/geofenceList',//  电子围栏
 
     

    
    

  }
}
// 
function formateDate(timestamp){
  return new Date(timestamp).getTime();

}
// 当前时间 
function nowYMD(date){
 let nowDate = new Date();
 let Year = nowDate.getFullYear();
 let Mouth = '0'+ (nowDate.getMonth() + 1);
  Mouth = Mouth.slice(-2);
 let Day = nowDate.getDate();
  return Year+"-"+ Mouth + '-' + Day;
}

function timestampToTime(timestamp) {
  console.log('time: ', timestamp)
  timestamp = "" + timestamp
  if (timestamp.length == 10) {
    timestamp = timestamp * 1000;
  }
  console.log('time: ', timestamp)
  var date = new Date(parseInt(timestamp));//时间戳为10位需*1000，时间戳为13位的话不需乘1000 
  console.log('time: ', date)
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes();
  var s = date.getSeconds();
  return Y + M + D + h + m;
}
// 多少分钟前
function getDateDiff(dateTimeStamp) {
  let result = '';
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) { return; }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  }
  else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  }
  else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  }
  else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  }
  else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else
    result = "刚刚";
  return result;
}

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId 
        console.log("res code:", res.code);
        this.globalData.wxcode = res.code;

        //通过小程序code获取sessionId session_key
        // var openid = wx.getStorageSync('sessionId');
        // if (openid){ //存在不调用  否则重新获取sessionid    
        //   return false;
        // }
        wx.request({ 
          url: api.news.getSessionId, //仅为示例，并非真实的接口地址
          method: 'POST',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            res = res.data;
            console.log("getSessionId res:", res);
            console.log("getSessionId res:", res.exceptionCode);
            if (res.exceptionCode == 0){
              wx.setStorageSync('sessionId', res.result) ; //设置openid
            }else{
              wx.showToast({
                title: '登录失败',
                icon: 'none'
              })
            }
            
          },
          fail: function (res) {
            console.log('数据获取失败：', res);
          }
        })
        // wx.navigateTo({
        //   url: '../a_register/a_register',
        // })
      },
      fail: res=>{
        console.log('aaaa app js 登录错误：', res);
      } 
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId 
              console.log('res::', res);
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: res => {
              console.log('getinfo fail: ', res);
            }
          })
        }
      },
      fail: res => {
        console.log('fail:::::::', res);
      }
    })
  },
  globalData: {
    userInfo: null,
    wxcode: null,
    api: api,
    timestampToTime: timestampToTime,
    getDateDiff: getDateDiff,
    nowYMD: nowYMD,
    formatDate: formateDate
  }
})