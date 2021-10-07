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
    <!-- <div id="toolbar-container" class="toolbar"></div> -->
    <div class="content">
      <div class="title">
        <textarea
          maxlength="200"
          v-model="title"
          placeholder="请输入正文"
          cols="30"
          rows="10"
        ></textarea>
        <div class="tip">{{ title.length }}/200</div>
      </div>
      <div class="center">
        <ImgContent :imgList="imgList" />
        <div class="upload-img" @click="chooseImages"></div>
      </div>

      <div id="text-container" class="text"></div>
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
      <!-- <div class="data">
        <div class="cover">封面设置:</div>
        <div class="img"></div>
        <span>预览</span>
      </div> -->
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
import { CloudDisk } from "@/utils/CloudDisk";
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
      imgList: [],
      topicList: [],
      query: {
        pageNum: 1,
        pageSize: 100,
      },
      value: "动态",
      openRange: "all",
      contents: [],
      title: "",
      topicId: null,
    };
  },
  computed: {},

  mounted() {
    this.getTopicList();
  },

  methods: {
    async issue() {
      const data = {
        topicId: this.topicId || 0,
        title: this.title,
        contents: this.contents,
        postsType: 0,
        openRange: this.openRange,
      };
      try {
        await createPosts(data);
        this.$message({
          message: '发布成功',
          type: 'success'
        });
        this.title = "";
      } catch (error) {
        this.$message.error('发布失败');
      }
    },
    async getTopicList() {
      try {
        const res = await getalltopicList(this.query);
        this.topicList = this.topicList.concat(res.list);
      } catch (error) {
        this.$message.error('话题列表请求失败');
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
    // 上传图片
    async chooseImages() {
      try {
        const res = await CloudDisk.uploadLocalImage({ folderId: 0 });
        res.map((item) => {
          this.contents.push({
            type: "img",
            value: item.fileId,
          });
        });
      } catch (error) {
        uni.showToast({
          title: error.message || error,
          icon: "none",
          mask: true,
        });
      }
    },
    change(e) {
      switch (e) {
        case "视频":
          this.$router.push({ path: "/creations/video" });
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
      min-height: 1.6rem;
      position: relative;
      .upload-img {
        width: 1.6rem;
        height: 1.6rem;
        background: rgb(117, 117, 133);
        border-radius: 0.08rem;
        position: absolute;
        right: 0;
        top: 0;
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
      .topic {
      }
      .select {
      }
      .cover {
      }
      .img {
        margin-left: 0.3rem;
        width: 1.6rem;
        height: 1.2rem;
        background: #f6f6f8;
        border: 0px solid #c3c3c3;
        opacity: 0.5;
        border-radius: 0rem;
      }
      span {
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