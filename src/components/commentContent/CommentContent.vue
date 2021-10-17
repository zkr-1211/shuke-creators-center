<!--  -->
<template>
  <div class="body">
    <div class="send-comment">
      <div class="textarea" @click="isOneCreate = true">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="commentValue"
        >
        </el-input>
        <Button
          v-if="commentValue.length <= 0"
          name="评论"
          class="Button"
          :background="commentValue.length ? '#2a77ff' : '#888888'"
        />
        <Button
          v-else
          @click.native="createComment"
          name="评论"
          class="Button"
          :background="commentValue.length ? '#2a77ff' : '#888888'"
        />
      </div>
    </div>
    <div class="comment-title">评论{{ list1.length }}</div>
    <div class="item" v-for="item in list1" :key="item.comment_id">
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
            <span @click="toReceive(item.comment_id, item.nickname)">回复</span>
            <span>·</span>
            <template v-if="item.created_at">
              <TimeDiff :date="item.created_at" />
              <span>
                {{ item.created_at.substr(11, 5) }}
              </span>
            </template>
          </div>
          <div class="message-right">
            <div
              class="like"
              @click="likeComment(item.comment_id, item.is_like)"
            >
              {{ item.like_number }} 点赞
            </div>
            <div class="delete" @click="deleteComment(item.comment_id)">
              删除
            </div>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <div class="report">举报</div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>恶意谩骂</el-dropdown-item>
                <el-dropdown-item>虚假谣言</el-dropdown-item>
                <el-dropdown-item>淫秽色情</el-dropdown-item>
                <el-dropdown-item>违法信息</el-dropdown-item>
                <el-dropdown-item>营销广告</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <div
              class="childerComment"
              @click="getChildComment(item.comment_id)"
            >
              共{{ item.comment_number }}条回复
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog class="dialog" :visible.sync="outerVisible" width="40%">
      <div class="item">
        <div class="person">
          <div class="header">
            <img :src="getChildCommentList.avatar" alt="" />
          </div>
          <div class="name">{{ getChildCommentList.nickname }}</div>
        </div>
        <div class="item-content">
          <div class="com-content">
            {{ getChildCommentList.contents }}
          </div>
          <div class="message">
            <div class="message-left">
              <span
                @click="
                  receive(
                    getChildCommentList.comment_id,
                    getChildCommentList.nickname
                  )
                "
                >回复</span
              >
              <span>·</span>
              <template v-if="getChildCommentList.created_at">
                <TimeDiff :date="getChildCommentList.created_at" />
                <span>
                  {{ getChildCommentList.created_at.substr(11, 5) }}
                </span>
              </template>
            </div>
            <div class="message-right">
              <div class="like">{{ getChildCommentList.like_number }} 点赞</div>
              <div
                class="delete"
                @click="deleteComment(getChildCommentList.comment_id)"
              >
                删除
              </div>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <div class="report">举报</div>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>恶意谩骂</el-dropdown-item>
                  <el-dropdown-item>虚假谣言</el-dropdown-item>
                  <el-dropdown-item>淫秽色情</el-dropdown-item>
                  <el-dropdown-item>违法信息</el-dropdown-item>
                  <el-dropdown-item>营销广告</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
      <template v-for="item1 in childComment">
        <div class="item item1 item2" :key="item1.comment_id">
          <div class="person">
            <div class="header"><img :src="item1.avatar" alt="" /></div>
            <div class="name">{{ item1.nickname }}</div>
          </div>
          <div class="item-content">
            <div class="com-content">
              <div
                class="content_new_item_comment_child"
                v-if="item1.replyTo.user_id != null"
              >
                @{{ item1.replyTo.nickname }}:
                {{ item1.replyTo.contents }}
              </div>
              {{ item1.contents }}
            </div>
            <div class="message">
              <div class="message-left">
                <span
                  @click="
                    receive(item1.comment_id, item1.nickname, item1.comment_id)
                  "
                  >回复</span
                >
                <span>·</span>
                <template v-if="item1.created_at">
                  <TimeDiff :date="item1.created_at" />
                  <span>
                    {{ item1.created_at.substr(11, 5) }}
                  </span>
                </template>
              </div>
              <div class="message-right">
                <div class="like">{{ item1.like_number }} 点赞</div>
                <div class="delete" @click="deleteComment(item1.comment_id)">
                  删除
                </div>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <div class="report">举报</div>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>恶意谩骂</el-dropdown-item>
                    <el-dropdown-item>虚假谣言</el-dropdown-item>
                    <el-dropdown-item>淫秽色情</el-dropdown-item>
                    <el-dropdown-item>违法信息</el-dropdown-item>
                    <el-dropdown-item>营销广告</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      width="30%"
      :title="receiveTitle"
      top="30vh"
      :visible.sync="innerVisible"
    >
      <el-input
        autofocus
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="receiveValue"
      >
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="info" v-if="receiveValue.length <= 0">发送</el-button>
        <el-button type="primary" @click="createComment" v-else>发送</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Button from "@/components/button/Button.vue";
