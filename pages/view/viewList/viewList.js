// pages/view/viewList/viewList.js
const app=getApp();
var cate=0;
var order=0;
var area='';
var lock=false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderArray: ['排序', '发布时间', '刷新时间'],
    orderIndex: 0,
    areaArray: ['区域', '地区1', '地区2'],
    areaIndex: 0,
    cateArray: ['全部分类', '房屋信息', '二手市场', '求职招聘', '汽车交易', '求助问事', '拼车信息', '短租民宿', '生意转让', '交友项目', '宠物相关', '二手教材', '二手房产', '同城交友', '家居家具', '数码电子'],
    cateIndex: 0,
    listData: [],
    area:'',
    keyword:'',
    houseArray: ['公寓', '别墅', '联排别墅', '小区', '办公室', '商铺', '车库', '其他'],
    houseType: ['床位', '客厅', '双人床', '主卧', '单间', '整租'],
    screenCate:0,
    screenPersonal:0,
    screenHouse:0,
    screenType:0,
    screenShow:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    cate = options.cate ? options.cate:0;
    var keyword = options.keyword ? options.keyword :'';
    this.setData({
      keyword: keyword,
      cateIndex: cate
    })
    this.getIndexList()
  },
  onShow(){
    if (app.globalData.areaChange) {
      this.setData({
        area: app.globalData.area
      })
      app.globalData.area = '';
      app.globalData.areaChange = false;
      this.getIndexList()
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.getIndexList();
  },
  getIndexList() {
    wx.request({
      url: app.globalData.apiUrl + 'get_list.php?cate=' + cate + '&order=' + order + '&area=' + this.data.area + '&keyword=' + this.data.keyword + '&uid=' + app.globalData.uid + '&screenCate=' + this.data.screenCate + '&personal=' + this.data.screenPersonal + '&house=' + this.data.screenHouse + '&type=' + this.data.screenType,
      success: res => {
        this.setData({
          listData: res.data.data
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
    this.getIndexList()
  },
  areaChange(e) {
    area = e.detail.value
    this.setData({
      areaIndex: e.detail.value
    })
    this.getIndexList()
  },
  orderChange(e) {
    order = e.detail.value
    this.setData({
      orderIndex: e.detail.value
    })
    this.getIndexList()
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
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      complete: res => {
        lock = false;
      }
    })

  },
  viewDetail(e) {
    if (lock) {
      return
    }
    var v = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/view/viewDetail/viewDetail?id=' + v,
    })
  },
  selectArea() {
    wx.navigateTo({
      url: '/pages/areaSelect/areaSelect',
    })
  },
  cateSelect(e) {
    var v = e.currentTarget.dataset.value
    this.setData({
      screenCate: v
    })
    if (this.data.screenCate > 0 && this.data.screenPersonal > 0 && this.data.screenHouse > 0 && this.data.screenType > 0) {
      this.showScreen()
      this.getIndexList()
    }
  },
  sourceSelect(e) {
    var v = e.currentTarget.dataset.value
    this.setData({
      screenPersonal: v
    })
    if (this.data.screenCate > 0 && this.data.screenPersonal > 0 && this.data.screenHouse > 0 && this.data.screenType > 0){
      this.showScreen()
      this.getIndexList()
    }
  },
  houseSelect(e) {
    var v = e.currentTarget.dataset.value
    this.setData({
      screenHouse: v
    })
    if (this.data.screenCate > 0 && this.data.screenPersonal > 0 && this.data.screenHouse > 0 && this.data.screenType > 0) {
      this.showScreen()
      this.getIndexList()
    }
  },
  typeSelect(e) {
    var v = e.currentTarget.dataset.value
    this.setData({
      screenType: v
    })
    if (this.data.screenCate > 0 && this.data.screenPersonal > 0 && this.data.screenHouse > 0 && this.data.screenType>0) {
      this.showScreen()
      this.getIndexList()
    }
  },
  showScreen(){
    var v = this.data.screenShow;
    v=v==1?0:1;
    this.setData({
      screenShow: v
    })
  }
})