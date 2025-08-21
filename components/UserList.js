export default function UserList({ users, onEdit, onDelete }) {
  if (!users || users.length === 0) {
    return (
      <div className="loading">
        등록된 사용자가 없습니다.
      </div>
    );
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.id} className="user-item">
          <div className="user-info">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <div className="user-actions">
            <button
              className="btn btn-secondary"
              onClick={() => onEdit(user)}
            >
              수정
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(user.id)}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
