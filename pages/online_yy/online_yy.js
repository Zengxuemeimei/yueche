 
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "请选择时间",
    fours: null,
    phone: '',
    remarks: '',   
    array: [],
    objectArray: [],
    index: 0, 
    
    images: [],
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
    let that = this;
    let store = wx.getStorageSync('store'); //设置 跳转时候的4s店 
    console.log('当前选择 的4s店是：', store);
    that.setData({"fours": store});
    
     // 车列表获取 
    wx.request({
      url: app.globalData.api.news.myCars,
      method: 'POST',
      header: {
        "loginSessionId": wx.getStorageSync('loginSessionId'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('res: ', res)
        var data = res.data;
        if (data.exceptionCode == -1) {
          wx.navigateTo({
            url: '../login/login',
          })
          return;
        }

        if (data.exceptionCode == 0) {          
          var result = data.result;
          that.setData({ 'objectArray': result });

          let name = [];
          result.map(function (item, index) {
            console.log('name:', item, ',index;', item.name);
            name.push(item.name)
          })
          console.log('name:', name);
          that.setData({ "array": name });
        }

      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })
  },
  submitData() {
    let that = this;
    let images = this.data.uploadArr;
    let bus = this.data.objectArray[this.data.index];
    let remarks = this.data.remarks;
    let date = this.data.address;
    let phone = this.data.phone;

    if (!phone) {
      wx.showToast({
        icon: 'none',
        title: '手机号为空',
      })
      return false;
    }
    if (date === '请选择时间') {
      wx.showToast({
        icon: 'none',
        title: '请选择预约时间',
      })
      return false;
    }
    

    let imgs = [];
    console.log('imgs:', imgs);
    images.map(function (item, index) {
      imgs.push(item.url);
    });
      date = new Date(date);
    // 有三种方式获取
      date = date.getTime(); 
    let data = {
      images: imgs.join(','),
      carType: bus.id,
      shopId: that.data.fours.id,
      phone: phone,
      bespokeTime: date,
      remarks: remarks,
    }
    console.log('data: ', data);
    
    wx.request({
      url: app.globalData.api.news.submitBes, //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        "loginSessionId": wx.getStorageSync('loginSessionId'),
          'content-type': 'application/x-www-form-urlencoded'
      },
      data: data,
      success: function (res) {
        console.log('res: ', res) 
        res = res.data;
        if (res.result == "success") {
          wx.showModal({
            title: '提示',
            content: '预约成功',
            showCancel: false,
            success: function (res) {
               wx.switchTab({
                 url: '../service/service',
               })
            }
          })
           
        } else {
          wx.showToast({
            title: '预约失败',
          })
        }


      },
      fail: function (res) {
        console.log('数据获取失败：', res);
      }
    })

  },
  addressChange: function (event) {

    this.setData({
      "address": event.detail.value
    })
  },
  inputphone: function (e) {
    this.setData({
      'phone': e.detail.value
    })
  },
  bindTextAreaBlur: function(e){
    this.setData({
      'remarks': e.detail.value
    })
  },
  bindPickerChange: function (e) {
    let that = this;
   
    this.setData({
      index: e.detail.value
    });

  
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
                data = data.result
                let path = data.imgPath;
                // uploadArr.push(path);
                data = JSON.parse(data);;
                let tempC = { url: item.path };
                let tempB = { url: data.imgPath };
                console.log('测试img:', data.imgPath);
                console.log('测试img:', data);

                let images = that.data.imageArr;
                let imagesB = that.data.uploadArr;
                let imagesTemp = that.data.uploadArr;
                images.push(tempC);
                imagesB.push(tempB);
                that.setData({ imageArr: images });
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
  
 
})