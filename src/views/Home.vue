<template>
  <div class="home" id="full-Screen">
    <Header @fullScreenEvent="fullScreenEvent" />
    <el-container>
      <el-container>
        <el-aside class="hidden-md-and-down">
          <el-row class="tac">
            <el-col>
              <el-menu
                router
                text-color="#666666"
                :default-active="activePath"
                class="el-menu-vertical-demo"
                @select="handleSelect"
                @open="handleOpen"
                @close="handleClose"
              >
                <el-menu-item
                  @click="saveNavState('/')"
                  index="/"
                  :class="selectIndex == '/' ? 'selectStyle' : ''"
                >
                  <img
                    v-if="selectIndex == '/'"
                    src="@/assets/image/leftbar/leftbar_home_s.svg"
                    alt=""
                  />
                  <img
                    v-else
                    src="@/assets/image/leftbar/leftbar_home_n.svg"
                    alt=""
                  />
                  <span>首页</span>
                </el-menu-item>

                <el-submenu index="1">
                  <template slot="title">
                    <img
                      src="@/assets/image/leftbar/leftbar_course_n.svg"
                      alt=""
                    />
                    <span class="left-title">创作</span>
                    <!-- </el-menu-item> -->
                  </template>
                  <el-menu-item-group>
                    <el-menu-item
                      @click="saveNavState('/creations/dynaic')"
                      index="/creations/dynaic"
                      class="left-title-item"
                      :class="
                        selectIndex == '/creations/dynaic' ? 'checkStyle' : ''
                      "
                      >动态</el-menu-item
                    >
                    <el-menu-item
                      @click="saveNavState('/creations/video')"
                      index="/creations/video"
                      class="left-title-item"
                      :class="
                        selectIndex == '/creations/video' ? 'checkStyle' : ''
                      "
                      >视频</el-menu-item
                    >
                    <el-menu-item
                      @click="saveNavState('/creations/zhuan_lan')"
                      index="/creations/zhuan_lan"
                      class="left-title-item"
                      :class="
                        selectIndex == '/creations/zhuan_lan'
                          ? 'checkStyle'
                          : ''
                      "
                      >专栏</el-menu-item
                    >
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <img
                      v-if="selectIndex == '/allequipment'"
                      src="@/assets/image/leftbar/leftbar_course_s.svg"
                      alt=""
                    />
                    <img
                      v-else
                      src="@/assets/image/leftbar/leftbar_course_n.svg"
                      alt=""
                    />
                    <span class="left-title">管理</span>
                    <!-- </el-menu-item> -->
                  </template>
                  <el-menu-item-group>
                    <el-menu-item
                      @click="saveNavState('/managements/workmanagement')"
                      index="/managements/workmanagement"
                      class="left-title-item"
                      :class="
                        selectIndex == '/managements/workmanagement'
                          ? 'checkStyle'
                          : ''
                      "
                      >作品管理</el-menu-item
                    >
                    <el-menu-item
                      @click="saveNavState('/managements/commentmanagement')"
                      index="/managements/commentmanagement"
                      class="left-title-item"
                      :class="
                        selectIndex == '/managements/commentmanagement'
                          ? 'checkStyle'
                          : ''
                      "
                      >评论管理</el-menu-item
                    >
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
          <keep-alive exclude="Detail">
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
    <el-drawer
      :modal="true"
      :show-close="false"
      size="28%"
      title=""
      :visible.sync="drawer"
      :direction="direction"
    >
      <el-menu
        router
        text-color="#666666"
        :default-active="activePath"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item
          @click="saveNavState('/')"
          index="/"
          :class="selectIndex == '/' ? 'selectStyle' : ''"
        >
          <img
            v-if="selectIndex == '/'"
            src="@/assets/image/leftbar/leftbar_home_s.svg"
            alt=""
          />
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
            <el-menu-item
              @click="saveNavState('/creations/dynaic')"
              index="/creations/dynaic"
              class="left-title-item"
              :class="selectIndex == '/creations/dynaic' ? 'checkStyle' : ''"
              >动态</el-menu-item
            >
            <el-menu-item
              @click="saveNavState('/creations/video')"
              index="/creations/video"
              class="left-title-item"
              :class="selectIndex == '/creations/video' ? 'checkStyle' : ''"
              >视频</el-menu-item
            >
            <el-menu-item
              @click="saveNavState('/creations/zhuan_lan')"
              index="/creations/zhuan_lan"
              class="left-title-item"
              :class="selectIndex == '/creations/zhuan_lan' ? 'checkStyle' : ''"
              >专栏</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <img
              v-if="selectIndex == '/allequipment'"
              src="@/assets/image/leftbar/leftbar_course_s.svg"
              alt=""
            />
            <img
              v-else
              src="@/assets/image/leftbar/leftbar_course_n.svg"
              alt=""
            />
            <span class="left-title">管理</span>
            <!-- </el-menu-item> -->
          </template>
          <el-menu-item-group>
            <el-menu-item
              @click="saveNavState('/managements/workmanagement')"
              index="/managements/workmanagement"
              class="left-title-item"
              :class="
                selectIndex == '/managements/workmanagement' ? 'checkStyle' : ''
              "
              >作品管理</el-menu-item
            >
            <el-menu-item
              @click="saveNavState('/managements/commentmanagement')"
              index="/managements/commentmanagement"
              class="left-title-item"
              :class="
                selectIndex == '/managements/commentmanagement'
                  ? 'checkStyle'
                  : ''
              "
              >评论管理</el-menu-item
            >
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
import HelloWorld from "@/components/HelloWorld.vue";
import Header from "@/components/header/Header.vue";
import { fullScreenMixin } from "@/mixins/mixins";
export default {
  name: "Home",
  components: {
    HelloWorld,
    Header,
  },
  mixins: [fullScreenMixin],
  data() {
    return {
      drawer: false,
      direction: "ltr",
      selectIndex: 1,
      activePath: "",
      activeName: "first",
      isNotic: false,
      isFullscreen: true,
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
    this.selectIndex = this.activePath || "/";
  },
  mounted() {
    this.selectIndex = this.$route.path;
  },
  methods: {
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
        color: #666666;
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
</style>
