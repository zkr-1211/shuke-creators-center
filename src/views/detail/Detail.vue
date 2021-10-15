<!--  -->
<template>
  <div class="body">
    <Header @fullScreenEvent="fullScreenEvent" class="Header"/>
    <div class="main">
      <div class="title">Underdog工作室纳新计划</div>
      <div class="des">
        <div class="time-name">
          <span>2021-10-09 11:01·chaeYL</span>
          <span>话题#纳新计划#</span>
        </div>
        <div class="view-number">浏览量123</div>
      </div>
      <div class="content">
        锵锵！期待已久的Underdog工作室纳新计划来啦，你是否曾迷茫，大学只学了理论基础，而无法应用实际：又是否曾困惑，想要学一门编程语言，而不知从何开始。还是否苦于每日在打游戏的宿舍里，无人和你一同研究专业技术。那这次一定要把握机会，只要你拥有一定的自主学习能力，又迫于想爆发自己的idea，那就快来加入我们吧！
        我们的成果：树课智慧教室，树课教学平台，产业地图大数据平台，AI来了智能学习套件，导盲系列（导盲背包盲人地图),
        船政系列VR游戏，线上3D游戏导览等 扫码进群报名
      </div>
      <div class="comment">
        <div class="comment-title">评论123</div>
        <CommentContent @fullScreenEvent="fullScreenEvent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Button from "@/components/button/Button.vue";
import CommentContent from "@/components/commentContent/CommentContent.vue";
import { fullScreenMixin } from "@/mixins/mixins";
export default {
  components: { Header, Button,CommentContent },
  mixins: [fullScreenMixin],

  data() {
    return {
      commentValue: "",
      isReceive: false,
    };
  },
  computed: {},

  mounted() {},

  methods: {
    
  },
};
</script>
<style lang='scss' scoped>
.body {
    .Header{
        position: fixed;
        top: 0;
        width: 100%;
    }
  .main {
    width: 8.16rem;
    margin: 1rem auto;
    background-color: #ffffff;
    padding: 0.6rem;
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