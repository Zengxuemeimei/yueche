// pages/shaddress/shaddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '请选择收货地址'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  addressChange: function (event){
   
   this.setData({
     "address": event.detail.value
   })
 }
})