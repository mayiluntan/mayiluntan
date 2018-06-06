//app.js
var first = 1;
App({
  onLaunch: function () {
    this.getUserAuth()
  },
  getUserAuth() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] || res.authSetting['scope.userInfo'] == undefined) {
          this.appGetUserInfo();
        } else {
          wx.navigateTo({
            url: '/pages/error/error'
          })
          //this.showAuthTips('');
        }
      }
    })
  },
  appGetUserInfo() {
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        this.wxLogin();
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      },
      fail: res => {
        //console.log(4)
        wx.navigateTo({
          url: '/pages/error/error',
        })
        //this.showAuthTips('');
      }
    })
  },
  globalData: {
    apiUrl: 'https://www.haiwaixiaomayi.com/api/',
    userInfo: null,
    uid: null,
    userId: 0,
    lon: 0,
    lat: 0,
    cityIndex: [0, 0, 0],
    cityArray: ['亚洲', '中国', '香港'],
    cityChange: true,
    pageChange: true,
    topicId: 0,
    topicName: '',
    indexPic: ''
  },
  wxOpneSetting() {
    wx.openSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
          this.appGetUserInfo()
        } else {
          this.showAuthTips('');
        }
        if (res.authSetting["scope.userLocation"]) {
          //this.globalData.cityChage = true;
          //this.globalData.getNewIndex = true;
        }
      }, fail: function (res) { }
    })
  },
  wxLogin() {
    var that = this;
    wx.login({
      success: function (loginCode) {
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        let uinfo = that.globalData.userInfo
        wx.request({
          url: that.globalData.apiUrl + 'get_openid.php',
          data: { code: loginCode.code, uinfo: uinfo },
          method: "POST",
          success: function (res) {
            if (res.data.ret == 1) {
              that.globalData.uid = res.data.data
              that.globalData.userId = res.data.user_id
              that.globalData.userInfo = res.data.uinfo
              if (res.data.uinfo.city != '') {
                that.globalData.cityArray = [res.data.uinfo.state, res.data.uinfo.country, res.data.uinfo.city]
              }
              if (that.wxLoginCallback) {
                that.wxLoginCallback()
              }
              if (that.wxErrorCallback) {
                that.wxErrorCallback()
              }

            } else {
              that.showTips(res.data.title, res.data.msg, false);
            }
          },
          complete: res => {
            wx.hideLoading()
          }
        })
      }
    })
  },
  showTips(title, content, showCancel) {
    if (!title || !content) {
      return;
    }
    wx.showModal({
      title: title,
      content: content,
      showCancel: showCancel
    })
  },
  showAuthTips(content) {
    wx.showModal({
      title: '提示',
      content: content == '' ? '您点击了拒绝授权，将无法正常使用，点击确定重新获取授权。' : content,
      success: res => {
        if (res.confirm) {
          this.wxOpneSetting();
        } else {
          this.showAuthTips('');
        }
      }
    })
  },
  globalArray: {
    cityArray: {
      '亚洲': {
        '中国': ['香港', '澳门', '台湾'],
        '韩国': ['首尔', '釜山', '济州岛', '京畿道', '仁川'],
        '日本': ['东京', '大阪', '名古屋', '横滨'],
        '新加坡': ['新加坡'],
        '马来西亚': ['吉隆坡', '槟城'],
        '泰国': ['曼谷', '清迈', '芭提雅', '普吉岛'],
        '越南': ['河内', '胡志明'],
        '菲律宾': ['马尼拉'],
        '印度尼西亚': ['雅加达'],
        '阿联酋': ['迪拜'],
        '土耳其': ['伊斯坦布尔']
      },
      '北美': {
        '美国': ['洛杉矶', '纽约', '旧金山', '圣地亚哥', '圣何塞', '伯克利', '芝加哥', '华盛顿', '西雅图', '休斯顿', '达拉斯', '费城', '波士顿', '夏威夷', '奥兰多', '拉斯维加斯', '波特兰', '丹佛', '亚特兰大', '佛罗里达'],
        '加拿大': ['多伦多', '温哥华', '蒙特利尔', '卡尔加里', '渥太华', '伦敦', '滑铁卢', '温尼伯'],
        '墨西哥': ['墨西哥城']
      },
      '大洋洲': {
        '澳大利亚': ['悉尼', '墨尔本', '布里斯班', '珀斯', '阿德莱德', '堪培拉', '霍巴特'],
        '新西兰': ['奥克兰', '惠灵顿', '基督城']
      },
      '欧洲': {
        '英国': ['伦敦', '伯明翰', '曼彻斯特', '爱丁堡'],
        '法国': ['巴黎'],
        '德国': ['柏林', '慕尼黑', '法兰克福', '汉堡', '科隆'],
        '西班牙': ['马德里', '巴塞罗那'],
        '意大利': ['罗马', '米兰', '佛伦伦萨'],
        '荷兰': ['阿姆斯特丹'],
        '捷克': ['布拉格'],
        '葡萄牙': ['波尔图', '里斯本'],
        '瑞士': ['苏黎世'],
        '瑞典': ['斯德哥尔摩'],
        '希腊': ['雅典'],
        '俄罗斯': ['莫斯科', '圣彼得堡']
      },
      '南美洲': {
        '阿根廷': ['布宜诺斯艾利斯'],
        '巴西': ['里约热内卢', '圣保罗']
      },
      '非洲': {
        '南非': ['开普敦', '约翰内斯堡'],
        '埃及': ['开罗']
      }
    },
    areaArray: {
      '伦敦': {
        '全部地区': [],
        '伦敦城': [],
        '东伦敦': [],
        '南伦敦': []
      },
      '巴黎': {
        '全部地区': [],
        '第一区': [],
        '第二区': [],
        '第三区': [],
        '第四区': [],
        '第五区': [],
        '第六区': [],
        '第七区': [],
        '第八区': [],
        '第九区': [],
        '第十区': [],
        '第十一区': [],
        '第十二区': [],
        '第十三区': [],
        '第十四区': [],
        '第十五区': [],
        '第十六区': [],
        '第十七区': [],
        '第十八区': [],
        '第十九区': [],
        '第二十区': [],
      },
      '奥克兰': {
        '全部地区': [],
        '中区': [],
        '东区': [],
        '西区': [],
        '南区': [],
        '北区': [],
      },
      '悉尼': {
        '全部地区': [],
        '市区': ['Ultimo', 'Haymarket', 'Chippendale', 'Darlington', 'Pyrmont', 'Glebe', 'Redfern', 'Newtown', '市区周边'],
        '东区': ['Kingsford', 'Randwick', 'Kensington', 'Maroubra', 'Waterloo', 'Zetland', 'Rosebery', 'Mascot', '东区周边'],
        '内西区': ['Burwood', 'Ashifield', 'Strathfield', 'Rhodes', 'Homebush', 'Campsie', '内西区周边'],
        '南区': ['Hurstville', 'Wolli Creek', 'Arncliffe', 'Rockdale', 'Kogarah', 'Allawah', 'Penshurst', 'BeverlyHills', 'Riverwood', '南区周边'],
        '西北区': ['Epping', 'Eastwood', 'Carlingford', 'Castle Hill ', 'Rouse Hill', 'Kellyville', 'Baulkham Hills', 'Schofields', '西北区周边'],
        '北区': ['Chatswood', 'Marsfield', 'Macquarie Park', 'Ryde', 'Killara', 'Gordon', 'Hornsby', 'Turramurra', 'Lane Cove', 'Lindfield', '北区周边'],
        '西区': ['Parramatta', 'Auburn', 'Lidcombe', 'Bankstown', 'Liverpool', 'Merrylands', '西区周边'],
        '卧龙岗': ['Fairy Meadow', 'Gwynneville', 'Mount Ousley', 'North Wollongong', 'Shellharbour', '卧龙岗周边'],
        '纽卡斯尔': ['纽卡斯尔周边'],
        '中央海岸': ['Berkeley Vale', 'Killarney Vale', 'The Entrance', '中央海岸周边'],
      },
      // '卧龙岗': {
      //   '全部地区': [],
      //   '卧龙岗周边': [],
      // },
      // '纽卡斯尔': {
      //   '全部地区': [],
      //   '纽卡斯尔周边': [],
      // },
      // '中央海岸': {
      //   '全部地区': [],
      //   '中央海岸周边': ['Berkeley Vale', 'Killarney Vale', 'The Entrance', '中央海岸周边'],
      // },
      '墨尔本': {
        '全部地区': [],
        '市区': ['Melbourne City', 'East Melbourne ', 'West Melbourne', 'North Melbourne ', 'Parkville', 'Carlton ', 'South Yarra ', 'St Kilda Road', 'South Bank ', 'Docklands ', '市区周边'],
        '内城区': ['Albert Park', 'Footscray ', 'Caulfield', 'Hawthorn', 'Malvern', 'Malvern East', 'Preston', '内城区周边'],
        '东区': ['Box Hill', 'Burwood ', 'Burwood East ', 'Doncaster ', 'Ringwood', 'Ringwood East', 'Vermont', 'Vermont South', '东区周边'],
        '东南区': ['Bentleigh', 'Bentleigh East', 'Clayton', 'Carnegie', 'Camberwell', 'Glen Waverley', 'Oakleigh', 'Oakleigh East', 'Ormon', 'Mount Waverley', '东南区周边'],
        '南区': ['Brighton', 'McKinnon', ' 南区周边'],
        '北区': ['Bundoora', 'Reservoir', '北区周边'],
        '西区': ['Point Cook', '西区周边'],
        '吉朗': ['East Geelong', 'Geelong city centre', 'Geelong West', 'Newtown', 'South Geelon', 'Whittington', '吉朗周边'],
        '巴拉瑞特': ['Alfredton', 'Ballarat Central', 'Redan'],
      },
      '首尔': {
        '全部地区': [],
        '首尔': ['中区', '东大门区', '西大门区', '城东区', '城北区', '龙山区', '钟路区', '麻浦区', '广津区', '中浪区', '江北区', '九老区', '道峰区', '芦原区', '江西区', '阳川区', '永登浦区', '冠岳区', '铜雀区', '瑞草区', '衿川区', '江南区', '恩平区', '江东区', '松坡区'],
        '学校附近': ['成均馆大学', '建国大学', '世宗大学', '中央大学', '东国大学', '崇实大学', '庆熙大学', '高丽大学', '檀国大学', '延世大学', '梨花女大', '汉阳大学', '汉城大学', '弘益大学', '祥明大学', '西江大学', '西京大学', '学校附近'],
      },
      '新加坡': {
        '全部地区': [],
        '单选区': ['后港', '黄埔', '先驱', '如切', ' 裕华', '丰加北', '蒙巴登', '盛港西', '榜鹅东', '武吉班让', '波东巴西', '拉丁马士'],
        '集选区': ['义顺', '裕廊', '三巴旺', '蔡厝港', '东海岸', '西海岸', ' 阿裕尼', '宏茂桥', '淡滨尼', '马林百列', '丹戎巴葛', '碧山-大巴窑', '荷兰-武吉知马', '白沙-榜鹅', '摩棉-加冷'],
        '学校附近': ['新加坡国立大学', '南洋理工大学', '新加坡管理大学', '新加坡理工学院', '南洋理工学院', '淡马锡理工学院', '义安理工学院', '共和理工学院', '学校附近'],
      },
      '洛杉矶': {
        '全部地区': [],
        '圣盖博周边': ['蒙特利公园（Monterey park）', '阿罕布拉（Alhambra）', '柔似密市（Rosemead）', '天普市（Temple）', '阿凯迪亚（Arcadia）', '圣马力诺（San Mario）', '帕萨迪纳（Pasadena）', '希阿瑞玛最（sierra madre）', '西科维纳（west covina）', 'San Gabriel周边地区'],
        '罗兰岗周边': ['罗兰岗（Rowland Heights）', '哈岗（Hacienda Heights）', '核桃市（Walnut）', '钻石吧（Diamond Bar）', '奇诺岗（Chino Hills）', 'Rowland Heights周边地区'],
        '橘郡周边': ['尔湾（Irvine）', 'Orange County周边'],
        '东谷Eastvale周边': ['东谷(Eastvale)周边'],
        '大学周边': [],
        '其他': [],
      },
      '纽约': {
        '全部地区': [],
        '法拉盛': [],
        'Elmburst': [],
        '曼哈顿布鲁克林': [],
        'New Jersey': [],
        '大学周边': [],
        '其他': [],
      },
      '旧金山': {
        '全部地区': [],
        '旧金山市': [],
        '北湾': [],
        '东湾': [],
        '南湾': [],
        '半岛区': [],
        '大学周边': [],
        '其他': [],
      },
      '多伦多': {
        '多伦多市中心': [],
        '北约克': [],
        '士嘉堡': [],
        '密西沙加': [],
        '列治文山': [],
        '万锦': [],
        '旺市': [],
        '其他地区': [],
      },
      '温哥华': {
        '全部地区': [],
        'Burnaby': [],
        'Richmond': [],
        'Vancouver': [],
        'West Vancouver': [],
        'North Vancouver': [],
        'Surrey': [],
        'New Westminster': [],
        'Coquitlam': [],
        'Port Coquitlam': [],
        'Delta': [],
        'Langley': [],
        'Port Moody': [],
        'Maple Ridge': [],
        'Abbotsford': [],
        'Whistler': [],
        'White Rock': [],
        'Victoria': [],
        '大学周边': [],
      },
      '蒙特利尔': {
        '市中心/中国城': [],
        'NDG/CDN周边': [],
        'Verdun/Lasalle': [],
        'St-michel周边': [],
        'St-laurent': [],
        '西岛/ 南岸周边': [],
        '其他地区': [],
      },
      '布里斯班': {
        '全部地区': [],
        '市区': ['Brisbane City', 'South Brisbane ', 'Spring Hill', 'West End', 'Cordelia', '', 'Woolloongabba', '市区周边'],
        '南区': ['Annerley', 'Greenslopes', 'Sunnybank', 'Macgregor', 'Sunnybank Hills', 'Runcorn', 'Calamvale', 'Eight Mile Plains', 'Robertson', 'Parkinson', 'Coopers Plains', 'Upper Mount Gravatt', 'Algester', 'Nathan', 'Underwood', 'Stretton', 'Salisbury', '南区周边'],
        '北区': ['Kelvin Grove', 'Herston', 'Fortitude Valley', '北区周边'],
        '西区': ['St Lucia', 'Indooroopilly ', 'Toowong', 'Auchenflower ', 'Bardon ', 'Taringa', 'Milton', '西区周边'],
        '东区': ['Carina', ' Belmont', '  Morningside', ' Carindale', ' Cannon Hill', ' East Brisbane', '东区周边'],
        '黄金海岸': ['Broadbeach Waters', 'Bundall', 'Clear Island Waters', 'Mermaid Waters', 'Sufers Paradise', '黄金海岸周边'],
        '凯恩斯': ['凯恩斯周边'],
        '图文巴': ['图文巴周边'],
        '阳光海岸': ['阳光海岸周边'],
      },
      // '黄金海岸': {
      //   '全部地区': [],
      //   'Broadbeach Waters': [],
      //   'Bundall': [],
      //   'Clear Island Waters': [],
      //   'Mermaid Waters': [],
      //   'Sufers Paradise': [],
      //   '黄金海岸周边': [],
      // },
      // '凯恩斯': {
      //   '全部地区': [],
      //   '凯恩斯周边': [],
      // },
      '阿德莱德': {
        '全部地区': [],
        '市区': ['Adelaide City', '市区'],
        '东区': ['Cambelltown', '东区'],
        '西区': ['西区周边'],
        '南区': ['Marion', 'MelrosePark', 'Oaklands Park', '南区周边'],
        '北区': ['Klemzig', 'Mawson Lakes', '北区周边'],
        '袋鼠岛': [],
      },
      '珀斯': {
        '全部地区': [],
        '珀斯': ['Perth City', 'Morley', 'Nedlands', '珀斯周边'],
        'Burnbury': ['Burnbury周边'],
      },
      '堪培拉': {
        '全部地区': [],
        'BELCONNEN': ['Arand', 'Belconnen', 'Belconnen Town Centre', 'Bruce', 'Charnwood', 'Cook', 'Dunlop', 'Emu Ridge', 'Evatt', 'Florey', 'Flynn', 'Fraser', 'Ginninderra Estate', 'Giralang', 'Hawker', 'Higgins', 'Holt', 'Kaleen', 'Latham', 'Lawson', 'Macgregor', 'Macquarie', 'Mckellar', 'Melba', 'Page', 'Sculin', 'South Bruce', 'Spence', 'Weetangera'],
        'GUNGAHLIN': ['Amaroo', 'Bonner', 'Broadview', 'Casey', 'Crace', 'Forde', 'Franklin', 'Gungahlin', 'Hall', 'Harcourt Hill', 'Harrison', 'Jacka', 'Mitchell', 'Moncrieff', 'Ngunnawal', 'Nicholls', 'Palmerston', 'Springbank Rise', 'Taylor', 'Throsby', 'Yerrabi'],
        'NORTH CANBERRA': ['Acton', 'Ainslie', 'Anu', 'Braddon', 'Campbell', 'Canberra', 'Canberra Airport', 'City', 'Dickson', 'Downer', 'Hackett', 'Lyneham', 'Majura', 'NewActon', 'Noth Lyneham', 'OConnor', 'Reid', 'Russell', 'Turner', 'Watson'],
        'SOUTH CANBERRA': ['Barton', 'Beard', 'Deakin', 'Deakin West', 'Forrest', 'Fyshwick', 'Griffith', 'Hume', 'Kingston', 'Manuka', 'Narrabundah', 'Oaks Estate', 'Pialligo', 'Red Hill', 'Symonston', 'Yarralumla'],
        'TUGGERANONG': ['Banks', 'Bonython', 'Calwell', 'Chisholm', 'Conder', 'Conder Ridge', 'Fadden', 'Fadden Hills', 'Gilmore', 'Gleneagles', 'Gordon', 'Gowrie', 'Greenway', 'Isabella Plains', 'Kambah', 'Macarthur', 'Monash', 'Monash Ridge', 'Oxley', 'Richardson', 'Tharwa', 'Theodore', 'Tuggeranong', 'Wanniassa'],
        'ANU&UC学校宿舍': ['UC-UC Village', 'UC-UC Lodge', 'UC-Weedn Lodge', 'UC-Cooper Lodge', 'ANU-Kinloch Lodge', 'ANU-Warrumbul Lodge', 'ANU-Davey Lodge', 'ANU-Lena Karmel Lodge', 'Academie House', 'on Gould'],
        'WESTON CREEK': ['Chapman', 'Duffy', 'Fisher', 'Holder', 'McCubbin Rise', 'Rivett', 'Stirling', 'Waramanga', 'Weston', 'Weston Creek'],
        'WODEN VALLEY': ['Chifley', 'Curtin', 'Farrer', 'Garran', 'Hughes', 'Isaace', 'Lyons', 'Mawson', 'OMalley', 'Pearce', 'Phillip', 'Swinger Hill', 'Torrens', 'Woden'],
        'GREATER QUEANBEYAN': ['Burra', 'Crestwood', 'Fernleigh Park', 'Googong', 'Googong township', 'Greenleigh', 'Jerrabomberra', 'Karabar', 'Kingsway', 'Little Burra', 'Mount Campbell', 'Queanbeyan', 'Queanbeyan East', 'Queanbeyan West', 'Royalla Estate', 'Talpa Heights', 'The Ridgeway', 'Tralee', 'Weetalabah Estate', 'Williamsdale'],
        'MOLONGLO VALLEY': ['Coombs', 'Denman Prospect', 'Wright'],
        'COREE': ['Uriarra Village'],
      },
      '塔州': {
        '全部地区': [],
        '霍巴特': ['Hobart City Moonah New Town', 'Sandy Bay', '霍巴特周边'],
      }
    },
    moneyArray: {
      '中国': '¥',
      '韩国': '₩',
      '日本': 'JPY￥',
      '新加坡': 'S$',
      '马来西亚': 'RM',
      '泰国': '฿',
      '越南': '₫',
      '菲律宾': 'PHP',
      '印度尼西亚': 'Rp',
      '阿联酋': 'Dhs',
      '土耳其': 'YTL',
      '美国': '$',
      '加拿大': 'C$',
      '墨西哥': '$',

      '澳大利亚': '$',
      '新西兰': 'NZ$',

      '英国': '€',
      '法国': '€',
      '德国': '€',
      '西班牙': '€',
      '意大利': '€',
      '荷兰': '€',
      '捷克': '€',
      '葡萄牙': '€',
      '瑞士': '€',
      '瑞典': '€',
      '希腊': '€',
      '俄罗斯': '₽',

      '阿根廷': 'ARS$',
      '巴西': 'R$',

      '南非': 'ZAR',
      '埃及': 'EGP'

    },
    schoolArray: {
      '悉尼': ['悉尼大学USYD', '悉尼科技大学UTS', '新南威尔士大学UNSW', '麦考瑞大学MQ', '西悉尼大学UWS', "卧龙岗大学", "纽卡斯尔大学"],
      '墨尔本': ['墨尔本大学', '莫纳什大学', '墨尔本理工大学', '迪肯大学', '拉筹伯大学', '斯威本国立科技大学', '维多利亚大学'],
      '布里斯班': ['昆士兰大学', '昆士兰科技大学', '格里菲斯大学', '中央昆士兰大学', '阳光海岸大学', '邦德大学 ', '南昆士兰大学', '詹姆斯库克大学'],
      '阿德莱德': ['阿德莱德大学', '南澳大学', '弗林德斯大学'],
      '珀斯': ['西澳大学', '莫多克大学', '科廷科技大学', '埃迪斯科文大学'],
      '堪培拉': ['堪培拉大学', '澳洲国立大学'],
      '奥克兰': ['奥克兰大学', '梅西大学', '奥克兰理工大学'],
      '洛杉矶': ['拉文大学ULV', '加利福尼亚大学洛杉矶分校UCLA', '北岭加州州立大学CSUN', '洛杉矶加州州立大学CSULA', '南加州大学USC', '学校周边'],
      '旧金山': ['旧金山大学USF', '旧金山州立大学SFSU', '加州大学旧金山分校UCSF'],
      '纽约': ['哥伦比亚大学', '纽约大学', '纽约州立大学 ', '纽约市立大学'],
      '多伦多': ['多大DT校区周边', '多大Mississauga校区周边', '多大Scarborough校区周边', '约克大学周边', '怀雅逊大学周边', '滑铁卢大学周边', '麦克马斯特大学周边', '莫哈克学院周边', '哥伦比亚国际学院周边', '学校周边'],
      '蒙特利尔': ['蒙特利尔大学周边', '魁北克大学周边', '麦吉尔大学周边', '康考迪亚大学周边', '学校周边'],
      '温哥华': ['英属哥伦比亚大学ubc', '西蒙菲沙大学sfu', '维多利亚大学', '其他学校周边'],
      '巴黎': ['巴黎第一大学', '巴黎第二大学', '巴黎第三大学', '巴黎第四大学', '巴黎第五大学', '巴黎第六大学', '巴黎第七大学', '巴黎第八大学', '巴黎第九大学', '巴黎第十大学', '巴黎第十一大学', '巴黎第十二大学', '巴黎第十三大学'],
      '伦敦': ['牛津大学', '剑桥大学', '伦敦大学', '帝国理工学院', '其他学校周边']
    }
  }
})