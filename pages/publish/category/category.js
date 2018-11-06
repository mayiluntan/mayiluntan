// pages/publish/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectArray:{
      1: ['私房小厨', '排挡快餐', '烧烤麻辣', '火锅香锅', '西餐', '面包糕点', '甜品饮料', '海鲜肉类', '早点早餐', '粥铺面馆', '自助餐厅', '咖啡汉堡', '日本料理', '韩国烧烤', '其他美食'],
      3: [ '金融贷款', '理财保险', '翻译服务', '律师公正', '会计税务', '风水命理', '网站软件', '摄影婚庆', '医疗诊所', '其他'],
      4: ['机场接送', '搬家物流', '汽车维修', '驾校教练', '车行4S店', '租车服务', '运车回国'],
      5: ['家政保洁', '行李寄存', '开锁配匙', '网络缴费', '花园除草', '除虫清洁', '保姆月嫂', '水暖电工', '数码电子', '二手回收', '防盗报警', '建材装修', '其他'],
      7: ['留学移民', '辅导家教', '语言培训', '技能培训', '艺术培训', '幼儿教育', '院校招生'],
      8: ['旅行社', '机票', '私人旅游'],
      9: ['礼品商店', '华人超市', '西人超市', '快递货运', '花店', '其他商店'],
      14: ['健美瘦身', '美发服务', '美甲护肤', '纹身服务', '其他'],
      15: ['足疗按摩', '洗浴温泉', '运动健身', '桌游棋牌', '酒吧/ktv', '网吧', '户外运动', '活动讲座'],
      19: ['代购', '服饰', '包包', '妆品', '鞋子', '其他'],
      101:['求租', '招租'],
      102: ['求购信息', '家居家具', '电器相关', '数码电子', '二手教材', '宠物相关', '服装饰品', '游戏娱乐', '美容护肤', '食品饮料', '宝宝用品', '其它综合'],
      103: ['求职', '招聘'],
      104: ['求购', '出售'],
      105: ['求助问事', '留学移民', '美食天地', '吐槽八卦', '校园联谊', '淘气宝宝', '汽车之家', '家有萌宠', '美妆服饰', '旅游踏青'],
      106: ['人找车', '车找人'],
      109: ['二手房', '新房'],
      110: ['求带', '帮带'],
    },
    selectIndex:0,
    selectShow:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  showList(e){
    var cate = e.currentTarget.dataset.cate;
    if(cate>100){
      cate = cate-100
      wx.navigateTo({
        url: '/pages/publish/post/post?cate='+cate,
      })
    }else{
      wx.navigateTo({
        url: '/pages/publish/business/business?cate=' + cate
      })
    }
  },
  secondCate(v) {
    v = parseInt(v);
    var selectArray=[];
    switch (v) {
      case 1: selectArray = ['私房小厨', '排挡快餐', '烧烤麻辣', '火锅香锅', '西餐', '面包糕点', '甜品饮料', '海鲜肉类', '早点早餐', '粥铺面馆', '自助餐厅', '咖啡汉堡', '日本料理', '韩国烧烤', '其他美食']; break;
      case 2: selectArray = ['外卖送餐']; break;
      case 3: selectArray = ['金融贷款', '理财保险', '翻译服务', '律师公正', '会计税务', '风水命理', '网站软件', '摄影婚庆', '医疗诊所', '其他']; break;
      case 4: selectArray = ['机场接送', '搬家物流', '汽车维修', '驾校教练', '车行4S店', '租车服务', '运车回国']; break;
      case 5: selectArray = ['家政保洁', '行李寄存', '开锁配匙', '网络缴费', '花园除草', '除虫清洁', '保姆月嫂', '水暖电工', '数码电子', '二手回收', '防盗报警', '建材装修', '其他']; break;
      case 6: selectArray = ['礼品商店']; break;
      case 7: selectArray = ['留学移民', '辅导家教', '语言培训', '技能培训', '艺术培训', '幼儿教育', '院校招生']; break;
      case 8: selectArray = ['旅行社', '机票', '私人旅游']; break;
      case 9: selectArray = ['礼品商店', '华人超市', '西人超市', '快递货运', '花店', '其他商店']; break;
      case 10: selectArray = ['医疗保健']; break;
      case 11: selectArray = ['房产经济']; break;
      case 12: selectArray = ['以物易物']; break;
      case 13: selectArray = ['快递货运']; break;
      case 14: selectArray = ['健美瘦身', '美发服务', '美甲护肤', '纹身服务', '其他']; break;
      case 15: selectArray = ['足疗按摩', '洗浴温泉', '运动健身', '桌游棋牌', '酒吧/ktv', '网吧', '户外运动', '活动讲座']; break;
      case 16: selectArray = ['酒店旅馆']; break;
      case 17: selectArray = ['宠物服务']; break;
      case 18: selectArray = ['家政保洁']; break;
      case 19: selectArray = ['代购', '服饰', '包包', '妆品', '鞋子', '其他']; break;
      case 101: selectArray = ['求租', '招租'];  break;
      case 102: selectArray = ['求购信息', '家居家具', '电器相关', '数码电子', '二手教材', '宠物相关', '服装饰品', '游戏娱乐', '美容护肤', '食品饮料', '宝宝用品', '其它综合']; break;
      case 103: selectArray = ['求职', '招聘']; break;
      case 104: selectArray = ['求购', '出售']; break;
      case 105: selectArray = ['求助问事', '留学移民', '美食天地', '吐槽八卦', '校园联谊', '淘气宝宝', '汽车之家', '家有萌宠', '美妆服饰', '旅游踏青'];break;
      case 106: selectArray = ['人找车', '车找人'];  break;
      case 107: selectArray = ['短租民宿'];break;
      case 108: selectArray = ['生意转让'];break;
      case 109: selectArray = ['二手房', '新房']; break;
      case 110: selectArray = ['求带', '帮带']; break;
    }
  },
  cateChange(e){
    var cate = e.currentTarget.dataset.cate;
    var cate2 = e.detail.value;
    if (cate > 100) {
      cate = cate - 100
      wx.navigateTo({
        url: '/pages/publish/post/post?cate=' + cate+'&cate2='+cate2,
      })
    } else {
      wx.navigateTo({
        url: '/pages/publish/business/business?cate=' + cate + '&cate2=' + cate2
      })
    }
  }
})