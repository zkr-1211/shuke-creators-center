<template>
  <div class="home" id="full-Screen">
    <Header />
    <el-container>
      <el-container>
        <el-aside class="hidden-md-and-down">
          <el-row class="tac">
            <el-col>
              <el-menu router text-color="#666666" :default-active="activePath" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose">
                <el-menu-item @click="saveNavState('/')" index="/" :class="selectIndex == '/' ? 'selectStyle' : ''">
                  <img v-if="selectIndex == '/'" src="@/assets/image/leftbar/leftbar_home_s.svg" alt="" />
                  <img v-else src="@/assets/image/leftbar/leftbar_home_n.svg" alt="" />
                  <!-- <i class="el-icon-menu"></i> -->
                  <span>首页</span>
                </el-menu-item>

                <el-submenu index="1">
                  <template slot="title">
                    <img src="@/assets/image/leftbar/leftbar_course_n.svg" alt="" />
                    <span class="left-title">创作</span>
                    <!-- </el-menu-item> -->
                  </template>
                  <el-menu-item-group>
                    <el-menu-item @click="saveNavState('/creations/dynaic')" index="/creations/dynaic" class="left-title-item" :class="
                        selectIndex == '/creations/dynaic' ? 'checkStyle' : ''
                      ">动态</el-menu-item>
                    <el-menu-item @click="saveNavState('/creations/video')" index="/creations/video" class="left-title-item" :class="
                        selectIndex == '/creations/video' ? 'checkStyle' : ''
                      ">视频</el-menu-item>
                    <el-menu-item @click="saveNavState('/creations/zhuanlan')" index="/creations/zhuanlan" class="left-title-item" :class="
                        selectIndex == '/creations/zhuanlan' ? 'checkStyle' : ''
                      ">专栏</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <img v-if="selectIndex == '/allequipment'" src="@/assets/image/leftbar/leftbar_course_s.svg" alt="" />
                    <img v-else src="@/assets/image/leftbar/leftbar_course_n.svg" alt="" />
                    <span class="left-title">管理</span>
                    <!-- </el-menu-item> -->
                  </template>
                  <el-menu-item-group>
                    <el-menu-item @click="saveNavState('/managements/workmanagement')" index="/managements/workmanagement" class="left-title-item" :class="
                        selectIndex == '/managements/workmanagement'
                          ? 'checkStyle'
                          : ''
                      ">作品管理</el-menu-item>
                    <el-menu-item @click="saveNavState('/managements/commentmanagement')" index="/managements/commentmanagement" class="left-title-item" :class="
                        selectIndex == '/managements/commentmanagement'
                          ? 'checkStyle'
                          : ''
                      ">评论管理</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
          <div class="aside-progress">
            <div>
              <el-progress :percentage="50" :show-text="false"></el-progress>
            </div>
            <div class="text">
              <div class="capacity">已用2.6GB/20GB</div>
              <div class="add-capacity">扩容</div>
            </div>
          </div>
          <div class="aside-bottom">
            <div>树课社区</div>
            <div>客服帮助</div>
          </div>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <el-drawer :modal="true" :show-close="false" size="28%" title="" :visible.sync="drawer" :direction="direction">
      <el-menu router text-color="#666666" :default-active="activePath" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose">
        <el-menu-item @click="saveNavState('/')" index="/" :class="selectIndex == '/' ? 'selectStyle' : ''">
          <img v-if="selectIndex == '/'" src="@/assets/image/leftbar/leftbar_home_s.svg" alt="" />
          <img v-else src="@/assets/image/leftbar/leftbar_home_n.svg" alt="" />
          <!-- <i class="el-icon-menu"></i> -->
          <span class="left-title-d">首页</span>
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title">
            <img src="@/assets/image/leftbar/leftbar_course_n.svg" alt="" />
            <span class="left-title">创作</span>
            <!-- </el-menu-item> -->
          </template>
          <el-menu-item-group>
            <el-menu-item @click="saveNavState('/creations/dynaic')" index="/creations/dynaic" class="left-title-item" :class="
                        selectIndex == '/creations/dynaic' ? 'checkStyle' : ''
                      ">动态</el-menu-item>
            <el-menu-item @click="saveNavState('/creations/video')" index="/creations/video" class="left-title-item" :class="
                        selectIndex == '/creations/video' ? 'checkStyle' : ''
                      ">视频</el-menu-item>
            <el-menu-item @click="saveNavState('/creations/zhuanlan')" index="/creations/zhuanlan" class="left-title-item" :class="
                        selectIndex == '/creations/zhuanlan' ? 'checkStyle' : ''
                      ">专栏</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <img v-if="selectIndex == '/allequipment'" src="@/assets/image/leftbar/leftbar_course_s.svg" alt="" />
            <img v-else src="@/assets/image/leftbar/leftbar_course_n.svg" alt="" />
            <span class="left-title">管理</span>
            <!-- </el-menu-item> -->
          </template>
          <el-menu-item-group>
            <el-menu-item @click="saveNavState('/managements/workmanagement')" index="/managements/workmanagement" class="left-title-item" :class="
                        selectIndex == '/managements/workmanagement'
                          ? 'checkStyle'
                          : ''
                      ">作品管理</el-menu-item>
            <el-menu-item @click="saveNavState('/managements/commentmanagement')" index="/managements/commentmanagement" class="left-title-item" :class="
                        selectIndex == '/managements/commentmanagement'
                          ? 'checkStyle'
                          : ''
                      ">评论管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <div class="aside-progress">
        <div>
          <el-progress :percentage="50" :show-text="false"></el-progress>
        </div>
        <div class="text">
          <div class="capacity">已用2.6GB/20GB</div>
          <div class="add-capacity">扩容</div>
        </div>
      </div>
      <div class="aside-bottom">
        <div>树课社区</div>
        <div>客服帮助</div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Header from "@/components/header/Header.vue";
