import axiosInstance from "../apis/axiosInstance";

// 단일 회원 조회
export const getMember = (memberId) => {
  return axiosInstance.get(`/members/${memberId}`);
};

// 프로필 수정 (닉네임만)
export const updateProfile = (memberId, nickname) => {
  return axiosInstance.patch(`/members/profile/${memberId}`, { nickname });
};

// 회원 탈퇴
export const withdrawMember = (memberId) => {
  return axiosInstance.patch(`/members/${memberId}`);
};

export const login = (email, password) => {
  return axiosInstance.post("/auth/login", { email, password });
};

export const signUp = (userData) => {
  return axiosInstance.post("/members", userData);
};
