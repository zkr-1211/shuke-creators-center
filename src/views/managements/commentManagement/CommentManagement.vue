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
        <div class="manmge">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <div class="left">
                <div class="item">
                  <template v-if="tabIndex == 0">
                    <MainContent :list="infos" :isManage="true" @seletcItem="seletcItem" :post_id="post_id" />
                    <div class="loadMore" @click="loadMore1" v-if="infos.length>=1">{{textTip1}}</div>
                  </template>
                  <template v-else>
                    <MainContent :list="zhuanlanList" :isManage="true" @seletcItem="seletcItem" :post_id="post_id" />
                    <div class="loadMore" @click="loadMore2" v-if="zhuanlanList.length>=1">{{textTip2}}</div>
                  </template>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <div class="right">
                <CommentContent :list="commentList" :post_id="post_id" @seletcItem="seletcItem" />
                <div class="loadMore" @click="loadMore" v-if="commentList.length>=10">{{textTip}}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/navigation/Navigation.vue";
import ImgContent from "@/components/imgContent/ImgContent.vue";
import MainContent from "@/components/mainContent/MainContent.vue";
import CommentContent from "@/components/commentContent/CommentContent.vue";
import { loadMoreComment, loadMorePost } from "@/mixins/mixins";
import {
  getMyColumnList,
  getMyNewsList,
  deletePost,
  getLatestCommentList,
} from "@/api/zhuanlan/zhuanlan";
export default {
  components: {
    Navigation,
    ImgContent,
    MainContent,
    CommentContent,
  },
  mixins: [loadMoreComment, loadMorePost],
  data() {
    return {
      zhuanlanList: [],
      infos: [],
      commentList: [],
      zhuanlanTotalNum: 0,
      infosTotalNum: 0,
      tabIndex: 0,
      post_id: null,
      isLoading: false,
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
    //动态
    async getMyNewsList() {
      try {
        this.isLoading = true;
        const res = await getMyNewsList(this.query2);
        this.infos = res.list;
        this.post_id = this.infos[0].post_id;
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
    async seletcItem(post_id) {
      try {
        this.queryComment.pageNum = 1;
        this.queryComment.postId = post_id * 1;
        const res = await getLatestCommentList(this.queryComment);
        this.commentList = res.list;
        if (res.paginateInfo.hasNext) {
          this.textTip = "查看更多";
        }
      } catch (error) {}
    },
  },
};
</script>
<style lang='scss' scoped>
.body {
  .loadMore {
    margin-top: 0.3rem;
    cursor: pointer;
    font-size: 0.14rem;
    text-align: center;
  }
  .content {
    // max-height: 92vh;
    // overflow: auto;
    padding: 0.1rem 0.3rem 0.3rem 0.3rem;
    background-color: #ffffff;
    .total-dynaic {
      font-size: 0.14rem;
      color: #999999;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
    }
    .manmge {
      overflow: hidden;
      .left {
        height: 70vh;
        overflow: auto;
        overflow-x: hidden;
        margin-bottom: 0.6rem;
        .item {
        }
      }
      .right {
        height: 70vh;
        overflow: auto;
        padding: 0rem 0.2rem 0.2rem 0.2rem;
        background-color: #ffffff;
      }
    }
  }
}
</style>