<!--  -->
<template>
  <div class="body">
    <!-- <el-tabs value="first" @tab-click="handleClick">
      <el-tab-pane
        :label="item.title"
        :name="index"
        v-for="(item, index) in tabList"
        :key="index"
      >
      </el-tab-pane>
    </el-tabs> -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <template v-for="(item, index) in tabList">
        <el-tab-pane :label="item.title" :key="index"> </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    tabList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      activeName: "0",
    };
  },
  computed: {},

  mounted() {},

  methods: {
       handleClick(tab, event) {
        console.log(tab.index);
        this.$emit('tabsIndex',tab.index)
      }
    //下拉菜单嵌套Tabs第一次下划线不显示的解决办法
  },
};
</script>
<style lang='scss' scoped>
.el-tabs {
     // min-width: 16rem;
     width: 100%;
     // overflow: auto;
     height: 100%;
     position: relative;
     // background-color: rgb(175, 139, 139);
    
}
 ::v-deep  .el-tabs__nav {
    white-space: nowrap;
    position: relative;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
    float: left;
    z-index: 2;
    display: flex;
}
 ::v-deep .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0;
    
}
 ::v-deep .el-tabs__nav-wrap::after {
     content: "";
     position: absolute;
     left: 0;
     bottom: 0;
     width: 100%;
     height: 0rem;
     background-color: #e4e7ed;
     z-index: 1;
     
}
 ::v-deep .el-tabs__active-bar {
     position: absolute;
     bottom: 0;
     left: 0;
     height: 0.04rem;
     background-color: #2A77FF;
     z-index: 1;
     transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
     width: 0.5rem;
     list-style: none;
     
}
 ::v-deep .el-tabs__item.is-active {
     font-size: 0.2rem;
     font-weight: bold;
     color: #333333;
}
 ::v-deep .el-tabs__item {
     padding: 0 0.3rem;
     height: 0.4rem;
     box-sizing: border-box;
     line-height: 0.4rem;
     display: inline-block;
     list-style: none;
     position: relative;
     font-size: 0.2rem;
     font-weight: bold;
     color: #c3c3c3;
     
}
 
</style>