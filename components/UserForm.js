import { useState, useEffect } from 'react';

export default function UserForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    } else {
      setFormData({
        name: '',
        email: ''
      });
    }
    setErrors({});
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름은 필수입니다.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '이름은 최소 2자 이상이어야 합니다.';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = '이름은 50자를 초과할 수 없습니다.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일은 필수입니다.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await onSubmit(formData);
      if (result.success) {
        if (!user) { // Only reset form for new user creation
          setFormData({ name: '', email: '' });
        }
        setErrors({});
      }
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          disabled={isSubmitting}
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          disabled={isSubmitting}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? '처리 중...' : (user ? '수정' : '등록')}
        </button>
        {onCancel && (
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
}
