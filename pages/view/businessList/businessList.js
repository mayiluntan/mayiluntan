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
    cateArray: ['全部分类'],
    cateIndex: 0,
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
    var v = cate - 1;
    var cateArray = ['全部分类']
    switch (v) {
      case 0: cateArray = ['全部分类','私房小厨', '排挡快餐', '烧烤麻辣', '火锅香锅', '西餐', '面包糕点', '甜品饮料', '海鲜肉类', '早点早餐', '粥铺面馆', '自助餐厅', '咖啡汉堡', '日本料理', '韩国烧烤', '其他美食']; break;
      case 1: cateArray = ['全部分类','外卖送餐']; break;
      case 2: cateArray = ['全部分类','房产经济', '金融贷款', '理财保险', '翻译服务', '律师公正', '会计税务', '风水命理', '网站软件', '摄影婚庆', '医疗诊所', '其他']; break;
      case 3: cateArray = ['全部分类','机场接送', '搬家物流', '汽车维修', '驾校教练', '车行4S店', '租车服务', '运车回国']; break;
      case 4: cateArray = ['全部分类','宠物服务', '家政保洁', '行李寄存', '开锁配匙', '网络缴费', '花园除草', '除虫清洁', '保姆月嫂', '水暖电工', '数码电子', '二手回收', '防盗报警', '建材装修', '其他']; break;
      case 5: cateArray = ['全部分类','礼品商店']; break;
      case 6: cateArray = ['全部分类','留学移民', '辅导家教', '语言培训', '技能培训', '艺术培训', '幼儿教育', '院校招生']; break;
      case 7: cateArray = ['全部分类','旅行社', '机票', '私人旅游']; break;
      case 8: cateArray = ['全部分类','礼品商店', '华人超市', '西人超市', '快递货运', '花店', '其他商店']; break;
      case 9: cateArray = ['全部分类','医疗保健']; break;
      case 10: cateArray = ['全部分类','房产经济']; break;
      case 11: cateArray = ['全部分类','换汇汇款']; break;
      case 12: cateArray = ['全部分类','快递货运']; break;
      case 13: cateArray = ['全部分类','健美瘦身', '美发服务', '美甲护肤', '纹身服务', '其他']; break;
      case 14: cateArray = ['全部分类','足疗按摩', '洗浴温泉', '运动健身', '桌游棋牌', '酒吧/ktv', '', '网吧', '户外运动', '活动讲座']; break;
      case 15: cateArray = ['全部分类','酒店旅馆']; break;
      case 16: cateArray = ['全部分类','宠物服务']; break;
      case 17: cateArray = ['全部分类','家政保洁']; break;
      case 18: cateArray = ['全部分类','代购', '服饰', '包包', '妆品', '鞋子', '其他']; break;
    }
    this.setData({
      cateArray: cateArray
    })
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
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.getBusinessList();
  },
  getBusinessList() {
    var cate2 = this.data.cateIndex - 1;
    wx.request({
      url: app.globalData.apiUrl + 'v6/get_business.php?cate=' + cate +'&cate2='+cate2 + '&order=' + order + '&area=' + this.data.area + '&keyword=' + this.data.keyword + '&uid=' + app.globalData.uid,
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
    //cate = e.detail.value
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