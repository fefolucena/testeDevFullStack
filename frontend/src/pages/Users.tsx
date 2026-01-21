import { useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser, updateUser } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

type User = {
    id: number;
    name: string;
    email: string;
    role_level: number;
};

export function Users() {
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role_level: 3,
    });

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            alert('Error loading users');
        }
    }

    async function handleDelete(userId: number) {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this user?'
        );

        if (!confirmDelete) return;

        try {
            await deleteUser(userId);
            loadUsers(); // recarrega a lista
        } catch {
            alert('Error deleting user');
        }
    }

    async function handleCreateUser() {
        try {
            await createUser(form);
            setShowModal(false);
            setForm({
                name: '',
                email: '',
                password: '',
                role_level: 3,
            });
            loadUsers();
        } catch {
            alert('Error creating user');
        }
    }

    async function handleUpdateUser() {
        if (!editingUser) return;

        try {
            const payload: any = {
                name: form.name,
                email: form.email,
                role_level: form.role_level,
            };

            if (form.password) {
                payload.password = form.password;
            }

            await updateUser(editingUser.id, payload);

            setShowModal(false);
            setEditingUser(null);
            setForm({
                name: '',
                email: '',
                password: '',
                role_level: 3,
            });

            loadUsers();
        } catch {
            alert('Error updating user');
        }
    }


    function roleLevel() {
        return Number(user?.role_level);
    }

    function canEdit() {
        return roleLevel() === 1 || roleLevel() === 2;
    }

    function canDelete() {
        return roleLevel() === 1;
    }

    return (
        <div>
            <div className="container mt-4">
                <h3>Usuários - Logado com perfil {user?.role_level}</h3>

                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.role_level}</td>
                                <td>
                                    <button className="btn btn-sm btn-secondary me-2">
                                        View
                                    </button>

                                    {canEdit() && (
                                        <button
                                            className="btn btn-success mb-3"
                                            onClick={() => {
                                                setEditingUser(null);
                                                setForm({
                                                    name: '',
                                                    email: '',
                                                    password: '',
                                                    role_level: 3,
                                                });
                                                setShowModal(true);
                                            }}
                                        >
                                            + Create User
                                        </button>
                                    )}

                                    {canEdit() && (
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => {
                                                setEditingUser(u);
                                                setForm({
                                                    name: u.name,
                                                    email: u.email,
                                                    password: '',
                                                    role_level: Number(u.role_level),
                                                });
                                                setShowModal(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}

                                    {canDelete() && (
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(u.id)}
                                        >
                                            Delete
                                        </button>
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="modal fade show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editingUser ? 'Edit User' : 'Create User'}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                />
                            </div>

                            <div className="modal-body">
                                <input
                                    className="form-control mb-2"
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={e =>
                                        setForm({ ...form, name: e.target.value })
                                    }
                                />

                                <input
                                    className="form-control mb-2"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={e =>
                                        setForm({ ...form, email: e.target.value })
                                    }
                                />

                                <input
                                    type="password"
                                    className="form-control mb-2"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={e =>
                                        setForm({ ...form, password: e.target.value })
                                    }
                                />

                                <select
                                    className="form-select"
                                    value={form.role_level}
                                    onChange={e =>
                                        setForm({
                                            ...form,
                                            role_level: Number(e.target.value),
                                        })
                                    }
                                >
                                    <option value={1}>Admin</option>
                                    <option value={2}>Moderator</option>
                                    <option value={3}>Reader</option>
                                </select>
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={editingUser ? handleUpdateUser : handleCreateUser}
                                >
                                    Save
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
