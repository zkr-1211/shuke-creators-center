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
        <MainContent :list="infos" v-if="tabIndex == 0" />
        <MainContent :list="zhuanlanList" v-else-if="tabIndex == 1" />
      </template>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/navigation/Navigation.vue";
import ImgContent from "@/components/imgContent/ImgContent.vue";
import MainContent from "@/components/mainContent/MainContent.vue";
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
    //专栏
    async getMyColumnList() {
      try {
        this.isLoading = true;
        const res = await getMyColumnList(this.query1);
        this.zhuanlanList = this.zhuanlanList.concat(res.list);
        this.zhuanlanTotalNum = res.paginateInfo.totalNum;
        this.isLoading = false;
      } catch (error) {}
    },
    //动态
    async getMyNewsList() {
      try {
        this.isLoading = true;
        const res = await getMyNewsList(this.query2);
        this.infos = this.infos.concat(res.list);
        this.infosTotalNum = res.paginateInfo.totalNum;
        this.isLoading = false;
      } catch (error) {}
    },

    tabsIndex(index) {
      this.tabIndex = index;
    },
  },
};
</script>
<style lang='scss' scoped>
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