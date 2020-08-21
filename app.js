// const myPlugin = requirePlugin("myPlugin");
import PubSub from "./assets/js/event.js";

App({
  // gf code
  globalData: {
    userInfo: null,
    rest: {
      dev: {
        list: "http://127.0.0.1:8100/games/",
        detail: "http://127.0.0.1:8100/games/",
        magzine: "http://127.0.0.1:8100/magzine/",
        login: "http://127.0.0.1:8100/connect/authenticate",
        related: "http://127.0.0.1:8100/serial/",
        userInfo: "http://127.0.0.1:8100/user/get",
        favorite: "http://127.0.0.1:8100/favorite/my",
        check_fav: "http://127.0.0.1:8100/favorite/check",
        fav_do: "http://127.0.0.1:8100/favorite/do",
        fav_undo: "http://127.0.0.1:8100/favorite/undo",
        changename: "http://127.0.0.1:8100/user/changename"
      },
      prod: {
        list: "https://api.gf-app.cn/games/",
        detail: "https://api.gf-app.cn/games/",
        magzine: "https://api.gf-app.cn/magzine/",
        related: "https://api.gf-app.cn/serial/",
        login: "https://api.gf-app.cn/connect/authenticate",
        userInfo: "https://api.gf-app.cn/user/get",
        favorite: "https://api.gf-app.cn/favorite/my",
        check_fav: "http://api.gf-app.cn/favorite/check",
        fav_do: "https://api.gf-app.cn/favorite/do",
        fav_undo: "https://api.gf-app.cn/favorite/undo",
        changename: "https://api.gf-app.cn/user/changename"
      }
    }
  }
});
