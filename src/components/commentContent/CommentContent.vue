<!--  -->
<template>
  <div class="body">
    <div class="comment-title">评论{{ list.length }}</div>
    <div class="item" v-for="item in list" :key="item.id">
      <div class="person">
        <div class="header"><img :src="item.avatar" alt="" /></div>
        <div class="name">{{ item.nickname }}</div>
      </div>
      <div class="item-content">
        <div class="com-content">
          {{ item.contents }}
        </div>
        <div class="message">
          <div class="message-left">
            <span @click="receive(item.id)">回复</span>
            <span>·</span>
            <span>{{ item.created_at }}</span>
          </div>
          <div class="message-right">
            <div class="like">{{ item.like_number }} 点赞</div>
            <div class="delete">删除</div>
            <div class="report">举报</div>
            <div class="childerComment" @click="receive(item.id)">
              获取子评论
            </div>
          </div>
        </div>
        <div class="send-comment" v-show="item.id == isReceiveId">
          <div class="textarea">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="commentValue"
            >
            </el-input>
            <Button
              name="评论"
              class="Button"
              :background="commentValue.length ? '#2a77ff' : '#888888'"
            />
          </div>
        </div>
        <template v-for="item in list">
          <div
            class="item item1"
            :key="item.id"
            v-show="item.id == isReceiveId"
          >
            <div class="person">
              <div class="header"><img :src="item.avatar" alt="" /></div>
              <div class="name">{{ item.nickname }}</div>
            </div>
            <div class="item-content">
              <div class="com-content">
                {{ item.contents }}
              </div>
              <div class="message">
                <div class="message-left">
                  <span @click="receive(item.id)">回复</span>
                  <span>·</span>
                  <span>{{ item.created_at }}</span>
                </div>
                <div class="message-right">
                  <div class="like">{{ item.like_number }} 点赞</div>
                  <div class="delete">删除</div>
                  <div class="report">举报</div>
                </div>
              </div>
              <div class="send-comment" v-show="item.id == isReceiveId">
                <div class="textarea">
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    v-model="commentValue"
                  >
                  </el-input>
                  <Button
                    name="评论"
                    class="Button"
                    :background="commentValue.length ? '#2a77ff' : '#888888'"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/button/Button.vue";
export default {
  components: {
    Button,
  },
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      commentValue: "",
      isReceiveId: null,
    };
  },
  computed: {},

  mounted() {},

  methods: {
    receive(id) {
      this.list.forEach((item) => {
        if (item.id == id) {
          item.id = this.isReceiveId;
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.comment-title {
  border-top: 0.01rem solid #e8e8e8;
  font-size: 0.2rem;
  font-weight: bold;
  color: #333333;
  line-height: 0.7rem;
  height: 0.7rem;
}
.item1 {
  // width: 50%;
  margin-top: 0.14rem;
}
.item {
  margin-bottom: 0.3rem;
  .person {
    display: flex;
    align-items: center;
    .header {
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        display: flex;
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    .name {
      margin-left: 0.08rem;
      font-size: 0.14rem;
      font-weight: bold;
      color: #333333;
    }
  }
  .item-content {
    margin-top: 0.1rem;
    padding-left: 0.4rem;
    .com-content {
      font-size: 0.14rem;
      line-height: 0.24rem;
      color: #333333;
    }
    .message {
      margin-top: 0.16rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.14rem;
      line-height: 0.24rem;
      color: #333333;
      .message-left {
        span {
        }
        font-size: 0.14rem;

        span:nth-of-type(1) {
          cursor: pointer;
          font-weight: bold;
          color: #333333;
        }
        span:nth-of-type(2) {
          margin-left: 0.1rem;
        }
        span:nth-of-type(3) {
          margin-left: 0.1rem;
          color: #999999;
        }
      }
      .message-right {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.14rem;
        color: #333333;
        .like {
          margin-right: 0.2rem;
        }
        .delete {
          margin-right: 0.2rem;
        }
        .report {
          margin-right: 0.2rem;
        }
        .childerComment {
        }
      }
    }
    .send-comment {
      margin-top: 0.3rem;
      // width: 6.52rem;
      background: #f9f9f9;
      // overflow: hidden;
      display: flex;
      flex-direction: column;
      .textarea {
        display: flex;
        flex-direction: column;
        padding: 0.2rem;
        ::v-deep.el-textarea__inner {
          width: 100% !important;
          border: 0 !important;
          resize: none !important;
          background-color: #f9f9f9 !important;
        }
        textarea {
          border: 0;
          resize: none;
          max-height: 1.64rem !important;
          background: #f9f9f9;
          //   border-radius: 0rem;
        }
        .Button {
          margin-top: 0.2rem;
          align-self: flex-end;
        }
      }
    }
  }
}
</style>