import { createApp } from "vue";
// 按需引入组件样式 vant css
import "vant/es/toast/style";
import "vant/es/dialog/style";
import "vant/es/notify/style";
import "vant/es/image-preview/style";

import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
