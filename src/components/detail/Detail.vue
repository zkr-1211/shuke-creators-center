<!--  -->
<template>
  <div class="body">
    <Header @fullScreenEvent="fullScreenEvent" class="Header" />

    <div class="main">
      <el-skeleton :rows="6" animated v-if="isLoading" />
      <template v-else>
        <LeftBar :data="detail" @toComment="goComment('#comment')" />
        <div class="title">{{ detail.title }}</div>
        <div class="des">
          <div class="time-name">
            <span>
              {{ detail.created_at.substr(5, 11) }} ·
              {{ detail.nickname }}</span
            >
            <span v-if="detail.topic_title"
              >话题#{{ detail.topic_title }}#</span
            >
          </div>
          <div class="view-number">浏览量{{ detail.view_number }}</div>
        </div>
        <div class="content">
          <slot />
        </div>
      </template>
      <div class="comment" id="comment">
        <CommentContent
          @fullScreenEvent="fullScreenEvent"
          :list="commentList"
          :post_id="query.postId"
          @seletcItem="seletcItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Button from "@/components/button/Button.vue";
import LeftBar from "@/components/leftBar/LeftBar.vue";
import CommentContent from "@/components/commentContent/CommentContent.vue";
import TimeDiff from "@/components/timeDiff/TimeDiff.vue";
import { fullScreenMixin } from "@/mixins/mixins";
import { getLatestCommentList } from "@/api/zhuanlan/zhuanlan";
export default {
  components: { Header, Button, CommentContent, LeftBar, TimeDiff },
  mixins: [fullScreenMixin],
  props: {
    detail: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      commentValue: "",
      isReceive: false,
      isLoading: false,
      commentList: [],
      query: {
        postId: null,
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  computed: {},

  mounted() {
    this.query.postId = this.$route.query.post_id;
    this.seletcItem();
    if (this.$route.query.isToComment) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.goComment("#comment");
        }, 200);
      });
    }
  },

  methods: {
    goComment(id) {
      document.querySelector(id).scrollIntoView(true);
      let comment = this.$el.querySelector(id);
      console.log(comment);
      document.body.scrollTop = comment.offsetTop;
    },
    async seletcItem() {
      try {
        this.isLoading = true;
        const res = await getLatestCommentList(this.query);
        this.commentList = res.list;
        this.isLoading = false;
      } catch (error) {}
    },
  },
};
</script>
<style lang='scss' scoped>
.body {
  .Header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9;
  }
  .main {
    width: 8.16rem;
    border-radius: 0.2rem;
    margin: 1rem auto;
    background-color: #ffffff;
    padding: 0.6rem;
    position: relative;

    .title {
      font-size: 0.22rem;
      font-weight: bold;
      color: #333333;
    }
    .des {
      margin-top: 0.14rem;
      margin-bottom: 0.28rem;
      font-size: 0.14rem;
      color: #999999;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .time-name {
        span {
        }
        span:nth-of-type(2) {
          margin-left: 0.14rem;
        }
      }
      .view-number {
      }
    }
    .content {
      font-size: 0.16rem;
      line-height: 0.27rem;
      color: #333333;
    }
    .comment {
      margin-top: 0.3rem;
      border-top: 1px solid #e8e8e8;
    }
  }
}
</style>