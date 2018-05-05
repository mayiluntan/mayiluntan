// pages/publish/dynamic/dynamic.js
const app=getApp();
var lock=false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics:[],
    dynamicArray: ['不选择'],
    dynamicId: [0],
    dynamicIndex:0,
    pics: [],
    picIds: [],
    picCount: 0,
    content:'',
    address:'显示位置',
    lon:'',
    lat:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.apiUrl +'get_topic.php',
      success:res=>{
        this.setData({
          dynamicArray:res.data.data,
          dynamicId: res.data.id
        })
      }
    })
  },
  dynamicChange(e){
    var v = e.detail.value;
    if (this.data.dynamicIndex != v) {
      this.setData({
        dynamicIndex: v
      })
    }
  }, 
  addPic() {
    var that = this;
    var picCount = that.data.picCount
    wx.chooseImage({
      count: 3 - picCount,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        var pics = that.data.pics;
        var picIds = that.data.picIds;
        for (var i = 0; i < tempFilePaths.length; i++) {
          var img = tempFilePaths[i];
          pics.push(img);
          wx.uploadFile({
            url: app.globalData.apiUrl + 'upload_pic.php',
            filePath: img,
            name: 'file',
            formData: {
              'uid': app.globalData.uid
            },
            success: res => {
              if (res.data == 0) {
                app.showTips('提示', '上传失败', false);
              } else {
                picCount++;
                picIds.push(res.data)
                that.setData({
                  pics: pics,
                  picIds: picIds,
                  picCount: picCount
                });
              }
              console.log(that.data)
            }
          })
        }
      }
    })
  },
  contentInput(e){
    this.setData({
      content:e.detail.value
    })
  },
  btnClick(){
    if (this.data.content == '') {
      app.showTips('提示', '请输入内容', false)
      return
    }
    if (lock){
      return
    }
    lock=true;
    var data={
      uid:app.globalData.uid,
      topic_id: this.data.dynamicId[this.data.dynamicIndex],
      content: this.data.content,
      pics: this.data.picIds,
    }
    if (this.data.lon !=''){
      data.address = this.data.address
      data.lon = this.data.lon
      data.lat = this.data.lat
    }
    wx.request({
      url: app.globalData.apiUrl + 'dynamic_post.php',
      data: data,
      method: 'POST',
      success: res => {
        if(res.data.ret==1){
          wx.showToast({
            title: '发布成功',
            icon: 'success'
          })
          setTimeout(function () {
            wx.hideToast()
            wx.reLaunch({
              url: '/pages/circle/circle',
            })
          }, 2000)
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      },
      complete:res=>{
        lock=false;
      }
    })
  },
  chooseLocation() {
    wx.chooseLocation({
      success: res => {
        this.setData({
          address: res.address,
          lon: res.longitude,
          lat: res.latitude
        })
      },
      fail: res => {
        wx.getSetting({
          success: res => {
            console.log(res)
            if (!res.authSetting['scope.userLocation'] || res.authSetting['scope.userLocation'] == undefined) {
              app.showAuthTips('请先授权获取位置');
            }
          }
        })
      }
    })
  }
})