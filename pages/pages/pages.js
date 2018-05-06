//index.js
//获取应用实例
const app = getApp()
var cate = 0;
var order = 0;
var lock=false;
Page({
  data: {
    selectArray: ['', '', ''],
    selectIndex: [0, 0, 0],
    cateArray: ['餐饮美食', '外卖送餐', '专业服务', '汽车服务', '便民家政', '礼品商店', '移民教育', '旅游机票', '超市商店', '医疗保健', '房产经济', '换汇汇款', '快递货运', '美容美发', '休闲娱乐', '酒店旅馆', '宠物服务', '家政保洁', '微商部落'],
    data:{}
  },
  onLoad: function () {
    this.getBusinessList()
  },
  onShow() {
    if (app.globalData.pageChange) {
      app.globalData.pageChange = false;
      this.setData({
        selectArray: app.globalData.cityArray,
        selectIndex: app.globalData.cityIndex
      })
    }
  },
  swiperChange(e) {
    this.setData({
      cateSelected: e.detail.current
    });
  },
  selectCity() {
    wx.navigateTo({
      url: '/pages/citySelect/citySelect',
    })
  },
  getBusinessList() {
    wx.request({
      url: app.globalData.apiUrl + 'get_business.php?cate=' + cate + '&order=' + order,
      success: res => {
        console.log(res)
        this.setData({
          data: res.data.data
        })
      }
    })
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
    setTimeout(function(){
      lock = false;
    },1000)
    
  },
  callPhone(e) {
    lock = true;
    if (e.currentTarget.dataset.phone == '') {
      wx.showToast({
        title: '未填写手机号',
        icon: 'none'
      })
      return;
    }
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      complete: res => {
        lock = false;
      }
    })

  },
  businessDetail(e) {
    if (lock) {
      return
    }
    var v = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/view/businessDetail/businessDetail?id=' + v,
    })
  }
})
