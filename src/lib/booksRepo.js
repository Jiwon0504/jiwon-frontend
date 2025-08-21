import { books as mockBooks } from "../data/books";

const API_BASE_URL = 'http://localhost:8080/api/books';

// 모든 책 조회
export async function fetchBooks(params = {}) {
  try {
    const response = await fetch(API_BASE_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiBooks = await response.json();
    
    // API에서 데이터를 가져왔으면 반환
    if (apiBooks && Array.isArray(apiBooks)) {
      return apiBooks;
    }
    
    // API 데이터가 없으면 더미 데이터 반환
    return mockBooks;
    
  } catch (error) {
    console.error('모든 책 조회 실패, 더미 데이터 사용:', error);
    return mockBooks;
  }
}

// 특정 책 조회 (ID로)
export async function fetchBookById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('책을 찾을 수 없습니다.');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const book = await response.json();
    return book;
    
  } catch (error) {
    console.error(`책 ID ${id} 조회 실패:`, error);
    // 더미 데이터에서 해당 ID 찾기
    const mockBook = mockBooks.find(book => book.id === parseInt(id));
    if (mockBook) {
      return mockBook;
    }
    throw error;
  }
}