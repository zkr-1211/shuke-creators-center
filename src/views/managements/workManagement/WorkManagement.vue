<template>
  <div class="body">
    <div class="content">
      <Navigation :tabList="tabList" />
      <div class="total-dynaic">共30条动态</div>
      <div class="content-item" v-for="(item, index) in 5" :key="index">
        <div class="time">2020-12-19 23:00</div>
        <div class="title">
          用各式的绘画定格历史难忘的瞬间， 用自己喜爱的音乐向祖国母亲告白；
          让足迹遍布祖国的山川大海， 以自己热爱的方式记录祖国的繁荣变迁；
          让中国龙飞向世界，带着民族的自豪与骄傲，
          让那一抹厚重耀眼的“中国红”在海洋深处，在世界之巅！
        </div>
        <ImgContent />
        <div class="bottom-content">
          <div class="bottom-content-left">
            <div class="liulan">浏览量123</div>
            <div class="comment">评论123</div>
            <div class="dianzan">点赞123</div>
            <div class="topic">话题 # NBA公园 #</div>
          </div>
          <div class="bottom-content-right">
            <div class="look-comment">查看评论</div>
            <div class="delete-work">删除作品</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/navigation/Navigation.vue";
import ImgContent from "@/components/imgContent/ImgContent.vue";
export default {
  components: {
    Navigation,
    ImgContent
  },
  data() {
    return {
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

  mounted() {},

  methods: {},
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