import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { login } from '../src/lib/authRepo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      
      if (result.success) {
        alert(result.message);
        router.push('/'); // 메인 페이지로 이동
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('로그인 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <Link href="/">
            <div className="logo">
              <Image 
                src="/millie-logo.png" 
                alt="밀리의서재" 
                width={32} 
                height={32}
                className="logo-image"
                priority={false}
              />
              <span className="logo-text">밀리의서재</span>
            </div>
          </Link>
          <h2>로그인</h2>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="login-help">
          <Link href="/">← 메인으로 돌아가기</Link>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .login-box {
          background: white;
          border-radius: 16px;
          padding: 40px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
        }
        
        .logo-image {
          border-radius: 4px;
        }
        
        .logo-text {
          color: #667eea;
        }

        .login-header h2 {
          font-size: 1.8rem;
          color: #333;
          margin: 0;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-weight: 500;
          color: #555;
        }

        .form-group input {
          padding: 12px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
        }

        .error-message {
          background: #fee;
          color: #c33;
          padding: 12px;
          border-radius: 8px;
          font-size: 0.9rem;
          text-align: center;
        }

        .login-submit-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 15px;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .login-submit-btn:hover:not(:disabled) {
          background: #5a67d8;
        }

        .login-submit-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .login-help {
          margin-top: 20px;
          text-align: center;
          color: #666;
          font-size: 0.9rem;
        }

        .login-help p {
          margin-bottom: 10px;
          background: #f8f9fa;
          padding: 10px;
          border-radius: 6px;
        }

        .login-help a {
          color: #667eea;
          text-decoration: none;
        }

        .login-help a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
