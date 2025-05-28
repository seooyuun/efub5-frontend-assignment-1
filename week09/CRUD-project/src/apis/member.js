import axiosInstance from "./axiosInstance";

// 회원가입
export const signUp = (userData) => {
  return axiosInstance.post("/members", userData);
};

// 회원 단건 조회
export const getMember = (memberId) => {
  return axiosInstance.get(`/members/${memberId}`);
};

// 회원 프로필 수정
export const updateProfile = (memberId, nickname) => {
  return axiosInstance.patch(`/members/profile/${memberId}`, { nickname });
};

// 회원 탈퇴
export const withdrawMember = (memberId) => {
  return axiosInstance.patch(`/members/${memberId}`);
};
