//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cateSelected:0,
    imgUrls: [
      {
        link: '',
        url: '/images/banner.png'
      }
    ],
    cateArray: ['全部分类','房屋出租', '房屋求租', '二手市场', '求职招聘', '汽车交易', '求助问事', '拼车信息', '短租民宿', '生意转让', '交友项目', '宠物相关', '二手教材', '二手房产', '同城交友', '家居家具', '数码电子'],
    cateIndex:0,
    orderArray:['排序','时间','置顶'],
    orderIndex:0,
    listData:[]
  },
  
  onLoad: function () {
    wx.request({
      url: app.globalData.apiUrl + 'get_banner.php',
      success: res => {
        this.setData({
          imgUrls: res.data.data
        })
      }
    })
    this.getIndexList()
  },
  getIndexList(){
    wx.request({
      url: app.globalData.apiUrl + 'get_list.php',
      success: res => {
        console.log(res)
        this.setData({
          listData:res.data.data
        })
      }
    })
  },
  swiperChange(e){
    this.setData({
      cateSelected: e.detail.current
    });
  },
  cateChange(e) {
    this.setData({
      cateIndex: e.detail.value
    })
  },
  orderChange(e) {
    this.setData({
      orderIndex: e.detail.value
    })
  },
  callPhone(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
    })
  }
})
