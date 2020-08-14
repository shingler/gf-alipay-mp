Page({
  data: {},
  onLoad() {},
  // 获得登录验证码
  getAuthCode: () => {
    my.getAuthCode({
      scopes: "auth_user",
      success: ({ authCode }) => {
        console.log(authCode);
        // 调用自己的服务端接口，让服务端进行后端的授权认证，并且利用session，需要解决跨域问题
        my.request({
          url: "https://isv.com/auth", // 该url是您自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
          data: {
            authcode: authCode
          },
          success: res => {
            // 授权成功并且服务器端登录成功
          },
          fail: res => {
            // 根据自己的业务场景来进行错误处理
          }
        });
      }
    });
  }
});
