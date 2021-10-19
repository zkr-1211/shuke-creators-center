<!--  -->
<template>
  <div class="body" v-if="detail">
    <Detail :detail="detail" :isLoading="isLoading">
      <div class="content" v-if="detail.posts_type == '0'">
        <ImgContent :imgList="detail.contents" :isDynaic="true" v-if="detail.contents[1].type != 'video'" />

        <video
          controls="controls" 
          :poster="detail.contents[0].value"
          v-if="detail.contents[1].type == 'video'"
          style="width:100%;height:50vh"
        >
          <source :src="detail.contents[1].value" />
        </video>
      </div>

      <div class="content" v-if="detail.posts_type == '1'">
        <div
          v-for="(item, index) in detail.contents"
          :key="index"
          class="content-main"
        >
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
      isLoading: false,
    };
  },
  computed: {},

  mounted() {
    this.post_id = this.$route.query.post_id;
    this.getDetail();
  },

  methods: {
    async getDetail() {
      try {
        this.isLoading = true;
        const res = await getDetail(this.post_id);
        this.detail = res;
        if (res.posts_type == 1) {
          this.detail.contents.splice(0, 1);
        }
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },
  },
};
</script>
<style lang='scss' scoped>
</style>