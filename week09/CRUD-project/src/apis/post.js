import axiosInstance from "./axiosInstance";

// 게시글 작성
export const createPost = async (postData) => {
  const res = await axiosInstance.post("/posts", postData);
  return res.data;
};

// 게시글 전체 목록 조회
export const getAllPosts = () => {
  return axiosInstance.get("/posts");
};

// 게시글 단건 조회
export const getPost = (postId) => {
  return axiosInstance.get(`/posts/${postId}`);
};

// 게시글 수정
export const updatePost = (postId, data) => {
  return axiosInstance.put(`/posts/${postId}`, data);
};

// 게시글 삭제
export const deletePost = (postId) => {
  return axiosInstance.delete(`/posts/${postId}`);
};

// 게시글 좋아요 생성
export const likePost = (postId) =>
  axiosInstance.post(`/posts/${postId}/hearts`);

// 게시글 좋아요 삭제
export const unlikePost = (postId) =>
  axiosInstance.delete(`/posts/${postId}/hearts`);
