<!--  -->
<template>
  <div class="body">
    <div class="img-content">
      <div v-for="(item, index) in imgList" :key="index" class="img-item">
        <el-image
          :src="item.value"
          fit="cover"
          :preview-src-list="srcList"
        ></el-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    imgList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      srcList:[],
    };
  },
  computed: {},

  mounted() {
    this.srcList = this.imgList.map(item => item.value);
  },

  methods: {},
};
</script>
<style lang='scss' scoped>
.img-content::after {
  content: "";
  width: 1.6rem;
}
.img-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 4.88rem;
  .img-item {
    margin-top: 0.04rem;
    width: 1.6rem;
    height: 1.6rem;
    background: rgb(117, 117, 133);
    border-radius: 0.08rem;
    .el-image {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
}
</style>