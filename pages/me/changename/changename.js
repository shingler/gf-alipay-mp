var api_prefix = getApp().globalData.rest.prod;
// var api_prefix = getApp().globalData.rest.dev;
Page({
  data: {
    disabled: false,
    ifShow: false
  },
  onLoad() {
    let token = my.getStorageSync({ key: "gf_token" }).data;
    // console.log(token);
    if (token) {
      this.getUserInfo(token);
    }
  },
  // 监听文本框
  onItemInput(e) {
    this.setData({ new_name: e.detail.value });
    if (e.detail.value.length == 0) {
      this.setData({
        disabled: true
      });
    } else {
      this.setData({
        disabled: false
      });
    }
  },
  // 监听清除键
  onClear(e) {
    this.setData({
      disabled: true
    });
  },
  // 修改用户名
  changeName(e) {
    let that = this;
    let new_username = e.target.dataset.input;
    let token = my.getStorageSync({ key: "gf_token" }).data;
    my.request({
      url: api_prefix.changename,
      method: "post",
      dataType: "json",
      data: { new_username: new_username, token: token },
      success: res => {
        if (res.data.status == 1) {
          my.showToast({
            type: "success",
            content: "修改成功",
            duration: 3000
          });
          my.redirectTo({
            url: "/pages/me/index/index"
          });
        } else {
          that.setData({
            ifShow: true,
            notice_msg: res.data.msg
          });
        }
      },
      fail: res => {}
    });
  },
  // 取得个人信息
  getUserInfo(token) {
    let that = this;
    // console.log(token);
    my.request({
      url: api_prefix.userInfo,
      data: { token: token },
      success: res => {
        // console.log(res);
        if (res.data.status == 0) {
          //token不可用
          my.removeStorage({
            key: "gf_token",
            success: res => {}
          });
        } else {
          that.setData({
            userInfo: res.data,
            token: token
          });
        }
      },
      fail: res => {}
    });
  }
});
