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
    const { user, logout } = useAuth();
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
            alert('Erro ao carregar usuários');
        }
    }

    async function handleDelete(userId: number) {
        const confirmDelete = window.confirm(
            'Tem certeza que você quer deletar este usuário?'
        );

        if (!confirmDelete) return;

        try {
            await deleteUser(userId);
            loadUsers(); 
        } catch {
            alert('Erro ao deletar usuário');
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
            alert('Erro ao criar usuário');
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
            alert('Erro ao atualizar usuário');
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
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="text-white">Bem-vindo {user?.name} - Logado com perfil nível {user?.role_level}</h3>
                    <button className="btn btn-danger" onClick={logout}>
                        Sair
                    </button>
                </div>

                <div className="container mt-4">
                    <div className="bg-light rounded p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4>Usuários</h4>

                            {canEdit() && (
                                <button
                                    className="btn btn-primary"
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
                                    + Criar usuário
                                </button>
                            )}
                        </div>

                        {users.map(u => (
                            <div
                                key={u.id}
                                className="card mb-3 shadow-sm border-0"
                            >
                                <div className="card-body d-flex align-items-center justify-content-between">

                                    <div className="d-flex align-items-center gap-3">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                        </svg>

                                        <div>
                                            <div className="text-muted small">{u.email}</div>
                                            <div className="fw-bold">{u.name}</div>
                                        </div>
                                    </div>

                                    {canEdit() && (
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary dropdown-toggle"
                                                data-bs-toggle="dropdown"
                                            >
                                                Ações
                                            </button>

                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li>
                                                    <button
                                                        className="dropdown-item"
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
                                                        Editar
                                                    </button>
                                                </li>

                                                {canDelete() && (
                                                    <li>
                                                        <button
                                                            className="dropdown-item text-danger"
                                                            onClick={() => handleDelete(u.id)}
                                                        >
                                                            Excluir
                                                        </button>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
                                <label className="form-label small text-muted mb-0">
                                    Nome
                                </label>
                                <input
                                    className="form-control mb-2"
                                    placeholder="Nome"
                                    value={form.name}
                                    onChange={e =>
                                        setForm({ ...form, name: e.target.value })
                                    }
                                />

                                <label className="form-label small text-muted mb-0">
                                    E-mail
                                </label>
                                <input
                                    className="form-control mb-2"
                                    placeholder="E-mail"
                                    value={form.email}
                                    onChange={e =>
                                        setForm({ ...form, email: e.target.value })
                                    }
                                />

                                <label className="form-label small text-muted mb-0">
                                    Perfil
                                </label>
                                <select
                                    className="form-select mb-2"
                                    value={form.role_level}
                                    onChange={e =>
                                        setForm({
                                            ...form,
                                            role_level: Number(e.target.value),
                                        })
                                    }
                                >
                                    <option value={1}>Admin</option>
                                    <option value={2}>Moderador</option>
                                    <option value={3}>Leitor</option>
                                </select>

                                <label className="form-label small text-muted mb-0">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder={editingUser ? 'Nova senha (opcional)' : 'Senha'}
                                    value={form.password}
                                    onChange={e =>
                                        setForm({ ...form, password: e.target.value })
                                    }
                                />

                                {editingUser && (
                                    <small className="text-muted">
                                        Deixe em branco para manter a senha atual
                                    </small>
                                )}
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={editingUser ? handleUpdateUser : handleCreateUser}
                                >
                                    Salvar
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
