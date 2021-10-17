<!--  -->
<template>
  <div class="body">
    <div class="left-bar">
      <div class="like" @click="likePosts(data.post_id)">
        <div>
          <img src="@/assets/image/home/ic_praise_n.svg" alt="" />
        </div>
        <span>{{ data.like_number }}</span>
      </div>
      <div class="like" @click="toComment">
        <div>
          <img src="@/assets/image/home/ic_comment.svg" alt="" />
        </div>
        <span>{{ data.comment_number }}</span>
      </div>
      <div class="like">
        <div>
          <img src="@/assets/image/home/ic_collection_n.svg" alt="" />
        </div>
        <span>0</span>
      </div>
    </div>
  </div>
</template>

<script>
import { likePosts, unLikePosts } from "@/api/zhuanlan/zhuanlan";
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  computed: {},

  mounted() {},

  methods: {
    async likePosts(post_id) {
      try {
        if (this.data.is_like) {
          console.log("object111");
          await unLikePosts(post_id);
          this.data.is_like = false;
          this.data.like_number--;
        } else {
          console.log("object");
          await likePosts(post_id);
          this.data.is_like = true;
          this.data.like_number++;
        }
      } catch (error) {}
    },
    toComment(){
      this.$emit('toComment')
    },
  },
};
</script>
<style lang='scss' scoped>
.left-bar {
  position: absolute;
  top: 1.2rem;
  left: -0.7rem;
  font-size: 0.12rem;
  color: #222222;
  .like {
    cursor: pointer;
    margin-top: 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      margin-top: 0.05rem;
    }
  }
}
</style>