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
    listData:[],
    cityArray:[
      ['亚洲','北美'],
      ['中国','韩国'],
      ['香港','台湾']
    ],
    cityIndex:[0,0,0],
    stateNameArray: [
      ['中国', '韩国'],
      ['美国', '加拿大','墨西哥']
    ],
    cityNameArray: [
      [
        ['香港', '澳门', '台湾'],
        ['首尔', '釜山']
      ],
      [
        ['洛杉矶', '纽约'],
        ['多伦多', '温哥华'],
        ['墨西哥城']
      ]
    ],
    orgIndex:[0,0,0],
    orgCity:[]
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
    var cityArray = this.data.cityArray
    this.setData({
      orgCity: cityArray
    })
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
  },
  cityChange(e){
    var v = e.detail.value;
    var cityArray = this.data.cityArray
    if (this.data.cityIndex != v) {
      this.setData({
        cityIndex: v,
        orgIndex:v,
        orgCity: cityArray
      })
    }
  },
  columnChange(e){
    var column = e.detail.column
    var value = e.detail.value
    if (column == 2) {
      return;
    }
    var cityArray = this.data.cityArray
    var cityIndex = this.data.cityIndex
    if (column==0){
      cityIndex = [value,0,0]
      this.setData({
        cityIndex: cityIndex
      })
      //选择洲
      cityArray[1] = this.data.stateNameArray[value]
      cityArray[2] = this.data.cityNameArray[value][0]
    }else{
      cityIndex[1] = value;
      cityIndex[2] = 0;
      this.setData({
        cityIndex: cityIndex
      })
      cityArray[2] = this.data.cityNameArray[cityIndex[0]][value]
    }
    this.setData({
      cityArray: cityArray
    })
  },
  columnCancel(e){
    var orgIndex = this.data.orgIndex
    var orgCity = this.data.orgCity
    this.setData({
      cityIndex: orgIndex,
      cityArray: orgCity
    })
  }
})