import TimeDiff from "@/components/timeDiff/TimeDiff.vue";
import {
  getChildComment,
  likeComment,
  unlikeComment,
  deleteComment,
  createcomment,
} from "@/api/zhuanlan/zhuanlan";
export default {
  components: {
    Button,
    TimeDiff,
  },
  props: {
    list: {
      type: Array,
      default: [],
    },
    post_id: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      list1: [],
      query: {
        commentId: null,
        pageNum: 1,
        pageSize: 10,
      },
      outerVisible: false,
      innerVisible: false,
      commentValue: "",
      isReceiveId: null,
      childCommentId: null,
      childCommentSend: false,
      isOneCreate: true,
      receiveValue: "",
      receiveTitle: "",
      childComment: [],
      getChildCommentList: [],
    };
  },
  computed: {},
  watch: {
    list(newVal, old) {
      this.list1 = newVal;
    },
  },
  mounted() {},

  methods: {
    async createComment() {
      // 在外侧;
      console.log("isOneCreate", this.isOneCreate);
      if (this.isOneCreate) {
        var data = {
          postId: this.post_id,
          contents: this.commentValue,
        };
      } else {
        // 内侧
        if (this.childCommentSend) {
          console.log("孙评论孙评论孙评论");
          // 孙评论
          var data = {
            postId: this.post_id,
            fatherId: this.childCommentId,
            contents: this.receiveValue,
            floorId: this.query.commentId,
          };
        } else {
          console.log("//子评论//子评论");
          //子评论
          var data = {
            postId: this.post_id,
            fatherId: this.query.commentId,
            contents: this.receiveValue,
            floorId: this.query.commentId,
          };
        }
      }
      try {
        const res = await createcomment(data);
        this.$emit("seletcItem", this.post_id);
        if (this.outerVisible) {
          this.query.pageNum = 1;
          this.childComment = [];
          this.getChildComment(this.query.commentId);
        }
        this.receiveValue = "";
        this.commentValue = "";
        this.innerVisible = false;
        this.$message({
          type: "success",
          message: "评论成功!",
        });
      } catch (error) {
        console.log("error", error);
      }
    },
    async getChildComment(commentId) {
      this.query.pageNum = 1;
      this.childComment = [];
      this.outerVisible = true;
      this.query.commentId = commentId;
      const res = await getChildComment(this.query);
      res.list.forEach((item, index) => {
        if (item.comment_id === this.query.commentId) {
          this.getChildCommentList = item;
          res.list.splice(index, 1);
        }
      });
      this.childComment = this.childComment.concat(res.list).reverse();
      console.log(
        "this.childComment",
        this.childComment,
        this.getChildCommentList
      );
    },
    deleteComment(comment_id) {
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await deleteComment(comment_id);
            this.list1.forEach((item, index) => {
              if (item.comment_id == comment_id) {
                this.list1.splice(index, 1);
              }
            });
            this.childComment.forEach((item, index) => {
              if (item.comment_id == comment_id) {
                this.childComment.splice(index, 1);
              }
            });
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } catch (error) {}
        })
        .catch(() => {});
    },
    async likeComment(comment_id, is_like) {
      try {
        if (is_like) {
          await unlikeComment(comment_id);
          this.list1.forEach((item) => {
            if (item.comment_id == comment_id) {
              item.is_like = false;
              item.like_number--;
            }
          });
        } else {
          await likeComment(comment_id);
          this.list1.forEach((item) => {
            if (item.comment_id == comment_id) {
              item.is_like = true;
              item.like_number++;
            }
          });
        }
      } catch (error) {}
    },
    toReceive(comment_id, nickname) {
      this.isOneCreate = false;
      this.childCommentSend = false;
      this.query.commentId = comment_id;
      this.innerVisible = true;
      this.receiveTitle = `回复${nickname}`;
    },
    receive(comment_id, nickname, comment_id1) {
      this.isOneCreate = false;
      this.childCommentSend = false;
      //comment_id1多加一个参数，孙评论需要的条件
      if (comment_id1) {
        this.childCommentId = comment_id;
        this.childCommentSend = true;
      }
      // this.outerVisible = true;
      this.innerVisible = true;
      this.receiveTitle = `回复${nickname}`;
    },
  },
};
</script>
<style lang='scss' scoped>
.send-comment {
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  .textarea {
    display: flex;
    flex-direction: column;
    padding: 0.12rem;
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
    }
    .Button {
      margin-top: 0.2rem;
      align-self: flex-end;
    }
  }
}
.dialog-footer {
  line-height: 0;
}
::v-deep .el-textarea__inner {
  resize: none;
}
::v-deep .el-dialog__body {
  max-height: 5rem !important;
  overflow: auto;
}
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
.item2 {
  margin-left: 0.4rem;
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
      .content_new_item_comment_child {
        background-color: #f1f1f1;
        border-radius: 10rpx;
        padding: 10rpx;
        margin-left: 83rpx;
        width: fit-content;
        height: 100%;
        font-size: 28rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 44rpx;
        color: #333333;
        opacity: 1;
        letter-spacing: 2rpx;
      }
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
  }
}
</style>