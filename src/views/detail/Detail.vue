<!--  -->
<template>
  <div class="body" v-if="detail">
    <Detail :detail="detail">
      <div class="content" v-if="detail.posts_type == '0'">
        <ImgContent :imgList="detail.contents" :isDynaic="true" />
      </div>
      <div class="content" v-if="detail.posts_type == '1'">
        <div v-for="(item, index) in detail.contents" :key="index" class="content-main">
          <div v-if="item.type != 'img' && item.type != 'br'">
            <span user-select="true"> {{ item.value }}</span>
          </div>
          <div v-if="item.type === 'br'"><br /></div>
          <template v-if="item.type === 'img'">
            <div style="height: 15px" />
            <img style="width: 100%" :src="item.value" mode="widthFix" />
          </template>
        </div>

      </div>
    </Detail>
  </div>
</template>

<script>
import Detail from "@/components/detail/Detail.vue";
import ImgContent from "@/components/imgContent/ImgContent.vue";
import { getDetail } from "@/api/zhuanlan/zhuanlan";
export default {
  components: { Detail, ImgContent },
  data() {
    return {
      detail: null,
    };
  },
  computed: {},

  mounted() {
    this.post_id = this.$route.query.post_id;
    this.getDetail();
  },

  methods: {
    async getDetail() {
      const res = await getDetail(this.post_id);
      this.detail = res;
      console.log("res", res)
      if (res.posts_type == 1) {
        this.detail.contents.splice(0, 1);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
</style>