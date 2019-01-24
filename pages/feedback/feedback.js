// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [
    ],
    phone: null,
    value: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  chooseImage: function (e) {
    var _that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var arr = _that.data.images;
        var arr2 = arr.concat(tempFilePaths);

        _that.setData({
          "images": arr2
        })
      }
    })
  },
  default: function (e) {
    var that = this;
    var phone = "" + that.data.phone;
    var text = that.data.value;


    if (!text) {
      wx.showToast({
        title: '反馈内容为空',
        icon: 'none'
      })
      return false;
    }
    console.log('phone.length:',phone,':,,', phone.length,'::', !phone);

    if (!phone || phone.length != 11) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return false;
    }
    var data = {
      phone: phone,
      text: text,
    }
    console.log('data:', data);
    wx.request({
      url: getApp().globalData.api.news.subFeedback, //仅为示例，并非真实的接口地址
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
            title: '反馈成功',
            complete: function (e) {
             
            }
          })

          var timeA = setTimeout(function(){
            wx.switchTab({
              url: '../me/me',

            })
            clearTimeout(timeA);
          }, 1000);
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
  },
  inputInputText: function (e) {
    this.setData({ "value": e.detail.value });
  },
  bindInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
})