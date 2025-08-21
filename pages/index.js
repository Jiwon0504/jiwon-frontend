import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchBooks } from '../src/lib/booksRepo';
import { getBooksByCategory, getBooksByRanking } from '../src/data/books';
import { getCurrentUser, logout } from '../src/lib/authRepo';
import BookDetailModal from '../components/BookDetailModal';

export default function Home() {
  const [activeTab, setActiveTab] = useState('NOW');
  const [activeRankingCategory, setActiveRankingCategory] = useState('전체');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 사용자 정보 로드
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  // 책 데이터 로드
  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        const booksData = await fetchBooks();
        setBooks(booksData);
        setFilteredBooks(booksData); // 초기에는 전체 책 목록
      } catch (error) {
        console.error('책 데이터 로딩 실패:', error);
        // 백엔드 연결 실패시 더미 데이터 사용
        const dummyData = getBooksByRanking();
        setBooks(dummyData);
        setFilteredBooks(dummyData);
      } finally {
        setLoading(false);
      }
    }
    
    loadBooks();
  }, []);

  // 카테고리 변경시 백엔드에서 데이터 가져오기
  useEffect(() => {
    async function loadBooksByCategory() {
      try {
        setLoading(true);
        let booksData;
        
        if (activeRankingCategory === '전체') {
          booksData = await fetchBooks();
        } else {
          // 카테고리별 API 호출
          const response = await fetch(`http://localhost:8080/api/books/category-name/${encodeURIComponent(activeRankingCategory)}`);
          if (response.ok) {
            booksData = await response.json();
          } else {
            // API 실패시 클라이언트 필터링
            const allBooks = await fetchBooks();
            booksData = allBooks.filter(book => book.category === activeRankingCategory);
          }
        }
        
        setFilteredBooks(booksData);
      } catch (error) {
        console.error('카테고리별 책 데이터 로딩 실패:', error);
        // 에러시 클라이언트 필터링으로 fallback
        const filteredData = books.filter(book => 
          activeRankingCategory === '전체' || book.category === activeRankingCategory
        );
        setFilteredBooks(filteredData);
      } finally {
        setLoading(false);
      }
    }
    
    loadBooksByCategory();
  }, [activeRankingCategory, books]);

  // 로그아웃 처리
  const handleLogout = () => {
    logout();
    setUser(null);
    alert('로그아웃되었습니다.');
  };

  // 책 상세 모달 열기
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  // 책 상세 모달 닫기
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  // 카테고리별 필터링된 책 목록 (상태로 관리)
  const [filteredBooks, setFilteredBooks] = useState([]);

  return (
    <div className="millie-container">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-left">
          <Link href="/" className="logo-link">
            <div className="logo">
              <Image 
                src="/millie-logo.png" 
                alt="밀리의서재" 
                width={32} 
                height={32}
                className="logo-image"
              />
              <span className="logo-text">밀리의서재</span>
            </div>
          </Link>
        </div>
        <div className="nav-center">
          <Link href="/" className="nav-item active">투데이</Link>
          <Link href="#" className="nav-item">웹소설</Link>
          <Link href="/search" className="nav-item">검색</Link>
          <Link href="#" className="nav-item">피드</Link>
          <Link href="/library" className="nav-item">내서재</Link>
          <Link href="/management" className="nav-item">관리</Link>
        </div>
        <div className="nav-right">
          <div className="notification-icon">🔔</div>
          <div className="menu-icon">☰</div>
          {user ? (
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
            </div>
          ) : (
            <Link href="/login">
              <button className="login-btn">로그인</button>
            </Link>
          )}
        </div>
      </nav>

      {/* Bottom Tab Navigation */}
      <div className="bottom-tabs">
        <button 
          className={`tab-item ${activeTab === 'NOW' ? 'active' : ''}`}
          onClick={() => setActiveTab('NOW')}
        >
          NOW
        </button>
        <button 
          className={`tab-item ${activeTab === '밀리로드' ? 'active' : ''}`}
          onClick={() => setActiveTab('밀리로드')}
        >
          밀리로드
        </button>
        <button 
          className={`tab-item ${activeTab === '오디오북' ? 'active' : ''}`}
          onClick={() => setActiveTab('오디오북')}
        >
          오디오북
        </button>
        <button 
          className={`tab-item ${activeTab === '시한전' ? 'active' : ''}`}
          onClick={() => setActiveTab('시한전')}
        >
          ⚡ 시한전
        </button>
        <button 
          className={`tab-item ${activeTab === '밀리홈페이지' ? 'active' : ''}`}
          onClick={() => setActiveTab('밀리홈페이지')}
        >
          밀리홈페이지
        </button>
      </div>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Banner */}
        <section className="hero-banner">
          <div className="banner-content">
            <div className="banner-text">
              <h1>주목해야 할 한국 문학</h1>
              <h2>황석영 《철도원 삼대》</h2>
              <p>밀리에 찾아온 한국 문학의 레전드</p>
            </div>
            <div className="banner-image">
              <div className="book-cover">📚</div>
            </div>
          </div>
          <div className="banner-controls">
            <div className="pause-btn">⏸</div>
            <div className="pagination">1 / 3 +</div>
          </div>
        </section>

        {/* Service Icons */}
        <section className="service-icons">
          <div className="icon-grid">
            <div className="service-icon">
              <div className="icon">🔍</div>
              <span>독서챌린지</span>
            </div>
            <div className="service-icon">
              <div className="icon">🎯</div>
              <span>공개예정</span>
            </div>
            <div className="service-icon">
              <div className="icon">🎁</div>
              <span>새로들어온책</span>
            </div>
            <div className="service-icon">
              <div className="icon">🎪</div>
              <span>이벤트</span>
            </div>
            <div className="service-icon">
              <div className="icon">💎</div>
              <span>오늘의한문장</span>
            </div>
            <div className="service-icon">
              <div className="icon">🏆</div>
              <span>서점베스트</span>
            </div>
            <div className="service-icon">
              <div className="icon">💡</div>
              <span>밀리랭킹</span>
            </div>
            <div className="service-icon">
              <div className="icon">🏠</div>
              <span>밀리소식</span>
            </div>
            <div className="service-icon">
              <div className="icon">👥</div>
              <span>밀리클럽</span>
            </div>
            <div className="service-icon">
              <div className="icon">📰</div>
              <span>매거진</span>
            </div>
          </div>
        </section>

        {/* Millie Ranking Section */}
        <section className="millie-ranking">
          <div className="section-header-ranking">
            <h3>밀리 랭킹</h3>
            <div className="ranking-filter">실시간 ▼</div>
          </div>
          
          <div className="ranking-categories">
            {['전체', '소설', '경제경영', '인문교양', '자기계발', '에세이', '시/에세이', '역사', '과학', '정치사회', '종교'].map(category => (
              <button 
                key={category}
                className={`ranking-category ${activeRankingCategory === category ? 'active' : ''}`}
                onClick={() => setActiveRankingCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="books-ranking-grid">
            {loading ? (
              <div className="loading-message">책 목록을 불러오는 중...</div>
            ) : (
              filteredBooks.slice(0, 11).map((book, index) => (
                <div key={book.id} className="book-ranking-item" onClick={() => handleBookClick(book)}>
                  <div className="book-cover-ranking">
                    <Image 
                      src={`/book-covers/book-${book.id}.jpg`}
                      alt={book.title}
                      width={60}
                      height={80}
                      className="book-cover-image"
                      onError={(e) => {
                        // 이미지 로드 실패시 기본 스타일로 fallback
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className={`book-cover-fallback book-cover-${(index % 11) + 1}`} style={{display: 'none'}}>
                      📚
                    </div>
                  </div>
                  <div className="book-ranking-info">
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                  </div>
                  <div className="ranking-number">{index + 1}</div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Recommendation Section */}
        <section className="recommendations">
          <div className="section-header">
            <h3>최근 본 히스토리</h3>
            <span className="more-arrow">→</span>
          </div>
          <div className="book-recommendation">
            <div className="book-cover-small">📖</div>
            <div className="book-info">
              <h4>지금 바로 읽어보세요</h4>
              <p>20만권의 도서를 첫 달 무료로 즐겨보세요!</p>
              <button className="try-btn">구독 시작하기</button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Book Detail Modal */}
      <BookDetailModal 
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
