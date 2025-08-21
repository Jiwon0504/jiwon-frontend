import Link from 'next/link';

export default function Management() {
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
          <Link href="/library" className="nav-item">내서재</Link>
          <Link href="/management" className="nav-item active">관리</Link>
        </div>
        <div className="nav-right">
          <div className="notification-icon">🔔</div>
          <button className="login-btn">로그아웃</button>
        </div>
      </nav>

      {/* Management Content */}
      <main className="management-content">
        <div className="management-wrapper">
          {/* User Info Header */}
          <div className="user-info-header">
            <div className="user-avatar">
              <div className="millie-logo-svg">
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="50" fill="#FFD700"/>
                  <circle cx="50" cy="50" r="35" fill="#333333"/>
                  <path d="M20 70C20 70 25 50 35 50C40 50 45 60 45 70C45 80 40 90 35 90C25 90 20 70 20 70Z" fill="#FFD700"/>
                  <path d="M35 70C35 70 40 50 50 50C55 50 60 60 60 70C60 80 55 90 50 90C40 90 35 70 35 70Z" fill="#FFD700"/>
                  <path d="M50 70C50 70 55 50 65 50C70 50 75 60 75 70C75 80 70 90 65 90C55 90 50 70 50 70Z" fill="#FFD700"/>
                </svg>
              </div>
            </div>
            <div className="user-info">
              <span className="user-greeting">아이디 계정 회원</span>
              <h2 className="user-name">니가좋은이유가밀리언스</h2>
            </div>
          </div>

          {/* My Subscription Section */}
          <div className="management-section">
            <div className="section-header">
              <h3>나의 정기구독</h3>
              <span className="arrow">›</span>
            </div>
            <div className="subscription-info">
              <p>밀리의서재 정기구독을 시작하세요</p>
              <p className="sub-text">어려운 독서, 시작하면 습관이 됩니다.</p>
              <button className="subscribe-btn">구독 상품 살펴보기</button>
            </div>
          </div>

          {/* Service Settings */}
          <div className="management-section">
            <h3 className="section-title">서비스 설정</h3>
            <div className="menu-list">
              <div className="menu-item">
                <span>내 정보 관리</span>
                <span className="arrow">›</span>
              </div>
              <div className="menu-item">
                <span>알림 설정</span>
                <span className="arrow">›</span>
              </div>
              <div className="menu-item">
                <span>19세미만 성장 관리</span>
                <span className="arrow">›</span>
              </div>
              <div className="menu-item">
                <span>관심 정보 설정</span>
                <span className="arrow">›</span>
              </div>
              <div className="menu-item">
                <span>서비스 관리</span>
              </div>
              <div className="menu-item">
                <span>밀 / 마일리지 관리</span>
                <span className="arrow">›</span>
              </div>
              <div className="menu-item">
                <span>PC뷰어 / E-ink 뷰어 관리</span>
                <span className="arrow">›</span>
              </div>
              <div className="menu-item">
                <span>내 기기 관리</span>
                <span className="arrow">›</span>
              </div>
              <div className="menu-item">
                <span>서비스 안내</span>
              </div>
              <div className="menu-item">
                <span>공지사항</span>
                <span className="arrow">›</span>
              </div>
              <div className="menu-item">
                <span>이용약관 및 정책</span>
                <span className="arrow">›</span>
              </div>
              <div className="menu-item">
                <span>고객센터</span>
                <span className="arrow">›</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}