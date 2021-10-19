export const fullScreenMixin = {
    data() {
        return {
            isFullscreen: true,
        }
    },
    mounted() {
        let isFullscreen =
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.fullScreen ||
            document.mozFullScreen ||
            document.webkitIsFullScreen;
        isFullscreen = !isFullscreen;
        let that = this;
        document.addEventListener("fullscreenchange", () => {
            that.isFullScren = !that.isFullScren;
        });
        document.addEventListener("mozfullscreenchange", () => {
            that.isFullScren = !that.isFullScren;
        });
        document.addEventListener("webkitfullscreenchange", () => {
            that.isFullScren = !that.isFullScren;
        });
        document.addEventListener("msfullscreenchange", () => {
            that.isFullScren = !that.isFullScren;
        });
    },
    methods: {
        fullScreenEvent() {
            let el = document.getElementById("full-Screen");
            if (this.isFullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (el.requestFullscreen) {
                    el.requestFullscreen();
                } else if (el.mozRequestFullScreen) {
                    el.mozRequestFullScreen();
                } else if (el.webkitRequestFullScreen) {
                    el.webkitRequestFullScreen();
                } else if (el.msRequestFullscreen) {
                    el.msRequestFullscreen();
                }
            }
        },
    }
}
import { getLatestCommentList, getMyColumnList, getMyNewsList } from "@/api/zhuanlan/zhuanlan";
export const loadMoreComment = {
    data() {
        return {
            textTip: "查看更多",
            queryComment: {
                postId: null,
                pageNum: 1,
                pageSize: 10,
            },
        }
    },
    methods: {
        async loadMore() {
            this.queryComment.pageNum++;
            const res = await getLatestCommentList(this.queryComment);
            this.commentList = this.commentList.concat(res.list);
            if (!res.paginateInfo.hasNext) {
                this.textTip = "我是有底线的~";
            }
        },
    }
}
export const loadMorePost = {
    data() {
        return {
            textTip1: "查看更多",
            textTip2: "查看更多",
            query1: {
                userId: 3956,
                pageNum: 1,
                pageSize: 1,
            },
            query2: {
                userId: 3956,
                pageNum: 1,
                pageSize: 1,
            },
        }
    },
    methods: {
        async loadMore1() {
            this.query1.pageNum++;
            const res = await getMyNewsList(this.query1);
            this.infos = this.infos.concat(res.list);
            if (!res.paginateInfo.hasNext) {
                this.textTip1 = "我是有底线的~";
            }
        },
        async loadMore2() {
            this.query2.pageNum++;
            const res = await getMyColumnList(this.query2);
            this.zhuanlanList = this.zhuanlanList.concat(res.list);
            if (!res.paginateInfo.hasNext) {
                this.textTip2 = "我是有底线的~";
            }
        },
    }
}