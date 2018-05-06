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
    cateArray: ['餐饮美食', '外卖送餐', '专业服务', '汽车服务', '便民家政', '礼品商店', '移民教育', '旅游机票', '超市商店', '医疗保健', '房产经济', '换汇汇款', '快递货运', '美容美发', '休闲娱乐', '酒店旅馆', '宠物服务', '家政保洁', '微商部落'],
    cateIndex:0,
    logo:'',
    cert:'',
    dayArray: ['1天', '7天', '30天'],
    dayIndex: 0,
    postData:{
      name:'',
      tel: '',
      qq: '',
      wechat: '',
      intro:'',
      cate: '',
      logo: '',
      area: '',
      address: '',
      stratTime: '00:00',
      endTime: '23:59',
      cert: '',
      servive: '',
      top: 1,
      topDay: 1,
      topPrice: 10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      count: 3 - picCount,
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
              console.log(that.data)
            }
          })
        }
      }
    })
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
  businessPost(){
    var postData=this.data.postData
    if (postData.name == '') {
      app.showTips('提示', '请输入商家名称', false)
      return
    }
    if (postData.tel == '') {
      app.showTips('提示', '请输入商家手机号', false)
      return
    }
    if (postData.wechat == '') {
      app.showTips('提示', '请输入商家微信号', false)
      return
    }
    if (postData.logo == '') {
      app.showTips('提示', '请上传logo', false)
      return
    }
    if (this.data.pics.length == 0) {
      app.showTips('提示', '请上传详情图', false)
      return
    }
    if (postData.intro == '') {
      app.showTips('提示', '请填写商户介绍', false)
      return
    }
    if (postData.address == '') {
      app.showTips('提示', '请输入商家地址', false)
      return
    }
    if (lock){
      return
    }
    lock=true;
    postData.uid = app.globalData.uid
    postData.pics = this.data.picIds
    console.log(postData)
    wx.request({
      url: app.globalData.apiUrl + 'business_post.php',
      data: postData,
      method: 'POST',
      success: res => {
        console.log(res)
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
                  wx.reLaunch({
                    url: '/pages/pages/pages',
                  })
                }, 2000)
              },
              'complete': function (res) {
                console.log('123')
              }
            })
          } else {
            wx.showToast({
              title: '入驻成功',
              icon: 'success'
            })
            setTimeout(function () {
              wx.hideToast()
              wx.reLaunch({
                url: '/pages/pages/pages',
              })
            }, 2000)
          }
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      },
      complete: res => {
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
    console.log(e)
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
    console.log(this.data)
    //var money = parseFloat(this.data.price) * this.data.totalCount;
    //money = Math.round(money * 100) / 100;
  }
})