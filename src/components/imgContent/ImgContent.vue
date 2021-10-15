<!--  -->
<template>
  <div class="body">
    <div class="img-content">
      <div
        v-for="(item, index) in imgList"
        :key="index"
        class="img-item"
        :class="isDynaic ? 'isDynaic' : ''"
      >
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
    isDynaic: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      srcList: [],
    };
  },
  computed: {},

  mounted() {
    this.srcList = this.imgList.map((item) => item.value);
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
  .isDynaic {
    width: 1.6rem !important;
    // .el-image{
    //  object-fit: cover;
    // }
  }
  .img-item {
    margin-top: 0.04rem;
    width: 2.85rem;
    height: 1.6rem;
    background: rgb(117, 117, 133);
    border-radius: 0.08rem;
    overflow: hidden;
    .el-image {
      width: 100%;
      height: 1.6rem;
    }
  }
}
</style>