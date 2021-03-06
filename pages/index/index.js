//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    cars: null,
    thiscars: null,
    thiscarsindex: 0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      '../../static/images/home_banner.jpg',
      '../../static/images/home_banner.jpg',
      '../../static/images/home_banner.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    valueXianxing: '', //限行
    newsdata: [],
  
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
      // url: '../helpcenter/helpcenter'
      // url: '../helpcenter/helpcenter' //
     
    // })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId 
              console.log('res::', res);
              app.globalData.userInfo = res.userInfo
              wx.switchTab({
                url: '../home/home',
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: res => {
              console.log('getinfo fail: ', res);
            }
          })
        }
      },
      fail: res => {
        console.log('fail:::::::', res);
      }
    })

    console.log('bbbbb:', this.data.hasUserInfo, 'can:', this.data.canIUse);
    console.log('bbbbb:', this.data.userInfo, 'can:', app.globalData.userInfo);

    if (!app.globalData.userInfo){
      console.log('aaaaa:', this);
      console.log('aaaaa:', this.data.hasUserInfo, 'can:', this.data.canIUse  );
      // wx.switchTab({
      //   url: '../home/home',
      // })

      // if (this.data.hasUserInfo){
      //   wx.switchTab({
      //     url: '../home/home',
      //   })
      // }
    }else{
      console.log('kkk:', this);
      wx.switchTab({
        url: '../home/home',
      })
    }

    return false;
    var weekday= new Date().getDay();
    var valueXianxing = "不限行"
    if(weekday<=5 && weekday != 0){
      var otherday = '' + weekday + 5;
      valueXianxing = weekday + '/' + otherday.slice(-1);
    }
    this.setData({ "valueXianxing": valueXianxing});

    console.log("!wx.getStorageSync('loginSessionId'):", !wx.getStorageSync('loginSessionId'));
   
    // wx.navigateTo({
      // url: '../shequ/shequ' //社区
      // url: '../online_yy/online_yy' //在线预约       

      //  url: '../integral_mall/integral_mall' // 积分商城 
      //  url: '../a_login/a_login' // 登录
      // url: '../a_register/a_register' // 注册
      // url: '../editpwd/editpwd' // 修改密码
      // url: '../exchange/exchange' // 兑换明细
      // url: '../feedback/feedback' // 提交反馈
      // url: '../helpcenter/helpcenter' // 帮助中心

      // url: '../helpcenter_d/helpcenter_d' // 帮助中心详情 
      // url: '../integral_mall/integral_mall' // 积分商城

      // url: '../me/me' // 我的
      // url: '../me_qustiona/me_qustiona' // 我的问答
      // url: '../me_tiwen/me_tiwen' // 我的提问
      // url: '../me_report/me_report' // 我的上报
      // url: '../me_yy/me_yy' // 我的预约i

      // url: '../news_detail/news_detail' // 新闻详情
      // url: '../online_yy/online_yy' // 在线预约
      // url: '../personinfo/personinfo' // 个人信息
      // url: '../product_exchange1/product_exchange1' // 商品兑换1 
      // url: '../product_exchange2/product_exchange2' // 商品兑换2 
      // url: '../questiona_detail/questiona_detail' // 问答详情
      // url: '../report_shigu/report_shigu' // 事故上报 
      // url: '../service/service' // 服务
      // url: '../setting/setting' // 设置
      // url: '../shaddress/shaddress' // 收货地址
      // 反馈页面没有 修改手机号没有 关于我们

      // url: '../map_now/map_now' // 实时位置  
      // url: '../integral_mall_detail/integral_mall_detail' //兑换明细


    // })
    //  return ;

   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log("userInfoReadyCallback:", res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        } ,fail: res => {
          console.log('getinfo fail: ', res);
        }, complete: res => {
          console.log('complete: ', res);
        }
      })
    }

return false;

    console.log("hhhh: ", wx.getStorageSync('loginSessionId') );
    console.log("hhhh: ", ('' === wx.getStorageSync('loginSessionId')) || (!wx.getStorageSync('loginSessionId')) || ('null'===wx.getStorageSync('loginSessionId')));

    console.log('app.globalData.userInfo:', !!app.globalData.userInfo);
    if (!!app.globalData.userInfo) {
      wx.switchTab({
        url: '../home/home',
      })
    }else{
      if (('' === wx.getStorageSync('loginSessionId')) || (!wx.getStorageSync('loginSessionId')) || ('null' === wx.getStorageSync('loginSessionId'))) {
        wx.navigateTo({
          url: '../a_login/a_login'
        })
        return false;
      } else{
        wx.switchTab({
          url: '../home/home',
        })
      }
    }
     
  // 这里开始写逻辑 
  return false;
var that = this;

  //新闻数据 
    wx.request({
      // url: "http://192.168.2.12:28080/CZCB/forum/newsList", //仅为示例，并非真实的接口地址
      url: app.globalData.api.news.home, //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        "loginSessionId": wx.getStorageSync('loginSessionId')
      },
      
      success: function (res) {
        if (res.data.exceptionCode == '-1'){
          wx.navigateTo({
            url: '../a_login/a_login',
          })
          return false;
        }
        console.log("res:", res);
        var thisdata = res.data.result;

        for(var i = 0; i< thisdata.length; i++){
          thisdata[i].createTime = app.globalData.timestampToTime(thisdata[i].createTime); //时间转换
        }

        that.setData({"newsdata": thisdata})
     
      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })

    // 爱车加载 
    wx.request({
      // url: "http://192.168.2.12:28080/CZCB/forum/newsList", //仅为示例，并非真实的接口地址
      url: app.globalData.api.news.indexCars, //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        "loginSessionId": wx.getStorageSync('loginSessionId')
      },

      success: function (res) {
        console.log("res:", res);
        var thisdata = res.data.result;

        for (var i = 0; i < thisdata.length; i++) {
          thisdata[i].createTime = app.globalData.timestampToTime(thisdata[i].createTime); //时间转换
        }

        that.setData({ "cars": thisdata });
        that.setData({ "thiscars": thisdata[0] });
        let thiscarsindex = 0; 

        setInterval(function(){
          thiscarsindex ++;
          if (thiscarsindex == thisdata.length){
            thiscarsindex= 0;
          } 
          that.setData({ "thiscars": thisdata[thiscarsindex] });
        }, 5000)

        //把第一个 设置为默认修改的东西  
        wx.setStorageSync('thiscar', thisdata[0])

      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    if ('' === wx.getStorageSync('loginSessionId')) {
      wx.navigateTo({
        url: '../a_login/a_login'
      })
      return false;
    }
  }
})
