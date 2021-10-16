<!--  -->
<template>
  <div class="body" id="full-Screen">
    <Header @fullScreenEvent="fullScreenEvent" />
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
          <el-option v-for="item in sendList" :key="item.value" :label="item.label" :value="item.value">
            <span>{{ item.value }}</span>
          </el-option>
        </el-select>
      </div>
    </div>
    <!-- <div id="toolbar-container" class="toolbar"></div> -->
    <div class="content">
      <div class="title">
        <textarea maxlength="200" v-model="title" placeholder="请输入正文" cols="30" rows="10"></textarea>
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
            <el-option v-for="item in scopeList" :key="item.value" :label="item.label" :value="item.value">
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
            <el-option v-for="item in topicList" :key="item.topic_id" :label="item.title" :value="item.topic_id">
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
import { fullScreenMixin } from "@/mixins/mixins";
import { CloudDisk } from "@/utils/CloudDisk";
import { createPosts, getalltopicList } from "@/api/zhuanlan/zhuanlan";
export default {
  components: { Header, Button, ImgContent },
  mixins: [fullScreenMixin],
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
          message: "发布成功",
          type: "success",
        });
        this.title = "";
      } catch (error) {
        this.$message.error("发布失败");
      }
    },
    async getTopicList() {
      try {
        const res = await getalltopicList(this.query);
        this.topicList = this.topicList.concat(res.list);
      } catch (error) {
        this.$message.error("话题列表请求失败");
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

@import "./dynaic.scss";
</style>