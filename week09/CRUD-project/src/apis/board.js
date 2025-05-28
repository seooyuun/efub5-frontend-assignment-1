import axiosInstance from "./axiosInstance";

// 게시판 생성
export const createBoard = (data) => {
  return axiosInstance.post("/boards", data);
};

// 게시판 단건 조회
export const getBoard = (boardId) => {
  return axiosInstance.get(`/boards/${boardId}`);
};

// 게시판 수정
export const updateBoard = (boardId, data) => {
  return axiosInstance.put(`/boards/${boardId}`, data);
};

// 게시판 삭제
export const deleteBoard = (boardId) => {
  return axiosInstance.delete(`/boards/${boardId}`);
};

// 특정 게시판의 게시글 전체 조회
export const getPostsInBoard = (boardId) => {
  return axiosInstance.get(`/boards/${boardId}/posts`);
};
