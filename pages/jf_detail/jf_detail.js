// pages/integral_mall_detail/integral_mall_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("data:", app.user)
    wx.request({
      url: "https://miniapp2.imczjt.com/getRecord.php", //仅为示例，并非真实的接口地址      
      header: {
        'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        phone: wx.getStorageSync("phone")
      },
      method: 'POST',
      success: function (res) {
        console.log("goodData:", res);
        res = res.data;
        if (res.exceptionCode == -1) {
          wx.setStorageSync('loginSessionId', '');

          wx.switchTab({
            url: '../a_login/a_login',
          })
          return false;
        }
        let result = res.data;
        if (!result){
            wx.showToast({
              title: '暂无记录',
              icon: 'none'
            })
            return false;
        }

        for (var i = 0; i < result.length; i++) {
          result[i].create_time = app.globalData.timestampToTime(result[i].create_time); //时间转换
        }
        that.setData({ "datalist": result })



      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })
  },


})