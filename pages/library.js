import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCurrentUser } from '../src/lib/authRepo';

export default function Library() {
  const [user, setUser] = useState(null);
  const [likedBooks, setLikedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 사용자 정보 로드
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  // 좋아요한 책 목록 로드
  useEffect(() => {
    async function loadLikedBooks() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/likes/user/${user.id}`);
        if (response.ok) {
          const books = await response.json();
          setLikedBooks(books);
        }
      } catch (error) {
        console.error('좋아요한 책 목록 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLikedBooks();
  }, [user]);
  return (
    <div className="millie-container">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-left">
          <Link href="/">
            <div className="logo">
              <div className="millie-logo-svg">
                <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="50" fill="#FFD700"/>
                  <circle cx="50" cy="50" r="35" fill="#333333"/>
                  <path d="M20 70C20 70 25 50 35 50C40 50 45 60 45 70C45 80 40 90 35 90C25 90 20 70 20 70Z" fill="#FFD700"/>
                  <path d="M35 70C35 70 40 50 50 50C55 50 60 60 60 70C60 80 55 90 50 90C40 90 35 70 35 70Z" fill="#FFD700"/>
                  <path d="M50 70C50 70 55 50 65 50C70 50 75 60 75 70C75 80 70 90 65 90C55 90 50 70 50 70Z" fill="#FFD700"/>
                </svg>
              </div>
              밀리의서재
            </div>
          </Link>
        </div>
        <div className="nav-center">
          <Link href="/" className="nav-item">투데이</Link>
          <Link href="#" className="nav-item">웹소설</Link>
          <Link href="/search" className="nav-item">검색</Link>
          <Link href="#" className="nav-item">피드</Link>
          <Link href="/library" className="nav-item active">내서재</Link>
          <Link href="/management" className="nav-item">관리</Link>
        </div>
        <div className="nav-right">
          <div className="notification-icon">🔔</div>
          <button className="login-btn">로그아웃</button>
        </div>
      </nav>

      {/* Library Content */}
      <main className="library-content">
        <div className="library-container">
          
          {/* User Profile Section */}
          <div className="library-profile">
            <div className="profile-left">
              <div className="profile-avatar-large">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="40" fill="#E9ECEF"/>
                  <circle cx="40" cy="30" r="12" fill="#6C757D"/>
                  <path d="M20 60C20 45 28 40 40 40C52 40 60 45 60 60" fill="#6C757D"/>
                </svg>
                <div className="edit-icon">✏️</div>
              </div>
              <div className="profile-info-large">
                <h2>니가좋은이유가밀리언스</h2>
                <div className="profile-stats-large">
                  <span>팔로잉 0</span>
                  <span>팔로워 0</span>
                </div>
              </div>
            </div>
            <div className="profile-right">
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-number">0</div>
                  <div className="stat-label">하이라이트</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">0</div>
                  <div className="stat-label">포스트</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">0</div>
                  <div className="stat-label">한줄리뷰</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">0</div>
                  <div className="stat-label">평가</div>
                </div>
              </div>
              <div className="action-buttons">
                <button className="add-book-btn">+ 글쓰기</button>
                <button className="manage-book-btn">책 도서 담기</button>
              </div>
              <div className="subscription-notice">
                <span className="millie-icon">🟡</span>
                <span>20만 권 도서가 기다리고 있어요!</span>
                <span className="arrow">›</span>
              </div>
            </div>
          </div>

          {/* Recommended Books Section */}
          <div className="library-section">
            <div className="section-header-large">
              <h3>추천 도서</h3>
              <Link href="#" className="view-all">전체보기</Link>
            </div>
            <div className="books-horizontal-scroll">
              <div className="book-card">
                <div className="book-cover-large book1">📚</div>
                <h4>아주 작은 반복의 힘</h4>
                <p>제임스 클리어</p>
              </div>
              <div className="book-card">
                <div className="book-cover-large book2">📖</div>
                <h4>기가 막힌</h4>
                <p>김기 작가 / 2권...</p>
              </div>
              <div className="book-card">
                <div className="book-cover-large book3">📘</div>
                <h4>우리는 언젠가 만난다</h4>
                <p>채사장 지음</p>
              </div>
              <div className="book-card">
                <div className="book-cover-large book4">📗</div>
                <h4>세계 경영</h4>
                <p>박종훈</p>
              </div>
              <div className="book-card">
                <div className="book-cover-large book5">📙</div>
                <h4>번아웃의 숨겨진 차이</h4>
                <p>마이클 아인슈타인 / 김...</p>
              </div>
              <div className="book-card">
                <div className="book-cover-large book6">📕</div>
                <h4>어른이 되면 공부할 것</h4>
                <p>신경림</p>
              </div>
              <div className="book-card">
                <div className="book-cover-large book7">📓</div>
                <h4>기억의 밤</h4>
                <p>정유정</p>
              </div>
              <div className="book-card">
                <div className="book-cover-large book8">📔</div>
                <h4>김기의 재미가 어느...</h4>
                <p>김기의 지음 / 정현...</p>
              </div>
              <div className="book-card">
                <div className="book-cover-large book9">📒</div>
                <h4>사랑과 절망</h4>
                <p>헤르만</p>
              </div>
            </div>
          </div>

          {/* My Favorite Section */}
          <div className="library-section">
            <div className="section-header-large">
              <h3>책장</h3>
              <Link href="#" className="view-all">전체보기</Link>
            </div>
            
            {loading ? (
              <div className="loading-message">좋아요한 책을 불러오는 중...</div>
            ) : likedBooks.length > 0 ? (
              <div className="books-horizontal-scroll">
                {likedBooks.map((book) => (
                  <div key={book.id} className="book-card">
                    <div className="book-cover-large">
                      <Image
                        src={`/book-covers/book-${book.id}.jpg`}
                        alt={book.title}
                        width={120}
                        height={160}
                        className="book-cover-image-large"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className={`book-cover-fallback book-cover-${(book.id % 11) + 1}`} style={{display: 'none'}}>
                        📚
                      </div>
                    </div>
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="favorite-section">
                <div className="favorite-item">
                  <div className="favorite-icon">
                    <div className="millie-logo-svg">
                      <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="50" fill="#E9ECEF"/>
                        <circle cx="50" cy="50" r="25" fill="#999"/>
                        <path d="M30 60C30 60 35 45 50 45C65 45 70 60 70 60" fill="#FFD700"/>
                      </svg>
                    </div>
                  </div>
                  <div className="favorite-info">
                    <h4>My Favorite</h4>
                    <p>아직 좋아요한 책이 없습니다</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="favorite-section">
              <div className="favorite-item">
                <div className="favorite-icon">❤️</div>
                <div className="favorite-info">
                  <h4>좋아요한 책</h4>
                  <p>{likedBooks.length}권</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reading Calendar Section */}
          <div className="library-section">
            <div className="section-header-large">
              <h3>8월 독서 캘린더</h3>
              <Link href="#" className="view-all">전체보기</Link>
            </div>
            <div className="calendar-container">
              <div className="calendar-header-large">
                <div>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div>토</div>
              </div>
              <div className="calendar-body-large">
                <div className="calendar-day-large"></div>
                <div className="calendar-day-large"></div>
                <div className="calendar-day-large"></div>
                <div className="calendar-day-large"></div>
                <div className="calendar-day-large">1</div>
                <div className="calendar-day-large">2</div>
                <div className="calendar-day-large">3</div>
                
                <div className="calendar-day-large">4</div>
                <div className="calendar-day-large">5</div>
                <div className="calendar-day-large">6</div>
                <div className="calendar-day-large">7</div>
                <div className="calendar-day-large">8</div>
                <div className="calendar-day-large">9</div>
                <div className="calendar-day-large">10</div>
                
                <div className="calendar-day-large">11</div>
                <div className="calendar-day-large">12</div>
                <div className="calendar-day-large">13</div>
                <div className="calendar-day-large">14</div>
                <div className="calendar-day-large">15</div>
                <div className="calendar-day-large">16</div>
                <div className="calendar-day-large">17</div>
                
                <div className="calendar-day-large">18</div>
                <div className="calendar-day-large">19</div>
                <div className="calendar-day-large">20</div>
                <div className="calendar-day-large">21</div>
                <div className="calendar-day-large">22</div>
                <div className="calendar-day-large">23</div>
                <div className="calendar-day-large">24</div>
                
                <div className="calendar-day-large">25</div>
                <div className="calendar-day-large">26</div>
                <div className="calendar-day-large">27</div>
                <div className="calendar-day-large">28</div>
                <div className="calendar-day-large">29</div>
                <div className="calendar-day-large">30</div>
                <div className="calendar-day-large">31</div>
              </div>
            </div>
          </div>

          {/* Reading Report Section */}
          <div className="library-section">
            <div className="section-header-large">
              <h3>독서 리포트</h3>
              <Link href="#" className="view-all">전체보기</Link>
            </div>
            <div className="reading-report">
              <p>밀리 회원들은 한 달 평균 5.7권 읽어요</p>
              <div className="report-stats">
                <div className="report-item">
                  <span className="report-label">나</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '0%'}}></div>
                  </div>
                  <span className="report-number">0권</span>
                </div>
                <div className="report-item">
                  <span className="report-label">밀리</span>
                  <div className="progress-bar">
                    <div className="progress-fill full" style={{width: '100%'}}></div>
                  </div>
                  <span className="report-number">5.7권</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reading Activities Section */}
          <div className="library-section">
            <div className="section-header-large">
              <h3>독서 활동</h3>
            </div>
            <div className="reading-activities">
              <div className="activity-item">
                <div className="activity-icon heart">❤️</div>
                <div className="activity-info">
                  <h4>나의 선호책</h4>
                  <p>설정하기</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon basket">🧺</div>
                <div className="activity-info">
                  <h4>나의 관심사</h4>
                  <p>설정하기</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}