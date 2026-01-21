import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="container mt-5">
            <h2>Welcome, {user?.name}</h2>
            <p>Role level: {user?.role_level}</p>

            <a href="/users" className="btn btn-primary mt-3 me-2">
                Manage Users
            </a>

            <button className="btn btn-danger" onClick={logout}>
                Logout
            </button>
        </div>
    );
}
