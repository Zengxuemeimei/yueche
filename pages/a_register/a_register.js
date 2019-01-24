// pages/a_register/a_register.js

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: null,
    code: null,
    password: null,
    sendtext: '获取验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('wx code: ', app.globalData.wxcode)
    console.log('wx userInfo: ', app.globalData.userInfo)
    wx.getUserInfo({
      success: function (res) {
         console.log('register: ', res);
      },
      fail: function(res){
        console.log('res:', res);
      }
    })

  },
  
  submitData: function(e) {
    var that = this;
    var phone = this.data.phone
    var password = this.data.password
    var code = this.data.code
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

    if (!code) {
      wx.showToast({
        icon: 'none',
        title: '验证码不能为空',
      })
      return false;
    }

    var userinfo = app.globalData.userInfo;
    var data = {
      phone: phone,
      password: password,
      smsCheckCode : code,    
      nickName: userinfo.nickName,
      avatarUrl: userinfo.avatarUrl,
      gender: userinfo.gender,
      address: userinfo.city,
      sessionId: wx.getStorageSync('sessionId')
    }

    //新闻详情 
    wx.request({
      url: getApp().globalData.api.news.register, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res:", res);
        var data = res.data;
        console.log("data:", data);
        if (data.result === 'success') {
          wx.showToast({
            title: '注册成功',
            success: function (e) {
              wx.navigateTo({
                url: '../a_login/a_login',
              })
            }
          })
        } else {
          wx.showToast({
            title: data.errMsg,
            icon: 'none'
          })
        }

        
      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })
  },
  sendCode: function(e) {
    console.log('this.data.sendtext:', this.data.sendtext)
    if(this.data.sendtext !== '获取验证码'){
      wx.showToast({
        title: '请稍后再试',
        icon: 'none'
      })

      return false;
    }

    var phone = this.data.phone;
    var that = this;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号码有误，请重填',
        icon: 'none'
      })
      return false;
    }
    var i = 60;
    var timer = setInterval(function() {
      i--;
      if (i == 0) {
        i = 10;
        that.setData({
          'sendtext': '获取验证码'
        })
        clearInterval(timer)
        return false;
      }
      var text = i + 's后重试'
      that.setData({
        'sendtext': text
      })

    }, 1000);

    wx.request({
      url: getApp().globalData.api.news.smsCheckCode, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        phone: phone
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',        
      },
      success: function(res) {
        console.log("res:", res);
        if (res.statusCode == 200){
          wx.showToast({
            title: '发送成功',
          })
        }

      },
      fail: function(res) {
        console.log('数据获取失败：', res);
      }
    })

  },
  inputpassword: function(e) {
    this.setData({
      'password': e.detail.value
    })
  },
  inputphone: function(e) {
    this.setData({
      'phone': e.detail.value
    })
  },

  inputcode: function(e) {
    this.setData({
      'code': e.detail.value
    })
  },


})