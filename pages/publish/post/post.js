// pages/publish/post/post.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
    picCount: 0,
    indexArray: [0, 0],
    cateArray: [['房屋出租', '房屋求租', '二手市场', '求职招聘', '汽车交易', '求助问事', '拼车信息', '短租民宿', '生意转让', '交友项目', '宠物相关', '二手教材', '二手房产', '同城交友', '家居家具', '数码电子'], ['出租/合租', '短租民宿', '办公/商铺', '仓库/车位', 'Homestay']],
    on: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  addPic() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          pics: tempFilePaths,
          picCount: tempFilePaths.length
        });
        console.log(that.data.pics);
      }
    })
  },
  cateChange(e) {
    //console.log(e)
    var v = e.detail.value;
    if (this.data.index != v) {
      this.setData({
        index: v
      })
    }
  },
  columnChange: function (e) {
    if (e.detail.column == 1) {
      return;
    }
    var cateArray = this.data.cateArray
    switch (e.detail.value) {
      case 0: cateArray[1] = ['出租/合租', '短租民宿', '办公/商铺', '仓库/车位', 'Homestay']; break;
      case 1: cateArray[1] = ['出租/合租', '短租民宿', '办公/商铺', '仓库/车位', 'Homestay']; break;
      case 2: cateArray[1] = ['家居家具', '数码电子', '二手教材', '宠物相关', '服装饰品', '游戏娱乐', '美容护肤', '食品饮料', '宝宝用品', '其它综合']; break;
      case 3: cateArray[1] = ['求职招聘']; break;
      case 4: cateArray[1] = ['汽车交易']; break;
      case 5: cateArray[1] = ['求助问事']; break;
      case 6: cateArray[1] = ['人找车', '车找人']; break;
      case 7: cateArray[1] = ['短租民宿']; break;
      case 8: cateArray[1] = ['生意转让']; break;
      case 9: cateArray[1] = ['交友项目']; break;
      case 10: cateArray[1] = ['宠物相关']; break;
      case 11: cateArray[1] = ['二手教材']; break;
      case 12: cateArray[1] = ['二手房产']; break;
      case 13: cateArray[1] = ['同城交友']; break;
      case 14: cateArray[1] = ['家居家具']; break;
      case 15: cateArray[1] = ['数码电子']; break;
    }
    this.setData({
      cateArray: cateArray
    })
  },
  clickSwitch(e) {
    var v = this.data.on;
    if (v == 1) {
      v = 0
    } else {
      v = 1
    }
    this.setData({
      on: v
    })
  },
  wxPay(){
    wx.request({
      url: app.globalData.apiUrl+'pay.php',
      data: { uid: app.globalData.uid},
      method:'POST',
      success:res=>{
        console.log(res)
        if (res.data.ret == 1) {
          wx.requestPayment({
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': 'MD5',
            'paySign': res.data.data.paySign,
            'success': function (res) {console.log(res) },
            'fail': function (res) { },
            'complete': function (res) {
              console.log('123')
            }
          })
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  }
})