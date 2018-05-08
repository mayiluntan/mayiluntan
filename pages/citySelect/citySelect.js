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
    var arr = app.globalArray.cityArray

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
    if (current > this.data.maxCurrent){
      app.globalData.cityIndex = selectIndex
      app.globalData.cityArray = selected
      app.globalData.cityChange = true
      app.globalData.pageChange = true
      this.updateCity()
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
  },
  updateCity(){
    wx.request({
      url: app.globalData.apiUrl + 'update_city.php',
      data: { uid: app.globalData.uid, city: app.globalData.cityArray, cityIndex:app.globalData.cityIndex},
      method:'POST',
      success: res => {
      }
    })
  }
})
