// pages/publish/business/business.js
const app=getApp();
var lock=false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
    picIds: [],
    picCount: 0,
    cateArray: [['餐饮美食', '外卖送餐', '专业服务', '汽车服务', '便民家政', '礼品商店', '移民教育', '旅游机票', '超市商店', '医疗保健', '房产经济', '以物易物', '快递货运', '美容美发', '休闲娱乐', '酒店旅馆', '宠物服务', '家政保洁', '微商部落'], ['私房小厨', '排挡快餐', '烧烤麻辣', '火锅香锅', '西餐', '面包糕点', '甜品饮料', '海鲜肉类', '早点早餐', '粥铺面馆', '自助餐厅', '咖啡汉堡', '日本料理', '韩国烧烤', '其他美食']],
    cateIndex:[0,0],
    logo:'',
    cert:'',
    dayArray: ['1天', '7天', '30天'],
    dayIndex: 0,
    serviceArr:['免费WIFI','刷卡支付','沙发休闲','免费停车','提供包间','禁止吸烟'],
    serviceOption: [false, false, false, false, false, false],
    postData:{
      id:0,
      name:'',
      tel: '',
      qq: '',
      wechat: '',
      intro:'',
      discount:'',
      cate: '',
      logo: '',
      area: '',
      address: '',
      lon:'',
      lat:'',
      location:'',
      stratTime: '00:00',
      endTime: '23:59',
      cert: '',
      servive: '',
      top: 0,
      topDay: 1,
      topPrice: 10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cate = options.cate ? options.cate : 0;
    if (cate > 0) {
      this.setData({
        cateIndex: [cate-1, 0]
      })
      this.allCateChange(cate - 1)
    }
    var id = options.id ? options.id : 0
    lock = false;
    if (id) {
      wx.request({
        url: app.globalData.apiUrl + 'v8/get_business_edit.php?uid=' + app.globalData.uid + '&id=' + id,
        success: res => {
          if (res.data.ret == 1) {
            this.setData({
              pics: res.data.data.pics,
              picIds: res.data.data.picIds,
              picCount: res.data.data.picCount,
              cateIndex: res.data.data.cateIndex,
              postData: res.data.data.postData,
              logo: res.data.data.logo,
              cert: res.data.data.cert,
              serviceArr: res.data.data.serviceArr,
              serviceOption: res.data.data.serviceOption
            })
            this.allCateChange(res.data.data.cateIndex[0])
          } else {
            app.showTips(res.data.title, res.data.msg, false);
          }
        }
      })
    }
  },
  onShow(){
    if (app.globalData.areaChange){
      var postData = this.data.postData;
      postData.area = app.globalData.area
      this.setData({
        area:app.globalData.area,
        postData: postData
      })
      app.globalData.area='';
      app.globalData.areaChange=false;
    }
  },
  addPic(e) {
    var type = e.currentTarget.dataset.type
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        var logo = that.data.logo;
        var cert = that.data.cert;
        var postData = that.data.postData;
        for (var i = 0; i < tempFilePaths.length; i++) {
          var img = tempFilePaths[i];
          if(type==1){
            logo=img
          }else{
            cert=img
          }
          wx.uploadFile({
            url: app.globalData.apiUrl + 'upload_pic.php',
            filePath: img,
            name: 'file',
            formData: {
              'uid': app.globalData.uid
            },
            success: res => {
              if (res.data == 0) {
                app.showTips('提示', '上传失败', false);
              } else {
                if (type == 1){
                  postData.logo = res.data
                }else{
                  postData.cert = res.data
                }
                that.setData({
                  postData: postData,
                  logo: logo,
                  cert: cert
                });
              }
            }
          })
        }
      }
    })
  },
  addPic2() {
    var that = this;
    var picCount = that.data.picCount
    wx.chooseImage({
      count: 9 - picCount,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        var pics = that.data.pics;
        var picIds = that.data.picIds;
        for (var i = 0; i < tempFilePaths.length; i++) {
          var img = tempFilePaths[i];
          pics.push(img);
          wx.uploadFile({
            url: app.globalData.apiUrl + 'upload_pic.php',
            filePath: img,
            name: 'file',
            formData: {
              'uid': app.globalData.uid
            },
            success: res => {
              if (res.data == 0) {
                app.showTips('提示', '上传失败', false);
              } else {
                picCount++;
                picIds.push(res.data)
                that.setData({
                  pics: pics,
                  picIds: picIds,
                  picCount: picCount
                });
              }
            }
          })
        }
      }
    })
  },
  delPic(e) {
    var del_type = e.currentTarget.dataset.type;
    var postData = this.data.postData;
    var logo = this.data.logo;
    var cert = this.data.cert;
    if (del_type == 1) {
      postData.logo = ''
      logo=''
    } else {
      postData.cert = ''
      cert=''
    }
    this.setData({
      postData: postData,
      logo: logo,
      cert: cert
    });
  },
  delPic2(e) {
    var index = e.currentTarget.dataset.index;
    var pics = this.data.pics;
    var picIds = this.data.picIds;
    pics.splice(index, 1);
    picIds.splice(index, 1);
    this.setData({
      pics: pics,
      picIds: picIds,
      picCount: picIds.length
    });
  },
  cateChange(e){
    var postData = this.data.postData
    postData.cate = e.detail.value
    this.setData({
      postData: postData,
      cateIndex: e.detail.value
    })
  },
  nameInput(e) {
    var postData = this.data.postData
    postData.name = e.detail.value
    this.setData({
      postData: postData
    })
  },
 telInput(e) {
    var postData = this.data.postData
    postData.tel = e.detail.value
    this.setData({
      postData: postData
    })
  },
  qqInput(e) {
    var postData = this.data.postData
    postData.qq = e.detail.value
    this.setData({
      postData: postData
    })
  },
  wechatInput(e) {
    var postData = this.data.postData
    postData.wechat = e.detail.value
    this.setData({
      postData: postData
    })
  },
  introInput(e){
    var postData = this.data.postData
    postData.intro = e.detail.value
    this.setData({
      postData: postData
    })
  },
  addressInput(e) {
    var postData = this.data.postData
    postData.address = e.detail.value
    this.setData({
      postData: postData
    })
  },
  timeChange(e){
    var type = e.currentTarget.dataset.type
    var postData = this.data.postData
    if(type==1){
      postData.stratTime = e.detail.value
    }else{
      postData.endTime = e.detail.value
    }
    this.setData({
      postData: postData
    })
  },
  businessPost() {
    if (lock) {
      return
    }
    lock = true;
    var postData=this.data.postData
    if (postData.name == '') {
      app.showTips('提示', '请输入商家名称', false)
      lock = false;
      return
    }
    if (postData.tel == '') {
      app.showTips('提示', '请输入商家手机号', false)
      lock = false;
      return
    }
    if (postData.wechat == '') {
      app.showTips('提示', '请输入商家微信号', false)
      lock = false;
      return
    }
    // if (postData.logo == '') {
    //   app.showTips('提示', '请上传logo', false)
    //   return
    // }
    // if (this.data.pics.length == 0) {
    //   app.showTips('提示', '请上传详情图', false)
    //   return
    // }
    if (postData.intro == '') {
      app.showTips('提示', '请填写商户介绍', false)
      lock = false;
      return
    }
    if (postData.area == '') {
      app.showTips('提示', '请选择区域', false)
      lock = false;
      return
    }
    // if (postData.address == '') {
    //   app.showTips('提示', '请输入商家地址', false)
    //   lock = false;
    //   return
    // }
    //服务结合
    var serviceOption = this.data.serviceOption
    var serviceArr = this.data.serviceArr
    var service_str = '';
    for (var i = 0; i < serviceOption.length; i++) {
      var jugle = serviceOption[i];
      if (jugle == true) {
        if (service_str == '') {
          service_str = serviceArr[i]
        } else {
          service_str += ',' + serviceArr[i]
        }
      }
    }
    postData.service = service_str
    postData.uid = app.globalData.uid
    postData.pics = this.data.picIds
    //console.log(postData)
    wx.request({
      url: app.globalData.apiUrl + 'v8/business_post.php',
      data: postData,
      method: 'POST',
      success: res => {
        //console.log(res)
        if (res.data.ret == 1) {
          if (res.data.top == 1) {
            wx.requestPayment({
              'timeStamp': res.data.pay_info.timeStamp,
              'nonceStr': res.data.pay_info.nonceStr,
              'package': res.data.pay_info.package,
              'signType': 'MD5',
              'paySign': res.data.pay_info.paySign,
              'success': function (res) {
                wx.showToast({
                  title: '置顶成功',
                  icon: 'success'
                })
                setTimeout(function () {
                  wx.hideToast()
                  app.globalData.pageChange = true
                  wx.reLaunch({
                    url: '/pages/pages/pages',
                  })
                }, 2000)

              },
              'fail': function (res) {
                wx.showToast({
                  title: '取消置顶',
                  icon: 'none'
                })
                setTimeout(function () {
                  wx.hideToast()
                  app.globalData.pageChange = true
                  wx.reLaunch({
                    url: '/pages/pages/pages',
                  })
                }, 2000)
              },
              'complete': function (res) {
                //console.log('123')
              }
            })
          } else {
            wx.showToast({
              title: '入驻成功',
              icon: 'success'
            })
            setTimeout(function () {
              wx.hideToast()
              app.globalData.pageChange = true
              wx.reLaunch({
                url: '/pages/pages/pages',
              })
            }, 2000)
          }
        } else {
          lock = false;
          app.showTips(res.data.title, res.data.msg, false);
        }
      },
      fail: res => {
        lock = false;
      }
    })
  },
  clickSwitch(e) {
    var v = e.currentTarget.dataset.on;
    if (v == 1) {
      v = 0
    } else {
      v = 1
    }
    var postData = this.data.postData
    postData.top = v;
    this.setData({
      postData: postData
    })
  },
  dayChange(e) {
    var v = e.detail.value;
    var day = 1;
    if (v == 1) {
      day = 7;
    } else if (v == 2) {
      day = 30;
    }
    var postData = this.data.postData
    postData.topDay = day;
    postData.topPrice = day * 10;
    this.setData({
      dayIndex: v,
      postData: postData
    })
    //var money = parseFloat(this.data.price) * this.data.totalCount;
    //money = Math.round(money * 100) / 100;
  },
  selectArea() {
    wx.navigateTo({
      url: '/pages/areaSelect/areaSelect',
    })
  },
  columnChange: function (e) {
    if (e.detail.column == 1) {
      return;
    }
    this.allCateChange(e.detail.value)
  },
  allCateChange(v) {
    var cateArray = this.data.cateArray
    switch (v) {
      case 0: cateArray[1] = ['私房小厨', '排挡快餐', '烧烤麻辣', '火锅香锅', '西餐', '面包糕点', '甜品饮料', '海鲜肉类', '早点早餐', '粥铺面馆', '自助餐厅', '咖啡汉堡', '日本料理', '韩国烧烤','其他美食']; break;
      case 1: cateArray[1] = ['外卖送餐']; break;
      case 2: cateArray[1] = ['房产经济', '金融贷款', '理财保险', '翻译服务', '律师公正', '会计税务', '风水命理', '网站软件', '摄影婚庆', '医疗诊所','其他']; break;
      case 3: cateArray[1] = ['机场接送', '搬家物流', '汽车维修', '驾校教练', '车行4S店', '租车服务', '运车回国']; break;
      case 4: cateArray[1] = ['宠物服务', '家政保洁', '行李寄存', '开锁配匙', '网络缴费', '花园除草', '除虫清洁', '保姆月嫂', '水暖电工', '数码电子', '二手回收', '防盗报警', '建材装修','其他']; break;
      case 5: cateArray[1] = ['礼品商店']; break;
      case 6: cateArray[1] = ['留学移民', '辅导家教', '语言培训', '技能培训', '艺术培训', '幼儿教育','院校招生']; break;
      case 7: cateArray[1] = ['旅行社','机票','私人旅游']; break;
      case 8: cateArray[1] = ['礼品商店', '华人超市', '西人超市', '快递货运', '花店', '其他商店']; break;
      case 9: cateArray[1] = ['医疗保健']; break;
      case 10: cateArray[1] = ['房产经济']; break;
      case 11: cateArray[1] = ['以物易物']; break;
      case 12: cateArray[1] = ['快递货运']; break;
      case 13: cateArray[1] = ['健美瘦身', '美发服务', '美甲护肤', '纹身服务','其他']; break;
      case 14: cateArray[1] = ['足疗按摩', '洗浴温泉', '运动健身', '桌游棋牌', '酒吧/ktv', '', '网吧', '户外运动', '活动讲座']; break;
      case 15: cateArray[1] = ['酒店旅馆']; break;
      case 16: cateArray[1] = ['宠物服务']; break;
      case 17: cateArray[1] = ['家政保洁']; break;
      case 18: cateArray[1] = ['代购', '服饰', '包包', '妆品', '鞋子','其他']; break;
    }
    this.setData({
      cateArray: cateArray
    })
  },
  chooseLocation() {
    wx.chooseLocation({
      success: res => {
        var postData = this.data.postData
        postData.location = res.address
        postData.lon = res.longitude
        postData.lat = res.latitude
        this.setData({
          postData: postData
        })
      },
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
  selectService(e) {
    var v = e.currentTarget.dataset.index
    var serviceOption = this.data.serviceOption;
    var choose = serviceOption[v]
    choose = choose == true ? false : true;
    serviceOption[v] = choose;
    this.setData({
      serviceOption: serviceOption
    })
  },
  discountInput(e){
    var postData = this.data.postData
    postData.discount = e.detail.value
    this.setData({
      postData: postData
    })
  }
})