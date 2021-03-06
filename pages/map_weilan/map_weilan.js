var amapFile = require('../../static/js/amap-wx.js');//如：..­/..­/libs/amap-wx.js
const app = getApp();
Page({
  data: {
    
    carId: null,
    longitude: 104.169501,
    latitude: 30.693263,
    sessionId:null,

    // markers: [{
    //   iconPath: "../../static/images/location.png",
    //   id: 0,
    //   latitude: 23.099994,
    //   longitude: 113.324520,
    //   width: 50,
    //   height: 50,

    //   label: {
    //     content: '当前位置',
    //     color: '#60c5ff',
    //     anchorX: 20
    //   },
    // }],
    polyline: [{
      points: [ ],
      color: "#FF0000DD",
      width: 4,
      dottedLine: false,
      arrowLine: true,
    }],


  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  onLoad: function (e) {
    this.setData({ "date": app.globalData.nowYMD() });
    let carId = e.id;
    var that = this;
    this.setData({ "carId": carId });
    this.setData({ "sessionId": wx.getStorageSync('loginSessionId') });
    console.log('carId:', carId )
    console.log('loginSessionId:', wx.getStorageSync('loginSessionId') )
 
    this.getLocation();
 
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    let that = this;

    wx.request({
      url: getApp().globalData.api.news.geofenceList, //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        carId: that.data.carId,

      },
      success: function (res) {

        console.log("res3:", res);
        var thisdata = res.data.result;


      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })

  },
  getLocation: function (e) {
    console.log('hello:')
    let that = this;

    let date = this.data.date;

    let startDate = new Date(date + ' 00:00').getTime();
    let endDate = new Date(date + ' 23:59').getTime();

    let result = [{
      "Speed": 150,
      "GpsTime": 1534853867582,
      "Lng": 104.06,
      "Course": 180,
      "Lat": 30.67,
      "Altitude": 580
    }, {
      "Speed": 120,
      "GpsTime": 1534853867782,
        "Lng": 104.07,
      "Course": 150,
        "Lat": 30.64,
      "Altitude": 1000
    },
      {
        "Speed": 120,
        "GpsTime": 1534853867782,
        "Lng": 104.06,
        "Course": 150,
        "Lat": 30.66,
        "Altitude": 1000
      },
      {
        "Speed": 150,
        "GpsTime": 1534853867582,
        "Lng": 104.06,
        "Course": 180,
        "Lat": 30.67,
        "Altitude": 580
      }, 
      ];

    that.setData({ "latitude": result[0].Lat });
    that.setData({ "longitude": result[0].Lng });

    let polyline = that.data.polyline;
    let pointARR = []
    for (let i in result) {
      let item = result[i];
      let itemjson = {
        longitude: item.Lng,
        latitude: item.Lat
      }
      pointARR.push(itemjson)
    }
    polyline[0].points = pointARR;
    that.setData({ "polyline": polyline })
    console.log('data:', that.data.polyline)

    // return false;
    // wx.request({
    //   url: getApp().globalData.api.news.geofenceList, //仅为示例，并非真实的接口地址
    //   method: 'POST',
    //   header: {
    //     'loginSessionId': wx.getStorageSync('loginSessionId'),
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: {
    //     carId: that.data.carId,
      
    //   },
    //   success: function (res) {

    //     console.log("res3:", res);
    //     var thisdata = res.data.result;


    //   },
    //   fail: function (res) {
    //     console.log('数据获取失败：', res);
    //   }
    // })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    // 这里进行ajax 查询  
    this.getLocation();


  },
})