<template>
  <div class="body">
    <div class="content">
      <Navigation :tabList="tabList" />
      <div class="total-dynaic">共{{ infos.length }}条动态</div>
      <div class="content-item" v-for="(item, index) in infos" :key="index">
        <div class="time">{{ item.created_at }}</div>
        <div class="title">
          {{ item.title }}
        </div>
        <ImgContent :imgList="item.contents" />
        <div class="bottom-content">
          <div class="bottom-content-left">
            <div class="liulan">浏览量 {{ item.view_number }}</div>
            <div class="comment">评论 {{ item.comment_number }}</div>
            <div class="dianzan">点赞 {{ item.like_number }}</div>
            <div class="topic" v-if="item.topic_title">
              话题 # {{ item.topic_title }} #
            </div>
          </div>
          <div class="bottom-content-right">
            <div class="look-comment">查看评论</div>
            <div class="delete-work" @click="deletePost(item.post_id)">
              删除作品
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/navigation/Navigation.vue";
import ImgContent from "@/components/imgContent/ImgContent.vue";
import {
  getMyColumnList,
  getMyNewsList,
  deletePost,
} from "@/api/zhuanlan/zhuanlan";
export default {
  components: {
    Navigation,
    ImgContent,
  },
  data() {
    return {
      zhuanlanList: [],
      infos: [],
      zhuanlanTotalNum: 0,
      infosTotalNum: 0,
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
          title: "视频",
        },
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
    deletePost(post_id) {
      this.$confirm("此操作将删除该帖子, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await deletePost(post_id);
          this.infos.forEach((item, index) => {
            if (item.post_id === post_id) {
              this.infos.splice(index, 1);
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang='scss' scoped>
.body {
  .content {
    margin-top: 0.2rem;
    padding: 0.12rem 0.6rem 0rem 0.6rem;
    width: 100%;
    height: 100vh;
    background: #ffffff;
    opacity: 1;
    border-radius: 8px;
    .total-dynaic {
      margin-top: 0.3rem;
      font-size: 0.14rem;
      color: #999999;
    }
    .content-item {
      padding: 0.16rem 0.24rem 0.16rem 0.24rem;
      margin-top: 0.2rem;
      background: #fafafb;
      position: relative;
      .time {
        position: absolute;
        top: 0.16rem;
        right: 0.24rem;
        font-size: 0.16rem;
        color: #999999;
      }
      .title {
        width: 5.59rem;
        font-size: 0.16rem;
        color: #333333;
        margin-bottom: 0.08rem;
      }

      .bottom-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.12rem;
        .bottom-content-left {
          font-size: 0.14rem;
          color: #999999;
          display: flex;
          align-items: center;
          justify-content: center;
          .liulan {
          }
          .comment {
            margin-left: 0.3rem;
          }
          .dianzan {
            margin-left: 0.3rem;
          }
          .topic {
            margin-left: 0.3rem;
          }
        }
        .bottom-content-right {
          font-size: 0.14rem;
          color: #333333;
          display: flex;
          align-items: center;
          justify-content: center;
          .look-comment {
            margin-right: 0.3rem;
            cursor: pointer;
          }
          .delete-work {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>