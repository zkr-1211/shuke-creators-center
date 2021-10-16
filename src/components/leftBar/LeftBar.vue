<!--  -->
<template>
  <div class='body'>
    <div class="left-bar">
      <div class="like">
        <div>
          <img src="@/assets/image/home/ic_praise_n.svg" alt="">
        </div>
        <span>{{data.like_number}}</span>
      </div>
      <div class="like">
        <div>
          <img src="@/assets/image/home/ic_comment.svg" alt="">
        </div>
        <span>{{data.comment_number}}</span>
      </div>
      <div class="like">
        <div>
          <img src="@/assets/image/home/ic_collection_n.svg" alt="">
        </div>
        <span>0</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props:{
      data:{
        type:Object,
        default:{}
      }
  },
  data() {
    return {};
  },
  computed: {},

  mounted() {},

  methods: {},
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