// pages/redemption_center/redemption_center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oilMass:0,
    convertible:0,
    oneThousand:1000,
    twoThousand:2000,
    threeThousand:3000,
    fourThousand:4000,
    progressOne: 0,
    progressTwo: 0,
    progressThree: 0,
    progressFour:0,
    alreadyConvertibility:0
  },
  goExchange(){
    wx.navigateTo({
      url: '../oil_record/oil_record',
    })
  },
  clickExchange(e){
    console.log(e.currentTarget.dataset.id);
    let index = e.currentTarget.dataset.id
    let that = this;
    wx.request({
      url: "https://miniapp2.imczjt.com/getOil.php",
      header: {
        // 'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        phone: wx.getStorageSync("phone"),
        num: index
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 1){
          wx.showToast({
            title: '机油不足',
            icon:"none"
          })
        }else{
          wx.showToast({
            title: '兑换成功',
          })
          that.onLoad()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: "https://miniapp2.imczjt.com/oilInfo.php",
      header: {
        // 'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        phone: wx.getStorageSync("phone")
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.setData({
          oilMass: res.data.data.all,
          alreadyConvertibility:res.data.data.used,
          progressOne: res.data.data.now / 10,
          progressTwo: res.data.data.now / 20,
          progressThree: res.data.data.now / 30,
          progressFour: res.data.data.now / 40,
        })
        let oilNow = res.data.data.now
        if (oilNow < 1000){
               that.setData({
                 convertible: 0
               })
        }
        else if (oilNow >= 1000 && oilNow < 2000) {
          that.setData({
            convertible: 1000
          })
        }
        else if (oilNow >= 2000 && oilNow < 3000){
          that.setData({
            convertible: 2000
          })
        }
        else if (oilNow >= 3000 && oilNow < 4000) {
          that.setData({
            convertible: 3000
          })
        }
        else if (oilNow >= 4000) {
          that.setData({
            convertible: 4000
          })
        }
        //1000还差
        if (oilNow <= 1000 && oilNow > 0){
          that.setData({
            oneThousand: 1000 - oilNow,
            twoThousand: 2000 - oilNow,
            threeThousand: 3000 - oilNow,
            fourThousand: 4000 - oilNow,
          })
        }
        else if (oilNow <= 2000 && oilNow > 1000) {
          that.setData({
            oneThousand: 0,
            twoThousand: 2000 - oilNow,
            threeThousand: 3000 - oilNow,
            fourThousand: 4000 - oilNow,
          })
        }
        else if (oilNow <= 3000 && oilNow > 2000) {
          that.setData({
            oneThousand: 0,
            twoThousand: 0,
            threeThousand: 3000 - oilNow,
            fourThousand: 4000 - oilNow,
          })
        }
        else if (oilNow <= 4000 && oilNow > 3000) {
          that.setData({
            oneThousand: 0,
            twoThousand: 0,
            threeThousand: 0,
            fourThousand: 4000 - oilNow
          })
        }
      },
      fail: function (res) { },
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