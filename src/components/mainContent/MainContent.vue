<!--  -->
<template>
  <div class="body">
    <template v-for="item in list">
      <!-- 动态 -->
      <div class="content-item" @click="toDetail(item.post_id)">
        <div
          :class="item.post_id == post_id1 ? 'bar' : ''"
          v-if="isManage"
        ></div>
        <div class="time" v-if="!isManage">{{ item.created_at }}</div>
        <div class="title">
          {{ item.title }}
        </div>
        <ImgContent :imgList="[item.contents[0]]" v-if="item.posts_type == 1" />
        <template v-if="item.contents[1]">
          <ImgContent
            :imgList="item.contents"
            :isDynaic="true"
            v-if="item.posts_type == 0 && item.contents[1].type != 'video'"
          />
          <video
            controls="controls"
            :poster="item.contents[0].value"
            v-if="item.contents[1].type == 'video'"
          >
            <source :src="item.contents[1].value" />
          </video>
        </template>
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
            <div class="look-comment" v-if="!isManage">查看评论</div>
            <div
              class="delete-work"
              v-if="!isManage"
              @click="deletePost(item.post_id)"
            >
              删除作品
            </div>
          </div>
        </div>
      </div>
      <!-- 专栏 -->
      <!-- <router-link :to="{path:'/detail',query:{post_id:item.post_id}}" :key="item.post_id+1">
        <div class="content-item" v-if="tabIndex == 2">
          <div class="time">{{ item.created_at }}</div>
          <div class="title">
            {{ item.title }}
          </div>
          <ImgContent :imgList="[item.contents[0]]" v-if="item.posts_type == 1" />
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
      </router-link> -->
    </template>
  </div>
</template>

<script>
import ImgContent from "@/components/imgContent/ImgContent.vue";
export default {
  components: { ImgContent },
  props: {
    list: {
      type: Array,
      default: [],
    },
    isManage: {
      type: Boolean,
      default: false,
    },
    post_id: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      post_id1: null,
    };
  },
  computed: {},
  watch: {
    post_id(newVal, old) {
      this.$emit("seletcItem", newVal);
      this.post_id1 = newVal
    },
  },
  mounted() {
  },

  methods: {
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
    toDetail(post_id) {
      if (!this.isManage) {
        this.$router.push({
          path: "/detail",
          query: {
            post_id,
          },
        });
      } else {
         
        this.list.map((item) => {
          if (item.post_id == post_id) {
            this.post_id1 = item.post_id;
          }
        });
        this.$emit("seletcItem", this.post_id1);
       
      }
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
    border-radius: 0.08rem;
    .content-item {
      background-color: #fafafb;
      padding: 0.2rem;
      margin-bottom: 0.2rem;
      position: relative;
      .bar {
        position: absolute;
        left: 0;
        top: 0;
        width: 0.05rem;
        height: 100%;
        background: #2a77ff;
        z-index: 9;
      }
      video {
        width: 2.85rem;
        height: 1.6rem;
      }
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