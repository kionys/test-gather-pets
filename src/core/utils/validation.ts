export const checkEmail = (email: string) => {
  // 이메일 형식 유효성 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error("유효하지 않은 이메일 형식입니다.");
    return false;
  } else {
    return true;
  }
};

export const checkPassword = (password: string) => {
  // 비밀번호 조합 조건 검사 (최소 8자리, 특수문자 포함)
  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
    console.error("비밀번호는 최소 8자리 이상이어야 하며, 특수문자와 숫자를 포함해야 합니다.");
    return false;
  } else {
    return true;
  }
};
