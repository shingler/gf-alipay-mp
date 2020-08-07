// var api_prefix = getApp().globalData.rest.prod;
var api_prefix = getApp().globalData.rest.dev;

Page({
  data: {
    background: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 4000,
    duration: 100,
    icon: {
      switch: "/images/icon/switch.png",
      ps4: "/images/icon/ps4.png"
    },
    magazineLogo: {
      gamespot: "/images/icon/gamespot.png",
      metacritic: "/images/icon/metacritic.png",
      Famitsu: "/images/icon/famitsu.png"
    }
  },
  onLoad(request) {
    // console.log(request);
    var that = this;
    var intro_data;
    //获取游戏信息
    my.request({
      url: api_prefix.detail + request["id"] + "/",
      dataType: "json",
      success: function(res) {
        res.data.cover = JSON.parse(res.data.cover.replace(/\'/g, '"'));
        res.data.thumb = JSON.parse(res.data.thumb.replace(/\'/g, '"'));
        if (res.data.mp_cover.length == 0) {
          res.data.mp_cover = res.data.cover;
        }
        if (res.data.mp_thumb.length == 0) {
          res.data.mp_thumb = res.data.thumb;
        }
        //过滤掉html标签
        res.data.intro = res.data.intro.replace(/<br>/gi, "\n\n");
        res.data.intro = res.data.intro.replace(/<\/?[^>]*>/g, "");
        // console.log(res.data.mp_thumb.length);
        // console.log(res.data.mp_thumb);
        that.setData({
          background:
            res.data.mp_thumb.length > 0
              ? res.data.mp_thumb
              : [res.data.mp_cover_detail[0]],
          info: res.data
        });
        // console.log(that.data.info.subjects)
      }
    });
    //获取评分信息
    my.request({
      url: api_prefix.magzine + "?gameId=" + request["id"],
      dataType: "json",
      success: function(res) {
        console.log(res);
        that.setData({
          magzine: res.data
        });
      }
    });
  },
  //跳转到媒体评测页面
  go_review(e) {
    var mid = e.target.dataset["mid"];
    my.navigateTo({
      url: "/pages/shelf/magazine/magazine?id=" + mid
    });
  },

  //到底部获取相关游戏
  onReachBottom() {
    // 避免重复加载
    if (this.data.related) {
      return;
    }
    var serial_id = this.data.info.serial_id;
    var that = this;
    if (serial_id != 0) {
      // 获取相关游戏
      var req_url =
        api_prefix.related + serial_id + "?except=" + that.data.info.gameId;

      my.request({
        url: req_url,
        dataType: "json",
        success: function(res) {
          console.log(res);
          var relate_list = res.data.related_games;
          if (relate_list.length > 0) {
            console.log(relate_list);
            that.setData({
              related: relate_list
            });
          }
        }
      });
    }
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
