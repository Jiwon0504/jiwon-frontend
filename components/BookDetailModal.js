import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getCurrentUser } from '../src/lib/authRepo';

export default function BookDetailModal({ book, isOpen, onClose }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  // 모달이 열릴 때 좋아요 상태 확인
  useEffect(() => {
    if (isOpen && book && user) {
      fetchLikeStatus();
    }
  }, [isOpen, book, user]);

  const fetchLikeStatus = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/likes/status?userId=${user.id}&bookId=${book.id}`);
      if (response.ok) {
        const data = await response.json();
        setIsLiked(data.isLiked);
        setLikeCount(data.likeCount);
      }
    } catch (error) {
      console.error('좋아요 상태 확인 실패:', error);
    }
  };

  const handleLikeToggle = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/likes/toggle?userId=${user.id}&bookId=${book.id}`, {
        method: 'POST'
      });

      if (response.ok) {
        const data = await response.json();
        setIsLiked(data.isLiked);
        setLikeCount(data.likeCount);
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !book) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="book-detail-container">
          <div className="book-detail-left">
            <div className="book-cover-large">
              <Image
                src={`/book-covers/book-${book.id}.jpg`}
                alt={book.title}
                width={200}
                height={280}
                className="book-cover-image-large"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'flex';
                }}
              />
              <div className={`book-cover-fallback-large book-cover-${(book.id % 11) + 1}`} style={{display: 'none'}}>
                📚
              </div>
            </div>
          </div>
          
          <div className="book-detail-right">
            <div className="book-detail-header">
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">{book.author}</p>
              {book.publisher && <p className="book-publisher">{book.publisher}</p>}
              <span className="book-category">{book.category}</span>
            </div>
            
            <div className="book-description">
              <h3>책 소개</h3>
              <p>{book.description || '책 소개가 준비되지 않았습니다.'}</p>
            </div>
            
            <div className="book-actions">
              <button 
                className={`like-button ${isLiked ? 'liked' : ''}`}
                onClick={handleLikeToggle}
                disabled={loading}
              >
                <span className="heart-icon">{isLiked ? '❤️' : '🤍'}</span>
                <span className="like-text">
                  {loading ? '처리중...' : (isLiked ? '좋아요 취소' : '좋아요')}
                </span>
                <span className="like-count">({likeCount})</span>
              </button>
              
              <button className="read-button">
                📖 읽기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
