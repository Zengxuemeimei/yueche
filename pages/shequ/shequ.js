// pages/shequ/shequ.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isactive: true,
    newsdata: [],
    question:[],
    qwlist: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    


  },
  onShow: function(options){
    // 这里开始写逻辑 
    var that = this;

    //新闻数据 
    wx.request({
      // url: "http://192.168.2.12:28080/CZCB/forum/newsList", //仅为示例，并非真实的接口地址
      url: getApp().globalData.api.news.list, //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("互动:", res);
        var thisdata = res.data.result;

        for (var i = 0; i < thisdata.length; i++) {
          thisdata[i].createTime = app.globalData.timestampToTime(thisdata[i].createTime); //时间转换
        }
        console.log('shtidata::', thisdata);
        that.setData({ "newsdata": thisdata });
      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })

    //问答数据
    wx.request({
      // url: "http://192.168.2.12:28080/CZCB/forum/questionList", //仅为示例，并非真实的接口地址
      url: getApp().globalData.api.news.questionList, //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res3:", res);
        var thisdata = res.data.result;
        console.log('thisdata:', thisdata)
        for (var i = 0; i < thisdata.length; i++) {
          thisdata[i].createTime = app.globalData.timestampToTime(thisdata[i].createTime); //时间转换
           
          var imgurl = thisdata[i].imgUrl;
          if(imgurl){
            thisdata[i].imgUrl = imgurl.split(',');
          }

        }
        that.setData({ "qwlist": thisdata })
        console.log('thisdata:', thisdata);
      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })
  },
  changeState: function (event) {
    var state = event.currentTarget.dataset.state == 1 ? false : true;
    console.log('state:', state);
    this.setData({
      isactive: state
    })

  },
  onPullDownRefresh: function(event) {
    if (isactive){

    } else {
      
    }
  }

})