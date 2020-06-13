// const myPlugin = requirePlugin("myPlugin");
import PubSub from "./assets/js/event.js";

App({
  // gf code
  globalData: {
    userInfo: null,
    rest: {
      dev: {
        list: "https://gfweb.io:8088/api/games/",
        detail: "https://gfweb.io:8088/api/games/",
        magzine: "https://gfweb.io:8088/api/magzine/"
      },
      prod: {
        list: "https://www.gf-app.cn/api/games/",
        detail: "https://www.gf-app.cn/api/games/",
        magzine: "https://www.gf-app.cn/api/magzine/"
      }
    }
  }
});
