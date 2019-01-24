// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [ ],
    remarks: "",

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
  submitForm: function(e){
    var that = this;
    var textarea = this.data.remarks;
 
    let imgs = [];
    let images = this.data.uploadArr;
    images.map(function (item, index) {
      imgs.push(item.url);
    });
    var  data = {
      questionContent : textarea,
      attach: imgs.join(','),
    }
    console.log("data:", data);
 
    //新闻详情 
    wx.request({
      // url: "http://192.168.2.12:28080/CZCB/forum/newsList", //仅为示例，并非真实的接口地址
      url: getApp().globalData.api.news.onceSubQuestion, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: data,
      header: {
        'loginSessionId': wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res:", res);
         
        wx.navigateBack({ delta: 1});
        res = res.data;
        if (res.exceptionCode == '-1'){
          wx.navigateTo({
            url: '../a_login/a_login',
          })
          return false;
        }
        
        wx.showToast({
          title: '提问成功',

        })

        
      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
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
  changeText(e) {
    this.setData({ "remarks": e.detail.value });

  },
})