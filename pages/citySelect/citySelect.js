//index.js
//获取应用实例
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
        '澳大利亚': ['悉尼', '墨尔本', '布里斯班', '珀斯', '阿德莱德', '堪培拉', '霍巴特', '卧龙岗', '纽卡斯尔', '黄金海岸', '凯恩斯'],
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
    this.setData({
      current: menutype
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
    console.log(current)
    console.log(value)
    console.log(selectIndex)
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
    console.log(this.data)
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
