// pages/view/viewDetail/viewDetail.js
var id=0;
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:{},
    message:'',
    isCollect:0,
    picTempPath:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id ? options.id:0
    console.log(id)
    wx.request({
      url: app.globalData.apiUrl+'get_content.php',
      data: { id: id, uid: app.globalData.uid},
      success:res=>{
        if(res.data.ret==1){
          this.setData({
            content: res.data.data,
            isCollect: res.data.data.is_collect
          })
          var that = this
          wx.downloadFile({
            url: that.data.content.pics[0],
            success: function (res) {
              if (res.statusCode === 200) {
                //that.data.picTempPath = res.tempFilePath
                //that.data.codeLoaded = true
                //console.log(that.data.picTempPath)
               // that.renderCanvas()
                const ctx = wx.createCanvasContext('share')
                ctx.drawImage(res.tempFilePath, 0, 0, 300, 150)
                ctx.draw(false,function(){
                  wx.canvasToTempFilePath({
                    canvasId: 'share',
                    success:res=>{
                      console.log(res.tempFilePath)
                      that.setData({
                        picTempPath: res.tempFilePath
                      })
                    },
                    fail:res=>{
                      console.log(res)
                    }
                  }, this)
                })
              }
            }
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
    var that=this;
    console.log(that.data.picTempPath)
    return {
      title: this.data.content.title ? this.data.content.title:'小蚂蚁',
      path: '/pages/index/index?id=' + id,
      imageUrl: that.data.picTempPath,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success'
        });
        wx.request({
          url: app.globalData.apiUrl + 'post_share.php',
          data: { id: id, uid: app.globalData.uid },
          method:'POST',
          complete:res=>{
          }
        })
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
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
  }
})