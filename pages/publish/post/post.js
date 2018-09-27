// pages/publish/post/post.js
const app = getApp();
var lock=false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
    picIds:[],
    picCount:0,
    indexArray: [0, 0],
    cateArray: [['房屋信息', '二手市场', '求职招聘', '汽车交易', '蚂蚁交友', '拼车信息', '短租民宿', '生意转让','房产信息','往返带物'], ['求租', '招租']],
    cateId: [ 1, 2, 3, 4, 5, 6, 7, 8, 12,16],
    dayArray:['1天','7天','30天'],
    dayIndex:0,
    houseArray:['请选择','公寓','别墅','联排别墅','小区','办公室','商铺','车库','其他'],
    houseIndex:0,
    houseType:['请选择','床位','客厅','双人床','主卧','单间','整租'],
    typeIndex:0,
    startDate:'',
    speedArray: ['请选择','自动', '手动'],
    brandArray: ['请选择品牌','Alfa Romeo 阿尔法罗密欧 ','Audi 奥迪','BMW 宝马','Chrysler 克莱斯勒','Chverolet 雪佛兰','Citroen 雪铁龙','Dodge 道奇','Ford 福特','Holden 霍尔顿','Honda 本田','Hyundai 现代','Kia 起亚','Land Rover 路虎','Lexus 雷克萨斯','Mazda 马自达','Mercedes Benz 奔驰','Mitsubishi 三菱','Nissan 东风日产','Peugeot 标志','Porsche 保时捷','Renault 雷诺','Subaru 斯巴鲁','Suzuki 铃木','Toyota 丰田','Volkswagen 大众','Volvo 沃尔沃','Other 其它品牌'],
    postData:{
      id: 0,
      title:'',
      content:'',
      address:'',
      lon:'',
      lat:'',
      mobile:'',
      price:'',
      tag1:'',
      tag2:'',
      school1:'',
      school2:'',
      wechat:'',
      area:'',
      top:0,
      topDay:1,
      topPrice:10,
      personal:1,
      school:'',
      carType:1,
      start:'',
      end:'',
      mid:'',
      date:'',
      time:'',
      peopleNum:'',
      linkman:'',
      transType:1,
      transBrand:0,
      transYear:'',
      transPrice:'',
      transSpeed:0,
      transKm:'',
    },
    moneySign: '$',
    tagArr: ['近火车站', '近电车站', '近公车站', '近超市', '近学校', '带车位', '包家具', '包水电', '可议价', '主卧', '房子新', '房间大', '富人区', '限女生', '限男生', '可养宠物', '风水好', '高层公寓', '环境优', '网速好'],
    tagOption: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    tagIndex1: -1,
    tagIndex2: -1,
    schoolArr:[],
    schoolIndex1: -1,
    schoolIndex2: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cate = options.cate ? options.cate : 0;
    if(cate>0){
      this.allCateChange(cate - 1)
      this.setData({
        indexArray: [cate-1,0]
      })
    }
    var id = options.id ? options.id:0
    lock = false
    var utils = require('../../../utils/util.js');
    var postData = this.data.postData;
    var date = new Date();
    var hour = date.getHours()
    var minute = date.getMinutes()
    var year = date.getFullYear()
    postData.date = utils.formatDate(new Date())
    postData.time = hour + ':' + minute
    postData.transYear = year
    this.setData({
      postData: postData,
      startDate: utils.formatDate(new Date())
    })
    if(id){
      wx.request({
        url: app.globalData.apiUrl + 'v6/get_post_edit.php?uid=' + app.globalData.uid + '&id=' + id,
        success: res => {
          if (res.data.ret == 1) {
            this.setData({
              pics: res.data.data.pics,
              picIds: res.data.data.picIds,
              picCount: res.data.data.picCount,
              indexArray: res.data.data.indexArray,
              postData: res.data.data.postData,
              moneySign: res.data.data.moneySign,
              tagIndex1: res.data.data.tagIndex1,
              tagIndex2: res.data.data.tagIndex2,
              houseIndex: res.data.data.houseIndex,
              typeIndex: res.data.data.typeIndex,
              tagArr: res.data.data.tagArr,
              tagOption: res.data.data.tagOption,
            })
            this.allCateChange(res.data.data.indexArray[0])
          } else {
            app.showTips(res.data.title, res.data.msg, false);
          }
        }
      })
    }
    var cityArray = app.globalData.cityArray
    var sign = app.globalArray.moneyArray[cityArray[1]]
    var arr = app.globalArray.schoolArray[app.globalData.cityArray[2]]
    if (arr === undefined) {
      arr = ['其他学校周边']
    }
    this.setData({
      moneySign: sign,
      schoolArr: arr
    })
    
  },
  onShow() {
    if (app.globalData.areaChange) {
      var postData = this.data.postData;
      postData.area = app.globalData.area
      this.setData({
        area: app.globalData.area,
        postData: postData
      })
      app.globalData.area = '';
      app.globalData.areaChange = false;
    }
  },
  addPic() {
    var that = this;
    var picCount = that.data.picCount
    wx.chooseImage({
      count: 9 - picCount,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        var pics = that.data.pics;
        var picIds = that.data.picIds;
        for (var i = 0; i < tempFilePaths.length;i++){
          var img = tempFilePaths[i];
          pics.push(img);
          wx.uploadFile({
            url: app.globalData.apiUrl + 'upload_pic.php',
            filePath: img,
            name: 'file',
            formData: {
              'uid': app.globalData.uid
            },
            success: res=> {
              if(res.data==0){
                app.showTips('提示', '上传失败', false);
              }else{
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
  delPic(e){
    var index = e.currentTarget.dataset.index;
    var pics = this.data.pics;
    var picIds = this.data.picIds;
    pics.splice(index,1); 
    picIds.splice(index,1); 
    this.setData({
      pics: pics,
      picIds: picIds,
      picCount: picIds.length
    });
  },
  cateChange(e) {
    var v = e.detail.value;
    if (this.data.indexArray != v) {
      this.setData({
        indexArray: v
      })
    }
  },
  houseChange(e) {
    var v = e.detail.value;
    if (this.data.houseIndex != v) {
      this.setData({
        houseIndex: v
      })
    }
  },
  typeChange(e) {
    var v = e.detail.value;
    if (this.data.typeIndex != v) {
      this.setData({
        typeIndex: v
      })
    }
  },
  dayChange(e){
    var v=e.detail.value;
    var day=1;
    if(v==1){
      day=7;
    }else if(v==2){
      day=30;
    }
    var postData = this.data.postData
    postData.topDay = day;
    postData.topPrice = day*10;
    this.setData({
      dayIndex:v,
      postData: postData
    })
    //var money = parseFloat(this.data.price) * this.data.totalCount;
    //money = Math.round(money * 100) / 100;
  },
  columnChange: function (e) {
    if (e.detail.column == 1) {
      return;
    }
    this.allCateChange(e.detail.value)
  },
  allCateChange(v){
    var cateArray = this.data.cateArray
    v = this.data.cateId[v]
    v=v-1;
    switch (v) {
      case 0: cateArray[1] = ['求租','招租']; break;
      case 1: cateArray[1] = ['家居家具', '数码电子', '二手教材', '宠物相关', '服装饰品', '游戏娱乐', '美容护肤', '食品饮料', '宝宝用品', '其它综合', '求购信息','电器相关']; break;
      case 2: cateArray[1] = ['求职','招聘']; break;
      case 3: cateArray[1] = ['求购','出售']; break;
      case 4: cateArray[1] = ['求助问事', '留学移民', '美食天地', '吐槽八卦', '校园联谊', '淘气宝宝', '汽车之家', '家有萌宠', '美妆服饰', '旅游踏青']; break;
      case 5: cateArray[1] = ['人找车', '车找人']; break;
      case 6: cateArray[1] = ['短租民宿']; break;
      case 7: cateArray[1] = ['生意转让']; break;
      case 8: cateArray[1] = ['交友项目']; break;
      case 9: cateArray[1] = ['宠物相关']; break;
      case 10: cateArray[1] = ['二手教材']; break;
      case 11: cateArray[1] = ['二手房','新房']; break;
      case 12: cateArray[1] = ['同城交友']; break;
      case 13: cateArray[1] = ['家居家具']; break;
      case 14: cateArray[1] = ['数码电子']; break;
      case 15: cateArray[1] = ['求带', '帮带']; break;
    }
    this.setData({
      cateArray: cateArray
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
  wxPay(){
    wx.request({
      url: app.globalData.apiUrl+'pay.php',
      data: { uid: app.globalData.uid},
      method:'POST',
      success:res=>{
        if (res.data.ret == 1) {
          wx.requestPayment({
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': 'MD5',
            'paySign': res.data.data.paySign,
            'success': function (res) { },
            'fail': function (res) { },
            'complete': function (res) {
              
            }
          })
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  postClick(){
    if (lock) {
      return
    }
    lock = true;
    if (this.data.postData.title == '') {
      app.showTips('提示', '请输入标题', false)
      lock = false;
      return
    }
    if (this.data.postData.content == '') {
      app.showTips('提示', '请输入内容', false)
      lock = false;
      return
    }
    // if (this.data.pics.length == 0) {
    //   app.showTips('提示', '请选择图片', false)
    //   return
    // }
    if (this.data.postData.address == '' && 1==2) {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userLocation'] || res.authSetting['scope.userLocation'] == undefined) {
            app.showTips('提示', '请选择位置', false)
          } else {
            app.showAuthTips('请先授权获取位置');
          }
        }
      })
      lock = false;
      return
    }    
    // if (this.data.postData.mobile=='') {
    //   app.showTips('提示', '请填写电话号码', false);
    //   lock = false;
    //   return;
    // }
    // var mobileReg = /^[1][0-9]{10}$/;
    // if (!mobileReg.test(this.data.postData.mobile)) {
    //   app.showTips('提示', '手机号有误', false);
    //   return;
    // }
    if (/.*[\u4e00-\u9fa5]+.*$/.test(this.data.postData.wechat)) {
      app.showTips('提示', '请输入正确的微信号', false)
      lock = false;
      return;
    }
    
    var cid = this.data.cateId[this.data.indexArray[0]]
    if (this.data.postData.area == '' && cid != 5 && cid!=16) {
      app.showTips('提示', '请选择区域', false)
      lock = false;
      return
    }
    //标签结合
    var tagOption = this.data.tagOption
    var tagArr = this.data.tagArr
    var tag_str='';
    for (var i = 0; i < tagOption.length;i++){
      var jugle = tagOption[i];
      if (jugle==true){
        if (tag_str==''){
          tag_str = tagArr[i]
        }else{
          tag_str += ','+ tagArr[i]
        }
      }
    }
    var postData = this.data.postData
    //console.log(this.data.indexArray)
    if (this.data.indexArray[0] == 0) {
      if (this.data.houseIndex == 0) {
        app.showTips('提示', '请选择房型', false)
        lock = false;
        return
      }
      if (this.data.typeIndex == 0) {
        app.showTips('提示', '请选择方式', false)
        lock = false;
        return
      }
      postData.tag_str = tag_str;
      postData.house = this.data.houseIndex;
      postData.type = this.data.typeIndex;
      postData.tag1 = '';
      postData.tag2 = '';
      var tagIndex1 = this.data.tagIndex1;
      var tagIndex2 = this.data.tagIndex2;
      if (tagIndex1 == -1 && tagIndex2 != -1) {
        postData.tag1 = this.data.tagArr[this.data.tagIndex2];
      } else if (tagIndex1 != -1 && tagIndex2 == -1) {
        postData.tag1 = this.data.tagArr[this.data.tagIndex1];
      } else if (tagIndex1 != -1 && tagIndex2 != -1) {
        postData.tag1 = this.data.tagArr[this.data.tagIndex1];
        postData.tag2 = this.data.tagArr[this.data.tagIndex2];
      }
      postData.school1 = '';
      postData.school2 = '';
      var schoolIndex1 = this.data.schoolIndex1;
      var schoolIndex2 = this.data.schoolIndex2;
      if (schoolIndex1 == -1 && schoolIndex2 != -1) {
        postData.school1 = this.data.schoolArr[this.data.schoolIndex2];
      } else if (schoolIndex1 != -1 && schoolIndex2 == -1) {
        postData.school1 = this.data.schoolArr[this.data.schoolIndex1];
      } else if (schoolIndex1 != -1 && schoolIndex2 != -1) {
        postData.school1 = this.data.schoolArr[this.data.schoolIndex1];
        postData.school2 = this.data.schoolArr[this.data.schoolIndex2];
      }
    }
    if (this.data.indexArray[0] == 5) {
      if (postData.start == '') {
        app.showTips('提示', '请输入出发地', false)
        lock = false;
        return
      }
      if (postData.end == '') {
        app.showTips('提示', '请输入目的地', false)
        lock = false;
        return
      }
      if (postData.peopleNum == '' || postData.peopleNum <= 0) {
        app.showTips('提示', '请输入人数', false)
        lock = false;
        return
      }
      if (postData.linkman == '') {
        app.showTips('提示', '请输入联系人', false)
        lock = false;
        return
      }
    }
    if (this.data.indexArray[0] == 3 && this.data.indexArray[1] == 1) {
      if (postData.transBrand == 0) {
        app.showTips('提示', '请选择品牌', false)
        lock = false;
        return
      }
      // if (postData.transPrice == '' || postData.transPrice <=0) {
      //   app.showTips('提示', '请输入价格', false)
      //   lock = false;
      //   return
      // }
      if (postData.transSpeed == 0) {
        app.showTips('提示', '请选择变速箱', false)
        lock = false;
        return
      }
      if (postData.transKm === '') {
        app.showTips('提示', '请输入公里数', false)
        lock = false;
        return
      }
    }
    postData.uid=app.globalData.uid
    postData.pics = this.data.picIds
    postData.cate = this.data.indexArray
    postData.cate[0] = this.data.cateId[postData.cate[0]]
    postData.moneySign = this.data.moneySign
    wx.request({
      url: app.globalData.apiUrl+'v6/post.php',
      data: postData,
      method:'POST',
      success:res=>{
        if(res.data.ret==1){
          if (res.data.top==1){
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
                setTimeout(function(){
                  wx.hideToast()
                  app.globalData.cityChange = true
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
                },2000)
                
               },
              'fail': function (res) {
                wx.showToast({
                  title: '取消置顶',
                  icon: 'success'
                })
                setTimeout(function () {
                  wx.hideToast()
                  app.globalData.cityChange = true
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
                }, 2000)
               },
              'complete': function (res) {
              }
            })
          }else{
            wx.showToast({
              title: '发布成功',
              icon: 'success'
            })
            setTimeout(function () {
              wx.hideToast()
              app.globalData.cityChange = true
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }, 2000)
          }
        }else{
          app.showTips(res.data.title, res.data.msg, false);
          lock = false;
        }
      },
      fail:res=>{
        lock=false;
      }
    })
  },
  chooseLocation(){
    wx.chooseLocation({
      success: res=> {
        var postData=this.data.postData
        postData.address = res.address
        postData.lon = res.longitude
        postData.lat = res.latitude
        this.setData({
          postData: postData
        })
      },
      fail:res=>{
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
  titleInput(e) {
    var postData = this.data.postData
    postData.title = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  schoolInput(e) {
    var postData = this.data.postData
    postData.school = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  contentInput(e) {
    var postData = this.data.postData
    postData.content = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  mobileInput(e) {
    var postData = this.data.postData
    postData.mobile = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  priceInput(e) {
    var postData = this.data.postData
    postData.price = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  tag1Input(e) {
    var postData = this.data.postData
    postData.tag1 = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  tag2Input(e) {
    var postData = this.data.postData
    postData.tag2 = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  wechatInput(e) {
    var postData = this.data.postData
    postData.wechat = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  selectArea() {
    wx.navigateTo({
      url: '/pages/areaSelect/areaSelect',
    })
  },
  selectTag(e) {
    var v = e.currentTarget.dataset.index
    var tagOption = this.data.tagOption;
    var choose = tagOption[v]
    choose = choose==true?false:true;
    tagOption[v]=choose;
    this.setData({
      tagOption: tagOption
    })
  },
  selectSchool(e) {
    var v = e.currentTarget.dataset.index
    if (this.data.schoolIndex1 == v) {
      this.setData({
        schoolIndex1: -1
      })
    } else if (this.data.schoolIndex2 == v) {
      this.setData({
        schoolIndex2: -1
      })
    } else if (this.data.schoolIndex1 == -1) {
      this.setData({
        schoolIndex1: v
      })
    } else if (this.data.schoolIndex2 == -1) {
      this.setData({
        schoolIndex2: v
      })
    } else {
      app.showTips('提示', '最多选择2个学校', false);
    }
  },
  radioChange(e) {
    var postData = this.data.postData
    postData.personal = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  personalPick(e){
    var postData = this.data.postData
    postData.personal = e.currentTarget.dataset.value
    this.setData({
      postData: postData
    })
  },
  midInput(e) {
    var postData = this.data.postData
    postData.mid = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  startInput(e) {
    var postData = this.data.postData
    postData.start = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  endInput(e) {
    var postData = this.data.postData
    postData.end = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  carTypePick(e){
    var postData = this.data.postData
    postData.carType = e.currentTarget.dataset.value
    this.setData({
      postData: postData
    })
  },
  dateChange(e){
    var postData = this.data.postData
    postData.date = e.detail.value
    this.setData({
      postData: postData
    })
  },
  timeChange(e){
    var postData = this.data.postData
    postData.time = e.detail.value
    this.setData({
      postData: postData
    })
  },
  peopleNumInput(e) {
    var postData = this.data.postData
    postData.peopleNum = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  linkmanInput(e) {
    var postData = this.data.postData
    postData.linkman = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  transYearChange(e){
    var postData = this.data.postData
    postData.transYear = e.detail.value
    this.setData({
      postData: postData
    })
  },
  transTypePick(e) {
    var postData = this.data.postData
    postData.transType = e.currentTarget.dataset.value
    this.setData({
      postData: postData
    })
  },
  transSpeedChange(e){
    var postData = this.data.postData
    postData.transSpeed = e.detail.value
    this.setData({
      postData: postData
    })
  },
  transPriceInput(e){
    var postData = this.data.postData
    postData.transPrice = e.detail.value
    this.setData({
      postData: postData
    })
  },
  transKmInput(e){
    var postData = this.data.postData
    postData.transKm = e.detail.value
    this.setData({
      postData: postData
    })
  },
  transBrandChange(e){
    var postData = this.data.postData
    postData.transBrand = e.detail.value
    this.setData({
      postData: postData
    })
  }
})