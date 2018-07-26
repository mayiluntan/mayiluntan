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
    cate:0,
    orderArray: ['排序', '发布时间', '刷新时间'],
    orderIndex: 0,
    areaArray: ['区域', '地区1', '地区2'],
    areaIndex: 0,
    cateArray: ['全部分类'],
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
      cate: cate
    })
    this.getIndexList()

    var v = cate-1;
    var cateArray = ['全部分类']
    switch (v) {
      case 0: cateArray = ['全部分类','求组', '招租']; break;
      case 1: cateArray = ['全部分类', '家居家具', '数码电子', '二手教材', '宠物相关', '服装饰品', '游戏娱乐', '美容护肤', '食品饮料', '宝宝用品', '其它综合', '求购信息','电器相关']; break;
      case 2: cateArray = ['全部分类','求职', '招聘']; break;
      case 3: cateArray = ['全部分类','求购', '出售']; break;
      case 4: cateArray = ['全部', '求助问事', '留学移民', '美食天地', '吐槽八卦', '校园联谊', '淘气宝宝', '汽车之家', '家有萌宠', '美妆服饰', '旅游踏青']; break;
      case 5: cateArray = ['全部分类','人找车', '车找人']; break;
      case 6: cateArray = ['全部分类','短租民宿']; break;
      case 7: cateArray = ['全部分类','生意转让']; break;
      case 8: cateArray = ['全部分类','交友项目']; break;
      case 9: cateArray = ['全部分类','宠物相关']; break;
      case 10: cateArray = ['全部分类','二手教材']; break;
      case 11: cateArray = ['全部分类']; break;
      case 12: cateArray = ['全部分类','同城交友']; break;
      case 13: cateArray = ['全部分类','家居家具']; break;
      case 14: cateArray = ['全部分类','数码电子']; break;
      case 15: cateArray = ['全部分类','求带','帮带']; break;
    }
    this.setData({
      cateArray: cateArray
    })
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
    var cate2 = this.data.cateIndex-1;
    wx.request({
      url: app.globalData.apiUrl + 'v4/get_list.php?cate=' + cate + '&cate2=' + cate2+ '&order=' + order + '&area=' + this.data.area + '&keyword=' + this.data.keyword + '&uid=' + app.globalData.uid + '&screenCate=' + this.data.screenCate + '&personal=' + this.data.screenPersonal + '&house=' + this.data.screenHouse + '&type=' + this.data.screenType,
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
    //cate = e.detail.value
    this.setData({
      cateIndex: e.detail.value
    })
    this.getIndexList()
  },
  cateTap(e) {
    this.setData({
      cateIndex: e.currentTarget.dataset.cate
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
    if (this.data.screenCate==v){
      v=0
    }
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
    if (this.data.screenPersonal == v) {
      v = 0
    }
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
    if (this.data.screenHouse == v) {
      v = 0
    }
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
    if (this.data.screenType == v) {
      v = 0
    }
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
  },
  screenConfirm(){
    this.showScreen()
    if (this.data.screenCate > 0 || this.data.screenPersonal > 0 || this.data.screenHouse > 0 || this.data.screenType > 0) {
      this.getIndexList()
    }
  }
})