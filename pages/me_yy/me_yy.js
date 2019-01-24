// 
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */ 

  data: {
    isactive: 1,
    yydata: null,
    nowData: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },
  initData: function(e){

    var that = this;
    wx.request({

      url: getApp().globalData.api.news.mineBespoke, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        status: 2,
      },
      header: {
        'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res3:", res);
        var thisdata = res.data.result;
        console.log('thisdata:', thisdata);
        for(var i = 0; i< thisdata.length; i++){
          thisdata[i].bespokeTime = app.globalData.timestampToTime(thisdata[i].bespokeTime); //时间转换
        }

        that.setData({ "yydata": thisdata })
        that.setData({ "nowData": thisdata })
      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })
  },
  changeState: function (event) {
    var state = event.currentTarget.dataset.state;
    console.log('state:', state);
    this.setData({
      isactive: state
    })

   
    if (state== 1){ //全部
      this.setData({ "nowData": this.data.yydata })

    }else if( state == 3){//取消
      this.changeData(-1);
    } else{//预约 
      this.changeData(0);
    }

  },
  changeData: function(state){
    var data = this.data.yydata;
    let newdata = [];
    for(var i = 0; i< data.length; i++){
      if (data[i].status == state){
        newdata.push(data[i]);
      }
    }
    

    this.setData({ "nowData": newdata })
  },
  cancelYY: function(e){
    var that = this;
 
    let id = e.target.dataset.id; 
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否确定取消预约！',
      success: function (res) {
        if (res.confirm) {
          wx.request({

            url: getApp().globalData.api.news.cancelMineBV, //仅为示例，并非真实的接口地址
            method: 'POST',
            data: {
              businessId: id,
              typeCode: 1 //取消预约
             
            },
            header: {
              'loginSessionId': wx.getStorageSync('loginSessionId'),
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log("res3:", res);
              res = res.data;
              if (res.result == 'success') {
                wx.showToast({
                  title: '取消成功',
                })
                that.initData();
              }
            


            },
            fail: function (res) {
              console.log('数据获取失败：', res);
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    

  }

})