<!--  -->
<template>
  <div class="body">
    <div class="navigation">
      <el-row :gutter="32" class="el-row">
        <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
          <div>
            <Tabs :tabList="tabList" @tabsIndex="tabsIndex" />
            <div class="empty" v-if="false">
              <div class="img">
                <img src="@/assets/image/home/img_empty_big.svg" alt="" />
              </div>
              <div class="text">还未创建任何课程</div>
              <div class="button">
                <el-button type="primary">前往创建</el-button>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
          <div class="right-search">
            <div class="search">
              <template v-if="filtrate">
                <div class="search-text">共10个</div>
                <el-dropdown trigger="click" placement="bottom-end">
                  <span class="el-dropdown-link">
                    <div class="search-text">
                      按名称A-Z <i class="el-icon-caret-bottom"></i>
                    </div>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>A</el-dropdown-item>
                    <el-dropdown-item>Z</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>

              <div>
                <input type="text" placeholder="搜索你想要的班级" />
                <i class="el-icon-search"></i>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Tabs from "@/components/tabs/Tabs.vue";
export default {
  components: {
    Tabs,
  },
  props: {
    tabList: {
      type: Array,
      default: [
        {
          title: "默认文本",
        },
      ],
    },
    filtrate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tabIndex: 0,
    };
  },
  computed: {},

  mounted() {},

  methods: {
    tabsIndex(index) {
      this.$emit("tabsIndex", index);
      console.log("this.tabIndex", index, this.$parent.$parent);
    },
  },
};
</script>
<style lang='scss' scoped>
i {
  font-size: 0.18rem !important;
}
.navigation {
  margin-top: 0.3rem;
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  // background-color: #2a77ff;
  position: relative;
  .right-search {
    background-color: RED;
    margin-bottom: 0.12rem;
    position: relative;
    .search {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      .search-text {
        width: 1.2rem;
      }
      > div {
        font-size: 0.16rem;
        font-weight: bold;
        color: #c3c3c3;
        margin-right: 0.3rem;
        input {
          width: 3.66rem;
          height: 0.38rem;
          background: #ffffff;
          box-shadow: 0rem 0.03rem 0.06rem rgba(0, 0, 0, 0.2);
          border-radius: 0.35rem;
          border: none;
          padding-left: 0.2rem;
          font-size: 0.14rem;
          color: #999999;
          line-height: 1.38rem;
        }
        .el-icon-search {
          font-size: 0.2rem;
          position: absolute;
          right: 0.5rem;
          top: 0.1rem;
          font-weight: 900;
        }
        ::-webkit-input-placeholder {
          font-size: 0.14rem;
          line-height: 0.24rem;
          color: #999999;
        }
        /* 使用webkit内核的浏览器 */
        :-moz-placeholder {
          font-size: 0.14rem;
          line-height: 0.24rem;
          color: #999999;
        }
        /* Firefox版本4-18 */
        ::-moz-placeholder {
          font-size: 0.14rem;
          line-height: 0.24rem;
          color: #999999;
        }
        /* Firefox版本19+ */
        :-ms-input-placeholder {
          font-size: 0.14rem;
          line-height: 0.24rem;
          color: #999999;
        }
        /* IE浏览器 */
      }
    }
    // justify-content: space-between;
  }
  .empty {
    // position: absolute;
    // top: 0;
    // left: 0;
    // transform: translate(-50%, -50%);
    margin: 2rem 6rem 2rem 2rem;
    height: 3.3rem;
    // width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    // background-color: #2a77ff;
    .img {
      width: 3rem;
      height: 1.91rem;
      img {
        width: 3rem;
        height: 1.91rem;
      }
    }
    .text {
      font-size: 0.2rem;
      font-weight: bold;
      color: #999999;
    }
    .button {
      font-size: 0.14rem;
      font-weight: bold;
      color: #f4f4f4;
      .el-button {
        background: #2a77ff;
        box-shadow: 0rem 0.03rem 0.06rem rgba(42, 119, 255, 0.2);
        &:hover {
          background: #5592fe;
        }
        &:active {
          background: #2065e0;
        }
      }
    }
  }
}
</style>