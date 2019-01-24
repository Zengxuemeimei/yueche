// pages/editpwd/editpwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chexin: '',
    xinhao: '',
    chepai: '',
    id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var id = options.id;
     console.log('id:::', id);
      this.setData({"id": id});
      if(id){
        var car = wx.getStorageSync('thiscar');
        console.log('car:', car)
        this.setData({
          chexin: car.name
        })
        this.setData({
          xinhao: car.version
        })
        this.setData({
          chepai: car.code
        })

      }
  },
  bindinput: function (e) {
    this.setData({
      chexin: e.detail.value
    })
  },
  bindinputPwd: function (e) {
    this.setData({
      xinhao: e.detail.value
    })
  },
  bindinputChepai: function (e) {
    this.setData({
      chepai: e.detail.value
    })
  },
  bindinputPwdN: function (e) {
    this.setData({
      passwordN: e.detail.value
    })
  },
  login: function (e) {
    var that = this;
    var chexin = this.data.chexin
    var xinhao = this.data.xinhao
    var chepai = this.data.chepai

    if (! chexin ) {
      wx.showToast({
        icon: 'none',
        title: '车型不能为空',
      })
      return false;
    }
    if (! xinhao) {
      wx.showToast({
        icon: 'none',
        title: '车型号不能为空',
      })
      return false;
    }
    if (!chepai) {
      wx.showToast({
        icon: 'none',
        title: '车牌不能为空',
      })
      return false;
    }
    var data = {
      name: chexin,
      version: xinhao,
      code: chepai
    }
   if(this.data.id){
       data = {
       name: chexin,
       version: xinhao,
       code: chepai,
       id: this.data.id
     }
   }
    

    console.log('password:', data);

    //新闻详情 
    wx.request({
      url: getApp().globalData.api.news.submitCar, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'loginSessionId': wx.getStorageSync('loginSessionId'),
      },
      success: function (res) {
        console.log("res:", res);
        var data = res.data;

        if (data.exceptionCode == -1) {
          wx.showToast({
            title: '登录过期，请重新登录',
            icon: 'none'

          })
          wx.navigateTo({
            url: '../a_login/a_login',
          })
          return;
        }
        if (data.exceptionCode === 0) {
          // 设置 本地长期token 

          if (data.result === 'success') {

            wx.showToast({
              title: '添加成功',
            })
            var t = setTimeout(function () {
              clearTimeout(t);
              wx.switchTab({
                url: '../home/home',
              })
            }, 1200)

          } else {
            wx.showToast({
              title: data.exceptionMsg,
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: data.exceptionMsg,
            icon: 'none'
          })
        }


      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })
  }
})// pages/editphone/editphone.js
 