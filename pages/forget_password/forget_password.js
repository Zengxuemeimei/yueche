// pages/forget_password/forget_password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password:"",
    verificationCode:null,
    sendtext:"获取验证码",
    num:""
  },
  forgetNext(){
    var that = this;
    var phone = this.data.phone
    var password = this.data.password
    var verificationCode = this.data.verificationCode
    if (phone.length != 11) {
      wx.showToast({
        icon: 'none',
        title: '手机号格式错误',
      })
      return false;
    }
    if (!password) {
      wx.showToast({
        icon: 'none',
        title: '密码不能为空',
      })
      return false;
    }
    if (!verificationCode) {
      wx.showToast({
        icon: 'none',
        title: '验证码不能为空',
      })
      return false;
    }
    var data = {
      phone: phone,
      passwd: password
    }
    wx.request({
      url: 'https://miniapp2.imczjt.com/resetPasswd.php', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res:", res);
        var data = res.data;
        console.log("data:", data);
        if (data.code == '0') {
          if (verificationCode == that.data.num) {
            wx.showToast({
              title: '修改成功',
              success: function (e) {
                wx.navigateTo({
                  url: '../a_login/a_login',
                })
              }
            })
          }else{
            wx.showToast({
              title: '验证码不正确',
              icon:"none"
            })
          }
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none'
          })
        }


      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })
  },
  //获取验证码
  sendCode: function (e) {
    if (this.data.sendtext !== '获取验证码') {
      wx.showToast({
        title: '请稍后再试',
        icon: 'none'
      })
      return false;
    }
    var phone = this.data.phone;
    var verificationCode = this.data.verificationCode;
    var nums = ""
    for (var i = 0; i < 4; i++) {
      nums += Math.floor(Math.random() * 10)
    }
    var that = this;
    that.setData({
      "num":nums
    })
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号码有误，请重填',
        icon: 'none'
      })
      return false;
    }
    var i = 60;
    var timer = setInterval(function () {
      i--;
      if (i == 0) {
        i = 10;
        that.setData({
          'sendtext': '获取验证码',
        })
        clearInterval(timer)
        return false;
      }
      var text = i + 's后重试'
      that.setData({
        'sendtext': text
      })
    }, 1000);
    //发送验证码接口
    wx.request({
      url: 'https://miniapp2.imczjt.com/sendRestPwdSms.php', 
      method: 'POST',
      data: {
        phone: phone,
        key: nums
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log("获取验证码:", res);
        if (res.statusCode == 200) {
          wx.showToast({
            title: '发送成功',
          })
        }

      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })

  },
  //更新手机号
  bindinputTel(e){
    this.setData({
      'phone': e.detail.value
    })
  },
  //更新验证码
  bindinputCode(e){
    this.setData({
      'verificationCode': e.detail.value
    })
  },
  bindinputPass(e){
    this.setData({
      'password': e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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