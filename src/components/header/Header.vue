<!--  -->
<template>
  <div class="body">
    <el-header>
      <div class="nav_drawer drawer-show" @click="drawer()">
        <img src="@/assets/image/home/ic_nav_drawer.svg" alt="" />
      </div>
      <div class="shuke-logo">
        <img src="@/assets/image/home/icon_shuke.svg" alt="" />
      </div>
      <div class="right-person">
        <div class="trigon"></div>
        <div class="right">
          <el-dropdown trigger="click" placement="bottom-end">
            <span class="el-dropdown-link">
              <div class="header"></div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>账户信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="name">张克榕</div>
          <div class="message">
            <el-dropdown trigger="click" placement="bottom-end">
              <span class="el-dropdown-link">
                <el-badge :value="12" class="item">
                  <img
                    src="@/assets/image/home/topbar_notice.svg"
                    alt=""
                    @click="isNoticF()"
                  />
                </el-badge>
              </span>
              <el-dropdown-menu slot="dropdown">
                <div class="notices">
                  <div class="time-img">
                    <div class="img1"></div>
                  </div>
                  <el-tabs
                    value="first"
                    @tab-click="handleClick"
                    v-if="isNotic"
                  >
                    <el-tab-pane label="用户管理" name="first">
                      <div class="notice-message">
                        <div
                          class="notice"
                          v-for="(item, index) in 10"
                          :key="index"
                        >
                          <div class="left-item">
                            <div class="img">
                              <img
                                src="@/assets/image/home/topbar_notice_label.svg"
                                alt=""
                              />
                            </div>
                            <div class="info">
                              陈小平 提醒您修改 课程:UI设计 标设计陈小平 陈小平
                              提醒您修改 课程:UI设计 标设计陈小平 陈小平
                              提醒您修改 课程:UI设计 标设计陈小平
                            </div>
                          </div>

                          <div class="time">01月21日</div>
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="配置管理" name="second">
                      <div class="notice-message">
                        <div
                          class="notice"
                          v-for="(item, index) in 0"
                          :key="index"
                        >
                          <div class="left-item">
                            <div class="img">
                              <img
                                src="@/assets/image/home/topbar_notice_label.svg"
                                alt=""
                              />
                            </div>
                            <div class="info">
                              陈小平 提醒您修改 课程:UI设计 标设计 111
                              提醒您修改 课程:UI设计 标设计
                            </div>
                          </div>

                          <div class="time">01月21日</div>
                        </div>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="full-screen" @click="fullScreenEvent">
            <div class="image">
              <img src="@/assets/image/home/icon_fullscreen_b.svg" alt="" />
            </div>
            <div class="text">
              <span v-if="this.$parent.isFullscreen">全屏模式</span>
              <span v-else>退出全屏</span>
            </div>
          </div>
        </div>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  components: {},
  props:{
  },
  data() {
    return {
      isNotic: false,
    };
  },
  computed: {},

  mounted() {},
  methods: {
    drawer() {
      this.$parent.drawer = true;
    },
    isNoticF() {
      setTimeout(() => {
        this.isNotic = true;
      }, 10);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    fullScreenEvent() {
      this.$parent.isFullscreen = !this.$parent.isFullscreen
      this.$emit("fullScreenEvent");
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./header.scss"
</style>