// 더미 책 데이터
export const books = [
  {
    id: 1,
    title: "아버지의 해방일지",
    author: "정지아",
    category: "소설",
    description: "한국 현대사의 아픔을 그린 감동작",
    rating: 4.5,
    readCount: 12540
  },
  {
    id: 2,
    title: "불편한 편의점",
    author: "김호연",
    category: "소설",
    description: "편의점에서 펼쳐지는 따뜻한 인간 드라마",
    rating: 4.7,
    readCount: 15680
  },
  {
    id: 3,
    title: "달러구트 꿈 백화점",
    author: "이미예",
    category: "소설",
    description: "꿈을 파는 신비로운 백화점 이야기",
    rating: 4.3,
    readCount: 18920
  },
  {
    id: 4,
    title: "트렌드 코리아 2024",
    author: "김난도",
    category: "경제경영",
    description: "2024년 대한민국 소비트렌드 전망",
    rating: 4.2,
    readCount: 9840
  },
  {
    id: 5,
    title: "세이노의 가르침",
    author: "세이노",
    category: "자기계발",
    description: "부와 성공에 대한 실전 조언",
    rating: 4.6,
    readCount: 22100
  },
  {
    id: 6,
    title: "원씽",
    author: "게리 켈러",
    category: "자기계발",
    description: "성공을 이끄는 하나의 원칙",
    rating: 4.4,
    readCount: 14560
  },
  {
    id: 7,
    title: "미드나잇 라이브러리",
    author: "매트 헤이그",
    category: "소설",
    description: "무한한 가능성의 도서관에서 펼쳐지는 이야기",
    rating: 4.5,
    readCount: 16780
  },
  {
    id: 8,
    title: "돈의 속성",
    author: "김승호",
    category: "경제경영",
    description: "부자가 되는 돈의 원리",
    rating: 4.3,
    readCount: 19230
  },
  {
    id: 9,
    title: "아몬드",
    author: "손원평",
    category: "소설",
    description: "감정을 느끼지 못하는 소년의 성장 이야기",
    rating: 4.6,
    readCount: 13450
  },
  {
    id: 10,
    title: "당신이 옳다",
    author: "정혜신",
    category: "인문교양",
    description: "상처받은 마음을 위로하는 따뜻한 메시지",
    rating: 4.4,
    readCount: 11290
  },
  {
    id: 11,
    title: "코스모스",
    author: "칼 세이건",
    category: "과학",
    description: "우주에 대한 경이로운 탐험",
    rating: 4.8,
    readCount: 8760
  }
];

// 카테고리별 필터링
export function getBooksByCategory(category) {
  if (category === '전체') {
    return books;
  }
  return books.filter(book => book.category === category);
}

// 랭킹 순으로 정렬 (읽은 수 기준)
export function getBooksByRanking() {
  return [...books].sort((a, b) => b.readCount - a.readCount);
}
