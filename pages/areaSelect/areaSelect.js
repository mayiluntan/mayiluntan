const app = getApp()
Page({
  data: {
    current: 0,
    array: [],
    currentShow: 0,
    selected: [],
    maxCurrent: 0,
    selectArray: [[], [], [], []],
    minHeight: 0,
    selectIndex: []
  },
  onLoad() {
    this.initData()
  },
  initData() {
    var arr = {
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
        '东区': ['Kingsford', 'Randwick', 'Kensington', 'Maroubra', 'Waterloo', 'Zetland', 'Rosebery', 'Mascot 东区周边'],
        '内西区': ['Burwood', 'Ashifield', 'Strathfield', 'Rhodes', 'Homebush', 'Campsie', '内西区周边'],
        '南区': ['Hurstville', 'Wolli', 'Creek', 'Arncliffe', 'Rockdale', 'Kogarah', 'Allawah', 'Penshurst', 'BeverlyHills', 'Riverwood', '南区周边'],
        '西北区': ['Epping', 'Eastwood', 'Carlingford', 'Castle Hill ', 'Rouse Hill', 'Kellyville', 'Baulkham Hills', 'Schofields', '西北区周边'],
        '北区': ['Chatswood', 'Marsfield', 'Macquarie Park', 'Ryde', 'Killara', 'Gordon', 'Hornsby', 'Turramurra', 'Lane Cove', 'Lindfield北区周边'],
        '西区': ['Parramatta', 'Auburn', 'Lidcombe', 'Bankstown', 'Liverpool', 'Merrylands西区周边'],
      },
      '卧龙岗': {
        '全部地区': [],
        '卧龙岗周边': [],
      },
      '纽卡斯尔': {
        '全部地区': [],
        '纽卡斯尔周边': [],
      },
      '中央海岸': {
        '全部地区': [],
        '中央海岸周边': ['Berkeley Vale','Killarney Vale','The Entrance','中央海岸周边'],
      },
      '墨尔本': {
        '全部地区': [],
        '市区': ['Melbourne City', 'East Melbourne ', 'West Melbourne', 'North Melbourne ', 'Parkville', 'Carlton ', 'South Yarra ', 'St Kilda Road', 'South Bank ', 'Docklands ', '市区周边'],
        '内城区': ['Albert Park', 'Footscray ', 'Caulfield', 'Hawthorn', 'Malvern', 'Malvern East Preston', '内城区周边'],
        '东区': ['Box Hill', 'Burwood ', 'Burwood East ', 'Doncaster ', 'Ringwood', 'Ringwood East', 'Vermont', 'Vermont South', '东区周边'],
        '东南区': ['Bentleigh', 'Bentleigh East', 'Clayton', 'Carnegie', 'Camberwell', 'Glen Waverley', 'Oakleigh', 'Oakleigh East', 'Ormon', 'Mount Waverley', '东南区周边'],
        '南区': ['Brighton', 'McKinnon', ' 南区周边'],
        '北区': ['Bundoora', 'Reservoir', '北区周边'],
        '西南区': ['Point Cook', '西区周边'],
        '吉朗': ['East Geelong','Geelong city centre','Geelong West','Newtown','South Geelon','Whittington','吉朗周边'],
        '巴拉瑞特': ['Alfredton','Ballarat Central','Redan'],
      },
      '首尔': {
        '全部地区': [],
        '首尔': ['中区', '东大门区', '西大门区', '城东区', '城北区', '龙山区', '钟路区', '麻浦区', '广津区', '中浪区', '江北区', '九老区', '道峰区', '芦原区', '江西区', '阳川区', '永登浦区', '冠岳区', '铜雀区', '瑞草区', '衿川区', '江南区', '恩平区', '江东区', '松坡区'],
        '学校附近': ['成均馆大学', '庆熙大学', '建国大学', '东国大学', '檀国大学', '中央大学', '延世大学', '梨花女大', '高丽大学', '汉阳大学', '学校附近'],
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
        '帕罗斯沃地PVJOBS': [],
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
      '布里斯班': {
        '全部地区': [],
        '市区': ['Brisbane City', 'South Brisbane ', 'Spring Hill', 'West End', 'Cordelia', '', 'Woolloongabba市区周边'],
        '南区': ['Annerley', 'Greenslopes', 'Sunnybank', 'Macgregor', 'Sunnybank Hills', 'Runcorn', 'Calamvale', 'Eight Mile Plains', 'Robertson', 'Parkinson', 'Coopers Plains', 'Upper Mount Gravatt', 'Algester', 'Nathan', 'Underwood', 'Stretton', 'Salisbury南区周边'],
        '北区': ['Kelvin Grove', 'Herston', 'Fortitude Valley', '北区周边'],
        '西区': ['St Lucia', 'Indooroopilly ', 'Toowong', 'Auchenflower ', 'Bardon ', 'Taringa', 'Milton', '西区周边'],
        '东区': ['Carina', ' Belmont', '  Morningside', ' Carindale', ' Cannon Hill', ' East Brisbane', '东区周边'],
      },
      '黄金海岸': {
        '全部地区': [],
        'Broadbeach Waters': [],
        'Bundall': [],
        'Clear Island Waters': [],
        'Mermaid Waters': [],
        'Sufers Paradise': [],
        '黄金海岸周边': [],
      },
      '凯恩斯': {
        '全部地区': [],
        '凯恩斯周边': [],
      },
      '阿德莱德': {
        '全部地区': [],
        '市区': ['Adelaide City', '市区'],
        '东区': ['Cambelltown', '东区'],
        '西区': ['西区', '周边'],
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
        '霍巴特': ['Hobart City Moonah New Town', 'Sandy Bay','霍巴特周边'],
      },


      // '亚洲': {
      //   '中国': ['香港', '澳门', '台湾'],
      //   '韩国': ['首尔', '釜山', '济州岛', '京畿道', '仁川'],
      //   '日本': ['东京', '大阪', '名古屋', '横滨'],
      //   '新加坡': ['新加坡'],
      //   '马来西亚': ['吉隆坡', '槟城'],
      //   '泰国': ['曼谷', '清迈', '芭提雅', '普吉岛'],
      //   '越南': ['河内', '胡志明'],
      //   '菲律宾': ['马尼拉'],
      //   '印度尼西亚': ['雅加达'],
      //   '阿联酋': ['迪拜'],
      //   '土耳其': ['伊斯坦布尔']
      // },
      // '北美': {
      //   '美国': ['洛杉矶', '纽约', '旧金山', '圣地亚哥', '圣何塞', '伯克利', '芝加哥', '华盛顿', '西雅图', '休斯顿', '达拉斯', '费城', '波士顿', '夏威夷', '奥兰多', '拉斯维加斯', '波特兰', '丹佛', '亚特兰大', '佛罗里达'],
      //   '加拿大': ['多伦多', '温哥华', '蒙特利尔', '卡尔加里', '渥太华', '伦敦', '滑铁卢', '温尼伯'],
      //   '墨西哥': ['墨西哥城']
      // },
      // '大洋洲': {
      //   '澳大利亚': ['悉尼', '墨尔本', '布里斯班', '珀斯', '阿德莱德', '堪培拉', '霍巴特', '卧龙岗', '纽卡斯尔', '黄金海岸', '凯恩斯'],
      //   '新西兰': ['奥克兰', '惠灵顿', '基督城']
      // },
      // '欧洲': {
      //   '英国': ['伦敦', '伯明翰', '曼彻斯特', '爱丁堡'],
      //   '法国': ['巴黎'],
      //   '德国': ['柏林', '慕尼黑', '法兰克福', '汉堡', '科隆'],
      //   '西班牙': ['马德里', '巴塞罗那'],
      //   '意大利': ['罗马', '米兰', '佛伦伦萨'],
      //   '荷兰': ['阿姆斯特丹'],
      //   '捷克': ['布拉格'],
      //   '葡萄牙': ['波尔图', '里斯本'],
      //   '瑞士': ['苏黎世'],
      //   '瑞典': ['斯德哥尔摩'],
      //   '希腊': ['雅典'],
      //   '俄罗斯': ['莫斯科', '圣彼得堡']
      // },
      // '南美洲': {
      //   '阿根廷': ['布宜诺斯艾利斯'],
      //   '巴西': ['里约热内卢', '圣保罗']
      // },
      // '非洲': {
      //   '南非': ['开普敦', '约翰内斯堡'],
      //   '埃及': ['开罗']
      // }
    }

    var selectArray = this.data.selectArray;
    var maxCurrent = this.data.maxCurrent;
    //var arr = { 'a': 1, 'b': 2, 'c': 3 }
    if (this.isArray(arr)) {
      selectArray[0] = arr;
      maxCurrent = 0
    } else {
      var count1 = 0;
      for (var k in arr) {
        selectArray[0].push(k)
        var count2 = 0;
        if (this.isArray(arr[k])) {
          selectArray[1][count1] = arr[k]
          maxCurrent = 1;
        } else if (this.isObject(arr[k])) {
          var newArr2 = arr[k]
          selectArray[1][count1] = [];
          selectArray[2][count1] = [];
          selectArray[3][count1] = [];
          for (var a in newArr2) {
            selectArray[1][count1].push(a)
            var count3 = 0;
            if (this.isArray(newArr2[a])) {
              selectArray[2][count1][count2] = newArr2[a]
              selectArray[3] = []
              maxCurrent = 2;
            } else if (this.isObject(newArr2[a])) {
              var newArr3 = newArr2[a]
              selectArray[2][count1][count2] = [];
              selectArray[3][count1][count2] = [];
              for (var b in newArr3) {
                selectArray[2][count1][count2].push(b)
                selectArray[3][count1][count2][count3] = newArr3[b]
                count3++;
                maxCurrent = 3;
              }
            } else {
              selectArray[2][count1][count2] = newArr2[a]
            }
            count2++;
          }
        } else {
          selectArray[1][count1] = arr[k]
        }
        count1++;
      }
    }
    var selected = this.data.selected
    var selectIndex = this.data.selectIndex
    var array = this.data.array
    for (var i = 0; i <= maxCurrent; i++) {
      selected.push('请选择')
      selectIndex.push(0)
      if (i > 0) {
        array[i] = selectArray[i][0];
      } else {
        array[i] = selectArray[0];
      }
      switch (i) {
        case 0: array[i] = selectArray[i]; break;
        case 1: array[i] = selectArray[i][0]; break;
        case 2: array[i] = selectArray[i][0][0]; break;
        case 3: array[i] = selectArray[i][0][0][0]; break;
      }
    }
    var num = array[0].length;
    var height = num * 51 + 51;
    this.setData({
      selected: selected,
      maxCurrent: maxCurrent,
      selectArray: selectArray,
      array: array,
      minHeight: height
    })
    console.log(this.data)
  },
  menuClicked: function (event) {
    var menutype = event.currentTarget.dataset.menutype;
    if (this.data.current == menutype) {
      return;
    }
    var num = this.data.array[menutype].length;
    var height = num * 51 + 51;
    this.setData({
      current: menutype,
      minHeight: height
    })
  },
  swiperChange(e) {
    var num = this.data.array[e.detail.current].length;
    var height = num * 51 + 51;
    this.setData({
      current: e.detail.current,
      minHeight: height
    });
  },
  selectItem(e) {
    var index = e.currentTarget.dataset.index
    var value = e.currentTarget.dataset.value
    var currentShow = this.data.currentShow
    var current = parseInt(this.data.current)
    var selected = this.data.selected
    var selectIndex = this.data.selectIndex
    var selectArray = this.data.selectArray
    var array = this.data.array
    if (currentShow <= index && currentShow < this.data.maxCurrent) {
      currentShow = parseInt(index) + 1;
    }
    //改变后面的值
    for (var i = current + 1; i <= this.data.maxCurrent; i++) {
      if (current == 0) {
        switch (i) {
          case 1: array[i] = selectArray[i][value]; break;
          case 2: array[i] = selectArray[i][value][0]; break;
          case 3: array[i] = selectArray[i][value][0][0]; break;
        }
        selectIndex[parseInt(i)] = 0
        selected[parseInt(i)] = '请选择'
      } else if (current == 1) {
        switch (i) {
          case 2: array[i] = selectArray[i][selectIndex[0]][value]; break;
          case 3: array[i] = selectArray[i][selectIndex[0]][value][0]; break;
        }
      } else {
        array[i] = selectArray[i][selectIndex[0]][selectIndex[1]][value]; break;
      }

    }
    this.setData({
      currentShow: currentShow
    })
    current = current + 1;
    selected[index] = this.data.array[index][value];
    selectIndex[index] = value
    this.setData({
      current: current,
      selected: selected,
      selectIndex: selectIndex,
      array: array
    })
    if (current > this.data.maxCurrent) {
      app.globalData.cityIndex = selectIndex
      app.globalData.cityArray = selected
      app.globalData.cityChange = true
      app.globalData.pageChange = true
      wx.navigateBack({

      })
    }
  },
  isArray(arg) {
    if (typeof arg === 'object') {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }
    return false;
  },
  isObject(arg) {
    if (typeof arg === 'object') {
      return Object.prototype.toString.call(arg) === '[object Object]';
    }
    return false;
  }
})
