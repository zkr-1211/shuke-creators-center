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
    <div class="content">
      <div class="center">
        <div class="upload-video">
          <div class="upload-center-text">
            <div class="img">
              <img src="@/assets/image/home/ic_back_h.svg" alt="" />
            </div>
            <div class="add-video">点击上传视频</div>
            <div class="size">视频大小小于2G</div>
          </div>
        </div>
      </div>

      <div id="text-container" class="text"></div>
      <div class="data1">
        <div class="dec">视频简介:</div>
        <div class="select">
          <textarea
            maxlength="200"
            v-model="title"
            placeholder="请输入视频简介"
            cols="30"
            rows="10"
          ></textarea>
          <div class="tip">{{ title.length }}/200</div>
        </div>
      </div>

      <div class="data">
        <div class="scope">发布范围:</div>
        <div class="select">
          <el-select v-model="openRange" placeholder="请选择">
            <el-option
              v-for="item in scopeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="data">
        <div class="topic">话题选择:</div>
        <div class="select">
          <el-select v-model="topicId" placeholder="选择话题" filterable>
            <el-option
              v-for="item in topicList"
              :key="item.topic_id"
              :label="item.title"
              :value="item.topic_id"
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
    </div>
    <div class="footer">
      <div class="Buttons">
        <Button class="button1" name="保存至草稿箱" />
        <Button name="发布" @click.native="issue()" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Button from "@/components/button/Button.vue";
import ImgContent from "@/components/imgContent/ImgContent.vue";
import { createPosts, getalltopicList } from "@/api/zhuanlan/zhuanlan";
export default {
  components: { Header, Button, ImgContent },
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
      scopeList: [
        { value: "all", label: "公开" },
        { value: "current", label: "本校区" },
      ],
      value: "视频",
      topicList: [],
      query: {
        pageNum: 1,
        pageSize: 100,
      },
      openRange: "all",
      contents: [],
      title: "",
      topicId: null,
      imageCoverId:null,
      videoId:null,
    };
  },
  computed: {},

  mounted() {
    this.getTopicList();
  },

  methods: {
    async issue() {
      this.contents = [
        {
          type: "img",
          value: this.imageCoverId,
        },
        {
          type: "video",
          value: this.videoId,
        },
      ];
      const data = {
        topicId: this.topicId || 0,
        title: this.title,
        contents: this.contents,
        postsType: 0,
        openRange: this.openRange,
      };
      console.log(data);
      try {
        // await createPosts(data);
      } catch (error) {
        console.log(error);
      }
    },
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
    async getTopicList() {
      try {
        const res = await getalltopicList(this.query);
        this.topicList = this.topicList.concat(res.list);
        console.log("this.topicList", this.topicList);
      } catch (error) {
        console.log("errorerror", error.message);
      }
    },
    change(e) {
      switch (e) {
        case "动态":
          this.$router.push({ path: "/creations/dynaic" });
          return;
        case "专栏":
          this.$router.push({ path: "/creations/zhuan_lan" });
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.body {
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
    background-color: #ffffff;
    width: 55%;
    margin: 0vh auto;
    padding: 0.6rem 1rem 1.6rem 0.6rem;
    margin-top: 0.3rem;
    #text-container {
      padding-top: 0.1rem;
      margin: 0vh auto;
      height: 2vh;
      font-size: 0.12rem;
      width: 100%;
      border-bottom: 0.01rem solid #e8e8e8;
    }
    .center {
      position: relative;
      .upload-video {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        width: 80%;
        height: 3.14rem;
        background: #f6f6f8;
        border-radius: 0.08rem;
        margin-bottom: 0.3rem;
        padding-bottom: 0.6rem;
        .upload-center-text {
          text-align: center;
          .img {
            img {
            }
          }
          .add-video {
            font-size: 0.16rem;
            color: #333333;
          }
          .size {
            margin-top: 0.1rem;
            font-size: 0.16rem;
            color: #999999;
          }
        }
      }
    }

    .text {
    }
    .title {
      margin: 0 auto;
      font-size: 0.12rem;
      width: 100%;
      position: relative;
      margin-bottom: 0.1rem;
      textarea {
        padding: 0.1rem;
        font-size: 0.18rem;
        // font-weight: bold;
        color: #333333;
        width: 100% !important;
        // height: 0.3rem;
        opacity: 1;
        border: none;
        border-bottom: 0.01rem solid #e8e8e8;
        resize: none;
      }
      textarea::-webkit-input-placeholder {
        /* WebKit browsers */
        /* placeholder颜色  */
        font-weight: 500;
        color: #666666;
        /* placeholder字号  */
        font-size: 0.18rem;
      }
      textarea:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        font-weight: 500;
        color: #666666;
        font-size: 0.18rem;
      }
      textarea::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-weight: 500;
        color: #666666;
        font-size: 0.18rem;
      }
      textarea::-ms-input-placeholder {
        /* Internet Explorer 10+ */
        font-weight: 500;
        color: #666666;
        font-size: 0.18rem;
      }

      .tip {
        position: absolute;
        right: 0;
        bottom: 0.3rem;
        font-size: 0.14rem;
        color: #666666;
      }
    }
    .data1 {
      margin-top: 0.3rem;
      font-size: 0.16rem;
      color: #666666;
      display: flex;
      width: 6rem;
      .dec {
      }

      .scope {
      }
      .select {
        margin-left: 0.3rem;
        textarea {
          font-size: 0.14rem;
          color: #000000;
          padding: 0.12rem;
          height: 1rem !important;
          width: 20vw;
          height: 0.44rem;
          background: #ffffff;
          border: 0.01rem solid #e0e0e0;
          border-radius: 0rem;
          resize: none;
        }
        .tip {
          // text-align: right;
          margin-top: 0.05rem;
        }
      }
    }
    .data {
      margin-top: 0.3rem;
      width: 3rem;
      position: relative;
      font-size: 0.16rem;
      color: #666666;
      display: flex;
      .select {
        margin-left: 0.3rem;
      }
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
    .select {
      .el-select {
        width: 1.4rem;
        height: 0.44rem;
        background: #ffffff;
      }
    }
  }
}
</style>