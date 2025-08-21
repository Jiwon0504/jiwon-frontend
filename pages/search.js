import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCurrentUser } from '../src/lib/authRepo';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [user, setUser] = useState(null);

  // 사용자 정보 로드
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  // 검색 함수
  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(`http://localhost:8080/api/books/search?keyword=${encodeURIComponent(keyword)}`);
      if (response.ok) {
        const books = await response.json();
        setSearchResults(books);
      } else {
        console.error('검색 실패:', response.status);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('검색 중 오류:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 검색어 변경 시 실시간 검색 (디바운스)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // 키워드 태그 클릭 핸들러
  const handleKeywordClick = (keyword) => {
    setSearchQuery(keyword);
  };

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
          <Link href="/" className="nav-item">홈</Link>
          <Link href="/" className="nav-item">밀리 랭킹</Link>
          <Link href="/search" className="nav-item active">검색</Link>
          <Link href="/library" className="nav-item">내서재</Link>
          <Link href="/management" className="nav-item">관리</Link>
        </div>
        <div className="nav-right">
          {user ? (
            <div className="user-info">
              <span className="user-name">{user.name}님</span>
              <button 
                className="logout-btn" 
                onClick={() => {
                  localStorage.removeItem('currentUser');
                  window.location.href = '/';
                }}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="login-btn">로그인</button>
            </Link>
          )}
        </div>
      </nav>

      {/* Search Content */}
      <main className="search-content">
        <div className="search-container">
          
          {/* Filter Tabs */}
          <div className="filter-tabs">
            <button className="filter-tab active">전체</button>
            <button className="filter-tab">AI 추천</button>
          </div>

          {/* Search Bar */}
          <div className="search-bar-container">
            <div className="search-input-wrapper">
              <div className="search-icon">🔍</div>
              <input 
                type="text" 
                placeholder="제목, 저자명으로 검색하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(searchQuery);
                  }
                }}
              />
            </div>
          </div>

          {/* Search Results */}
          {hasSearched && (
            <div className="search-section">
              <h3>
                검색 결과 
                {!loading && (
                  <span style={{color: '#666', fontSize: '0.9rem', fontWeight: 'normal'}}>
                    ({searchResults.length}권)
                  </span>
                )}
              </h3>
              
              {loading ? (
                <div className="loading-message">검색 중...</div>
              ) : searchResults.length > 0 ? (
                <div className="search-results-grid">
                  {searchResults.map((book) => (
                    <div key={book.id} className="search-result-item">
                      <div className="book-cover-search">
                        <Image
                          src={`/book-covers/book-${book.id}.jpg`}
                          alt={book.title}
                          width={80}
                          height={100}
                          className="book-cover-image-search"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div 
                          className={`book-cover-fallback-search book-cover-${(book.id % 11) + 1}`} 
                          style={{display: 'none'}}
                        >
                          📚
                        </div>
                      </div>
                      <div className="book-info-search">
                        <h4>{book.title}</h4>
                        <p className="book-author-search">{book.author}</p>
                        <p className="book-publisher-search">{book.publisher}</p>
                        {book.category && (
                          <span className="book-category-tag">{book.category}</span>
                        )}
                        {book.description && (
                          <p className="book-description-preview">
                            {book.description.length > 100 
                              ? `${book.description.substring(0, 100)}...` 
                              : book.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">📚</div>
                  <h4>검색 결과가 없습니다</h4>
                  <p>다른 키워드로 검색해보세요</p>
                </div>
              )}
            </div>
          )}

          {/* Millie Recommended Keywords - 검색 결과가 없을 때만 표시 */}
          {!hasSearched && (
            <>
              <div className="search-section">
                <h3>밀리 추천 검색어</h3>
                <div className="keyword-tags">
                  {['경제', '소설', '자기계발', '역사', '과학', '철학', '심리학', '요리', '여행', '건강', '투자', '영어'].map((keyword) => (
                    <span 
                      key={keyword}
                      className="keyword-tag"
                      onClick={() => handleKeywordClick(keyword)}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Access */}
              <div className="search-section">
                <h3>바로가기</h3>
                <div className="quick-access-grid">
                  <Link href="/">
                    <div className="quick-access-item">
                      <div className="quick-icon">🏠</div>
                      <span>홈</span>
                    </div>
                  </Link>
                  <Link href="/">
                    <div className="quick-access-item">
                      <div className="quick-icon">🏆</div>
                      <span>밀리 랭킹</span>
                    </div>
                  </Link>
                  <Link href="/library">
                    <div className="quick-access-item">
                      <div className="quick-icon">📚</div>
                      <span>내서재</span>
                    </div>
                  </Link>
                  <Link href="/management">
                    <div className="quick-access-item">
                      <div className="quick-icon">⚙️</div>
                      <span>관리</span>
                    </div>
                  </Link>
                </div>
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
