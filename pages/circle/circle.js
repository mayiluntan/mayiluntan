//circle.js
//获取应用实例
const app = getApp()
var istoday=0;
var id=0;
var userid=0;
Page({
  data: {
    menuSelected:0,
    hide:1,
    data:{},
    content:'',
    nick:'',
    imgUrls: [
      {
        link: '',
        url: '/images/c1.png'
      }
    ],
    topicUrls:[]
  },
  onLoad: function () {
    this.getList();
    wx.request({
      url: app.globalData.apiUrl + 'get_topic_banner.php',
      success: res => {
        this.setData({
          imgUrls: res.data.data,
          topicUrls: res.data.topic
        })
      }
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.getList();
  },
  getList(){
    wx.request({
      url: app.globalData.apiUrl + 'get_dynamic.php',
      data: { uid: app.globalData.uid,istoday: istoday},
      method:"POST",
      success:res=>{
        console.log(res.data)
        if(res.data.ret==1){
          this.setData({
            data:res.data.data
          })
        }else{
          app.showTips(res.data.title, res.data.msg, false);
        }
      },
      complete: res => {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  menuClicked: function (event) {
    var menutype = event.currentTarget.dataset.menutype;
    if (this.data.menuSelected == menutype) {
      return;
    }
    this.setData({
      menuSelected: menutype
    })
    if (menutype==1){
      istoday=1
    }else{
      istoday = 0
    }
    this.getList()
  },
  showInput(e){
    id = e.currentTarget.dataset.id
    userid=0
    this.setData({
      hide: 0,
      nick:''
    })
    
  },
  hideInput(){
    this.setData({
      hide:1
    })
  },
  replyInput(e){
    this.setData({
      content:e.detail.value
    })
  },
  replyUser(e){
    id = e.currentTarget.dataset.id
    var nick = e.currentTarget.dataset.nick
    userid = e.currentTarget.dataset.userid
    this.setData({
      hide: 0,
      nick: nick
    })
  },
  replyClick(){
    if(this.data.content==''){
      app.showTips('提示', '请输入内容', false)
      return
    }
    wx.request({
      url: app.globalData.apiUrl + 'dynamic_message.php',
      data: { id: id, uid: app.globalData.uid, content: this.data.content, to_user_id: userid},
      method: 'POST',
      success: res => {
        if (res.data.ret == 1) {
          wx.showToast({
            title: '回复成功',
            icon: 'success'
          })
          this.setData({
            content: ''
          })
          this.hideInput();
          this.getList();
          id=0;
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  thumbsUp(e){
    id = e.currentTarget.dataset.id
    wx.request({
      url: app.globalData.apiUrl + 'dynamic_up.php',
      data: { id: id, uid: app.globalData.uid },
      method: 'POST',
      success: res => {
        if (res.data.ret == 1) {
          this.getList();
          id = 0;
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  circleList(e){
    var id=e.currentTarget.dataset.id;
    if(id==0){
      return;
    }
    wx.navigateTo({
      url: '/pages/circle/circleList/circleList?id=' + id,
    })
  },
  chooseTopic() {
    wx.navigateTo({
      url: '/pages/circle/topic/topic?orgin=0',
    })
  },
  topicList(){
    wx.navigateTo({
      url: '/pages/circle/topic/topic',
    })
  },
  searchClick(e) {
    var v = e.detail.value;
    if (v == '') {
      return;
    }
    wx.navigateTo({
      url: '/pages/circle/circleList/circleList?keyword=' + v,
    })
  },
  viewIndex(e) {
    var v = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/user/personal/personal?user_id=' + v,
    })
  }
})
