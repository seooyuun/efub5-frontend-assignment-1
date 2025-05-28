import axiosInstance from "./axiosInstance";

// 게시글에 댓글 작성
export const createComment = (postId, content) => {
  return axiosInstance.post(`/posts/${postId}/comments`, { content });
};

// 게시글의 댓글 목록 조회
export const getCommentsByPost = (postId) => {
  return axiosInstance.get(`/posts/${postId}/comments`);
};

// 댓글 수정
export const updateComment = (commentId, content) => {
  return axiosInstance.put(`/comments/${commentId}`, { content });
};

// 댓글 삭제
export const deleteComment = (commentId) => {
  return axiosInstance.delete(`/comments/${commentId}`);
};

// 댓글 좋아요 생성
export const likeComment = (commentId) => {
  return axiosInstance.post(`/comments/${commentId}/hearts`);
};

// 댓글 좋아요 삭제
export const unlikeComment = (commentId) => {
  return axiosInstance.delete(`/comments/${commentId}/hearts`);
};
