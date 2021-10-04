<!--  -->
<template>
  <div class="body">
    <el-header>
      <div class="nav_drawer drawer-show" @click="drawer = true">
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
              <a href="/accountInfomation">
                <el-dropdown-item>账户信息</el-dropdown-item>
              </a>

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
                    <a href="/allNotice">
                      <div class="img1"></div>
                    </a>
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
              <span v-if="!isFullScren">全屏模式</span>
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
  data() {
    return {
      isNotic: false,
      isFullScren: false,
    };
  },
  computed: {},

  mounted() {
  },
  methods: {
    fullScreenEvent() {
      console.log("eee")
      this.$emit('fullScreenEvent')
    }
  }
};
</script>
<style lang='scss' scoped>
.el-header {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  // line-height: 0.6rem;
  width: 100%;
  height: 0.64rem !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem;
  position: relative;
  border-bottom: 0.01rem solid #efefef;
  .nav_drawer {
    position: absolute;
    left: 0.2rem;
    bottom: -12px;
    margin-left: 0.15rem;
    display: none;
    cursor: pointer;
  }
  // .drawer-show{
  //   display: block;
  // }

  @media only screen and (max-width: 1200px) {
    .drawer-show {
      display: block;
    }
    .shuke-logo {
      margin-left: 0.9rem !important;
    }
  }
  @media only screen and (max-width: 550px) {
    .shuke-logo {
      font-size: 0.12rem !important;
      padding-right: 0.5rem;
    }
  }

  .shuke-logo {
    margin-left: 0.4rem;
    display: flex;
    align-items: center;
    img {
      width: 1.76rem;
      height: 0.36rem;
    }
  }
  .right-person {
    width: 3.8rem;
    height: 0.64rem;
    background-color: #2a77ff;
    display: flex;
    justify-content: center;
    position: relative;
    .trigon {
      left: -0.34rem;
      position: absolute;
      width: 0;
      height: 0;
      border-color: #2a77ff transparent;
      border-width: 0 0 0.64rem 0.34rem;
      border-style: solid;
    }
    .right {
      width: 3.6rem;
      // margin-left: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .header {
        background-color: #fff;
        width: 0.36rem;
        height: 0.36rem;
        // background: rgba(0, 0, 0, 0);
        box-shadow: 0rem 0.03rem 0.06rem rgba(0, 0, 0, 0.16);
        border-radius: 50%;
        display: flex;
        align-items: center;
        img {
        }
      }
      .message {
        position: relative;
        width: 0.6rem;
        height: 0.64rem;
        display: flex;
        align-items: center;
        img {
          width: 0.36rem;
          height: 0.36rem;
        }
      }
      .full-screen {
        cursor: pointer;
        margin-left: 0.1rem;
        display: flex;
        align-items: center;
        .image {
          display: flex;
          width: 0.34rem;
          height: 0.34rem;
        }
        .text {
          font-size: 0.16rem;
          color: #ffffff;
          margin-left: 0.12rem;
        }
      }
    }
    .name {
      font-size: 0.2rem;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #ffffff;
      margin-left: 0.2rem;
    }
  }
}
</style>