import "element-ui/lib/theme-chalk/display.css";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Header,
  },
  data() {
    return {
      drawer: false,
      direction: "ltr",
      selectIndex: 1,
      activePath: "",
      activeName: "first",
      isNotic: false,
      isFullScren: false,
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
    this.selectIndex = this.activePath || "/main";
    // window.addEventListener("resize", () => {
    //   // console.log("resize");
    // });
  },
  mounted() {
    let isFullscreen =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.fullScreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen;
    isFullscreen = !!isFullscreen;
    let that = this;
    document.addEventListener("fullscreenchange", () => {
      that.isFullScren = !that.isFullScren;
    });
    document.addEventListener("mozfullscreenchange", () => {
      that.isFullScren = !that.isFullScren;
    });
    document.addEventListener("webkitfullscreenchange", () => {
      that.isFullScren = !that.isFullScren;
    });
    document.addEventListener("msfullscreenchange", () => {
      that.isFullScren = !that.isFullScren;
    });
  },
  methods: {
    // 全屏事件
    fullScreenEvent() {
      //全屏
      // let el = document.documentElement;
      //局部全屏
      let el = document.getElementById("full-Screen");
      if (this.isFullScren) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (el.requestFullscreen) {
          el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen();
        } else if (el.webkitRequestFullScreen) {
          el.webkitRequestFullScreen();
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen();
        }
      }
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    handleSelect(index) {
      // console.log("index", index);
      this.selectIndex = index;
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //下拉菜单嵌套Tabs第一次下划线不显示的解决办法
    isNoticF() {
      setTimeout(() => {
        this.isNotic = true;
      }, 10);
    },
  },
};
</script>
<style lang="scss" scoped>
//抽屉需要样式抽出来
.aside-progress {
  position: absolute;
  left: 0.38rem;
  text-align: center;
  bottom: 2rem;
  width: 70%;
  font-size: 0.14rem;
  color: #666666;
  .text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.1rem;
  }
}
//抽屉需要样式抽出来
.aside-bottom {
  position: absolute;
  bottom: 1.5rem;
  left: 0.38rem;
  display: flex;
  width: 70%;
  justify-content: center;
  font-size: 0.14rem;
  color: #666666;
  > div:nth-of-type(1) {
    cursor: pointer;
  }
  > div:nth-of-type(2) {
    margin-left: 0.48rem;
    cursor: pointer;
  }
}
.home {
  height: 100vh;
  width: 100%;
  background-color: #f7f6fa;
  overflow-x: hidden;
  overflow-y: hidden;
}
.el-menu {
  border: none;
  .left-title-d {
    margin-left: 0.2rem;
    font-size: 0.14rem;
    font-weight: bold;
    color: #fff;
  }
  .left-title {
    margin-left: 0.2rem;
    font-size: 0.14rem;
    font-weight: bold;
    color: #666666;
  }
  .left-title-item {
    padding-left: 0.65rem !important;
    font-size: 0.12rem !important;
    font-weight: bold;
    color: #666666;
  }
}
.checkStyle {
  font-size: 0.12rem;
  // color: #3980fe !important;
  // font-weight: bold;
  background: linear-gradient(90deg, #2a77ff 0%, #5592fe 100%);
  box-shadow: 0rem 0.03rem 0.06rem rgba(42, 119, 255, 0.16);
  border-radius: 0.04rem;
  color: #fff !important;
}
.selectStyle {
  background: linear-gradient(90deg, #2a77ff 0%, #5592fe 100%);
  box-shadow: 0rem 0.03rem 0.06rem rgba(42, 119, 255, 0.16);
  border-radius: 0.04rem;
  color: #fff !important;
}

.el-aside {
  position: relative;
  background-color: #fff;
  color: #333;
  width: 2.56rem !important;
  height: 9.8rem;
  overflow: hidden;
  // margin-right: 2.56rem !important;
  .tac {
    // width: 2.57rem;
    margin-top: 0.26rem;
    .el-menu {
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      .el-menu-item {
        display: flex;
        align-items: center;
        margin-top: 0.12rem;
        font-size: 0.14rem;
        font-weight: bold;
        color: #ffffff;
        border-radius: 0.04rem;
        img {
          width: 0.24rem;
          height: 0.24rem;
        }
        span {
          margin-left: 0.2rem;
        }
      }
      .el-menu-item:hover {
        border-radius: 0.04rem;
        background-color: #f6f6f6;
      }
    }
  }
}

.el-main {
  height: 95vh;
  margin-left: 0.2rem;
  overflow-y: auto;
  overflow-x: hidden;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 2.6rem;
}
.el-container:nth-child(7) .el-aside {
  line-height: 3.2rem;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 4rem;
}
::v-deep .el-badge__content {
  background-color: #f56c6c;
  border-radius: 0.1rem;
  color: #fff;
  display: inline-block;
  font-size: 0.12rem;
  height: 0.18rem;
  line-height: 0.2rem;
  padding: 0 0.08rem;
  text-align: center;
  white-space: nowrap;
  border: none;
}
::v-deep .el-badge__content.is-fixed {
  position: absolute;
  top: 0.05rem;
  right: 0.13rem;
  transform: translateY(-50%) translateX(100%);
}
.el-dropdown-link {
  cursor: pointer;
  // color: #409eff;
}
.el-icon-arrow-down {
  font-size: 0.12rem;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 0.14rem;
  margin-bottom: 0.2rem;
}
.el-dropdown-menu {
  position: relative;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 0.1rem 0;
  margin: 0.05rem 0;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 0.04rem;
  box-shadow: 0rem 0.03rem 0.04rem rgba(0, 0, 0, 0.16);
  .notices {
    width: 4.6rem;
    height: 5.36rem;
    position: relative;
    .time-img {
      &:hover .img1 {
        background-image: url(../assets/image/home/topbar_notice_history_h.svg) !important;
      }
      &:active .img1 {
        background-image: url(../assets/image/home/topbar_notice_history_p.svg) !important;
      }
      .img1 {
        position: absolute;
        z-index: 98;
        right: 0.4rem;
        top: 0.12rem;
        width: 0.2rem;
        height: 0.2rem;
        display: flex;
        align-items: center;
        background-image: url(../assets/image/home/topbar_notice_history_n.svg) !important ;
        background-repeat: no-repeat;
        background-size: cover;
        cursor: pointer;
      }
    }
  }
}
.el-tabs {
  padding-left: 0.3rem;
}
::v-deep .el-tabs__nav {
  white-space: nowrap;
  position: relative;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  float: left;
  z-index: 2;
  display: flex;
}
::v-deep .el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0;
}
::v-deep .el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0rem;
  background-color: #e4e7ed;
  z-index: 1;
}
::v-deep .el-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0.04rem;
  background-color: #5592fe;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 0.5rem;
  list-style: none;
}
::v-deep .el-tabs__item.is-active {
  font-size: 0.16rem;
  color: #5592fe;
}
::v-deep .el-tabs__item {
  padding: 0 0.2rem;
  height: 0.4rem;
  box-sizing: border-box;
  line-height: 0.4rem;
  display: inline-block;
  list-style: none;
  font-size: 0.16rem;
  color: #666666;
  position: relative;
}
.notice-message {
  height: 4.95rem;
  width: 100%;
  overflow: auto;
  padding-right: 30px;
  // padding-left: 30px;
  // padding-right: 0.3rem;
  .notice {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.7rem;
    padding: 10px 0px 10px 0px;
    &:hover {
      background-color: #e8e8e8;
    }
    &:active {
      background-color: #c2c2c2;
    }
    .left-item {
      display: flex;
      align-items: center;

      .img {
        display: flex;
        align-items: center;
        width: 0.15rem;
        height: 0.15rem;
        // background-color: #2a77ff;
        img {
          width: 0.15rem;
          height: 0.15rem;
        }
      }
      .info {
        width: 100%;
        font-size: 0.14rem;
        color: #333334;
        padding-left: 0.15rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
    .time {
      min-width: 22%;
      // padding-right: 0.3rem;
      font-size: 0.14rem;
      color: #c3c3c3;
      text-align: right;
    }
  }
}
</style>
