// pages/a_login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  login: function(e) {
    var that = this;
    var phone = this.data.phone
    var password = this.data.password
   
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


    var data = {
      phone: phone,
      password: password
    }

    //新闻详情 
    wx.request({
      url: getApp().globalData.api.news.login, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("res:", res);
        var  data = res.data;
        console.log("登录信息:", data);
        if (data.exceptionCode === 0){
          // 设置 本地长期token 
          wx.setStorageSync('loginSessionId', data.result);
          if (data.result == ""){
            wx.showToast({
              title: '返回为空',
              icon: 'none'
            })
          }
          wx.setStorageSync("phone", phone);
          wx.showToast({            
            title: '登录成功'
          })
          setTimeout(function(){
            wx.switchTab({
              url: '../home/home',
            });
          }, 800)
          
        }else{
          wx.showToast({
            title: data.exceptionMsg,
            icon: 'none'
          })
        }

        
      },
      fail: function(res) {
        console.log('数据获取失败：', res);
      }
    })
  }

})