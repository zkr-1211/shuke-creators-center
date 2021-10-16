<!--  -->
<template>
  <div class="body">
    <Header @fullScreenEvent="fullScreenEvent" class="Header" />
    <div class="main">
     <LeftBar :data="{comment_number:detail.comment_number,like_number:detail.like_number}"/>
      <div class="title">{{detail.title}}</div>
      <div class="des">
        <div class="time-name">
          <span>{{detail.created_at}} · {{detail.nickname}}</span>
          <span v-if="detail.topic_title">话题#{{detail.topic_title}}#</span>
        </div>
        <div class="view-number">浏览量{{detail.view_number}}</div>
      </div>
      <div class="content">
          <slot/>
      </div>
      <div class="comment">
        <div class="comment-title">评论{{detail.like_number}}</div>
        <CommentContent @fullScreenEvent="fullScreenEvent" :list='[]'/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Button from "@/components/button/Button.vue";
import LeftBar from "@/components/leftBar/LeftBar.vue";
import CommentContent from "@/components/commentContent/CommentContent.vue";
import { fullScreenMixin } from "@/mixins/mixins";
export default {
  components: { Header, Button, CommentContent,LeftBar },
  mixins: [fullScreenMixin],
  props:{
      detail:{
          type:Object,
          default:{}
      }
  },
  data() {
    return {
      commentValue: "",
      isReceive: false,
    };
  },
  computed: {},

  mounted() {},

  methods: {},
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
    height: 100%;

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
      .comment-title {
        font-size: 0.2rem;
        font-weight: bold;
        line-height: 0.34rem;
        color: #333333;
        height: 0.7rem;
        line-height: 0.7rem;
      }
    }
  }
}
</style>