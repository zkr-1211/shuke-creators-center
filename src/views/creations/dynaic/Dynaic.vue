<!--  -->
<template>
  <div class='body'>
    <div class="mask" @click="selectType=false,isMask=false" v-if="isMask"></div>
    <Header />
    <div class="top">
      <div class="left">
        <div class="back-icon"></div>
        <div class="back">返回首页</div>
      </div>
      <div class="select-type">
        <div class="select-value" @click="selectType=true,isMask=true">发布{{sendTitle}}</div>
        <div class="drown" :class="selectType?'drisshow':''">
          <div class="send" :class="item.isSelect?'isShow':''" v-for="item in sendList" :key="item.id" @click="sendType(item.id)"><img src="" alt="">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div id="editor1">

    </div>
  </div>
</template>

<script>
import E from "wangeditor";
import Header from "@/components/header/Header.vue";
export default {
  components: { Header },
  data() {
    return {
      selectType: false,
      sendTitle: "专栏",
      isMask: false,
      sendList: [
        { id: 1, title: "专栏", isSelect: true },
        { id: 2, title: "动态", isSelect: false },
        { id: 3, title: "视频", isSelect: false },
      ],
    };
  },
  computed: {},

  mounted() {
    const editor = new E("#editor1");
    // 配置 server 接口地址
    // editor.config.uploadImgServer = "/upload-img";
    // editor.config.uploadImgShowBase64 = true
    editor.config.customUploadImg = function (resultFiles, insertImgFn) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      let imgUrl = resultFiles;
      // 上传图片，返回结果，将图片插入到编辑器中
      insertImgFn(imgUrl);
    };
    editor.create();
  },

  methods: {
    sendType(id) {
      this.sendList.forEach((item) => {
        if (item.id === id) {
          item.isSelect = true;
          this.sendTitle = item.title;
        } else {
          item.isSelect = false;
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.body {
  .mask {
    position: fixed;
    // background-color: red;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .top {
    width: 100%;
    height: 0.8rem;
    background: #fff;
    box-shadow: 0rem 0rem 0rem rgba(0, 0, 0, 0.03);
    line-height: 0.8rem;
    position: relative;
    .left {
      cursor: pointer;
      display: flex;
      align-items: center;
      position: absolute;
      left: 20%;
      top: 0%;
      font-size: 0.16rem;
      color: #333333;
      .back-icon {
        width: 0.3rem;
        height: 0.3rem;
        background-image: url(../../../assets/image/home/ic_back_n.svg) !important;
        background-repeat: no-repeat;
        background-size: cover;
      }
      &:hover .back-icon {
        background-image: url(../../../assets/image/home/ic_back_h.svg) !important;
      }
      &:active .back-icon {
        background-image: url(../../../assets/image/home/ic_back_p.svg) !important;
      }

      .back {
        margin-left: 0.12rem;
      }
    }
    .select-type {
      font-size: 0.2rem;
      font-weight: bold;
      cursor: pointer;
      position: relative;
      text-align: center;
      .select-value {
      }
      .drisshow {
        transform: translateY(0vh) !important;
      }
      .drown {
        transition: all 0.5s;
        transform: translateY(-100vh);
        // z-index: 9999999999;
        position: absolute;
        padding-bottom: 0.2rem;
        top: 100%;
        left: 47.2%;
        width: 1.2rem;
        background: #fff;
        cursor: pointer;
        font-size: 0.14rem;
        font-weight: bold;
        color: #666666;
        .send {
          width: 1.2rem;
          height: 0.5rem;
          background: #ffffff;
          line-height: 0.5rem;
          opacity: 1;
        }
        .isShow {
          width: 1.2rem;
          height: 0.5rem;
          background: #edeff3;
          opacity: 1;
        }
      }
    }
  }
  #editor1 {
    margin: 10vh auto;
    font-size: 0.12rem;
    width: 50%;
  }
}
</style>