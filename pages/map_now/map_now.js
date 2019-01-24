var amapFile = require('../../static/js/amap-wx.js');//如：..­/..­/libs/amap-wx.js
Page({
  data: {
    carId: null,
    longitude: 104.169501,
    latitude: 30.693263,
  
    markers: [{
      iconPath: "../../static/images/location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50,
      
      label: {
        content: '当前位置',
        color: '#60c5ff',
        anchorX: 20
      },
    }],
    // polyline: [{
    //   points: [{
    //     longitude: 113.3245211,
    //     latitude: 23.10229
    //   }, {
    //     longitude: 113.624520,
    //     latitude: 23.431229
    //   }],
    //   color: "#FF0000DD",
    //   width: 2,
    //   dottedLine: true
    // }],
     
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
  onLoad: function(e){
    let carId = e.id;
    var that = this;
    this.setData({"carId": carId});
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    let that = this;
    wx.request({

      url: getApp().globalData.api.news.tracking, //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        carId: that.data.carId
      },
      success: function (res) { 
        if (res.data.exceptionCode == 500){
          wx.showToast({
            title: '暂无当前位置信息',
            icon: 'none'
          })
          return false;
        }
        console.log("res3:", res);
        var thisdata = res.data.result;

        let markers = that.data.markers;
        console.log('thisdata:', markers);
        let mark = markers[0];
        let item = thisdata.Item

        
        mark.latitude = item[0].Lat
        mark.longitude = item[0].Lng
        that.setData({ "latitude": item[0].Lat });
        that.setData({ "longitude": item[0].Lng });
        let markersArr = [];
        markersArr.push(mark);
        console.log('markers:', markersArr)
        that.setData({ "markers": markersArr });
        that.mapCtx = wx.createMapContext('map');

        that.mapCtx.getCenterLocation({
          success: function (res) {
            console.log(res.longitude)
            console.log(res.latitude)
          }
        })
      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })

    
  },
})