<template>
  <div style="height: 100%">
    <div style="height: 100%" v-if="userInfo.user == null">
      <router-view></router-view>
    </div>
    <el-container v-else style="height: 100%; border: 1px solid #eee">
      <el-aside
        style="
          color: #f9fafb;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          height: 100%;
        "
      >
        <div
          style="
            background: #0059a5;
            height: 80px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            color: #ffffff;
            font-size: 28px;
          "
        >
          墨家云盘
        </div>
        <el-menu
          class="el-menu-vertical-demo"
          router
          default-active="$route.path"
        >
          <el-menu-item index="users">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="computer">
            <i class="el-icon-monitor"></i>
            <span slot="title">集群信息</span>
          </el-menu-item>

          <el-submenu>
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span>日志记录</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="logger">
                <i class="el-icon-s-order"></i>
                <span slot="title">操作日志</span>
              </el-menu-item>
              <el-menu-item index="error">
                <i class="el-icon-s-release"></i>
                <span slot="title">错误日志</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main style="padding: 0px 0px">
        <el-header style="padding: 0px 0px">
          <el-dropdown class="myHeader" @command="handleCommand">
            <div class="myHeader">
              <i class="el-icon-user-solid"></i>
              <b v-if="userInfo.name == ''">请登录</b>
              <b v-else>{{ userInfo.name }}</b>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="修改信息">修改信息</el-dropdown-item>
              <el-dropdown-item command="修改密码">修改密码</el-dropdown-item>
              <el-dropdown-item divided command="exit"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <router-view @infoFlush="flushFF"></router-view>
      </el-main>
      <user-info ref="userInfo1"></user-info>
    </el-container>
  </div>
</template>

<script>
import userInfo from "../components/userInfo.vue";
import router from "../router/index";
import login from "../components/login.vue";
export default {
  components: { userInfo, login },
  name: "Home",
  router,
  data() {
    return {
      userInfo: {
        user: sessionStorage.getItem("user"),
        name: sessionStorage.getItem("name"),
      },
      ff: 0,
      HOST: "http://localhost:10001/",
      storeInfo: "",
    };
  },
  created() {
    this.ff = sessionStorage.getItem("ff");
    let busy = parseFloat(sessionStorage.getItem("busy"));
    let store = parseFloat(sessionStorage.getItem("store"));
    busy = busy / 1024 / 1024 / 1024;
    store = store / 1024 / 1024 / 1024;
    busy = busy.toFixed(2);
    store = store.toFixed(2);
    this.storeInfo = "已用" + busy + "GB;  " + "总空间：" + store + "GB";
  },
  methods: {
    handleCommand(command) {
      if (command == "修改信息") {
        this.$refs.userInfo1.dialogFormVisible = true;
      } else if (command == "exit") {
        sessionStorage.removeItem("user");
        window.location.replace("/main");
      } else if (command == "修改密码") {
        window.location.replace("/resetpassword");
      }
    },
    flushFF() {
      this.ff = sessionStorage.getItem("ff");
      let busy = parseFloat(sessionStorage.getItem("busy"));
      let store = parseFloat(sessionStorage.getItem("store"));
      busy = busy / 1024 / 1024 / 1024;
      store = store / 1024 / 1024 / 1024;
      busy = busy.toFixed(2);
      store = store.toFixed(2);
      this.storeInfo = "已用" + busy + "GB;  " + "总空间：" + store + "GB";
    },
  },
};
</script>

<style >
.myHeader {
  display: flex;
  height: 60px;
  width: 100%;
  flex-flow: row-reverse nowrap;
  background: rgba(251, 251, 251, 1);
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
