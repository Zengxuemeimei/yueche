// pages/me/me.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {

    },
    userdata: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ "userinfo": app.globalData.userInfo});
    this.initData();
    
  },
 initData: function(e){
   var that = this;
   //新闻详情 
   wx.request({
     url: getApp().globalData.api.news.mineIndex, //仅为示例，并非真实的接口地址
     method: 'POST',
 
     header: {
       'content-type': 'application/x-www-form-urlencoded',
       'loginSessionId': wx.getStorageSync('loginSessionId'),
     },
     success: function (res) {
       console.log("res:", res);
       var data = res.data;

       if (data.exceptionCode == -1) {
         wx.showToast({
           title: '登录过期，请重新登录',
           icon: 'none'

         })
         wx.navigateTo({
           url: '../a_login/a_login',
         })
         return;
       }
       if (data.exceptionCode == 0) {
         // 设置 本地长期token 
         var userdata = data.result;
         that.setData({"userdata": userdata})
         console.log("每日签到：", that.data.userdata)
       }
      

     },
     fail: function (res) {
       console.log('数据获取失败：', res);
     }
   })
 },
 submitQD: function(e){
   var that = this;
   wx.request({
     url: getApp().globalData.api.news.signScore, //仅为示例，并非真实的接口地址
     method: 'POST',
     header: {
       'content-type': 'application/x-www-form-urlencoded',
       'loginSessionId': wx.getStorageSync('loginSessionId'),
     },
     success: function (res) {
       console.log("res:", res);
       var data = res.data;

       if (data.exceptionCode == -1) {
         wx.showToast({
           title: '登录过期，请重新登录',
           icon: 'none'

         })
         wx.navigateTo({
           url: '../a_login/a_login',
         })
         return;
       }
       if (data.exceptionCode === 0) {
         // 设置 本地长期token 
         if(data.result == 'success'){
           wx.showToast({
             title: '积分: +1',
           })
           that.initData();
         }
          
       }


     },
     fail: function (res) {
       console.log('数据获取失败：', res);
     }
   })
 }
})