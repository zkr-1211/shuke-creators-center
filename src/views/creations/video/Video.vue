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
import { fullScreenMixin } from "@/mixins/mixins";
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
      imageCoverId: null,
      videoId: null,
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
@import "./video.scss";
</style>