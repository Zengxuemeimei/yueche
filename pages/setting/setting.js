// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 243, //内存大小
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  logout: function(e){
    wx.setStorageSync('loginSessionId', '');
    wx.navigateTo({
      url: '../a_login/a_login',
    })

  },
 clearStorage: function(e){
   var that = this;
   wx.clearStorage();
   try {
     wx.clearStorageSync();
     wx.showToast({
       title: '清除成功',
       success: function(res){
         that.setData({"num": 0})
         // 是否要跳转到首页
       }
     })
   } catch (e) {
     // Do something when catch error
   }
 }
})