//circle.js
//获取应用实例
const app = getApp()

Page({
  data: {
    menuSelected:0,
    hide:1
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
  },
  showInput(){
    this.setData({
      hide: 0
    })
  },
  hideInput(){
    this.setData({
      hide:1
    })
  },
  replyClick(){
    console.log(1)
  }
})
