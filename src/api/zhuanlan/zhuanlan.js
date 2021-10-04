import request from '@/utils/request/v4';
//专栏
export function getzhanglanList(pageNum) {
    return request({
        url: '/zhuanlan/v1/posts/getPostsList/' + pageNum,
        method: 'GET'
    });
}
//我的动态列表
export function getMyNewsList(query2) {
    return request({
        url: '/zhuanlan/v1/posts/getUserNewsList',
        method: 'GET',
        params: query2
    });
}
//我的专栏列表
export function getMyColumnList(query1) {
    return request({
        url: '/zhuanlan/v1/posts/getUserColumnList',
        method: 'GET',
        params: query1
    });
}

//专栏列表
export function getColumnList(query1) {
    return request({
        url: '/zhuanlan/v1/posts/getColumnList',
        method: 'GET',
        params: query1
    });
}
//动态列表
export function getNewsList(query2) {
    return request({
        url: '/zhuanlan/v1/posts/getNewsList',
        method: 'GET',
        params: query2
    });
}
//关注列表
export function getFocusPostsList(query3) {
    return request({
        url: '/zhuanlan/v1/posts/getFocusPostList',
        method: 'GET',
        params: query3
    });
}
//创建话题
export function createTopic(data) {
    return request({
        url: '/zhuanlan/v1/topic/createTopic',
        method: 'POST',
        data
    });
}
//搜索话题
export function searchTopic(query) {
    return request({
        url: '/zhuanlan/v1/topic/getTopicByKeyword',
        method: 'GET',
        params: query
    });
}
//话题列表
export function getalltopicList(query1) {
    return request({
        url: '/zhuanlan/v1/topic/getTopicList',
        method: 'GET',
        params: query1
    });
}
//话题列表
export function getFocusTopicList(query2) {
    return request({
        url: '/zhuanlan/v1/topic/getFocusTopicList',
        method: 'GET',
        params: query2
    });
}

//首页热门话题
export function getHotTopic() {
    return request({
        url: '/zhuanlan/v1/topic/getHotTopicList',
        method: 'GET'
    });
}
//话题详情
export function gettopicdetail(topicId) {
    return request({
        url: '/zhuanlan/v1/topic/getDetail/' + topicId,
        method: 'GET'
    });
}

//话题动态列表帖子
export function getTopicLatestList(query1) {
    return request({
        url: '/zhuanlan/v1/posts/getTopicLatestList',
        method: 'GET',
        params: query1
    });
}
//话题精选列表帖子
export function getTopicHotList(query2) {
    return request({
        url: '/zhuanlan/v1/posts/getTopicHotList',
        method: 'GET',
        params: query2
    });
}
//最新评论列表
export function getLatestCommentList(query1) {
    return request({
        url: '/zhuanlan/v1/comment/getLatestCommentList',
        method: 'GET',
        params: query1
    });
}
//最热评论列表
export function getHotCommentList(query2) {
    return request({
        url: '/zhuanlan/v1/comment/getHotCommentList',
        method: 'GET',
        params: query2
    });
}
// 创建评论
export function createcomment(data) {
    return request({
        url: '/zhuanlan/v1/comment/createComment',
        method: 'POST',
        data
    });
}
// 获取子评论
export function getChildComment(query3) {
    return request({
        url: '/zhuanlan/v1/comment/getChildComment',
        method: 'GET',
        params: query3
    });
}
//点赞评论
export function likeComment(commentId) {
    return request({
        url: '/zhuanlan/v1/comment/likeComment/' + commentId,
        method: 'PUT'
    });
}
//取消点赞评论
export function unlikeComment(commentId) {
    return request({
        url: '/zhuanlan/v1/comment/unlikeComment/' + commentId,
        method: 'DELETE'
    });
}
//删除评论
export function deleteComment(commentId) {
    return request({
        url: '/zhuanlan/v1/comment/deleteComment/' + commentId,
        method: 'DELETE'
    });
}
//用户信息
export function getuserinfo(uid) {
    return request({
        url: '/zhuanlan/v1/user-info/getUserInfo/' + uid,
        method: 'GET'
    });
}
//创建帖子
export function createPosts(data) {
    return request({
        url: '/zhuanlan/v1/posts/createPost',
        method: 'POST',
        data
    });
}
// //编辑帖子
// export function createPosts(data) {
//     return request({
//         url: '/zhuanlan/v1/posts/updatePosts',
//         method: 'PUT',
//         data
//     });
// }
//删除帖子
export function deletePost(id) {
    return request({
        url: '/zhuanlan/v1/posts/deletePost/' + id,
        method: 'DELETE'
    });
}
//点赞
export function likePosts(id) {
    return request({
        url: '/zhuanlan/v1/posts/likePost/' + id,
        method: 'PUT'
    });
}
//取消点赞
export function unLikePosts(id) {
    return request({
        url: '/zhuanlan/v1/posts/unlikePost/' + id,
        method: 'DELETE'
    });
}
//首页详情页
export function getdetail(postId) {
    return request({
        url: '/zhuanlan/v1/posts/getDetail/' + postId,
        method: 'GET'
    });
}
//关注用户
export function focusUser(userId) {
    return request({
        url: '/zhuanlan/v1/userSocial/focusUser/' + userId,
        method: 'POST'
    });
}
//取消关注用户
export function unfocusUser(userId) {
    return request({
        url: '/zhuanlan/v1/userSocial/unfocusUser/' + userId,
        method: 'DELETE'
    });
}
//关注话题
export function focusTopic(topicId) {
    return request({
        url: '/zhuanlan/v1/topic/focusTopic/' + topicId,
        method: 'POST'
    });
}
//取消关注话题
export function unfocusTopic(topicId) {
    return request({
        url: '/zhuanlan/v1/topic/unfocusTopic/' + topicId,
        method: 'DELETE'
    });
}
//转发
export function forwardPost(postId) {
    return request({
        url: '/zhuanlan/v1/posts/forwardPost/' + postId,
        method: 'PUT'
    });
}
//粉丝列表
export function getFansList(query) {
    return request({
        url: '/zhuanlan/v1/userSocial/getAllFans',
        method: 'GET',
        params: query
    });
}
//关注列表
export function getFocusList(query) {
    return request({
        url: '/zhuanlan/v1/userSocial/getAllFocus',
        method: 'GET',
        params: query
    });
}
//修改用户信息
export function updateUserInfo(data) {
    return request({
        url: '/zhuanlan/v1/userInfo/updateMyInfo',
        method: 'PUT',
        data
    });
}
//用户信息
export function userInfo(userId) {
    return request({
        url: '/zhuanlan/v1/userInfo/getUserInfo/' + userId,
        method: 'GET'
    });
}
