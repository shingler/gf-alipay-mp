var api_prefix = getApp().globalData.rest.prod;
// var api_prefix = getApp().globalData.rest.dev;

Page({
  data: {},
  onLoad() {
    let token = my.getStorageSync({ key: "gf_token" }).data;
    let that = this;
    // console.log(token);
    if (!token) {
      my.showToast({
        content: "请先登录",
        duration: 2000
      });
      my.navigateTo({
        url: "pages/me/index/index"
      });
    }
    //调用接口
    this.load_favorite(token, that);
  },

  // 读取我的收藏
  load_favorite(token, that) {
    my.request({
      url: api_prefix.favorite + "?token=" + token,
      method: "get",
      success: result => {
        that.setData({
          favorites: result.data
        });
      }
    });
  },

  /**
   * 跳转到对应的位置
   */
  go_detail: function(event) {
    // console.log(event);
    var game_id = event.target.dataset.gid;
    console.log(game_id);
    my.navigateTo({
      url: "/pages/shelf/detail/detail?id=" + game_id
    });
  }
});
