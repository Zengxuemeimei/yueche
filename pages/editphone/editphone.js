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
        title: '旧手机号格式错误',
      })
      return false;
    }
    if (password.length != 11) {
      wx.showToast({
        icon: 'none',
        title: '新手机号格式错误',
      })
      return false;
    }
     

    var data = {
      phone: phone,
      oldPassword: password,
      
    }

    console.log('password:', data);

    //新闻详情 
    wx.request({
      url: getApp().globalData.api.news.updateBindPhone, //仅为示例，并非真实的接口地址
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
            title: '手机号修改成功',  
            success: function(){         
             
            }
          })
          var t = setTimeout(function(){
            clearTimeout(t);
            wx.switchTab({
              url: '../me/me',
            })
          }, 1200)

          }else{
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