//index.js
//获取应用实例
const app = getApp()
var cate = 0;
var order = 0;
Page({
  data: {
    selectArray: ['', '', ''],
    selectIndex: [0, 0, 0],
    cateArray: ['餐饮美食', '外卖送餐', '专业服务', '汽车服务', '便民家政', '礼品商店', '移民教育', '旅游机票', '超市商店', '医疗保健', '房产经济', '换汇汇款', '快递货运', '美容美发', '休闲娱乐', '酒店旅馆', '宠物服务', '家政保洁', '微商部落'],
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
        console.log(res.data.data)
        this.setData({
          //listData: res.data.data
        })
      }
    })
  },
})
