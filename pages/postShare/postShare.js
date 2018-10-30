var id=0;
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    showShare: 0,
    showImage: 0,
    tempPath:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id ? options.id : 0
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'v8/get_content.php',
      data: { id: id, uid: app.globalData.uid },
      success: res => {
        if (res.data.ret == 1) {
          this.setData({
            content: res.data.data
          })
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  onShareAppMessage: function (res) {
    this.setData({
      showShare: 0
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
  showShare() {
    var v = this.data.showShare
    v = v == 1 ? 0 : 1;
    this.setData({
      showShare: v
    })
  },
  showImage() {
    var v = this.data.showImage
    v = v == 1 ? 0 : 1;
    this.setData({
      showShare: 0
    })
    if (this.data.content.share_pic == '') {
      wx.showToast({
        title: '图片尚未生成',
        icon: 'none'
      })
      return;
    }
    if (this.data.tempPath == '') {
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
  saveImage() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.tempPath,
      success: res => {
        this.setData({
          showImage: 0
        })
        wx.showToast({
          title: '已保存到相册',
        })
      },
      fail: function (res) {
        if (res.errMsg == 'saveImageToPhotosAlbum:fail auth deny') {
          wx.showModal({
            title: '请打开授权',
            content: '您已拒绝保存到相册，点击确定前往打开',
            success: res => {
              if (res.confirm == true) {
                app.wxOpneSetting();
              }
            }
          })
        } else {
          wx.showToast({
            title: '保存失败',
            icon: "none"
          })
        }

      }
    })
  },
  goDetail(){
    wx.redirectTo({
      url: '/pages/view/viewDetail/viewDetail?id=' + id,
    })
  },
  goHome(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})