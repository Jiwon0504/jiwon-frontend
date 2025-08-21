// src/lib/authRepo.js
const API_BASE_URL = 'http://localhost:8080/api/users'; // 나중에 auth로 변경 예정

// 로그인
// 실제 백엔드 API 호출로 변경
export async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const result = await response.json();
    
    if (result.success) {
      // localStorage에 사용자 정보 저장
      localStorage.setItem('user', JSON.stringify(result.user));
      return result;
    } else {
      return result;
    }
    
  } catch (error) {
    console.error('로그인 실패:', error);
    return {
      success: false,
      message: '로그인 처리 중 오류가 발생했습니다.'
    };
  }
}

// 로그아웃
export function logout() {
  localStorage.removeItem('user');
  return { success: true, message: '로그아웃되었습니다.' };
}

// 현재 로그인된 사용자 정보 가져오기
export function getCurrentUser() {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    return null;
  }
}

// 로그인 상태 확인
export function isLoggedIn() {
  return getCurrentUser() !== null;
}

// 회원가입 (나중에 구현)
export async function register(name, email, password) {
  try {
    // 나중에 실제 API 호출 예정
    console.log('회원가입 시도:', name, email, password);
    
    return {
      success: false,
      message: '회원가입 기능은 아직 구현되지 않았습니다.'
    };
    
  } catch (error) {
    console.error('회원가입 실패:', error);
    return {
      success: false,
      message: '회원가입 처리 중 오류가 발생했습니다.'
    };
  }
}