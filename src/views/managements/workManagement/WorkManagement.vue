<template>
  <div class="body">
    <div class="content">
      <Navigation :tabList="tabList" @tabsIndex="tabsIndex" />
      <el-skeleton :rows="6" animated v-if="isLoading" />
      <template v-else>
        <div class="total-dynaic" v-if="tabIndex == 0">
          共{{ infos.length }}条动态
        </div>
        <div class="total-dynaic" v-if="tabIndex == 1">
          共{{ zhuanlanList.length }}条专栏
        </div>
        <template v-if="tabIndex == 0">
          <MainContent :list="infos" />
          <div class="loadMore" @click="loadMore1" v-if="infos.length>=1">{{textTip1}}</div>
        </template>
        <template v-else-if="tabIndex == 1">
          <MainContent :list="zhuanlanList" />
          <div class="loadMore" @click="loadMore2" v-if="zhuanlanList.length>=1">{{textTip2}}</div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/navigation/Navigation.vue";
import ImgContent from "@/components/imgContent/ImgContent.vue";
import MainContent from "@/components/mainContent/MainContent.vue";
import { loadMorePost } from "@/mixins/mixins";
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
  },
    mixins: [loadMorePost],
  data() {
    return {
      zhuanlanList: [],
      infos: [],
      zhuanlanTotalNum: 0,
      infosTotalNum: 0,
      tabIndex: 0,
      textTip1: "查看更多",
      textTip2: "查看更多",
      isLoading: false,
      tabList: [
        {
          title: "动态",
        },
        // {
        //   title: "视频",
        // },
        {
          title: "专栏",
        },
        {
          title: "草稿箱",
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
    //动态
    async getMyNewsList() {
      try {
        this.isLoading = true;
        const res = await getMyNewsList(this.query2);
        this.infos = res.list;
        this.infosTotalNum = res.paginateInfo.totalNum;
        this.isLoading = false;
        if (res.paginateInfo.hasNext) {
          this.textTip1 = "查看更多";
        }
      } catch (error) {}
    },
    //专栏
    async getMyColumnList() {
      try {
        this.isLoading = true;
        const res = await getMyColumnList(this.query1);
        this.zhuanlanList = res.list;
        this.zhuanlanTotalNum = res.paginateInfo.totalNum;
        this.isLoading = false;
        if (res.paginateInfo.hasNext) {
          this.textTip2 = "查看更多";
        }
      } catch (error) {}
    },

    tabsIndex(index) {
      this.tabIndex = index;
    },
  },
};
</script>
<style lang='scss' scoped>
.loadMore {
  margin-top: 0.3rem;
  cursor: pointer;
  font-size: 0.14rem;
  text-align: center;
}
.content {
  min-height: 90vh;
  padding: 0.1rem 0.3rem 0.3rem 0.3rem;
  background-color: #ffffff;
  .total-dynaic {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    font-size: 0.14rem;
    color: #999999;
  }
}
</style>