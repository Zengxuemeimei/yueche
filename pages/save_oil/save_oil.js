 // pages/save_oil/save_oil.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oilMass:0,
    isOilShow:true,
    oilInfo:"立即攒油",
    animationData: "",
    gathering:"1",
    oilImg:"",
    smallOil:[]
  },
  clickGathering(){
    let that = this;
    wx.request({
      url: "https://miniapp2.imczjt.com/dailySign.php",
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
        if (res.data.code == 1) {
          console.log(res.data.msg);
          that.setData({
            oilInfo: "今日已攒油",
            
          })  
          wx.showToast({
            title: '今日已攒油',
            icon:"none"
          })
        }else{
          wx.showToast({
            title: '攒油成功',
          })
          that.onLoad();
        }
      },
    })
    //更新已攒油量
    
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
        console.log(res.data)
        that.setData({
          oilMass: res.data.data.now,                   
        })
        console.log(that.data.oilMass)  
        //判断小油桶
        if (that.data.oilMass >= 0 && that.data.oilMass < 1000) {
          that.setData({
            smallOil: [],
          })
        }
        else if (that.data.oilMass >= 1000 && that.data.oilMass < 2000) {
          that.setData({
            smallOil: [1],
            oilMass: that.data.oilMass - 1000
          })
        }
        else if (that.data.oilMass >= 2000 && that.data.oilMass < 3000) {
          that.setData({
            smallOil: [1, 2],
            oilMass: that.data.oilMass - 2000
          })
        }
        else if (that.data.oilMass >= 3000 && that.data.oilMass < 4000) {
          that.setData({
            smallOil: [1, 2, 3],
            oilMass: that.data.oilMass - 3000
          })
        }
        else if (that.data.oilMass >= 4000 && that.data.oilMass < 5000) {
          that.setData({
            smallOil: [1, 2, 3, 4],
            oilMass: that.data.oilMass - 4000
          })
        } else if (that.data.oilMass >= 5000) {
          that.setData({
            smallOil: [1, 2, 3, 4, 5],
            oilMass: that.data.oilMass - 5000
          })

        }      
        if (that.data.oilMass > 0 && that.data.oilMass < 105){
          that.setData({
            oilImg: "../../static/images/oil01.png"
          })
        } else if (that.data.oilMass >= 105 && that.data.oilMass < 210){
          that.setData({
            oilImg: "../../static/images/oil02.png"
          })
        } else if (that.data.oilMass >= 210 && that.data.oilMass < 315) {
          that.setData({
            oilImg: "../../static/images/oil03.png"
          })
        } else if (that.data.oilMass >= 315 && that.data.oilMass < 420) {
          that.setData({
            oilImg: "../../static/images/oil04.png"
          })
        } else if (that.data.oilMass >= 420 && that.data.oilMass < 525) {
          that.setData({
            oilImg: "../../static/images/oil05.png"
          })
        } else if (that.data.oilMass >= 525 && that.data.oilMass < 630) {
          that.setData({
            oilImg: "../../static/images/oil06.png"
          })
        } else if (that.data.oilMass >= 630 && that.data.oilMass < 735) {
          that.setData({
            oilImg: "../../static/images/oil07.png"
          })
        } else if (that.data.oilMass >= 735 && that.data.oilMass < 840) {
          that.setData({
            oilImg: "../../static/images/oil08.png"
          })
        } else if (that.data.oilMass >= 840 && that.data.oilMass < 1000) {
          that.setData({
            oilImg: "../../static/images/oil09.png"
          })
        } else if (that.data.oilMass >= 1000) {
          that.setData({
            oilImg: "../../static/images/oil10.png"
          })
        }
        //判断今日是否攒油
        if (res.data.data.count == 0) {
          that.setData({
            oilInfo: "立即攒油",
            gathering: "1"
          })
        } else {
          that.setData({
            oilInfo: "今日已攒油",
            gathering: ".7"
          })

        }
        
        
        //动画
        // var animation = wx.createAnimation({
        //   duration: 800,
        //   timingFunction: 'linear',
        // })
        // this.animation = animation
        // var next = true;
        // setInterval(function () {
        //   if (next) {
        //     this.animation.scale(0.95).translateX(-50).step()
        //     next = !next;
        //   } else {
        //     this.animation.scale(1).step()
        //     next = !next;
        //   }
        //   that.setData({
        //     animationData: animation.export()
        //   })
        // }.bind(this), 1000)
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