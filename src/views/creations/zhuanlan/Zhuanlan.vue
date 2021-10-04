<!--  -->
<template>
  <div class="body">
    <Header />
    <div class="top">
      <div class="left">
         <router-link to="/">
          <div class="back-icon"></div>
        </router-link>
        <router-link to="/">
          <div class="back">返回首页</div>
        </router-link>
      </div>
      <div class="select-type">
        <div class="select-value">
          <div>发布{{ value }}</div>
          <img src="@/assets/image/home/ic_back_h.svg" alt="" />
        </div>
        <el-select v-model="value" placeholder="请选择" @change="change">
          <el-option
            v-for="item in sendList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span>{{ item.value }}</span>
          </el-option>
        </el-select>
      </div>
    </div>
    <div id="toolbar-container" class="toolbar"></div>
    <div class="content">
      <div class="title">
        <input
          placeholder="请输入标题（5~30个字）"
          type="text"
          maxlength="30"
          v-model="title"
        />
        <div class="tip" v-if="title.length < 5">
          还需输入{{ 5 - title.length }}个字
        </div>
      </div>
      <div id="text-container" class="text"></div>
      <div class="data">
        <div class="scope">发布范围:</div>
        <div class="select">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in sendList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="data">
        <div class="cover">封面设置:</div>
        <div class="img">
          <img src="@/assets/image/home/ic_back_h.svg" alt="" />
        </div>
        <span>预览</span>
      </div>
      <div class="data">
        <div class="topic">话题选择:</div>
        <div class="select">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in sendList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="Buttons">
        <Button class="button1" name="保存至草稿箱" />
        <Button name="发布" />
      </div>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
import Header from "@/components/header/Header.vue";
import Button from "@/components/button/Button.vue";
export default {
  components: { Header, Button },
  data() {
    return {
      selectType: false,
      sendTitle: "专栏",
      isMask: false,
      sendList: [
        { id: 1, value: "专栏", label: "专栏", isSelect: true },
        { id: 2, value: "动态", label: "动态", isSelect: false },
        { id: 3, value: "视频", label: "视频", isSelect: false },
      ],
      value: "专栏",
      title: "haha",
    };
  },
  computed: {},

  mounted() {
    const editor = new E("#toolbar-container", "#text-container"); // 传入两个元素
    // const editor2 = new E( "#toolbar-container", "#text-container");
    editor.config.zIndex = 1;
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
    change(e) {
      switch (e) {
        case "动态":
          this.$router.push({ path: "/creations/dynaic" });
          return;
        case "视频":
          this.$router.push({ path: "/creations/video" });
      }
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
  .toolbar {
  }
  .top {
    width: 100%;
    height: 0.8rem;
    background: #fff;
    box-shadow: 0rem 0rem 0rem rgba(0, 0, 0, 0.03);
    line-height: 0.8rem;
    position: relative;
    display: flex;
    justify-content: center;
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
      .select-value {
        display: flex;
        align-items: center;
        div {
        }
        img {
          margin-left: 0.1rem;
          width: 0.2rem;
          height: 0.2rem;
        }
      }
      span {
      }
      .el-select {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
    }
  }
  #toolbar-container {
    margin: 0vh auto;
    font-size: 0.12rem;
    width: 55%;
  }
  .footer {
    width: 100%;
    height: 0.64rem;
    background: #ffffff;
    position: fixed;
    bottom: 0;
    z-index: 9;
    .Buttons {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 0.1rem;
      margin-right: 4rem;
      .button1 {
        margin-right: 0.3rem;
      }
    }
  }
  .content {
    background-color: #ffff;
    width: 55%;
    margin: 0vh auto;
    padding: 0.6rem 1rem 1.6rem 0.6rem;
    #text-container {
      padding-top: 0.1rem;
      margin: 0vh auto;
      height: 25vh;
      font-size: 0.12rem;
      width: 100%;
      border-bottom: 0.01rem solid #e8e8e8;
    }
    .text {
    }
    .title {
      margin: 0 auto;
      font-size: 0.12rem;
      width: 100%;
      position: relative;
      input {
        padding: 0.2rem;
        font-size: 0.22rem;
        font-weight: bold;
        color: #333333;
        width: 100%;
        height: 0.3rem;
        background: rgba(0, 0, 0, 0);
        opacity: 1;
        border: none;
        border-bottom: 0.01rem solid #e8e8e8;
        ::-webkit-input-placeholder {
          /* WebKit, Blink, Edge */
          color: #999999;
        }
        :-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #999999;
        }
        ::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #999999;
        }
        :-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #999999;
        }
      }
      .tip {
        position: absolute;
        right: 0;
        top: 0.3rem;
        font-size: 0.14rem;
        color: #666666;
      }
    }
    .data {
      margin-top: 0.3rem;
      font-size: 0.16rem;
      color: #666666;
      display: flex;
      .scope {
      }
      .select {
        margin-left: 0.3rem;
      }
    }
    .data {
      width: 3rem;
      position: relative;
      .cover {
      }
      .img {
        cursor: pointer;
        margin-left: 0.3rem;
        width: 1.6rem;
        height: 1.2rem;
        background: #f6f6f8;
        border: 0px solid #c3c3c3;
        border-radius: 0rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      span {
        cursor: pointer;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
    .data {
      .topic {
      }
      .select {
        .el-select {
          width: 1.4rem;
          height: 0.44rem;
          background: #ffffff;
        }
      }
    }
  }
}
</style>