// pages/oil_record/oil_record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saveOilRes:[],
    exchangeOilRes:[],
    isSaveOil:true,
    isChecked:true
  },
  clickSave(){
    this.setData({
      isSaveOil:true,
      isChecked: true
    })
  },
  clickExchange() {

    this.setData({
      isSaveOil: false,
      isChecked: false
    });
    let that = this;
    wx.request({
      url: "https://miniapp2.imczjt.com/oilDetail.php",
      header: {
        // 'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        phone: wx.getStorageSync("phone"),
        type: "2"//1为明细，2为兑换明细
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data);

        that.setData({
          exchangeOilRes: res.data.data
        })
      },
      fail: function (res) {
      }
      
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: "https://miniapp2.imczjt.com/oilDetail.php",
      header: {
        // 'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        phone: wx.getStorageSync("phone"),
        type:"1"//1为明细，2为兑换明细
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log(res.data.data);        
        that.setData({
          saveOilRes: res.data.data
        })
        // console.log(that.data.saveOilRes)
      },
      fail: function (res) {
        console.log(res.data);

      },
      complete: function (res) {

      },
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