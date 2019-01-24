// pages/me_qustiona/me_qustiona.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qwlist: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {  
    
      this.loadData();

  },
  loadData: function(e){
    var that = this;
    //我的问答   
    wx.request({
      url: getApp().globalData.api.news.mineAQone, //仅为示例，并非真实的接口地址
      // url: getApp().globalData.api.news.mineAQoneNew, //仅为示例，并非真实的接口地址
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
        that.setData({ "qwlist": thisdata })
        console.log('thisdata:', thisdata);
      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })
  },
  
  deleteAn: function(e){
    var that = this;
    console.log('e:', e.target.dataset.id);
    let anid = e.target.dataset.id;
    wx.showModal({
      title: '提示',
      content: '是否确定删除',
      success: function (res) {
        if (res.confirm) {
          wx.request({
      url: getApp().globalData.api.news.delMineAnswer, //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        answerId: anid
      },
      success: function (res) {
        console.log('res:', res);
       res = res.data;
       if(res.result == 'success'){
         wx.showToast({
           title: '删除成功',
         });
         that.loadData();
         
       }
      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  }

   
})