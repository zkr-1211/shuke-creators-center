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
                  <MainContent
                    :list="zhuanlanList"
                    :isManage="true"
                    v-if="tabIndex == 1"
                    @seletcItem="seletcItem"
                    :post_id="post_id"
                  />
                  <MainContent
                    :list="infos"
                    :isManage="true"
                    @seletcItem="seletcItem"
                    :post_id="post_id"
                    v-else
                  />
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <div class="right">
                <CommentContent
                  :list="commentList"
                  :post_id="post_id"
                  @seletcItem="seletcItem"
                />
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
    </div>
  </div>
</template>
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
  getLatestCommentList,
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
      commentList: [],
      zhuanlanTotalNum: 0,
      infosTotalNum: 0,
      tabIndex: 0,
      post_id: null,
      isLoading: false,
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
      query3: {
        postId: null,
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
        this.post_id = this.infos[0].post_id;
        this.infosTotalNum = res.paginateInfo.totalNum;
        this.isLoading = false;
      } catch (error) {}
    },

    tabsIndex(index) {
      this.tabIndex = index;
    },
    async seletcItem(post_id) {
      try {
        // this.isLoading = true;
        this.query3.postId = post_id * 1;
        const res = await getLatestCommentList(this.query3);
        this.commentList = res.list;
        // this.isLoading = false;
        console.log("res", res.list);
      } catch (error) {}
    },
  },
};
</script>
<style lang='scss' scoped>
.body {
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
        padding: 0rem 0.2rem 0.2rem 0.2rem;
        background-color: #ffffff;
      }
    }
  }
}
</style>