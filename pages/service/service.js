// pages/service/service.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    array: [],
    objectArray: [],
    kouhao: '追求卓越，服务尽善尽美 ',
    index: 0, 
    serviceList: null,
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.api.news.shopList,  
      method: 'POST',
      header: {
        "loginSessionId": wx.getStorageSync('loginSessionId')
      },
      success: function (res) {
        console.log('res: ', res)
        var data = res.data;
        if (data.exceptionCode == -1){
          wx.navigateTo({
            url: '../login/login',
          })
          return ;
        }
         
        if (data.exceptionCode == 0) {
          var result = data.result;
          that.setData({ 'objectArray': result});
          let stroeName = [];
          result.map(function(item , index){
            console.log('name:', item, ',index;', item.storeName);
             stroeName.push(item.storeName)
          })
          console.log('name:', stroeName);
          that.setData({"array": stroeName});
          wx.setStorageSync('store', result[0]); //设置 跳转时候的4s店  

          that.haveService(0);
          
        }

      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })

    
  },
  bindPickerChange: function (e) {
    let that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)

   
    this.setData({
      index: e.detail.value
    });
    this.haveService(e.detail.value);
    this.setData({
      'kouhao': that.data.objectArray[that.data.index].remarks,
    })
    wx.setStorageSync('store', that.data.objectArray[that.data.index]); //设置 跳转时候的4s店 

  },
  haveService: function (shopId){
    let that = this;
   // 获取服务
   wx.request({
     url: app.globalData.api.news.serviceList,
     method: 'POST',
     header: {
       "loginSessionId": wx.getStorageSync('loginSessionId'),
       'content-type': 'application/x-www-form-urlencoded'
     },
     data: {
       shopId: that.data.objectArray[shopId].id,
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
         that.setData({ "serviceList": result })
       }

     },
     fail: function (res) {
       console.log('数据获取失败：', res);
     }
   })
 },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
    this.haveService(e.detail.value);
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    this.haveService(e.detail.value);
  },
  // 在线预约  
  clickOnlineYy: function(e){
    wx.navigateTo({
      url: '../online_yy/online_yy' //在线预约 
    })
  }
  
})