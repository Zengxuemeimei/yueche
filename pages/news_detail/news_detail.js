// pages/news_detail/news_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('url:', options.id);
    var that = this;

    //新闻详情 
    wx.request({
      // url: "http://192.168.2.12:28080/CZCB/forum/newsList", //仅为示例，并非真实的接口地址
      url: getApp().globalData.api.news.detail, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'  ,
        "loginSessionId": wx.getStorageSync('loginSessionId')
        
      },
      success: function (res) {
        console.log("res:", res);
        var thisdata = res.data.result;

        that.setData({ "news": thisdata })
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