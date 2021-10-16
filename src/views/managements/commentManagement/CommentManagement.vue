<template>
  <div class="body">
    <div class="content">
      <Navigation :tabList="tabList" @tabsIndex="tabsIndex" />
      <div class="total-dynaic" v-if="tabIndex == 0">共{{ infos.length }}条动态</div>
      <div class="total-dynaic" v-if="tabIndex == 1">共{{ zhuanlanList.length }}条专栏</div>
      <div class="manmge">
        <div class="left">
          <div class="item" v-for="(item,index) in 5" :key="index">
            <MainContent :list="zhuanlanList" />
          </div>
        </div>
        <div class="right">
          <CommentContent :list="zhuanlanList" />
        </div>
      </div>

      <!-- <MainContent :list="infos" v-if="tabIndex == 0" />
      <MainContent :list="zhuanlanList" v-else-if="tabIndex == 1" /> -->
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/navigation/Navigation.vue";
import ImgContent from "@/components/imgContent/ImgContent.vue";
import MainContent from "@/components/mainContent/MainContent.vue";
import CommentContent from "@/components/commentContent/CommentContent.vue";
import {
  getMyColumnList,
  getMyNewsList,
  deletePost,
} from "@/api/zhuanlan/zhuanlan";
export default {
  components: {
    Navigation,
    ImgContent,
    MainContent,
    CommentContent,
  },
  data() {
    return {
      zhuanlanList: [],
      infos: [],
      zhuanlanTotalNum: 0,
      infosTotalNum: 0,
      tabIndex: 0,
      query1: {
        userId: 3956,
        pageNum: 1,
        pageSize: 10,
      },
      query2: {
        userId: 3956,
        pageNum: 1,
        pageSize: 10,
      },
      tabList: [
        {
          title: "动态",
        },
        {
          title: "专栏",
        },
      ],
    };
  },
  computed: {},

  mounted() {
    this.getMyColumnList();
    this.getMyNewsList();
  },

  methods: {
    //专栏
    async getMyColumnList() {
      const res = await getMyColumnList(this.query1);
      this.zhuanlanList = this.zhuanlanList.concat(res.list);
      this.zhuanlanTotalNum = res.paginateInfo.totalNum;
      console.log("this.zhuanlanList", this.zhuanlanList, res);
    },
    //动态
    async getMyNewsList() {
      const res = await getMyNewsList(this.query2);
      this.infos = this.infos.concat(res.list);
      this.infosTotalNum = res.paginateInfo.totalNum;
      console.log("this.infos", this.infos, res);
    },

    tabsIndex(index) {
      this.tabIndex = index;
    },
  },
};
</script>
<style lang='scss' scoped>
.body {
  .content {
    max-height: 90vh;
    padding: 0.1rem 0.3rem 0.3rem 0.3rem;
    background-color: #ffffff;
    .total-dynaic {
      font-size: 0.14rem;
      color: #999999;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
    }
    .manmge {
      display: flex;
      width: 100%;
      overflow: hidden;
      .left {
        min-width: 8rem;
        height: 70vh;
        overflow: auto;
        overflow-x: hidden;
        .item {
        }
      }
      .right {
        flex: 1;
        background-color: rgb(102, 86, 86);
      }
    }
  }
}
</style>