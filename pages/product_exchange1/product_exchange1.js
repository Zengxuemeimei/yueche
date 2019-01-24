// pages/product_exchange1/product_exchange1.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: null,
    goodsId: '',
    product: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goodsId = options.id;
    var that = this;
    that.setData({ "goodsId": goodsId})
    
    //新闻数据 
    wx.request({
      url: app.globalData.api.news.goodsDetail, //仅为示例，并非真实的接口地址
      header: {
        'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      }, 
      data: {
        goodsId: goodsId
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
       
        var thisdata = res.result;
        that.setData({ "product": thisdata });
      
         

      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })

   
  },
 submitData: function(e){
   var that= this;
   console.log('that.data.product:', this.data);
   var bdata = this.data.product;
   //立即兑换 
   wx.showModal({
     title: '提示',
     content: '是否确认兑换',
    //  cancel: false,
     success: function(res){
       if (res.confirm) {
         var data = {
           goodsName: bdata.goodName,
           goodsScore: bdata.goodScore,
           goodsId: bdata.id,
         }

         wx.request({
           url: app.globalData.api.news.conversion, //仅为示例，并非真实的接口地址
           data: data,
           header: {
             'loginSessionId': wx.getStorageSync('loginSessionId'),
             'content-type': 'application/x-www-form-urlencoded'
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
             if(res.result == 'success'){
               wx.showToast({
                 title: '兑换成功',
               })
               var time2 = setTimeout(function () {
                 clearTimeout(time2);
                 wx.navigateTo({
                   url: '../integral_mall_detail/integral_mall_detail',
                 })
               })
             }else{
               wx.showToast({
                 title: '兑换失败',
                 icon: 'none'
               })
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