//circle.js
//获取应用实例
const app = getApp()

Page({
  data: {
    menuSelected:0
  },
  onLoad: function () {

  },
  menuClicked: function (event) {
    var menutype = event.currentTarget.dataset.menutype;
    if (this.data.menuSelected == menutype) {
      return;
    }
    this.setData({
      menuSelected: menutype
    })
  }
})
