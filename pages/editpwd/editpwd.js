// pages/editpwd/editpwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
    passwordN: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindinput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindinputPwd: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  bindinputPwdN: function (e) {
    this.setData({
      passwordN: e.detail.value
    })
  },
  login: function (e) {
    var that = this;
    var phone = this.data.phone
    var password = this.data.password
    var newpassword = this.data.passwordN

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
        title: '旧密码不能为空',
      })
      return false;
    }
    if (!newpassword) {
      wx.showToast({
        icon: 'none',
        title: '新密码不能为空',
      })
      return false;
    }

    var data = {
      phone: phone,
      oldPassword: password,
      password: newpassword
    }

    console.log('password:', data);

    //新闻详情 
    wx.request({
      url: getApp().globalData.api.news.updatePassword, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'loginSessionId': wx.getStorageSync('loginSessionId'),
      },
      success: function (res) {
        console.log("res:", res);
        var data = res.data;
        console.log("data:", data);
        if (data.exceptionCode === 0) {
          // 设置 本地长期token 
          wx.setStorageSync('loginSessionId', data.result);

          wx.showToast({
            title: '密码修改成功',
            complete: function (e) {
              wx.switchTab({
                url: '../me/me',
                
              })
            }
          })
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
})