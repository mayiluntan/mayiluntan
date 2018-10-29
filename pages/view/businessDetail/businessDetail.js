// pages/view/viewDetail/viewDetail.js
var id = 0;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    message: '',
    showMessage: 0,
    showShare: 0,
    servicePic:{
      '免费WIFI': { 'pic': '/images/business/service1.png' },
      '刷卡支付': { 'pic': '/images/business/service2.png' },
      '免费停车': { 'pic': '/images/business/service3.png' },
      '沙发休闲': { 'pic': '/images/business/service4.png' },
      '提供包间': { 'pic': '/images/business/service5.png' },
      '禁止吸烟': { 'pic': '/images/business/service6.png' }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id ? options.id : 0
    wx.request({
      url: app.globalData.apiUrl + 'v8/get_business_content.php',
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
  messageInput(e) {
    this.setData({
      message: e.detail.value
    })
  },
  replySubmit() {
    if (this.data.message == '') {
      app.showTips('提示', '请输入内容', false)
      return
    }
    wx.request({
      url: app.globalData.apiUrl + 'post_business_message.php',
      data: { id: id, uid: app.globalData.uid, content: this.data.message, reply_id: 0 },
      method: 'POST',
      success: res => {
        if (res.data.ret == 1) {
          wx.showToast({
            title: '留言成功',
            icon: 'success'
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
    var v = e.currentTarget.dataset.phone
    if (v == '') {
      wx.showToast({
        title: '未填写手机号',
        icon: 'none'
      })
    }else{
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone,
        complete: res => {
        }
      })
    }
  },
  imageClicked(e){
    var section = e.currentTarget.dataset.index;
    var urls = this.data.content.pics_org
    if (section >= urls.length || section < 0 || !urls) return;
    wx.previewImage({
      urls: urls,
      current: urls[section]
    })
  },
  openAddress() {
    var lon = parseFloat(this.data.content.lon)
    var lat = parseFloat(this.data.content.lat)
    wx.openLocation({
      latitude: lat,
      longitude: lon,
      fail: res => {
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
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: this.data.content.name ? this.data.content.name : '小蚂蚁',
      path: '/pages/index/index?business_id=' + id,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success'
        });
        wx.request({
          url: app.globalData.apiUrl + 'business_share.php',
          data: { id: id, uid: app.globalData.uid },
          method: 'POST',
          complete: res => {
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  showMessage() {
    var v = this.data.showMessage
    v = v == 1 ? 0 : 1;
    this.setData({
      showMessage: v
    })
  },
  showShare() {
    var v = this.data.showShare
    v = v == 1 ? 0 : 1;
    this.setData({
      showShare: v
    })
  }
})