var app = getApp();
Page({
  data: {
    origin_ifshow: true
  },
  onLoad(request) {
    var id = request["id"];
    var that = this;
    var magzine_info = this.getMagzineScore(id, that);
  },
  //获取媒体评分
  getMagzineScore: function(id, that) {
    my.request({
      url: app.globalData.rest.prod.magzine + id + "/",
      dataType: "json",
      success: function(res) {
        that.setData({
          info: res.data
        });
      }
    });
  },
  //显示原文
  show_origin: function() {
    console.log(this.data);
    this.setData({
      origin_ifshow: !this.data.origin_ifshow
    });
  }
});
