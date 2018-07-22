// pages/share/share.js
var id=0;
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    picTempPath: '',
    imageWidth: 0,
    imageHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id ? options.id : 0
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.data.imageWidth = res.windowWidth
        that.data.imageHeight = res.windowWidth * 0.8
      }
    })
    wx.request({
      url: app.globalData.apiUrl + 'v4/get_content.php',
      data: { id: id, uid: app.globalData.uid },
      success: res => {
        if (res.data.ret == 1) {
          this.setData({
            content: res.data.data
          })
          var that = this
          wx.downloadFile({
            url: that.data.content.pics[0],
            success: function (res) {
              if (res.statusCode === 200) {
                var str = ''
                if (that.data.content.price == 0) {
                  str = '价格面议'
                } else {
                  var moneySign = that.data.content.money_sign;
                  moneySign = moneySign == '' ? '$' : moneySign;
                  str = moneySign + that.data.content.price + '/周'
                }
                that.loadContent(res.tempFilePath, that.data.content.show_content, str)
              }
            }
          })
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  loadContent(img, content, price) {
    wx.showLoading({
      title: '加载中'
    })
    var that = this;
    var ctx = wx.createCanvasContext('share')
    ctx.drawImage("/images/share_bg.png", 0, 0, that.data.imageWidth, that.data.imageHeight)
    var w = this.data.imageWidth;
    var h = this.data.imageHeight;
    //ctx.save();
    ctx.drawImage(img, 0, 0, w, h * 0.65)
    //ctx.restore()
    ctx.setFontSize(15)
    ctx.fillText(content, 20, h * 0.8)
    ctx.setFontSize(20)
    ctx.setFillStyle('red')
    ctx.fillText(price, 20, h * 0.95)
    ctx.draw(false, function () {
      wx.canvasToTempFilePath({
        canvasId: 'share',
        success: res => {
          that.setData({
            picTempPath: res.tempFilePath
          })
        },
        complete:res=>{
          wx.hideLoading()
        }
      }, this)
    })
  },
  onShareAppMessage: function (res) {
    var that = this;
    var pic = this.data.picTempPath
    pic = pic == '' ? '' : pic;
    return {
      title: this.data.content.title ? this.data.content.title : '小蚂蚁',
      path: '/pages/index/index?id=' + id,
      imageUrl: pic,
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
  }
})