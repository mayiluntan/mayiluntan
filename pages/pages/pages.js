//index.js
//获取应用实例
const app = getApp()
var cate = 0;
var order = 0;
var area='';
var lock=false;
Page({
  data: {
    selectArray: ['', '', ''],
    selectIndex: [0, 0, 0],
    cateArray: ['全部分类','餐饮美食', '外卖送餐', '专业服务', '汽车服务', '便民家政', '礼品商店', '移民教育', '旅游机票', '超市商店', '医疗保健', '房产经济', '换汇汇款', '快递货运', '美容美发', '休闲娱乐', '酒店旅馆', '宠物服务', '家政保洁', '微商部落'],
    cateIndex: 0,
    orderArray: ['排序', '发布时间', '刷新时间'],
    orderIndex: 0,
    areaArray: ['区域', '地区1', '地区2'],
    areaIndex: 0,
    area:'',
    data:{},
    broadcast: {
      'title': '赶快来入驻吧',
      'name': '',
      'id': 0
    }
  },
  onLoad: function () {
    this.getBusinessList()
    wx.request({
      url: app.globalData.apiUrl + 'get_other_info.php?type=2',
      success: res => {
        this.setData({
          broadcast: res.data.data.broadcast
        })
      }
    })
  },
  onShow() {
    if (app.globalData.pageChange) {
      app.globalData.pageChange = false;
      this.setData({
        selectArray: app.globalData.cityArray,
        selectIndex: app.globalData.cityIndex
      })
    }
    if (app.globalData.areaChange) {
      this.setData({
        area: app.globalData.area
      })
      app.globalData.area = '';
      app.globalData.areaChange = false;
      this.getBusinessList()
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getBusinessList();
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
      url: app.globalData.apiUrl + 'get_business.php?cate=' + cate + '&order=' + order + '&area=' + this.data.area + '&uid=' + app.globalData.uid,
      success: res => {
        this.setData({
          data: res.data.data
        })
      },
      complete: res => {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  cateChange(e) {
    cate = e.detail.value
    this.setData({
      cateIndex: e.detail.value
    })
    this.getBusinessList()
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
  },
  showList(e) {
    var c = e.currentTarget.dataset.cate;
    wx.navigateTo({
      url: '/pages/view/businessList/businessList?cate=' + c,
    })
  },
  selectArea() {
    wx.navigateTo({
      url: '/pages/areaSelect/areaSelect',
    })
  },
  searchClick(e) {
    var v = e.detail.value;
    if (v == '') {
      return;
    }
    wx.navigateTo({
      url: '/pages/view/businessList/businessList?keyword=' + v,
    })
  },
  businessPost(){
    wx.navigateTo({
      url: '/pages/publish/business/business'
    })
  }
})
