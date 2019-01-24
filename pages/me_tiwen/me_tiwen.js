// pages/me_tiwen/me_tiwen.js 
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "questionlist": null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({

      url: getApp().globalData.api.news.mineQuestion, //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res3:", res);
        var thisdata = res.data.result;
        console.log('thisdata:', thisdata)
        for (var i = 0; i < thisdata.length; i++) {
          thisdata[i].question.createTime = app.globalData.timestampToTime(thisdata[i].question.createTime); //时间转换
           let attach = thisdata[i].question.attach;
           let attachArr = attach.split(',');
           thisdata[i].question.attach = attachArr;
        }
        that.setData({ "questionlist": thisdata })
        console.log('thisdata:', thisdata );
      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })
  },

  
})