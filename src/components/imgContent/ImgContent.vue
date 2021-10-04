<!--  -->
<template>
  <div class="body">
    <div class="img-content">
      <div v-for="(item, index) in 1" :key="index" class="img-item">
        <img src="@/assets/logo.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},

  mounted() {},

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
    img {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
}
</style>