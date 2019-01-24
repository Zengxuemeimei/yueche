// pages/questiona_detail/questiona_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionlist: null,
    questionId: null,
    value: null,

  },
  bindinput: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  sendData: function(e){
    var that = this;
    wx.request({

      url: getApp().globalData.api.news.saveAnswer, //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        answerContent: that.data.value,
        questionId: that.data.questionlist.question.id
      },
      success: function (res) {
       
       res = res.data;

       if(res.result == 'success') {
         wx.showToast({
           title: '回答成功',
         })
         that.initData();
         return false;
       }
       wx.showToast({
         title: '回答失败',
         icon:'none'
       })
        
      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({"questionId": options.id});
    this.initData();
    
  },
  initData: function(options){
    var questionId = this.data.questionId;
    console.log('questionId:', questionId) ;

    var that = this;
    wx.request({

      url: getApp().globalData.api.news.questionDetail, //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        questionId: questionId 
      },
      success: function (res) {
        console.log("res3:", res);
        var thisdata = res.data.result;
        console.log('thisdata:', thisdata)
       
          thisdata.question.createTime = app.globalData.timestampToTime(thisdata.question.createTime); //时间转换 
          var userAn = thisdata.userAnswers;
          var userAnS = [];
          console.log('userAn.length:', userAn.length);
          for (let j = 0; j < userAn.length; j++){    
            let ttime = userAn[j].answer.answerTime;       
            userAn[j].answer.answerTime = app.globalData.getDateDiff(ttime);
            userAnS.push(userAn[j]);
 
          }
          thisdata.userAnswers = userAnS;
          let attach = thisdata.question.attach;
          let attachArr;
          if (!!attach){
            attachArr = attach.split(',');
          }
          
          thisdata.question.attach = attachArr;
        
        that.setData({ "questionlist": thisdata })
        console.log('thisdata:', thisdata);
      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
  })
  }

  
})