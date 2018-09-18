//index.js
//获取应用实例
const app = getApp()
var lock=false;
var cate=0;
var order=0;
var area='';
var postId=0;
var businessId=0;
var first=0;
var page='';
Page({
  data: {
    cateSelected:0,
    imgUrls: [
      {
        link: '',
        url: '/images/banner.png'
      }
    ],
    // cateArray: [{ 'id': 0, 'name': '全部分类' }, { 'id': 1, 'name': '房屋信息' }, { 'id': 2, 'name': '二手市场' }, { 'id': 3, 'name': '求职招聘' }, { 'id': 4, 'name': '汽车交易' }, { 'id': 5, 'name': '求助问事' }, { 'id': 6, 'name': '拼车信息' }, { 'id': 7, 'name':'短租民宿'}, { 'id': 8, 'name': '生意转让' }, { 'id': 12, 'name': '房产信息' }],
    cateArray: ['全部分类', '房屋信息', '二手市场', '求职招聘', '汽车交易','蚂蚁闲谈','拼车信息' ,'短租民宿','生意转让' ,'房产信息','往返带物'],
    cateId:[0,1,2,3,4,5,6,7,8,12,16],
    cateIndex:0,
    orderArray: ['排序', '发布时间', '刷新时间'],
    orderIndex: 0,
    areaArray: ['区域'],
    areaIndex: 0,
    area:'',
    listData:[],
    cityArray:[
      ['亚洲','北美',"大洋洲","欧洲","南美洲","非洲"],
      ['中国', '韩国', '日本', '新加坡', '马来西亚', '泰国', '越南', '菲律宾', '印度尼西亚', '阿联酋', '土耳其'],
      ['香港', '澳门', '台湾']
    ],
    cityIndex:[0,0,0],
    stateNameArray: [
      ['中国', '韩国','日本','新加坡','马来西亚','泰国','越南','菲律宾','印度尼西亚','阿联酋','土耳其'],
      ['美国', '加拿大','墨西哥'],
      ['澳大利亚','新西兰'],
      ['英国', '法国', '德国', '西班牙', '意大利', '荷兰', '捷克', '葡萄牙', '瑞士', '瑞典', '希腊', '俄罗斯'],
      ['阿根廷','巴西'],
      ['南非','埃及']
    ],
    cityNameArray: [
      [
        ['香港', '澳门', '台湾'],
        ['首尔', '釜山','济州岛','京畿道','仁川'],
        // ['','','']
        ['东京', '大阪', '名古屋','横滨'],
        ['新加坡'],
        ['吉隆坡', '槟城'],
        ['曼谷', '清迈', '芭提雅','普吉岛'],
        ['河内', '胡志明'],
        ['马尼拉'],
        ['雅加达'],
        ['迪拜'],
        ['伊斯坦布尔']
      ],
      [
        ['洛杉矶', '纽约', '旧金山', '圣地亚哥', '圣何塞', '伯克利', '芝加哥', '华盛顿', '西雅图', '休斯顿', '达拉斯', '费城', '波士顿', '夏威夷','奥兰多','拉斯维加斯','波特兰','丹佛','亚特兰大','佛罗里达'],
        ['多伦多', '温哥华','蒙特利尔','卡尔加里','渥太华','伦敦','滑铁卢','温尼伯'],
        ['墨西哥城']
      ],
      [
        ['悉尼', '墨尔本', '布里斯班','珀斯','阿德莱德','堪培拉','霍巴特','卧龙岗','纽卡斯尔','黄金海岸','凯恩斯'],
        ['奥克兰','惠灵顿','基督城']
      ],
      [
        ['伦敦', '伯明翰', '曼彻斯特','爱丁堡'],
        ['巴黎'],
        ['柏林', '慕尼黑', '法兰克福','汉堡','科隆'],
        ['马德里', '巴塞罗那'],
        ['罗马', '米兰', '佛伦伦萨'],
        ['阿姆斯特丹'],
        ['布拉格'],
        ['波尔图', '里斯本'],
        ['苏黎世'],
        ['斯德哥尔摩'],
        ['雅典'],
        ['莫斯科', '圣彼得堡']
      ],
      [
        ['布宜诺斯艾利斯'],
        ['里约热内卢','圣保罗']
      ],
      [
        ['开普敦','约翰内斯堡'],
        ['开罗']
      ]
    ],
    orgIndex:[],
    orgCity:[],
    broadcast: [{
      'title': '暂无求助',
      'num': 0,
      'id': 0
    }],
    temperature:'',
    exchangeRate:'',
    selectArray:['','',''],
    selectIndex: [0, 0, 0],
    indexPic:'',
    showTips:1,
    animation:''
  },
  
  onLoad: function (options) {
    options.scene ='b899e3051d1ec22b13f725b882631ed7'
    if (options.scene) {
      var scene = decodeURIComponent(options.scene)
      wx.request({
        url: app.globalData.apiUrl + 'v6/get_scene.php',
        method: 'POST',
        data: { scene: scene },
        success: res => {
          if (res.data.ret == 1) {
            page = res.data.data
          }
        }
      })
    }else{
      postId = options.id ? options.id : 0;
      businessId = options.business_id ? options.business_id : 0;
    }
    var that=this
    setTimeout(function(){
      that.setData({
        showTips:0
      })
    }, 5000)
    wx.request({
      url: app.globalData.apiUrl + 'get_banner.php',
      success: res => {
        this.setData({
          imgUrls: res.data.data
        })
      }
    })
    //this.getIndexList()
    var cityArray = this.data.cityArray
    this.setData({
      orgCity: cityArray
    })
    
    if (app.wxLoginCallback) {
      app.wxLoginCallback
    }else{
      app.wxLoginCallback=function(){
        that.getIndexList();
        that.getOtherInfo();
        that.setData({
          selectArray: app.globalData.cityArray
        })
        that.getGlobalData()
      }
    }
  },
  onShow(){
    if (app.globalData.userInfo != null && app.globalData.userInfo.city == ''){
      wx.navigateTo({
        url: '/pages/select/select',
      })
      return;
    }
    if (first > 0 && app.globalData.uid==null){
      wx.navigateTo({
        url: '/pages/error/error'
      })
      return;
    }
    first++
    if (this.data.selectArray[2]==''){
      this.setData({
        selectArray: app.globalData.cityArray
      })
    }
    if (app.globalData.cityChange){
      app.globalData.cityChange=false;
      this.setData({
        selectArray: app.globalData.cityArray,
        selectIndex: app.globalData.cityIndex,
        indexPic: app.globalData.indexPic,
        areaArray: ['区域'],
        areaIndex: 0,
        area: '',
      })
      if (first > 1){
        this.getIndexList()
        this.getOtherInfo()
      }
    }
    if (app.globalData.areaChange) {
      this.setData({
        area: app.globalData.area
      })
      app.globalData.area = '';
      app.globalData.areaChange = false;
      this.getIndexList()
    }
    if (postId > 0 && app.globalData.uid != null) {
      app.globalData.cityChange = true;
      app.globalData.pageChange = true;
      var that = this
      wx.request({
        url: app.globalData.apiUrl + 'v3/update_city.php',
        data: { uid: app.globalData.uid, postId: postId },
        method: 'POST',
        success: res => {
          if (res.data.ret == 1) {
            app.globalData.cityArray = [res.data.uinfo.state, res.data.uinfo.country, res.data.uinfo.city]
            that.setData({
              selectArray: app.globalData.cityArray
            })
          }
        },
        complete: res => {
        }
      })
      wx.navigateTo({
        url: '/pages/view/viewDetail/viewDetail?id=' + postId,
        complete: res => {
          postId = 0;
        }
      })
    }
    if (businessId > 0 && app.globalData.uid != null) {
      app.globalData.cityChange = true;
      app.globalData.pageChange = true;
      var that = this
      wx.request({
        url: app.globalData.apiUrl + 'v5/update_city.php',
        data: { uid: app.globalData.uid, businessId: businessId },
        method: 'POST',
        success: res => {
          if (res.data.ret == 1) {
            app.globalData.cityArray = [res.data.uinfo.state, res.data.uinfo.country, res.data.uinfo.city]
            that.setData({
              selectArray: app.globalData.cityArray
            })
          }
        },
        complete: res => {
        }
      })
      wx.navigateTo({
        url: '/pages/view/businessDetail/businessDetail?id=' + businessId,
        complete: res => {
          businessId = 0;
        }
      })
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getIndexList();
  },
  onReachBottom: function () {
  },
  getIndexList(){
    wx.request({
      url: app.globalData.apiUrl + 'v6/get_list.php?cate=' + cate + '&order=' + order + '&area=' + this.data.area + '&uid='+app.globalData.uid,
      success: res => {
        this.setData({
          listData:res.data.data
        })
      },
      complete: res => {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  getOtherInfo() {
    wx.request({
      url: app.globalData.apiUrl + 'get_other_info_v2.php?type=1&uid=' + app.globalData.uid,
      success: res => {
        if (res.data.ret == 1) {
          this.setData({
            broadcast: res.data.data.broadcast,
            exchangeRate: res.data.data.exchange_rate,
            temperature: res.data.data.temperature,
            indexPic: res.data.data.pic
          })
          app.globalData.indexPic = res.data.data.pic
        }
      },
      complete: res => {
        if (postId > 0) {
          wx.navigateTo({
            url: '/pages/view/viewDetail/viewDetail?id=' + postId,
            complete: res => {
              postId = 0;
            }
          })
        }
      }
    })
  },
  getGlobalData() {
    if (page!='') {
      wx.navigateTo({
        url: page,
        success: res => {
          page = '';
        }
      })
    }
  },
  swiperChange(e){
    this.setData({
      cateSelected: e.detail.current
    });
  },
  cateChange(e) {
    cate = this.data.cateId[e.detail.value]
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
  copyText(e){
    lock = true;
    var v=e.currentTarget.dataset.wechat
    if(v==''){
      wx.showToast({
        title: '未填写微信号',
        icon:'none'
      })
    }else{
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
  callPhone(e){
    lock=true;
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      complete:res=>{
        lock = false;
      }
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
  },
  showList(e){
    var c = e.currentTarget.dataset.cate;
    wx.navigateTo({
      url: '/pages/view/viewList/viewList?cate=' + c,
    })
  },
  viewDetail(e){
    if(lock){
      return
    }
    //console.log(e);
    var v = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/view/viewDetail/viewDetail?id='+v,
    })
  },
  selectCity(){
    wx.navigateTo({
      url: '/pages/select/select',
    })
  },
  searchClick(e){
    var v=e.detail.value;
    if(v==''){
      return;
    }
    wx.navigateTo({
      url: '/pages/view/viewList/viewList?keyword='+v,
    })
  },
  selectArea() {
    wx.navigateTo({
      url: '/pages/areaSelect/areaSelect',
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '小蚂蚁丨海外生活',
      path: '/pages/index/index',
      imageUrl: "/images/share.jpg",
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success'
        });
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      },
      complete: res => {
      }
    }
  },
  goPublish(){
    wx.switchTab({
      url: '/pages/publish/category/category'
    })
  }
})
