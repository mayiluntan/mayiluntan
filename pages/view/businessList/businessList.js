// pages/view/businessList/businessList.js
const app = getApp()
var cate = 0;
var order = 0;
var area = '';
var lock = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderArray: ['排序', '发布时间', '刷新时间'],
    orderIndex: 0,
    areaArray: ['区域', '地区1', '地区2'],
    areaIndex: 0,
    data: {},
    area: '',
    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    cate = options.cate ? options.cate : 0;
    var keyword = options.keyword ? options.keyword : '';
    this.setData({
      keyword: keyword
    })
    this.getBusinessList()
  },
  onShow() {
    if (app.globalData.areaChange) {
      this.setData({
        area: app.globalData.area
      })
      app.globalData.area = '';
      app.globalData.areaChange = false;
      this.getBusinessList()
    }
  },
  getBusinessList() {
    wx.request({
      url: app.globalData.apiUrl + 'get_business.php?cate=' + cate + '&order=' + order + '&area=' + this.data.area + '&keyword=' + this.data.keyword + '&uid=' + app.globalData.uid,
      success: res => {
        this.setData({
          data: res.data.data
        })
      }
    })
  },
  areaChange(e) {
    area = e.detail.value
    this.setData({
      areaIndex: e.detail.value
    })
    this.getBusinessList()
  },
  orderChange(e) {
    order = e.detail.value
    this.setData({
      orderIndex: e.detail.value
    })
    this.getBusinessList()
  },
  copyText(e) {
    lock = true;
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
    setTimeout(function () {
      lock = false;
    }, 1000)

  },
  callPhone(e) {
    lock = true;
    if (e.currentTarget.dataset.phone == '') {
      wx.showToast({
        title: '未填写手机号',
        icon: 'none',
        duration:1000
      })
    }else{
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone,
        complete: res => {
          lock = false;
        }
      })
    }
    setTimeout(function () {
      lock = false;
    }, 1000)

  },
  viewDetail(e) {
    if (lock) {
      return
    }
    var v = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/view/businessDetail/businessDetail?id=' + v,
    })
  },
  selectArea() {
    wx.navigateTo({
      url: '/pages/areaSelect/areaSelect',
    })
  }
})