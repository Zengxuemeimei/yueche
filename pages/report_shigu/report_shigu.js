// pages/online_yy/online_yy.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "选择报案地点",
    array: ['奔驰S600', '奥迪X5'],
    place: "",
    remarks: "",
    objectArray: [
      {
        id: 0,
        name: '奔驰S600'
      },
      {
        id: 1,
        name: '奥迪X5'
      }
       
    ],
    index: 0,
    images: [
      ],
    imgs: [],
    imageArr: [
    ],
    uploadArr: [
    ],
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var that = this;
    

    // //新闻数据 

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

    
        let thiscarsindex = 0;

        that.setData({ "objectArray": thisdata });
        let itemarray = [];
        for(var item in thisdata){
          console.log('item:', item);
          itemarray.push(thisdata[item].name);
        }

        that.setData({ "array": itemarray });

        //把第一个 设置为默认修改的东西  
        // wx.setStorageSync('thiscar', thisdata[0])

      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })


  },
  changeText(e){
    this.setData({"remarks": e.detail.value});
    
  },
  submitData(){
    let images = this.data.uploadArr;
    let bus = this.data.objectArray[this.data.index];
    let text = this.data.remarks;
    let place = this.data.place;
    if (!bus) {
      wx.showToast({
        icon: 'none',
        title: '未选择车辆',
      })
      return false;
    }
    if (!place) {
      wx.showToast({
        icon: 'none',
        title: '未填写地址',
      })
      return false;
    }
    if (!text) {
      wx.showToast({
        icon: 'none',
        title: '未填写简介',
      })
      return false;
    }


    let imgs = [];
    console.log('imgs:', images);



    images.map(function (item, index) {
      imgs.push(item.url);
    });
    let data = {
      attach: imgs.join(','),
      vehicleName : bus.name,
      locationAccident: place,
      remarks: text,
    }
    console.log('data: ', data);
    wx.request({
          url: app.globalData.api.news.subTraQuestion, //仅为示例，并非真实的接口地址
          method: 'POST',
          header: {
            'loginSessionId': wx.getStorageSync('loginSessionId'),
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: data,
          success: function (res) {
            console.log('res: ',res)
            res = res.data;
            if (res.result == "success") {
                wx.showToast({
                  title: '上报成功',
                });
                var timekk = setTimeout(function(){
                wx.switchTab({
                  url: '../home/home',
                })
                }, 1000)
            }else{
              wx.showToast({
                title: '上报失败',
              })
            }


          },
          fail: function (res) {
            console.log('数据获取失败：', res);
          }
        })

  },
  report(e){ 
    //新闻数据  

    var that = this;
    var place = that.data.place;
    var array = that.data.array;
    var index = that.data.index;

    if(!place){
      wx.showToast({
        title: '地点为空',
      })
    }
   
  
    var data = {
      vehicleName:array[index],
      locationAccident: place,
      attach: that.data.imgs,
      remarks: that.data.remarks
    }

    let images = this.data.uploadArr;
    wx.request({    
      url: app.globalData.api.news.subTraQuestion, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: data, 
      header: {
        'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {        
        res = res.data        
        if (res.result === "success") {
     
          wx.showToast({
            title: '上报成功',
            success: function(){
              wx.navigateBack({ delta: 1 });
              
            }
          })
          
        } else {
          wx.showToast({
            title: '上报失败',
          })
        }

      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })
  },
  bindPickerChange: function (e) {
    
    this.setData({
      index: e.detail.value
    })
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
  addressChange: function (event) {

    this.setData({
      "address": event.detail.value
    })
  },
  delImage: function (e) {
    console.log('删除图片：');
    let id = e.currentTarget.dataset.id
    let imgArr = this.data.imageArr;
    let imgArrB = this.data.uploadArr;

    imgArr.splice(id, 1);
    imgArrB.splice(id, 1);
    console.log('imgArr:', imgArr, ',newImgArr:', imgArr);
    this.setData({ imageArr: imgArr });
    this.setData({ uploadArr: imgArrB });
  },
  uploadImg: function (e) {
    let that = this;
    console.log('执行上传图片');
    let curImgArr = that.data.imageArr;
    console.log('当前图片：', curImgArr)
    let curImgCount = 4 - curImgArr.length;
    curImgCount = curImgCount > 1 ? 1 : curImgCount;
    wx.chooseImage({
      count: curImgCount, // 默认9
      sizeType: ['original', 'compressed'], // 指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log('res:', res);
        var tempFilePaths = res.tempFilePaths
        let tempFiles = res.tempFiles;
        let resultS = wx.getStorageSync('opData')
        var timer = 0;
        tempFiles.map(function (item, index) {
          console.log('heloo: ', item.path);
          if (item.size > 2048000) {
            wx.showToast({
              title: '图片超过2M',
            })
            // 移除图片
            return;
          }

          timer += 1000;
          console.log('timer:', timer);
          console.log('item: ', item);
          setTimeout(function () {
            wx.uploadFile({
              url: getApp().globalData.api.news.uploadImg,
              // url: 'http://192.168.2.12:8888/CZCB/attach/upload',
              filePath: item.path,
              header: {
                "Content-Type": "multipart/form-data",
                "loginSessionId": wx.getStorageSync('loginSessionId')
              },
              name: 'file',
              method: 'POST',
              formData: {
                url: item.path
              },
              success: function (res) {
                console.log('res::', res);
                let data = res.data;
                let path = data.id;
                // uploadArr.push(path);
                data = JSON.parse(data);
                data = data.result;
                let tempC = { url: item.path };
                let tempB = { url: data.id };
                console.log('测试img:', data.imgPath);
                console.log('测试img:', data);

                let images = that.data.imageArr;
                let imagesB = that.data.uploadArr;
                let imagesTemp = that.data.uploadArr;
              
                images.push(tempC);
                imagesB.push(tempB);
                that.setData({ imageArr: images });
                console.log('commtB :', imagesB);
                that.setData({ uploadArr: imagesB });
              },
              fail: function (error) {
                console.log('error:', error);
              }
            })
          }, timer)


        })

        let newFileArr = [];
        console.log('tempFilePaths:', tempFilePaths);

        //

        console.log('tempFilePaths[0]:', tempFilePaths[0]);


        // tempFilePaths.map(function(index){
        //   let tempC = {url: index};
        //   newFileArr.push(tempC);                 
        // });
        console.log('temp:', newFileArr);
        that.setData({ imageArr: curImgArr.concat(newFileArr) });
        // 开始上传数据；

      }
    })

  },
  inputPlace: function(e){
    this.setData({"place": e.detail.value});
  },
  bindInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindInputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindInputDetailAddress: function (e) {
    this.setData({
      detailaddress: e.detail.value
    })
  },
})