// pages/integral_mall/integral_mall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodlist: [],
    userinfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //y用户详情  
    wx.request({
    
      url: getApp().globalData.api.news.integralinfo, //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },        
      success: function (res) {
        res = res.data;
        if (res.exceptionCode == -1) {
          wx.setStorageSync('loginSessionId', '');
     
          wx.switchTab({
            url: '../a_login/a_login',
          })
          return false;
        }

        console.log("res2:", res);
        var thisdata = res.result;
        that.setData({"userinfo": thisdata});
         
        // that.setData({ "question": thisdata })
      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })


    //y卡列表 
    wx.request({

      url: getApp().globalData.api.news.integragoodsList, //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },  
      success: function (res) {
        res = res.data;
        if (res.exceptionCode == -1) {
          wx.setStorageSync('loginSessionId', '');
          return;
          wx.switchTab({
            url: '../a_login/a_login',
          })
          return false;
        }

        console.log("res2:", res);
        var thisdata = res.result;
        console.log('thisdata:', thisdata)
 
        that.setData({ "goodlist": thisdata })
      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })

  },
 
})