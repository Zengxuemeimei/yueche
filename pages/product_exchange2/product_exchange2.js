const app = getApp()
// pages/product_exchange2/product_exchange2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    console.log('jjj options:', options);
    let that = this;
    // 获取服务
    wx.request({
      url: app.globalData.api.news.getServiceDetail,
      method: 'POST',
      header: {
        "loginSessionId": wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        servcieId : id,
      },
      success: function (res) {
        console.log('res: ', res)
        var data = res.data;
        if (data.exceptionCode == -1) {
          wx.navigateTo({
            url: '../login/login',
          })
          return;
        }

        if (data.exceptionCode == 0) {
          var result = data.result;
          console.log('xxxx: ', result);
          that.setData({ "service": result })
        }

      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})