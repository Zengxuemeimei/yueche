const app = getApp()

var amapFile = require('../../static/js/amap-wx.js');//如：..­/..­/libs/amap-wx.js
Page({
  data: {
    date: app.globalData.nowYMD(),
    markers: [{
      iconPath: "../../static/images/location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 40,
      height: 40,
      title: '当前位置',
      label: {
        content: 'hello place',
        anchorX: 20,
        anchorY: 20,
        bgColor: "#eee",
        color: '#666',
        borderWidth: 4,

      }
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
          longitude: 113.324520,
          latitude: 23.21229
        }, {
          longitude: 113.324525,
          latitude: 23.10120
        }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 25,
        height: 25
      },
      clickable: true
    }]
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
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    // 这里进行ajax 查询  
    


  },
  onLoad: function (e) {
    

  }
})