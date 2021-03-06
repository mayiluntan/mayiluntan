// pages/view/viewDetail/viewDetail.js
var id=0;
const app=getApp();
var countTime=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:{},
    message:'',
    isCollect:0,
    showMessage:0,
    showShare:0,
    showImage:0,
    isDownload:0,
    tempPath:'',
    weekArray: ['周', '月', '日']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id ? options.id:0
    //console.log(id)
    var that = this;
    wx.request({
      url: app.globalData.apiUrl+'v8/get_content.php',
      data: { id: id, uid: app.globalData.uid},
      success:res=>{
        if(res.data.ret==1){
          //console.log(res.data.data)
          this.setData({
            content: res.data.data,
            isCollect: res.data.data.is_collect
          })
        }else{
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  messageInput(e){
    this.setData({
      message:e.detail.value
    })
  },
  replySubmit(){
    if (this.data.message == '') {
      app.showTips('提示', '请输入内容', false)
      return
    }
    wx.request({
      url: app.globalData.apiUrl + 'post_message.php',
      data: { id: id, uid: app.globalData.uid, content: this.data.message, reply_id:0 },
      method:'POST',
      success:res=>{
        if (res.data.ret == 1) {
          wx.showToast({
            title: '留言成功',
            icon:'success'
          })
          this.setData({
            message: ''
          })
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  addCollect(e){
    wx.request({
      url: app.globalData.apiUrl + 'add_collect.php',
      data: { id: id, uid: app.globalData.uid },
      method: 'POST',
      success: res => {
        if (res.data.ret == 1) {
          this.setData({
            isCollect: 1
          })
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  copyText(e) {
    var v = e.currentTarget.dataset.wechat
    if (v == '') {
      wx.showToast({
        title: '未填写微信号',
        icon: 'none'
      })
    } else {
      wx.setClipboardData({
        data: v,
        success: function (res) {
          wx.showToast({
            title: '已复制',
            icon: 'success'
          })
        }
      })
    }
  },
  callPhone(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      complete: res => {
      }
    })
  },
  shareClick(){
    wx.showShareMenu({
      withShareTicket:true
    })
  },
  onShareAppMessage: function (res) {
    this.setData({
      showShare:0
    })
    var that = this;
    return {
      title: this.data.content.title ? this.data.content.title : '小蚂蚁',
      path: '/pages/index/index?id=' + id,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success'
        });
        wx.request({
          url: app.globalData.apiUrl + 'post_share.php',
          data: { id: id, uid: app.globalData.uid },
          method: 'POST',
          complete: res => {
          }
        })
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  goShare(){
    wx.navigateTo({
      url: '/pages/share/share?id=' + id,
    })
  },
  imageClicked: function (e) {
    var section = e.currentTarget.dataset.index;
    var urls = this.data.content.pics_org
    if (section >= urls.length || section < 0 || !urls) return;
    wx.previewImage({
      urls: urls,
      current: urls[section]
    })
  },
  openAddress(){
    var lon = parseFloat(this.data.content.lon)
    var lat = parseFloat(this.data.content.lat)
    wx.openLocation({
      latitude: lat,
      longitude: lon,
      fail:res=>{
        wx.getSetting({
          success: res => {
            if (!res.authSetting['scope.userLocation'] || res.authSetting['scope.userLocation'] == undefined) {
              app.showAuthTips('请先授权获取位置');
            }
          }
        })
      }
    })
  },
  showMessage(){
    var v = this.data.showMessage
    v = v==1?0:1;
    this.setData({
      showMessage: v
    })
  },
  goReport(){
    wx.navigateTo({
      url: '/pages/view/report/report?source=1&source_id='+id,
    })
  },
  showShare(){
    var v = this.data.showShare
    v = v == 1 ? 0 : 1;
    this.setData({
      showShare: v
    })
  },
  showImage(){
    var v = this.data.showImage
    v = v == 1 ? 0 : 1;
    this.setData({
      showShare: 0
    })
    if (this.data.content.share_pic=='') {
      wx.showToast({
        title: '图片尚未生成',
        icon:'none'
      })
      return;
    }
    if (this.data.tempPath==''){
      wx.showLoading({
        title: '加载中',
      })
      var that = this;
      wx.downloadFile({
        url: that.data.content.share_pic,
        success: function (res) {
          if (res.statusCode === 200) {
            that.data.tempPath = res.tempFilePath
            wx.hideLoading()
            that.setData({
              showImage: v
            })
          }
        }
      })
    }
  },
  saveImage(){
    wx.saveImageToPhotosAlbum({
      filePath: this.data.tempPath,
      success:res=>{
        this.setData({
          showImage:0
        })
        wx.showToast({
          title: '已保存到相册',
        })
      },
      fail: function (res) {
        if(res.errMsg =='saveImageToPhotosAlbum:fail auth deny'){
          wx.showModal({
            title: '请打开授权',
            content: '您已拒绝保存到相册，点击确定前往打开',
            success:res=>{
              if (res.confirm==true){
                app.wxOpneSetting();
              }
            }
          })
        }else{
          wx.showToast({
            title: '保存失败',
            icon: "none"
          })
        }
        
      }
    })
  }
})